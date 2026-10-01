/**
 * Gemini Live Client for Bidirectional Real-time Tamil Voice Conversation
 * Handles 16kHz microphone capture (PCM16 LE), WebSocket streaming to Gemini Live on /live,
 * and 24kHz gapless PCM playback with instant interruption handling.
 */

export type LiveStatus =
  | 'idle'        // "Tap to speak"
  | 'connecting'  // "Connecting..."
  | 'ready'       // "Voice connection ready"
  | 'listening'   // "Listening..."
  | 'thinking'    // "Thinking..."
  | 'speaking'    // "Speaking..."
  | 'error';      // "Voice connection problem"

export interface GeminiLiveCallbacks {
  onStatusChange: (status: LiveStatus, statusTextTa: string) => void;
  onAssistantText: (text: string, isAppend: boolean) => void;
  onUserText: (text: string) => void;
  onInterrupted: () => void;
  onPermissionDenied: () => void;
  onError: (err: string) => void;
}

export class GeminiLiveClient {
  private ws: WebSocket | null = null;
  private inputAudioCtx: AudioContext | null = null;
  private outputAudioCtx: AudioContext | null = null;
  private micStream: MediaStream | null = null;
  private processor: ScriptProcessorNode | null = null;
  private sourceNode: MediaStreamAudioSourceNode | null = null;

  private activeAudioSources: AudioBufferSourceNode[] = [];
  private nextStartTime: number = 0;
  private isConnected = false;
  private currentStatus: LiveStatus = 'idle';

  private callbacks: GeminiLiveCallbacks;

  constructor(callbacks: GeminiLiveCallbacks) {
    this.callbacks = callbacks;
  }

  private setStatus(status: LiveStatus) {
    this.currentStatus = status;
    let textTa = '';
    switch (status) {
      case 'idle':
        textTa = 'பேச தொடங்குங்கள் (Tap to speak)';
        break;
      case 'ready':
        textTa = 'குரல் இணைப்பு தயாராக உள்ளது';
        break;
      case 'listening':
        textTa = 'கேட்கிறேன்... (Listening...)';
        break;
      case 'thinking':
        textTa = 'யோசிக்கிறேன்... (Thinking...)';
        break;
      case 'speaking':
        textTa = 'பேசுகிறேன்... (Speaking...)';
        break;
      case 'connecting':
        textTa = 'இணைக்கப்படுகிறது... (Connecting...)';
        break;
      case 'error':
        textTa = 'குரல் இணைப்பு பிரச்சனை (Voice connection problem)';
        break;
    }
    this.callbacks.onStatusChange(status, textTa);
  }

  public async startLiveSession(): Promise<boolean> {
    this.disconnect();
    this.setStatus('connecting');

    // 1. Request microphone permission
    try {
      this.micStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: 16000,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
    } catch (err: any) {
      console.error('Microphone permission error:', err);
      this.setStatus('error');
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        this.callbacks.onPermissionDenied();
      } else {
        this.callbacks.onError('மைக்கை அணுக முடியவில்லை: ' + (err.message || 'அனுமதி மறுக்கப்பட்டது'));
      }
      return false;
    }

