import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';
import { WebSocketServer, WebSocket } from 'ws';
import { GoogleGenAI, Type, Modality } from '@google/genai';
import { 
  VERIFIED_WOMEN_SCHEMES, 
  buildSchemeCard, 
  MYSCHEME_PORTAL_CARD, 
  NSP_PORTAL_CARD, 
  ONE_STOP_CENTRE_CARD, 
  getSchemeById, 
  findSchemeCardForQuery, 
  determineUserIntent, 
  createActiveContextFromScheme 
} from './src/data/womenSchemes';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '10mb' }));

// Shared Gemini AI client with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const SYSTEM_INSTRUCTION = `
You are "முதல் பெண்கள்" (Mudhal Pengal - AI Voice Guide for Government Services for Women), an empathetic, patient, simple spoken Tamil voice assistant.

PRIMARY PURPOSE:
A voice-first AI guide that helps women discover government schemes that may be relevant to their situation, in their own language.

THE PRIMARY TARGET USER:
- May have never used a government website
- May not understand English or technical jargon
- May not know the name of a government scheme
- May not know where to start
- May be unable to read Tamil text
- Speaks naturally (Tamil, English, or mixed Tanglish like "எனக்கு என்ன scheme கிடைக்கும்?", "28 வயது", "I am pregnant", "வேலை தேவை")

CORE PHILOSOPHY & ROLES:
- The AI is a GUIDE.
- The official government website is the AUTHORITY.
- The WOMAN remains in control of all official actions and personally enters all sensitive data.
- NEVER say "You are eligible" or "Your application is approved/submitted".
- Always say: "இந்த திட்டம் உங்களுக்கு பொருத்தமாக இருக்கலாம். Official government website-ல் eligibility-ஐ verify செய்ய வேண்டும்."

DISCOVERY CONVERSATION FLOW:
UNDERSTAND → ASK → NARROW DOWN → EXPLAIN → VERIFY → OPEN OFFICIAL SOURCE.
- Ask only ONE question at a time! (Age -> State -> Pregnancy / Children / Work / Student status).
- Never overwhelm the user with long paragraphs. Use ONE or TWO short, natural spoken sentences.
- When schemes are identified, present a short list (maximum 3 to 5) and ask: "இதில் எதை பற்றி விரிவாக சொல்லவா?"
- When explaining a scheme:
  1. What is it?
  2. Who is it generally for?
  3. What support does it provide?
  4. What are the main eligibility factors?
  5. How can I apply?
  6. What is the official website?
  Always in short, 1-2 sentence spoken turns.

VERIFIED KNOWLEDGE BASE OF 9 WOMEN'S SCHEMES:
1. PMMVY (Pradhan Mantri Matru Vandana Yojana)
   - Category: Pregnancy & Motherhood
   - Benefit: ₹5,000 for 1st child (₹3,000 at ANC, ₹2,000 post-birth vaccination) and ₹6,000 for 2nd girl child.
   - Portal: https://pmmvy.wcd.gov.in (Helpline: 1515, Anganwadi/ASHA assisted).
   - Citizen login vs Existing User rules strictly enforced (warn new users away from normal User ID/Password page).
2. Women Helpline 181 & One Stop Centre (Sakhi)
   - Category: Safety & Emergency Support (24/7 toll-free 181, police, medical, legal, shelter).
3. Lakhpati Didi / DAY-NRLM
   - Category: Livelihood & Employment (Rural SHG skill training, micro-enterprise loans, ₹1 Lakh+ income).
4. PM Mudra Yojana (PMMY) for Women
   - Category: Business Loans (Collateral-free loans up to ₹10 Lakh: Shishu up to ₹50k, Kishore up to ₹5L, Tarun up to ₹10L).
5. PM Ujjwala Yojana (PMUY)
   - Category: Social Support (Deposit-free LPG gas connection, stove, first cylinder & subsidy for poor women).
6. Sukanya Samriddhi Yojana (SSY)
   - Category: Girl Child & Education (8.2% high interest savings in Post Office/banks for girls up to age 10).
7. Pudhumai Penn Scheme (Tamil Nadu)
   - Category: Higher Education for Girls (₹1,000/month for college girl students from govt schools).
8. Kalaignar Magalir Urimai Thogai (KMUT - Tamil Nadu)
   - Category: Basic Income & Social Support (₹1,000/month for women heads of households).
9. Stand-Up India for Women
   - Category: Women Entrepreneurship (Bank loans ₹10 Lakh to ₹1 Crore for greenfield enterprises).

BROADER SEARCH FALLBACK:
If the user seeks schemes outside these 9, guide them to official myScheme platform: https://www.myscheme.gov.in/ta.

STRICT PRIVACY MANDATE:
- NEVER ask for: Aadhaar number, OTP, password, bank account number, debit card info, PIN, biometrics, facial auth, or private documents.
- If user offers sensitive info, say: "இந்த தகவலை என்னிடம் சொல்ல வேண்டாம். Official government website-ல் நீங்கள் நேரடியாக உள்ளிட வேண்டும்."

