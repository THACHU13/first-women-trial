// Audio utility for Tamil speech recognition and speech synthesis

export interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

export class VoiceManager {
  private currentAudio: HTMLAudioElement | null = null;
  private recognition: any = null;
  private isRecognitionActive = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.lang = 'ta-IN';
      }
    }
  }

  public isSpeechRecognitionSupported(): boolean {
    return !!this.recognition;
  }

  public startListening(
    onResult: (text: string, isFinal: boolean) => void,
    onError: (err: any) => void,
    onEnd: () => void
  ): boolean {
    if (!this.recognition) {
      onError(new Error('Speech recognition not supported'));
      return false;
    }

    this.stopSpeaking();

    this.recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      if (finalTranscript) {
        onResult(finalTranscript, true);
      } else if (interimTranscript) {
        onResult(interimTranscript, false);
      }
    };

    this.recognition.onerror = (event: any) => {
      console.warn('Speech recognition error:', event.error);
      this.isRecognitionActive = false;
      onError(event.error);
    };

    this.recognition.onend = () => {
      this.isRecognitionActive = false;
      onEnd();
    };

    try {
      this.recognition.start();
      this.isRecognitionActive = true;
      return true;
    } catch (e) {
      console.warn('Recognition start exception:', e);
      this.isRecognitionActive = false;
      return false;
    }
  }

  public stopListening() {
    if (this.recognition && this.isRecognitionActive) {
      try {
        this.recognition.stop();
      } catch (e) {
        // ignore
      }
      this.isRecognitionActive = false;
    }
  }

  public stopSpeaking() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }

  public async speakTamil(
    text: string,
    options: {
      slow?: boolean;
      useGeminiTts?: boolean;
      onStart?: () => void;
      onEnd?: () => void;
    } = {}
  ): Promise<void> {
    const { slow = false, useGeminiTts = true, onStart, onEnd } = options;

    this.stopSpeaking();
    onStart?.();

    // 1. Try Gemini 3.8 Flash Lite TTS via /api/tts
    if (useGeminiTts) {
      try {
        const response = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.audioBase64) {
            const audioSrc = `data:audio/wav;base64,${data.audioBase64}`;
            const audio = new Audio(audioSrc);
            this.currentAudio = audio;
            if (slow) audio.playbackRate = 0.85;

            return new Promise((resolve) => {
              audio.onended = () => {
                this.currentAudio = null;
                onEnd?.();
                resolve();
              };
              audio.onerror = () => {
                this.currentAudio = null;
                this.fallbackBrowserSpeech(text, slow, onEnd, resolve);
              };
              audio.play().catch(() => {
                this.fallbackBrowserSpeech(text, slow, onEnd, resolve);
              });
            });
          }
        }
      } catch (err) {
        console.warn('Gemini TTS error, falling back to browser speech:', err);
      }
    }

    // 2. Fallback to Browser SpeechSynthesis with Tamil voice
    return new Promise((resolve) => {
      this.fallbackBrowserSpeech(text, slow, onEnd, resolve);
    });
  }

  private fallbackBrowserSpeech(
    text: string,
    slow: boolean,
    onEnd?: () => void,
    onResolve?: () => void
  ) {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      onEnd?.();
      onResolve?.();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ta-IN';
    utterance.rate = slow ? 0.78 : 0.88; // gentle, easily audible pace
    utterance.pitch = 1.05; // warm, gentle pitch

    const voices = window.speechSynthesis.getVoices();
    const tamilVoice = voices.find(
      (v) => v.lang.includes('ta') || v.name.toLowerCase().includes('tamil')
    );
    if (tamilVoice) {
      utterance.voice = tamilVoice;
    }

    utterance.onend = () => {
      onEnd?.();
      onResolve?.();
    };
    utterance.onerror = () => {
      onEnd?.();
      onResolve?.();
    };

    window.speechSynthesis.speak(utterance);
  }
}

export const voiceManager = new VoiceManager();