    // 2. Setup WebSocket connection to server /live endpoint
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/live`;

    return new Promise((resolve) => {
      try {
        this.ws = new WebSocket(wsUrl);
      } catch (e: any) {
        this.setStatus('error');
        this.callbacks.onError('இணைப்பு தொடங்க முடியவில்லை: ' + e.message);
        resolve(false);
        return;
      }

      this.ws.onopen = () => {
        this.isConnected = true;
        this.startAudioProcessing();
      };

      this.ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          this.handleServerMessage(msg);
          if (msg.type === 'ready') {
            resolve(true);
          }
        } catch (e) {
          console.error('Error parsing live ws message:', e);
        }
      };

      this.ws.onerror = (event) => {
        console.error('WebSocket error:', event);
        this.setStatus('error');
        this.callbacks.onError('குரல் சர்வர் இணைப்பு தடைபட்டது.');
        resolve(false);
      };

      this.ws.onclose = () => {
        this.isConnected = false;
        if (this.currentStatus !== 'idle') {
          this.setStatus('idle');
        }
      };
    });
  }

  private startAudioProcessing() {
    if (!this.micStream) return;

    // Output AudioContext (24kHz for Gemini Live model output audio)
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    this.outputAudioCtx = new AudioContextClass({ sampleRate: 24000 });
    this.nextStartTime = this.outputAudioCtx.currentTime;

    // Input AudioContext (16kHz for Gemini input audio)
    this.inputAudioCtx = new AudioContextClass({ sampleRate: 16000 });
    this.sourceNode = this.inputAudioCtx.createMediaStreamSource(this.micStream);
    this.processor = this.inputAudioCtx.createScriptProcessor(4096, 1, 1);

    this.processor.onaudioprocess = (e) => {
      if (!this.isConnected || !this.ws || this.ws.readyState !== WebSocket.OPEN) {
        return;
      }

      const inputData = e.inputBuffer.getChannelData(0);

      // Simple RMS check for user speaking to show "கேட்கிறேன்..." status
      let sumSquares = 0;
      for (let i = 0; i < inputData.length; i++) {
        sumSquares += inputData[i] * inputData[i];
      }
      const rms = Math.sqrt(sumSquares / inputData.length);
      if (rms > 0.03 && this.currentStatus !== 'listening') {
        // User is talking into mic
        this.setStatus('listening');
        // If model is speaking, user is interrupting!
        if (this.activeAudioSources.length > 0) {
          this.stopAllAudioPlayback();
          this.callbacks.onInterrupted();
        }
      }

      // Convert Float32 to 16-bit PCM little-endian
      const buffer = new ArrayBuffer(inputData.length * 2);
      const view = new DataView(buffer);
      for (let i = 0; i < inputData.length; i++) {
        const s = Math.max(-1, Math.min(1, inputData[i]));
        view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
      }

      // Convert to base64 string
      let binary = '';
      const bytes = new Uint8Array(buffer);
      const len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      const base64 = window.btoa(binary);

      this.ws.send(JSON.stringify({ type: 'realtime_audio', audio: base64 }));
    };

    this.sourceNode.connect(this.processor);
    this.processor.connect(this.inputAudioCtx.destination);
  }

  private handleServerMessage(msg: any) {
    if (msg.type === 'ready') {
      this.setStatus('ready');
    } else if (msg.type === 'audio' && msg.audio) {
      this.setStatus('speaking');
      this.playAudioChunk(msg.audio);
    } else if (msg.type === 'interrupted') {
      this.stopAllAudioPlayback();
      this.setStatus('listening');
      this.callbacks.onInterrupted();
    } else if (msg.type === 'text' && msg.text) {
      this.callbacks.onAssistantText(msg.text, true);
    } else if (msg.type === 'user_text' && msg.text) {
      this.callbacks.onUserText(msg.text);
    } else if (msg.type === 'turn_complete') {
      if (this.currentStatus === 'speaking' && this.activeAudioSources.length === 0) {
        this.setStatus('ready');
      }
    } else if (msg.type === 'error') {
      this.setStatus('error');
      this.callbacks.onError(msg.error || 'குரல் தொடர்பில் பிழை');
    }
  }

  private playAudioChunk(base64Pcm: string) {
    if (!this.outputAudioCtx) return;

    if (this.outputAudioCtx.state === 'suspended') {
      this.outputAudioCtx.resume();
    }

    try {
      const binary = window.atob(base64Pcm);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const int16 = new Int16Array(bytes.buffer);
      const float32 = new Float32Array(int16.length);
      for (let i = 0; i < int16.length; i++) {
        float32[i] = int16[i] / 32768.0;
      }

      const audioBuffer = this.outputAudioCtx.createBuffer(1, float32.length, 24000);
      audioBuffer.getChannelData(0).set(float32);

      const source = this.outputAudioCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(this.outputAudioCtx.destination);

      if (this.nextStartTime < this.outputAudioCtx.currentTime) {
        this.nextStartTime = this.outputAudioCtx.currentTime;
      }

      source.start(this.nextStartTime);
      this.nextStartTime += audioBuffer.duration;

      this.activeAudioSources.push(source);

      source.onended = () => {
        const index = this.activeAudioSources.indexOf(source);
        if (index > -1) {
          this.activeAudioSources.splice(index, 1);
        }
        if (this.activeAudioSources.length === 0 && this.currentStatus === 'speaking') {
          this.setStatus('ready');
        }
      };
    } catch (e) {
      console.error('Audio chunk decoding error:', e);
    }
  }

  private stopAllAudioPlayback() {
    for (const source of this.activeAudioSources) {
      try {
        source.stop();
        source.disconnect();
      } catch (e) {
        // ignore
      }
    }
    this.activeAudioSources = [];
    if (this.outputAudioCtx) {
      this.nextStartTime = this.outputAudioCtx.currentTime;
    }
  }

  /**
   * "Repeat" - Repeats the exact last spoken instruction
   */
  public repeatLast() {
    this.stopAllAudioPlayback();
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.setStatus('listening');
      this.ws.send(JSON.stringify({ type: 'repeat_last' }));
    }
  }

  /**
   * "I don't understand" - Repeats the instruction in simpler spoken Tamil
   */
  public dontUnderstand() {
    this.stopAllAudioPlayback();
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.setStatus('listening');
      this.ws.send(JSON.stringify({ type: 'dont_understand' }));
    }
  }

  /**
   * "New user? I want to create an account" - Switch intent to new citizen registration
   */
  public selectNewUser() {
    this.stopAllAudioPlayback();
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.setStatus('listening');
      this.ws.send(JSON.stringify({ type: 'select_new_user' }));
    }
  }

  /**
   * "I already have an account" - Switch intent to existing user login
   */
  public selectExistingUser() {
    this.stopAllAudioPlayback();
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.setStatus('listening');
      this.ws.send(JSON.stringify({ type: 'select_existing_user' }));
    }
  }

  /**
   * "Start PMMVY Guidance" - Starts the step-by-step PMMVY process
   */
  public startPMMVYGuidance() {
    this.stopAllAudioPlayback();
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.setStatus('listening');
      this.ws.send(JSON.stringify({ type: 'start_pmmvy_guidance' }));
    }
  }

  /**
   * "Find Government Schemes" - Starts the myScheme questionnaire discovery
   */
  public startMySchemeGuidance() {
    this.stopAllAudioPlayback();
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.setStatus('listening');
      this.ws.send(JSON.stringify({ type: 'start_myscheme_guidance' }));
    }
  }

  /**
   * "Check Official Website Again" - In case website was unavailable (502)
   */
  public checkWebsiteAgain() {
    this.stopAllAudioPlayback();
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.setStatus('listening');
      this.ws.send(JSON.stringify({ type: 'check_website_again' }));
    }
  }

  /**
   * "The website is not opening" (502 / Temporary error)
   */
  public websiteNotOpening() {
    this.stopAllAudioPlayback();
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.setStatus('listening');
      this.ws.send(JSON.stringify({ type: 'website_not_opening' }));
    }
  }

  /**
   * "Can you apply for me?" - AI reminds user it's an independent guide only
   */
  public applyForMe() {
    this.stopAllAudioPlayback();
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.setStatus('listening');
      this.ws.send(JSON.stringify({ type: 'apply_for_me' }));
    }
  }

  /**
   * "Go back to PMMVY." - Returns to PMMVY mode
   */
  public goBackToPMMVY() {
    this.stopAllAudioPlayback();
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.setStatus('listening');
      this.ws.send(JSON.stringify({ type: 'go_back_pmmvy' }));
    }
  }

  /**
   * "மீண்டும் சொல்லுங்கள்" - Instructs assistant to repeat the last instruction in simpler Tamil
   */
  public repeatSimpler() {
    this.dontUnderstand();
  }

  /**
   * Send custom text command or prompt to assistant over Live session
   */
  public sendTextMessage(text: string) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type: 'text', text }));
    }
  }

  public disconnect() {
    this.stopAllAudioPlayback();

    if (this.processor) {
      try {
        this.processor.disconnect();
      } catch (e) {
        // ignore
      }
      this.processor = null;
    }

    if (this.sourceNode) {
      try {
        this.sourceNode.disconnect();
      } catch (e) {
        // ignore
      }
      this.sourceNode = null;
    }

    if (this.inputAudioCtx) {
      try {
        this.inputAudioCtx.close();
      } catch (e) {
        // ignore
      }
      this.inputAudioCtx = null;
    }

    if (this.outputAudioCtx) {
      try {
        this.outputAudioCtx.close();
      } catch (e) {
        // ignore
      }
      this.outputAudioCtx = null;
    }

    if (this.micStream) {
      this.micStream.getTracks().forEach((track) => track.stop());
      this.micStream = null;
    }

    if (this.ws) {
      try {
        this.ws.close();
      } catch (e) {
        // ignore
      }
      this.ws = null;
    }

    this.isConnected = false;
    this.setStatus('idle');
  }

  public isSessionActive(): boolean {
    return this.isConnected;
  }
}