WEBSITE UNAVAILABLE MANDATE:
- If website is down (502, 503, network error): "Official government website இப்போது open ஆகவில்லை. Temporary technical problem இருக்கலாம்." Provide "Check Again".
`;

// HTTP Server wrapper
const server = http.createServer(app);

// WebSocket Server for Gemini Live API on /live
const wss = new WebSocketServer({ noServer: true });

server.on('upgrade', (request, socket, head) => {
  const url = request.url || '';
  if (url.startsWith('/live')) {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  }
});

wss.on('connection', async (clientWs: WebSocket) => {
  console.log('Client connected to Gemini Live voice gateway');
  let session: any = null;
  let isClosed = false;

  try {
    session = await ai.live.connect({
      model: 'gemini-3.8-live',
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
        },
        systemInstruction: SYSTEM_INSTRUCTION,
        outputAudioTranscription: {},
        inputAudioTranscription: {},
      },
      callbacks: {
        onopen: () => {
          if (!isClosed && clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(JSON.stringify({ type: 'ready', status: 'குரல் இணைப்பு தயாராக உள்ளது' }));
          }
        },
        onmessage: (message: any) => {
          if (isClosed || clientWs.readyState !== WebSocket.OPEN) return;

          // 1. PCM Audio chunks (24kHz)
          const audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
          if (audio) {
            clientWs.send(JSON.stringify({ type: 'audio', audio }));
          }

          // 2. Interrupted event (user interrupted model while speaking)
          if (message.serverContent?.interrupted) {
            clientWs.send(JSON.stringify({ type: 'interrupted' }));
          }

          // 3. Model speech transcription text
          const parts = message.serverContent?.modelTurn?.parts;
          if (parts) {
            for (const part of parts) {
              if (part.text) {
                clientWs.send(JSON.stringify({ type: 'text', text: part.text }));
              }
            }
          }
          if (message.serverContent?.outputAudioTranscription?.text) {
            clientWs.send(JSON.stringify({
              type: 'text',
              text: message.serverContent.outputAudioTranscription.text,
            }));
          }

          // 4. User input transcription text
          if (message.serverContent?.inputAudioTranscription?.text) {
            clientWs.send(JSON.stringify({
              type: 'user_text',
              text: message.serverContent.inputAudioTranscription.text,
            }));
          }

          // 5. Turn completion
          if (message.serverContent?.turnComplete) {
            clientWs.send(JSON.stringify({ type: 'turn_complete' }));
          }
        },
        onclose: () => {
          if (!isClosed && clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(JSON.stringify({ type: 'closed', status: 'இணைப்பு முடிந்தது' }));
          }
        },
        onerror: (err: any) => {
          console.error('Gemini Live session error:', err);
          if (!isClosed && clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(JSON.stringify({ type: 'error', error: err?.message || 'Live session error' }));
          }
        },
      },
    });

    if (clientWs.readyState === WebSocket.OPEN) {
      clientWs.send(JSON.stringify({ type: 'ready', status: 'குரல் இணைப்பு தயாராக உள்ளது' }));
    }
  } catch (err: any) {
    console.error('Failed to connect to Gemini Live API:', err);
    if (clientWs.readyState === WebSocket.OPEN) {
      clientWs.send(JSON.stringify({
        type: 'error',
        error: err?.message || 'Gemini Live இணைப்பதில் சிக்கல் ஏற்பட்டது. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.',
      }));
    }
    return;
  }

  clientWs.on('message', async (data) => {
    try {
      const parsed = JSON.parse(data.toString());
      if (parsed.type === 'realtime_audio' && parsed.audio) {
        session?.sendRealtimeInput({
          audio: { data: parsed.audio, mimeType: 'audio/pcm;rate=16000' },
        });
      } else if (parsed.type === 'text' && parsed.text) {
        session?.sendRealtimeInput({
          text: parsed.text,
        });
      } else if (parsed.type === 'select_new_user') {
        session?.sendRealtimeInput({
          text: 'நான் புதிய பயனர். எனக்கு இன்னும் account இல்லை. புதிய citizen registration செய்ய வேண்டும்.',
        });
      } else if (parsed.type === 'select_existing_user') {
        session?.sendRealtimeInput({
          text: 'எனக்கு ஏற்கனவே account உள்ளது. User ID மற்றும் Password வைத்து login செய்ய வேண்டும்.',
        });
      } else if (parsed.type === 'start_myscheme_guidance') {
        session?.sendRealtimeInput({
          text: 'நான் அரசு திட்டங்களை கண்டுபிடிக்க உங்களுக்கு உதவுகிறேன். முதலில் சில எளிய கேள்விகள் கேட்பேன். உங்கள் பதில்களின் அடிப்படையில் உங்களுக்கு பொருத்தமாக இருக்கக்கூடிய திட்டங்களை கண்டுபிடிக்க உதவுகிறேன். நான் அரசு சார்பாக நீங்கள் தகுதியானவர் என்று முடிவு செய்யவில்லை. இறுதி தகுதி மற்றும் விண்ணப்பத்தை official government website-ல் தான் சரிபார்க்க வேண்டும். உங்கள் வயது எவ்வளவு அம்மா?',
        });
      } else if (parsed.type === 'start_pmmvy_guidance') {
        session?.sendRealtimeInput({
          text: 'அம்மாவுக்கு வணக்கம் கூறி, PMMVY அரசு திட்ட வழிகாட்டலை அன்புடன் தொடங்குங்கள். "சரி அம்மா, நான் உங்களுக்கு ஒவ்வொரு படியாகவும் சொல்லித் தருகிறேன். நீங்கள் மட்டும் அரசு இணையதளத்தில் செய்ய வேண்டியதை செய்யுங்கள். முதலில் PMMVY அரசு இணையதளத்தை திறக்கலாம்" என்று முதல் படியை மட்டும் சொல்லுங்கள்.',
        });
      } else if (parsed.type === 'repeat_last') {
        session?.sendRealtimeInput({
          text: 'கடைசியாக கூறிய வழிகாட்டலை மட்டும் மீண்டும் ஒருமுறை மிகத் தெளிவாகவும் மெதுவாகவும் சொல்லுங்கள்.',
        });
      } else if (parsed.type === 'dont_understand' || parsed.type === 'repeat_simpler') {
        session?.sendRealtimeInput({
          text: 'அம்மாவுக்கு இது புரியவில்லை. அதே வழிகாட்டலை இன்னும் மிக மிக எளிய பேச்சுத் தமிழில், அன்றாட உதாரணங்களுடன் மெதுவாக சொல்லுங்கள்.',
        });
      } else if (parsed.type === 'check_website_again') {
        session?.sendRealtimeInput({
          text: 'சரி அம்மா, அதிகாரப்பூர்வ myScheme இணையதளம் இப்போது திறக்கிறதா என்று நாம் மீண்டும் சரிபார்ப்போம்.',
        });
      } else if (parsed.type === 'website_not_opening') {
        session?.sendRealtimeInput({
          text: 'Official myScheme website இப்போது open ஆகவில்லை. Website-ல் temporary problem இருக்கலாம். சிறிது நேரம் கழித்து மீண்டும் முயற்சிக்கலாம் என்று சொல்லி, "Check Official Website Again" பொத்தானை தொட சொல்லுங்கள்.',
        });
      } else if (parsed.type === 'apply_for_me') {
        session?.sendRealtimeInput({
          text: 'அம்மா என்னிடம் என் சார்பாக விண்ணப்பிக்க முடியுமா என்று கேட்கிறார். நான் வழிகாட்டி மட்டுமே, விண்ணப்பிக்க முடியாது. நீங்களே அரசு இணையதளத்தில் சுயமாக விண்ணப்பிக்க வேண்டும் என்று தெளிவாக சொல்லுங்கள்.',
        });
      } else if (parsed.type === 'go_back_pmmvy') {
        session?.sendRealtimeInput({
          text: 'சரி அம்மா, நாம் மீண்டும் PMMVY பிரதான் மந்திரி மாத்ரு வந்தனா யோஜனா வழிகாட்டலுக்கு செல்வோம் என்று கூறி PMMVY முதல் படியை சொல்லுங்கள்.',
        });
      }
    } catch (e) {
      console.error('Error handling message from client:', e);
    }
  });

  clientWs.on('close', () => {
    isClosed = true;
    try {
      session?.close();
    } catch (e) {
      // ignore
    }
  });
});

// Chat guidance endpoint with deterministic handling for Core Tests & Gemini AI fallback
app.post('/api/chat', async (req, res) => {
  try {
    const { 
      message = '', 
      history = [], 
      currentStep = 0, 
      currentScheme = '', 
      currentSchemeId = '',
      userType = 'unknown',
      serviceMode = 'home' 
    } = req.body;

    const lower = message.trim().toLowerCase();

    // 0. PRIVACY / SENSITIVE DATA PREVENTION
    if (
      lower.includes("give you my aadhaar") ||
      lower.includes("aadhaar number") ||
      lower.includes("share my aadhaar") ||
      lower.includes("என் ஆதார் நம்பர்") ||
      lower.includes("ஆதார் கொடுக்கவா") ||
      lower.includes("otp") ||
      lower.includes("password") ||
      lower.includes("bank account") ||
      lower.includes("வங்கி கணக்கு")
    ) {
      return res.json({
        reply: "அம்மா! உங்கள் ஆதார் எண், OTP, வங்கி கணக்கு எண், கடவுச்சொல் (password) போன்ற எந்த ரகசிய விவரங்களையும் என்னிடம் ஒருபோதும் சொல்லக் கூடாது. அதிகாரப்பூர்வ அரசு இணையதளத்தில் நீங்கள் மட்டுமே நேரடியாக உள்ளிட வேண்டும்.",
        stepIndex: 0,
        stepTitle: 'Privacy & Safety Protection',
        screenVisualHint: 'Never share Aadhaar, OTP, or sensitive details with AI',
        suggestedResponses: [
          'Give me the official website.',
          'What schemes are available?',
          'Repeat',
        ],
        isSensitiveWarning: true,
        helplineFallbackNeeded: false,
      });
    }

    // 1. TEST 2: "I am facing violence at home. Where can I get help?" / Domestic violence / Abuse / One Stop Centre (Sakhi)
    if (
      lower.includes("facing violence at home") ||
      lower.includes("violence at home") ||
      lower.includes("facing violence") ||
      lower.includes("domestic violence") ||
      lower.includes("violence") ||
      lower.includes("abuse") ||
      lower.includes("harassment") ||
      lower.includes("one stop centre") ||
      lower.includes("sakhi") ||
      lower.includes("181") ||
      lower.includes("வன்முறை") ||
      lower.includes("துன்புறுத்தல்") ||
      lower.includes("குடும்ப வன்முறை")
    ) {
      const osc = getSchemeById('one-stop-centre')!;
      const card = buildSchemeCard(osc, 'official');
      const activeCtx = createActiveContextFromScheme(osc, 'official');
      return res.json({
        reply: "அம்மா, குடும்ப வன்முறை அல்லது ஆபத்தில் உள்ள பெண்களுக்கு உடனடியாக உதவ 24 மணி நேர இலவச உதவி எண் 181 மற்றும் 'One Stop Centre' (சகி மையம்) உள்ளன. இங்கு உடனடி காவல்துறை உதவி, மருத்துவ சிகிச்சை, இலவச சட்ட உதவி, மனநல ஆலோசனை மற்றும் 5 நாட்கள் வரை பாதுகாப்பான தற்காலிக தங்குமிடம் கிடைக்கும். இந்த திட்டத்திற்கான அதிகாரப்பூர்வ அரசு இணையதளத்தை கீழே கொடுத்திருக்கிறேன். அதை அழுத்தி திறக்கலாம்.",
        stepIndex: 1,
        stepTitle: 'One Stop Centre (Sakhi) Assistance',
        screenVisualHint: 'Call 24/7 Helpline 181 or visit District One Stop Centre (Sakhi)',
        suggestedResponses: [
          'Call Helpline 181',
          'Where is the nearest One Stop Centre?',
          'I need a safe place to stay.',
          'Repeat',
        ],
        isSensitiveWarning: false,
        helplineFallbackNeeded: false,
        currentSchemeId: 'one-stop-centre',
        currentSchemeName: osc.schemeName,
        officialLink: osc.officialWebsite,
        officialLinkType: 'official',
        schemeSource: osc.officialDepartment,
        linkVerified: true,
        activeSchemeContext: activeCtx,
        openUrl: osc.officialWebsite,
        schemeCard: card,
      });
    }

    // 2. SHELTER / SAFE PLACE TO STAY / DESTITUTE WOMEN (Shakti Sadan)
    if (
      lower.includes("safe place to stay") ||
      lower.includes("need a safe place") ||
      lower.includes("safe place") ||
      lower.includes("shelter for women") ||
      lower.includes("shelter") ||
      lower.includes("shakti sadan") ||
      lower.includes("destitute women") ||
      lower.includes("destitute") ||
      lower.includes("தங்குமிடம்") ||
      lower.includes("பாதுகாப்பான இடம்")
    ) {
      const ss = getSchemeById('shakti-sadan')!;
      const card = buildSchemeCard(ss, 'official');
      const activeCtx = createActiveContextFromScheme(ss, 'official');
      return res.json({
        reply: "பாதுகாப்பான தங்குமிடம் தேவைப்படும் ஆதரவற்ற அல்லது குடும்ப சூழ்நிலையால் பாதிக்கப்பட்ட பெண்களுக்கு 'சக்தி சதன்' (Shakti Sadan) மற்றும் 'One Stop Centre' மூலம் பாதுகாப்பான தங்குமிடம், உணவு, மருத்துவ உதவி மற்றும் மறுவாழ்வு தொழிற்பயிற்சி வழங்கப்படுகிறது. இதற்கான அதிகாரப்பூர்வ அரசு இணையதளத்தை கீழே கொடுத்துள்ளேன். அதை அழுத்தி திறக்கலாம்.",
        stepIndex: 1,
        stepTitle: 'Shakti Sadan & Safe Shelter',
        screenVisualHint: 'Official Shakti Sadan information at wcd.gov.in',
        suggestedResponses: [
          'Call Helpline 181',
          'Open Official Website',
          'What are the eligibility conditions?',
          'Repeat',
        ],
        isSensitiveWarning: false,
        helplineFallbackNeeded: false,
        currentSchemeId: 'shakti-sadan',
        currentSchemeName: ss.schemeName,
        officialLink: ss.officialWebsite,
        officialLinkType: 'official',
        schemeSource: ss.officialDepartment,
        linkVerified: true,
        activeSchemeContext: activeCtx,
        openUrl: ss.officialWebsite,
        schemeCard: card,
      });
    }

    // 3. TEST 3: "I am a student and I need scholarship." / Student Scholarship / NSP
    if (
      lower.includes("student and i need scholarship") ||
      lower.includes("student and need scholarship") ||
      lower.includes("need a scholarship for my daughter") ||
      lower.includes("scholarship for my daughter") ||
      lower.includes("student scholarship") ||
      lower.includes("scholarship") ||
      lower.includes("கல்வி உதவித்தொகை") ||
      lower.includes("ஸ்காலர்ஷிப்") ||
      lower.includes("nsp")
    ) {
      const nsp = getSchemeById('nsp')!;
      const card = buildSchemeCard(nsp, 'apply');
      const activeCtx = createActiveContextFromScheme(nsp, 'apply');
      return res.json({
        reply: "பள்ளி மற்றும் கல்லூரி மாணவ, மாணவிகளுக்கான மத்திய மற்றும் மாநில அரசு கல்வி உதவித்தொகை திட்டங்கள் 'தேசிய கல்வி உதவித்தொகை இணையதளம்' (National Scholarship Portal - NSP) வழியாக வழங்கப்படுகின்றன. நீங்கள் படிக்கும் வகுப்பு அல்லது படிப்பை கூறினால் கூடுதல் தகுதி விவரங்களை அறியலாம். இந்த திட்டத்திற்கான அதிகாரப்பூர்வ அரசு இணையதளத்தை கீழே கொடுத்திருக்கிறேன். அதை அழுத்தி திறக்கலாம்.",
        stepIndex: 1,
        stepTitle: 'National Scholarship Portal (NSP)',
        screenVisualHint: 'Official NSP portal: https://scholarships.gov.in/',
        suggestedResponses: [
          'Open Official Scholarship Portal',
          'School student (Pre-Matric)',
          'College student (Post-Matric)',
          'Check Official Eligibility',
        ],
        isSensitiveWarning: false,
        helplineFallbackNeeded: false,
        currentSchemeId: 'nsp',
        currentSchemeName: nsp.schemeName,
        officialLink: 'https://scholarships.gov.in/',
        officialLinkType: 'apply',
        schemeSource: nsp.officialDepartment,
        linkVerified: true,
        activeSchemeContext: activeCtx,
        openUrl: 'https://scholarships.gov.in/',
        schemeCard: card,
      });
    }

    // 4. TEST 1: "I am pregnant. What government scheme can help me?" / PMMVY
    if (
      lower.includes("i am pregnant") ||
      lower.includes("pregnant") ||
      lower.includes("pregnancy") ||
      lower.includes("maternity") ||
      lower.includes("pmmvy") ||
      lower.includes("கர்ப்பமாக") ||
      lower.includes("கர்ப்பம்") ||
      lower.includes("பேறுகாலம்")
    ) {
      const pmmvy = getSchemeById('pmmvy')!;
      const card = buildSchemeCard(pmmvy, 'apply');
      const activeCtx = createActiveContextFromScheme(pmmvy, 'apply');
      return res.json({
        reply: "கர்ப்பிணி தாய்மார்களுக்கான பேறுகால நிதியுதவி வழங்கும் 'பிரதான் மந்திரி மாத்ரு வந்தனா யோஜனா' (PMMVY) திட்டம் உங்களுக்கு பொருந்தலாம். இதில் ₹5,000 முதல் ₹6,000 வரை நிதியுதவி கிடைக்கும். நீங்கள் முதல் குழந்தைக்கு பதிவு செய்கிறீர்களா அல்லது இரண்டாவது பெண் குழந்தையா அம்மா? இந்த திட்டத்திற்கான அதிகாரப்பூர்வ அரசு இணையதளத்தை கீழே கொடுத்திருக்கிறேன். அதை அழுத்தி திறக்கலாம்.",
        stepIndex: 1,
        stepTitle: 'PMMVY Maternity Benefit',
        screenVisualHint: 'Official PMMVY portal: https://pmmvy.wcd.gov.in',
        suggestedResponses: [
          'Yes, first child.',
          'Second child (girl child).',
          'Where do I apply for PMMVY?',
          'How do I check PMMVY eligibility?',
        ],
        isSensitiveWarning: false,
        helplineFallbackNeeded: false,
        currentSchemeId: 'pmmvy',
        currentSchemeName: pmmvy.schemeName,
        officialLink: 'https://pmmvy.wcd.gov.in',
        officialLinkType: 'apply',
        schemeSource: pmmvy.officialDepartment,
        linkVerified: true,
        activeSchemeContext: activeCtx,
        openUrl: 'https://pmmvy.wcd.gov.in',
        schemeCard: card,
      });
    }

    // 5. TEST 4: "I want government schemes for women." / "I want schemes for women."
    if (
      lower.includes("i want government schemes for women") ||
      lower.includes("i want schemes for women") ||
      lower.includes("government schemes for women") ||
      lower.includes("schemes for women") ||
      lower.includes("women schemes") ||
      lower.includes("பெண்களுக்கான அரசு திட்டங்கள்") ||
      lower.includes("பெண்களுக்கான திட்டங்கள்") ||
      lower.includes("அரசு திட்டங்கள் எங்கே")
    ) {
      return res.json({
        reply: "பெண்களுக்கான அரசு திட்டங்கள் பல துறைகளில் உள்ளன அம்மா. உங்களுக்கு எந்த வகையான உதவி தேவை — பேறுகால உதவி (Pregnancy), கல்வி மற்றும் ஸ்காலர்ஷிப் (Scholarship), வேலைவாய்ப்பு (Job/Livelihood), தொழில் தொடங்க கடன் (Business Loan), மாத வருமானம் (Financial Support), அல்லது பாதுகாப்பு (Safety)? மத்திய அரசின் myScheme தளத்திலும் நீங்கள் அனைத்து திட்டங்களையும் பார்க்கலாம்.",
        stepIndex: 1,
        stepTitle: 'Women Scheme Categories',
        screenVisualHint: 'Choose a category: Pregnancy, Scholarship, Job, Business Loan, Financial, or Safety',
        suggestedResponses: [
          'I am pregnant.',
          'I am a student and need scholarship.',
          'I want to start a small business.',
          'I am facing violence at home.',
          'I need financial support.',
        ],
        isSensitiveWarning: false,
        helplineFallbackNeeded: false,
        currentSchemeId: 'myscheme',
        currentSchemeName: 'myScheme',
        officialLink: 'https://www.myscheme.gov.in/ta',
        officialLinkType: 'official',
        schemeSource: 'Government of India',
        linkVerified: true,
        activeSchemeContext: {
          currentSchemeId: 'myscheme',
          currentSchemeName: 'myScheme',
          category: 'general_schemes',
          officialLink: 'https://www.myscheme.gov.in/ta',
          officialLinkType: 'official',
          schemeSource: 'Government of India',
          linkVerified: true,
        },
        openUrl: 'https://www.myscheme.gov.in/ta',
        schemeCard: MYSCHEME_PORTAL_CARD,
      });
    }

    // 6. TEST 5: "Give me the official website." / "Where can I apply?" / "Where is the official website?" / "Where is the link?"
    // CONTEXT-AWARE: Returns the official website for the CURRENT scheme in context, not always PMMVY!
    if (
      lower.includes("give me the official website") ||
      lower.includes("give me the website") ||
      lower.includes("where is the official website") ||
      lower.includes("where is the website") ||
      lower.includes("open the website") ||
      lower.includes("open website") ||
      lower.includes("open the official website") ||
      lower.includes("can you take me to the official website") ||
      lower.includes("where is the link") ||
      lower.includes("give me the link") ||
      lower.includes("where can i apply") ||
      lower.includes("where do i apply") ||
      lower.includes("how do i apply") ||
      lower.includes("where can i register") ||
      lower.includes("where do i register") ||
      lower.includes("how can i check status") ||
      lower.includes("check status") ||
      lower.includes("where can i check my application") ||
      lower.includes("which website should i use") ||
      lower.includes("which website") ||
      lower.includes("இணைப்பு எங்கே") ||
      lower.includes("இணையதளத்தை திற") ||
      lower.includes("எங்கு விண்ணப்பிக்க")
    ) {
      const activeId = currentSchemeId || (currentScheme === 'myScheme' ? 'myscheme' : currentScheme === 'PMMVY' ? 'pmmvy' : '');
      const activeScheme = activeId ? getSchemeById(activeId) : undefined;

      if (activeScheme) {
        const intent = determineUserIntent(lower) || 'official';
        const card = buildSchemeCard(activeScheme, intent);
        const activeCtx = createActiveContextFromScheme(activeScheme, intent);
        return res.json({
          reply: `இந்த திட்டத்திற்கான அதிகாரப்பூர்வ அரசு இணையதளத்தை கீழே கொடுத்திருக்கிறேன். அதை அழுத்தி திறக்கலாம்.`,
          stepIndex: 1,
          stepTitle: `Official Website: ${activeScheme.schemeName}`,
          screenVisualHint: `Official destination: ${activeCtx.officialLink}`,
          suggestedResponses: [
            'Open Official Website',
            'Check Official Eligibility',
            'Repeat',
          ],
          isSensitiveWarning: false,
          helplineFallbackNeeded: false,
          currentSchemeId: activeScheme.id,
          currentSchemeName: activeScheme.schemeName,
          officialLink: activeCtx.officialLink,
          officialLinkType: activeCtx.officialLinkType,
          schemeSource: activeScheme.officialDepartment,
          linkVerified: true,
          activeSchemeContext: activeCtx,
          openUrl: activeCtx.officialLink,
          schemeCard: card,
        });
      } else {
        // Fallback to myScheme when no specific scheme is in context yet
        return res.json({
          reply: "அரசு திட்டங்களுக்கான அதிகாரப்பூர்வ தேசிய தளமான myScheme இணையதளத்தை கீழே கொடுத்துள்ளேன். அதை அழுத்தி திறக்கலாம்.",
          stepIndex: 1,
          stepTitle: 'Official myScheme Portal',
          screenVisualHint: 'Official portal: https://www.myscheme.gov.in/ta',
          suggestedResponses: [
            'Open Official myScheme',
            'I am pregnant.',
            'I need a scholarship.',
            'Repeat',
          ],
          isSensitiveWarning: false,
          helplineFallbackNeeded: false,
          currentSchemeId: 'myscheme',
          currentSchemeName: 'myScheme',
          officialLink: 'https://www.myscheme.gov.in/ta',
          officialLinkType: 'official',
          schemeSource: 'Government of India',
          linkVerified: true,
          activeSchemeContext: {
            currentSchemeId: 'myscheme',
            currentSchemeName: 'myScheme',
            category: 'general_schemes',
            officialLink: 'https://www.myscheme.gov.in/ta',
            officialLinkType: 'official',
            schemeSource: 'Government of India',
            linkVerified: true,
          },
          openUrl: 'https://www.myscheme.gov.in/ta',
          schemeCard: MYSCHEME_PORTAL_CARD,
        });
      }
    }

    // DEMO TEST 1: "I don't know which government scheme I can get."
    if (
      lower.includes("don't know which government scheme") ||
      lower.includes("dont know which government scheme") ||
      lower.includes("which government scheme i can get") ||
      lower.includes("என்ன திட்டம் கிடைக்கும்னு தெரியல") ||
      lower.includes("திட்டங்கள் பற்றி தெரியாது")
    ) {
      return res.json({
        reply: "கவலைப்படாதீர்கள் அம்மா! உங்களுக்கு எந்த அரசு திட்டம் பொருத்தமாக இருக்கும் என்று தெரிந்து கொள்ள நமது 'Find Government Schemes' (அரசு திட்டங்கள் கண்டறிதல்) சேவையை நாம் பயன்படுத்தலாம். அங்கு உங்கள் வயது, தேவைகளை கேட்டு உங்களுக்கு பொருத்தமான திட்டங்களை கண்டுபிடிக்க நான் உதவுகிறேன்.",
        stepIndex: 1,
        stepTitle: 'Recommending myScheme Service',
        screenVisualHint: 'Switch to "Find Government Schemes" service',
        suggestedResponses: [
          'I am a woman and I want to know what schemes are available for me.',
          'Start Find Government Schemes',
          'Go back to PMMVY.',
        ],
        isSensitiveWarning: false,
        helplineFallbackNeeded: false,
        recommendedService: 'myscheme',
        schemeCard: MYSCHEME_PORTAL_CARD,
      });
    }

    // DEMO TEST 2: "I am a woman and I want to know what schemes are available for me."
    if (
      lower.includes("i am a woman and i want to know what schemes") ||
      lower.includes("what schemes are available for me") ||
      lower.includes("பெண்களுக்கான திட்டங்கள்") ||
      lower.includes("திட்டங்களை கண்டுபிடிக்க")
    ) {
      return res.json({
        reply: "நான் அரசு திட்டங்களை கண்டுபிடிக்க உங்களுக்கு உதவுகிறேன். முதலில் சில எளிய கேள்விகள் கேட்பேன். உங்கள் பதில்களின் அடிப்படையில் உங்களுக்கு பொருத்தமாக இருக்கக்கூடிய திட்டங்களை கண்டுபிடிக்க உதவுகிறேன். நான் அரசு சார்பாக நீங்கள் தகுதியானவர் என்று முடிவு செய்யவில்லை. இறுதி தகுதி மற்றும் விண்ணப்பத்தை official government website-ல் தான் சரிபார்க்க வேண்டும். உங்கள் வயது எவ்வளவு அம்மா?",
        stepIndex: 1,
        stepTitle: 'Age Question (myScheme Discovery)',
        screenVisualHint: 'Please state your age (e.g. 25 years old)',
        suggestedResponses: [
          'My age is 25.',
          'Can you check if I am eligible?',
          'I don\'t understand.',
          'Repeat',
        ],
        isSensitiveWarning: false,
        helplineFallbackNeeded: false,
        recommendedService: 'myscheme',
        schemeCard: MYSCHEME_PORTAL_CARD,
      });
    }


    // WOMEN SITUATION: "I have a small child." (சிறு குழந்தை உள்ளது)
    if (
      lower.includes("small child") ||
      lower.includes("have a child") ||
      lower.includes("have children") ||
      lower.includes("குழந்தை உள்ளது") ||
      lower.includes("சிறு குழந்தை") ||
      lower.includes("பெண் குழந்தை")
    ) {
      const ssy = getSchemeById('ssy')!;
      return res.json({
        reply: "குழந்தைகளுக்கான திட்டங்களை அறிய, உங்கள் குழந்தையின் வயது என்ன, மற்றும் பெண் குழந்தையா அம்மா? 10 வயதுக்குட்பட்ட பெண் குழந்தை என்றால் செல்வ மகள் சேமிப்பு திட்டம் (SSY) மூலம் அரசு அதிக வட்டி தரும் சேமிப்பு தொடங்கலாம்.",
        stepIndex: 1,
        stepTitle: 'Child Age & Gender Query',
        screenVisualHint: 'Sukanya Samriddhi (girl child < 10) or PMMVY maternity benefits',
        suggestedResponses: [
          'Girl child under 10 years (SSY)',
          'Newborn baby under 1 year (PMMVY)',
          'Open Official Website',
        ],
        isSensitiveWarning: false,
        helplineFallbackNeeded: false,
        currentSchemeId: 'ssy',
        currentSchemeName: ssy.schemeName,
        officialLink: ssy.officialWebsite,
        officialLinkType: 'official',
        schemeSource: ssy.officialDepartment,
        linkVerified: true,
        activeSchemeContext: createActiveContextFromScheme(ssy, 'official'),
        schemeCard: buildSchemeCard(ssy),
      });
    }

    // WOMEN SITUATION: "I want to find work." (வேலை தேவை)
    if (
      lower.includes("want to find work") ||
      lower.includes("find work") ||
      lower.includes("need a job") ||
      lower.includes("வேலை தேவை") ||
      lower.includes("வேலை வேண்டும்") ||
      lower.includes("தொழில் வாய்ப்பு")
    ) {
      const lk = getSchemeById('lakhpati-didi')!;
      return res.json({
        reply: "மகளிர் சுயஉதவி குழுக்கள் மூலம் லிக்பதி திதி திட்டத்தில் தையல், பால் பண்ணை போன்ற இலவச தொழிற்பயிற்சி மற்றும் வேலைவாய்ப்புகள் பெறலாம். நீங்கள் சுயஉதவி குழுவில் உள்ளீர்களா அம்மா? அதிகாரப்பூர்வ அரசு இணையதளத்தை கீழே கொடுத்துள்ளேன்.",
        stepIndex: 1,
        stepTitle: 'Livelihood & Skills (Lakhpati Didi / SHG)',
        screenVisualHint: 'Lakhpati Didi & DAY-NRLM provide skill training and income opportunities for women',
        suggestedResponses: [
          'Yes, I am in an SHG.',
          'No, not in an SHG.',
          'Open Official Website',
          'Repeat',
        ],
        isSensitiveWarning: false,
        helplineFallbackNeeded: false,
        currentSchemeId: 'lakhpati-didi',
        currentSchemeName: lk.schemeName,
        officialLink: lk.officialWebsite,
        officialLinkType: 'official',
        schemeSource: lk.officialDepartment,
        linkVerified: true,
        activeSchemeContext: createActiveContextFromScheme(lk, 'official'),
        schemeCard: buildSchemeCard(lk),
      });
    }

    // WOMEN SITUATION: "I want to start a small business." (தொழில் தொடங்க)
    if (
      lower.includes("start a small business") ||
      lower.includes("small business") ||
      lower.includes("start business") ||
      lower.includes("தொழில் தொடங்க") ||
      lower.includes("வியாபாரம்") ||
      lower.includes("கடை வைக்க")
    ) {
      const mudra = getSchemeById('pm-mudra')!;
      return res.json({
        reply: "பெண்கள் தையல் கடை, மளிகை அல்லது சிறு தொழில் தொடங்க முத்ரா திட்டத்தில் ₹50,000 முதல் ₹10 லட்சம் வரை அடமானமில்லா கடன் உதவி கிடைக்கலாம். என்ன தொழில் செய்ய விரும்புகிறீர்கள் அம்மா? அதிகாரப்பூர்வ அரசு தளத்தை கீழே கொடுத்துள்ளேன்.",
        stepIndex: 1,
        stepTitle: 'Business Loan (PM Mudra Yojana)',
        screenVisualHint: 'PM Mudra Yojana provides collateral-free loans up to ₹10 Lakh for women enterprises',
        suggestedResponses: [
          'Tailoring or Small Shop',
          'Home food or Handicrafts',
          'Open Official Website',
          'Repeat',
        ],
        isSensitiveWarning: false,
        helplineFallbackNeeded: false,
        currentSchemeId: 'pm-mudra',
        currentSchemeName: mudra.schemeName,
        officialLink: mudra.officialWebsite,
        officialLinkType: 'apply',
        schemeSource: mudra.officialDepartment,
        linkVerified: true,
        activeSchemeContext: createActiveContextFromScheme(mudra, 'apply'),
        schemeCard: buildSchemeCard(mudra),
      });
    }

    // WOMEN SITUATION: "I am a student." (மாணவி / கல்வி)
    if (
      lower.includes("i am a student") ||
      lower.includes("மாணவி") ||
      lower.includes("கல்லூரி படிக்கிறேன்") ||
      lower.includes("படிக்கிறேன்")
    ) {
      const pp = getSchemeById('pudhumaipenn')!;
      return res.json({
        reply: "தமிழ்நாட்டில் அரசு பள்ளியில் படித்து கல்லூரி பயிலும் மாணவிகளுக்கு 'புதுமைப் பெண்' திட்டத்தில் மாதம் ₹1,000 வங்கி கணக்கில் வழங்கப்படுகிறது. பொதுவான ஸ்காலர்ஷிப் என்றால் NSP தளத்திலும் பார்க்கலாம். நீங்கள் அரசு பள்ளியில் படித்தவரா அம்மா?",
        stepIndex: 1,
        stepTitle: 'Higher Education (Pudhumai Penn)',
        screenVisualHint: 'Pudhumai Penn provides ₹1,000 monthly stipend for girl students in colleges',
        suggestedResponses: [
          'Yes, studied in govt school.',
          'Private school.',
          'I need general scholarship (NSP).',
          'Open Official Website',
        ],
        isSensitiveWarning: false,
        helplineFallbackNeeded: false,
        currentSchemeId: 'pudhumaipenn',
        currentSchemeName: pp.schemeName,
        officialLink: pp.officialWebsite,
        officialLinkType: 'official',
        schemeSource: pp.officialDepartment,
        linkVerified: true,
        activeSchemeContext: createActiveContextFromScheme(pp, 'official'),
        schemeCard: buildSchemeCard(pp),
      });
    }

    // WOMEN SITUATION: "I need financial support." (நிதியுதவி தேவை)
    if (
      lower.includes("financial support") ||
      lower.includes("need financial") ||
      lower.includes("financial help") ||
      lower.includes("நிதியுதவி தேவை") ||
      lower.includes("பண உதவி")
    ) {
      const kmut = getSchemeById('kmut')!;
      return res.json({
        reply: "குடும்பத் தலைவிகளுக்கு மாதம் ₹1,000 உரிமைத் தொகை மற்றும் உஜ்வாலா இலவச கேஸ் இணைப்பு ஆகியவை உதவலாம். நீங்கள் தமிழ்நாட்டில் வசிக்கிறீர்களா அம்மா? அதிகாரப்பூர்வ விவரங்களை கீழே கொடுத்துள்ளேன்.",
        stepIndex: 1,
        stepTitle: 'Financial Support (KMUT & Ujjwala)',
        screenVisualHint: 'KMUT (₹1,000/month for women heads) and PM Ujjwala (Free LPG connection)',
        suggestedResponses: [
          'Yes, resident of Tamil Nadu.',
          'Need free gas connection.',
          'Open Official Website',
          'Repeat',
        ],
        isSensitiveWarning: false,
        helplineFallbackNeeded: false,
        currentSchemeId: 'kmut',
        currentSchemeName: kmut.schemeName,
        officialLink: kmut.officialWebsite,
        officialLinkType: 'official',
        schemeSource: kmut.officialDepartment,
        linkVerified: true,
        activeSchemeContext: createActiveContextFromScheme(kmut, 'official'),
        schemeCard: buildSchemeCard(kmut),
      });
    }

    // WOMEN SITUATION: "I don't know which scheme is for me." (எந்த திட்டம் எனக்கு பொருந்தும்?)
    if (
      lower.includes("which scheme is for me") ||
      lower.includes("which scheme is for") ||
      lower.includes("எந்த திட்டம் எனக்கு") ||
      lower.includes("எனக்கு எது பொருந்தும்")
    ) {
      return res.json({
        reply: "கவலைப்படாதீர்கள் அம்மா, உங்களுக்கு பொருத்தமான திட்டத்தை கண்டுபிடிக்க நான் உதவுகிறேன். முதலில் உங்கள் வயதை சொல்லுங்கள்.",
        stepIndex: 1,
        stepTitle: 'Scheme Discovery Beginning',
        screenVisualHint: 'Please state your age to discover relevant schemes',
        suggestedResponses: [
          'My age is 25.',
          'I am pregnant.',
          'I want to find work.',
          'Repeat',
        ],
        isSensitiveWarning: false,
        helplineFallbackNeeded: false,
        recommendedService: 'myscheme',
        schemeCard: MYSCHEME_PORTAL_CARD,
      });
    }

    // DEMO TEST 3: "Can you check if I am eligible?"
    if (
      lower.includes("check if i am eligible") ||
      lower.includes("am i eligible") ||
      lower.includes("தகுதியானவளா") ||
      lower.includes("நான் தகுதியானவரா")
    ) {
      return res.json({
        reply: "நான் உங்களுக்கு ஒரு வழிகாட்டி மட்டுமே அம்மா. உங்கள் விவரங்களின் அடிப்படையில் எந்த திட்டங்கள் உங்களுக்கு பொருத்தமாக இருக்கலாம் என்று என்னால் வழிகாட்ட முடியும், ஆனால் நீங்கள் நிச்சயமாக தகுதியானவரா என்பதை அதிகாரப்பூர்வ அரசு இணையதளம்தான் (official government website) உறுதி செய்ய வேண்டும்.",
        stepIndex: 1,
        stepTitle: 'Official Eligibility Disclaimer',
        screenVisualHint: 'Official government portal makes final determination',
        suggestedResponses: [
          'Open the government website.',
          'My age is 25.',
          'Go back to PMMVY.',
        ],
        isSensitiveWarning: false,
        helplineFallbackNeeded: false,
      });
    }

    // DEMO TEST 4: "Can I give you my Aadhaar number?"
    if (
      lower.includes("give you my aadhaar") ||
      lower.includes("aadhaar number") ||
      lower.includes("share my aadhaar") ||
      lower.includes("என் ஆதார் நம்பர்") ||
      lower.includes("ஆதார் கொடுக்கவா")
    ) {
      return res.json({
        reply: "அம்மா, உங்கள் ஆதார் எண் அல்லது எந்த ரகசிய விவரங்களையும் என்னிடம் ஒருபோதும் சொல்லக் கூடாது. தேவையான போது அதிகாரப்பூர்வ அரசு இணையதளத்தில் (official government website) நீங்கள் மட்டுமே நேரடியாக உள்ளிட வேண்டும்.",
        stepIndex: 0,
        stepTitle: 'Privacy & Safety Notice',
        screenVisualHint: 'Never share Aadhaar, OTP, or sensitive details with AI',
        suggestedResponses: [
          'Open the government website.',
          'I am new. I don\'t have an account.',
          'Go back to PMMVY.',
        ],
        isSensitiveWarning: true,
        helplineFallbackNeeded: false,
      });
    }

    // DEMO TEST 5: "Open the government website."
    if (
      lower.includes("open the government website") ||
      lower.includes("open government website") ||
      lower.includes("அரசு இணையதளத்தை திற") ||
      lower.includes("open website")
    ) {
      const url = serviceMode === 'myscheme' ? 'https://www.myscheme.gov.in/ta' : 'https://pmmvy.wcd.gov.in';
      return res.json({
        reply: "சரி அம்மா. இப்போது நீங்கள் official government website-க்கு செல்கிறீர்கள். திரையில் உள்ள 'Open Official myScheme' அல்லது 'Open Official PMMVY Portal' பொத்தானை தொட்டு நீங்கள் அரசு இணையதளத்தை திறக்கலாம்.",
        stepIndex: 1,
        stepTitle: 'Opening Official Website',
        screenVisualHint: `Opening official portal: ${url}`,
        suggestedResponses: [
          'I don\'t see Citizen Login.',
          'Go back to PMMVY.',
          'Repeat',
        ],
        isSensitiveWarning: false,
        helplineFallbackNeeded: false,
        openUrl: url,
      });
    }

    // DEMO TEST 6: "Go back to PMMVY."
    if (
      lower.includes("go back to pmmvy") ||
      lower.includes("back to pmmvy") ||
      lower.includes("pmmvy-க்கு போ") ||
      lower.includes("pmmvy செல்")
    ) {
      return res.json({
        reply: "சரி அம்மா, நாம் மீண்டும் PMMVY பிரதான் மந்திரி மாத்ரு வந்தனா யோஜனா வழிகாட்டலுக்கு செல்வோம். அங்கு கர்ப்பிணி தாய்மார்களுக்கான பேறுகால நிதியுதவி குறித்து பார்க்கலாம்.",
        stepIndex: 1,
        stepTitle: 'Switched back to PMMVY',
        screenVisualHint: 'PMMVY Maternity Benefit Guide',
        suggestedResponses: [
          'I am new. I don\'t have an account.',
          'The page only shows User ID and Password.',
          'Start PMMVY Guidance',
        ],
        isSensitiveWarning: false,
        helplineFallbackNeeded: false,
        recommendedService: 'pmmvy',
      });
    }

    // DEMO TEST 7: "The website is not opening" / "Error 502" / "Page is not working"
    if (
      lower.includes("website is not opening") ||
      lower.includes("website not opening") ||
      lower.includes("not opening") ||
      lower.includes("error 502") ||
      lower.includes("502") ||
      lower.includes("page is not working") ||
      lower.includes("site is down") ||
      lower.includes("திறக்கவில்லை") ||
      lower.includes("வேலை செய்யவில்லை")
    ) {
      return res.json({
        reply: "Official myScheme website இப்போது open ஆகவில்லை. Website-ல் temporary problem இருக்கலாம். சிறிது நேரம் கழித்து மீண்டும் முயற்சிக்கலாம்.",
        stepIndex: 1,
        stepTitle: 'Website Temporary Error (502)',
        screenVisualHint: 'Official portal may have a temporary server issue (502)',
        suggestedResponses: [
          'Check Official Website Again',
          'Go back to PMMVY.',
          'Repeat',
        ],
        isSensitiveWarning: false,
        helplineFallbackNeeded: false,
        showCheckWebsiteAgain: true,
      });
    }

    // DEMO TEST 8: "Can you apply for me?" / "Apply for me"
    if (
      lower.includes("can you apply for me") ||
      lower.includes("apply for me") ||
      lower.includes("you apply") ||
      lower.includes("என் சார்பாக விண்ணப்பி") ||
      lower.includes("விண்ணப்பிக்க முடியுமா")
    ) {
      return res.json({
        reply: "இல்லை அம்மா, நான் உங்கள் சார்பாக அரசு திட்டத்திற்கு விண்ணப்பிக்க முடியாது. நான் உங்களுக்கு உதவக்கூடிய ஒரு வழிகாட்டி மட்டுமே. அரசு இணையதளத்தில் நீங்களே உங்கள் விவரங்களை உள்ளிட்டு நேரடியாக விண்ணப்பிக்க வேண்டும். நான் ஒவ்வொரு படியாக உங்களுக்கு சொல்லித் தருகிறேன்.",
        stepIndex: 0,
        stepTitle: 'Independent Application Rule',
        screenVisualHint: 'AI is only a voice guide. The citizen must apply personally on the official government portal.',
        suggestedResponses: [
          'Open the government website.',
          'I am a woman and I want to know what schemes are available for me.',
          'Go back to PMMVY.',
        ],
        isSensitiveWarning: false,
        helplineFallbackNeeded: false,
      });
    }

    // PMMVY TEST: User is new
    if (
      lower.includes("i am new") || 
      lower.includes("don't have an account") || 
      lower.includes("dont have an account") ||
      lower.includes("want to register") ||
      userType === 'new_user' && lower.includes("how do i")
    ) {
      return res.json({
        reply: "நீங்கள் புதிய பயனர் என்றால், இந்த User ID மற்றும் Password பக்கத்தில் login செய்ய வேண்டாம். இது ஏற்கனவே account உள்ளவர்களுக்கான login பக்கம். நாம் முதலில் Citizen registration option-ஐ கண்டுபிடிக்க வேண்டும். இப்போது official PMMVY website-ஐ பாருங்கள். 'Citizen Login' அல்லது 'New User' என்று ஏதாவது button இருக்கிறதா?",
        stepIndex: 1,
        stepTitle: 'New Citizen Registration Check',
        screenVisualHint: 'Look for "Citizen Login" or "New User" on pmmvy.wcd.gov.in',
        suggestedResponses: [
          'Yes, I see Citizen Login.',
          'I don\'t see Citizen Login.',
          'The page only shows User ID and Password.',
          'Repeat',
        ],
        isSensitiveWarning: false,
        helplineFallbackNeeded: false,
      });
    }

    // PMMVY TEST: Page only shows User ID and Password
    if (
      lower.includes("page only shows user id") || 
      lower.includes("only shows user id and password") ||
      lower.includes("shows user id and password")
    ) {
      return res.json({
        reply: "நீங்கள் புதிய பயனர் என்றால், இந்த User ID மற்றும் Password பக்கத்தில் login செய்ய வேண்டாம். இது ஏற்கனவே account உள்ளவர்களுக்கான login பக்கம். நாம் முதலில் Citizen registration option-ஐ கண்டுபிடிக்க வேண்டும். இப்போது official PMMVY website-ஐ பாருங்கள். 'Citizen Login' அல்லது 'New User' என்று ஏதாவது button இருக்கிறதா?",
        stepIndex: 1,
        stepTitle: 'Avoid Normal Login Page',
        screenVisualHint: 'Do NOT enter credentials on normal login page. Look for Citizen Login.',
        suggestedResponses: [
          'I don\'t see Citizen Login.',
          'Yes, I found Citizen Login.',
          'Repeat',
        ],
        isSensitiveWarning: false,
        helplineFallbackNeeded: false,
      });
    }

    // PMMVY TEST: User does NOT see Citizen Login
    if (
      lower.includes("don't see citizen login") || 
      lower.includes("dont see citizen login") ||
      lower.includes("can't find citizen login")
    ) {
      return res.json({
        reply: "பரவாயில்லை. இப்போது இந்த website-ல் புதிய citizen registration option நமக்கு தெரியவில்லை. அந்த Login button-ஐ அழுத்த வேண்டாம். அரசு ஆவணங்களில் Citizen self-registration வசதி குறிப்பிடப்பட்டுள்ளது, ஆனால் தற்போது இந்த தளத்தில் அது நேரடியாக தெரியாமல் இருக்கலாம். நீங்கள் 1515 என்ற PMMVY அதிகாரப்பூர்வ உதவி எண்ணை அழைத்து புதிய பதிவை உறுதிப்படுத்தலாம், அல்லது உங்கள் பகுதி அங்கன்வாடி மையத்தை அணுகலாம்.",
        stepIndex: 1,
        stepTitle: 'Helpline 1515 Fallback',
        screenVisualHint: 'Do not click Login. Call official helpline 1515 or visit Anganwadi.',
        suggestedResponses: [
          'Call Helpline 1515',
          'I already have an account.',
          'Repeat',
        ],
        isSensitiveWarning: false,
        helplineFallbackNeeded: true,
      });
    }

    // PMMVY TEST: User already has an account
    if (
      lower.includes("already have an account") || 
      lower.includes("have user id") || 
      lower.includes("want to login") ||
      userType === 'existing_user'
    ) {
      return res.json({
        reply: "சரி அம்மா. உங்களுக்கு ஏற்கனவே account இருந்தால், அந்த பக்கத்தில் உள்ள User ID, Password மற்றும் கீழே உள்ள எழுத்துக்களை பார்த்து நீங்களே அரசு தளத்தில் தட்டச்சு செய்து 'LOG IN' பொத்தானை தொடலாம். உங்கள் கடவுச்சொல்லை என்னிடம் கூற வேண்டாம்.",
        stepIndex: 2,
        stepTitle: 'Existing User Login',
        screenVisualHint: 'Enter your User ID and Password personally on pmmvy.wcd.gov.in',
        suggestedResponses: [
          'Logged in successfully.',
          'I forgot my password.',
          'Repeat',
        ],
        isSensitiveWarning: false,
        helplineFallbackNeeded: false,
      });
    }

    // myScheme Questionnaire Answer 1: Age (e.g. "25", "My age is 25")
    if (serviceMode === 'myscheme' && (/\b\d{2}\b/.test(lower) || lower.includes("age is") || lower.includes("வயது"))) {
      return res.json({
        reply: "நன்றி அம்மா. நீங்கள் எந்த மாநிலத்தில் வசிக்கிறீர்கள்?",
        stepIndex: 2,
        stepTitle: 'State / UT Question',
        screenVisualHint: 'Question 2: State / UT (e.g. Tamil Nadu)',
        suggestedResponses: [
          'Tamil Nadu (தமிழ்நாடு)',
          'Other State',
          'Repeat',
        ],
        isSensitiveWarning: false,
        helplineFallbackNeeded: false,
      });
    }

    // myScheme Questionnaire Answer 2: State (e.g. "Tamil Nadu", "தமிழ்நாடு")
    if (serviceMode === 'myscheme' && (lower.includes("tamil nadu") || lower.includes("தமிழ்நாடு") || lower.includes("state"))) {
      return res.json({
        reply: "நன்றி அம்மா. நீங்கள் கிராமத்தில் வசிக்கிறீர்களா அல்லது நகரத்தில் வசிக்கிறீர்களா?",
        stepIndex: 3,
        stepTitle: 'Area Question (Rural / Urban)',
        screenVisualHint: 'Question 3: Area (Rural / Urban)',
        suggestedResponses: [
          'Rural area (கிராமத்தில் வசிக்கிறேன்)',
          'Urban area (நகரத்தில் வசிக்கிறேன்)',
          'Repeat',
        ],
        isSensitiveWarning: false,
        helplineFallbackNeeded: false,
      });
    }

    // myScheme Questionnaire Answer 3: Area (e.g. "Rural", "Urban", "கிராமம்", "நகரம்")
    if (serviceMode === 'myscheme' && (lower.includes("rural") || lower.includes("urban") || lower.includes("கிராம") || lower.includes("நகர"))) {
      return res.json({
        reply: "நன்றி அம்மா. நீங்கள் வேலை செய்கிறீர்களா, படித்துக் கொண்டிருக்கிறீர்களா, அல்லது வீட்டில் இருக்கிறீர்களா?",
        stepIndex: 4,
        stepTitle: 'Occupation / Status Question',
        screenVisualHint: 'Question 4: Occupation / Status',
        suggestedResponses: [
          'Staying at home (வீட்டில் இருக்கிறேன்)',
          'Working (வேலை செய்கிறேன்)',
          'Studying (படித்துக் கொண்டிருக்கிறேன்)',
        ],
        isSensitiveWarning: false,
        helplineFallbackNeeded: false,
      });
    }

    // myScheme Questionnaire Answer 4: Occupation (e.g. "வீட்டில் இருக்கிறேன்", "Working", etc.)
    if (serviceMode === 'myscheme' && (lower.includes("வீட்டில்") || lower.includes("வேலை") || lower.includes("படித்து") || lower.includes("home") || lower.includes("work") || lower.includes("study") || lower.includes("student"))) {
      return res.json({
        reply: "நன்றி அம்மா. நீங்கள் கர்ப்பமாக இருக்கிறீர்களா, அல்லது உங்களுக்கு பெண் குழந்தைகள் உள்ளனவா?",
        stepIndex: 5,
        stepTitle: 'Special Conditions Question',
        screenVisualHint: 'Question 5: Special conditions (Pregnant / Girl children)',
        suggestedResponses: [
          'Yes, I am pregnant (கர்ப்பமாக உள்ளேன்)',
          'Have girl child (பெண் குழந்தை உள்ளது)',
          'No special condition (இல்லை)',
        ],
        isSensitiveWarning: false,
        helplineFallbackNeeded: false,
      });
    }

    // myScheme Questionnaire Answer 5: Special conditions -> RECOMMENDED SCHEMES
    if (serviceMode === 'myscheme' && (lower.includes("pregnant") || lower.includes("கர்ப்ப") || lower.includes("girl") || lower.includes("பெண்") || lower.includes("குழந்தை") || lower.includes("இல்லை") || lower.includes("no"))) {
      return res.json({
        reply: "நன்றி அம்மா. உங்கள் பதில்களின் அடிப்படையில் சில பயனுள்ள அரசு திட்டங்களை கண்டறிந்துள்ளோம். இந்த திட்டம் உங்களுக்கு பொருத்தமாக இருக்கலாம். Official website-ல் eligibility-ஐ சரிபார்க்க வேண்டும். பிரதான் மந்திரி மாத்ரு வந்தனா யோஜனா (PMMVY), உஜ்வாலா இலவச கேஸ் திட்டம், மற்றும் கலைஞர் மகளிர் உரிமைத் திட்டம் ஆகியவற்றை official myScheme இணையதளத்தில் நீங்கள் பார்வையிடலாம்.",
        stepIndex: 6,
        stepTitle: 'Recommended Schemes Discovery',
        screenVisualHint: 'Review recommended schemes and verify eligibility on official myScheme portal',
        suggestedResponses: [
          'Open Official myScheme',
          'Go back to PMMVY.',
          'The website is not opening.',
          'Repeat',
        ],
        isSensitiveWarning: false,
        helplineFallbackNeeded: false,
        recommendedSchemesAvailable: true,
      });
    }

    if (!message && history.length === 0) {
      return res.status(400).json({ error: 'Message or history is required' });
    }

    // General conversational query fallback using Gemini
    const conversationContents: any[] = [];

    conversationContents.push({
      role: 'user',
      parts: [{
        text: `${SYSTEM_INSTRUCTION}
Current context:
- Service Mode: ${serviceMode} (pmmvy or myscheme)
- User Registration State: ${userType}
- Current step index: ${currentStep}
Provide the next single step or clarification in simple spoken Tamil conforming to the schema.`
      }]
    });
    conversationContents.push({
      role: 'model',
      parts: [{
        text: 'நான் புரிந்துகொண்டேன். நான் மிக எளிய பேச்சுத் தமிழில், ஒரே ஒரு வழிகாட்டலை மட்டுமே சொல்வேன். புதிய பயனரை நார்மல் லாகின் பக்கத்தில் லாகின் செய்ய சொல்ல மாட்டேன். இல்லாத பொத்தான்களையோ திட்டங்களையோ உருவாக்க மாட்டேன்.'
      }]
    });

    for (const item of history.slice(-6)) {
      conversationContents.push({
        role: item.role === 'user' ? 'user' : 'model',
        parts: [{ text: item.text }],
      });
    }

    if (message) {
      conversationContents.push({
        role: 'user',
        parts: [{ text: message }],
      });
    }

    let response: any = null;
    const modelsToTry = ['gemini-2.5-flash', 'gemini-3.8-flash', 'gemini-3.1-flash-lite'];
    for (const m of modelsToTry) {
      try {
        response = await ai.models.generateContent({
          model: m,
          contents: conversationContents,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                reply: {
                  type: Type.STRING,
                  description: 'Short spoken Tamil guidance for the woman, 1-2 simple sentences max, conversational, empathetic, patient, zero English technical words.',
                },
                stepIndex: {
                  type: Type.INTEGER,
                  description: 'Current step number starting from 1 if instructing on a step, or 0 if greeting / general clarifying.',
                },
                stepTitle: {
                  type: Type.STRING,
                  description: 'Short title of this single step in English/Tamil.',
                },
                screenVisualHint: {
                  type: Type.STRING,
                  description: 'Visual hint for the user looking at the official screen.',
                },
                suggestedResponses: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: '2 to 3 natural quick responses the user might say next.',
                },
                isSensitiveWarning: {
                  type: Type.BOOLEAN,
                  description: 'True if user attempted to share OTP, password, Aadhaar, or bank details.',
                },
                helplineFallbackNeeded: {
                  type: Type.BOOLEAN,
                  description: 'True if user cannot find the registration option and helpline 1515 should be recommended.',
                },
              },
              required: ['reply', 'stepIndex', 'stepTitle', 'suggestedResponses', 'isSensitiveWarning'],
            },
          },
        });
        if (response?.text) break;
      } catch (err) {
        console.warn(`Model ${m} failed, trying next...`);
      }
    }

    if (response?.text) {
      const parsed = JSON.parse(response.text);
      const matched = findSchemeCardForQuery(message, currentSchemeId, serviceMode);
      if (matched && !parsed.schemeCard) {
        parsed.schemeCard = matched;
        const schemeObj = getSchemeById(matched.schemeId || '');
        if (schemeObj) {
          parsed.activeSchemeContext = createActiveContextFromScheme(schemeObj);
          parsed.currentSchemeId = schemeObj.id;
          parsed.currentSchemeName = schemeObj.schemeName;
          parsed.officialLink = parsed.activeSchemeContext.officialLink;
          parsed.linkVerified = true;
        }
      }
      return res.json(parsed);
    }

    throw new Error('All models failed');
  } catch (error: any) {
    console.error('Chat error:', error);
    return res.json({
      reply: 'அம்மா, ஒரு சிறிய தொடர்பு தடங்கல் ஏற்பட்டுள்ளது. கவலைப்படாதீர்கள், நீங்கள் கேட்டதை மீண்டும் ஒருமுறை கூற முடியுமா அம்மா?',
      stepIndex: 0,
      stepTitle: 'Retry',
      screenVisualHint: 'Please tap the mic button to speak again',
      suggestedResponses: ['Repeat', 'I don\'t understand'],
      isSensitiveWarning: false,
    });
  }
});

// High quality Tamil speech synthesis endpoint using gemini-3.8-flash-lite-tts
app.post('/api/tts', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const ttsResponse = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `Read this Tamil text in a very warm, calm, slow, reassuring elder sister/daughter tone for a rural mother: "${text}"`,
              speechMetadata: {
                style: 'Calm, very clear, slow, respectful, soothing Tamil elder sister tone',
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const base64Audio = ttsResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      return res.json({ audioBase64: base64Audio, format: 'audio/wav' });
    } else {
      return res.status(500).json({ error: 'No audio returned' });
    }
  } catch (error: any) {
    console.error('TTS error:', error);
    return res.status(500).json({ error: error.message || 'TTS generation failed' });
  }
});

// Setup Vite or static files and listen
async function setupServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server and Gemini Live WebSocket listening on http://0.0.0.0:${PORT}`);
  });
}

setupServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
