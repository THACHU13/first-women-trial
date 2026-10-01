import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  RotateCcw, 
  Send, 
  Sparkles, 
  Heart, 
  ShieldAlert, 
  HelpCircle, 
  Snail, 
  Info, 
  Radio, 
  ExternalLink, 
  PlayCircle, 
  AlertOctagon, 
  Lock, 
  Repeat,
  UserPlus,
  LogIn,
  PhoneCall,
  ShieldCheck
} from 'lucide-react';
import { ServiceMode, Message, SchemeInfo, ActiveSchemeContext } from '../types';
import { GeminiLiveClient, LiveStatus } from '../utils/geminiLiveClient';
import { voiceManager } from '../utils/audio';
import { 
  VERIFIED_WOMEN_SCHEMES, 
  buildSchemeCard, 
  MYSCHEME_PORTAL_CARD, 
  NSP_PORTAL_CARD,
  ONE_STOP_CENTRE_CARD,
  findSchemeCardForQuery,
  getSchemeById,
  createActiveContextFromScheme
} from '../data/womenSchemes';
import { MudhalPengalLogo } from './MudhalPengalLogo';

interface VoiceCompanionProps {
  currentScheme: SchemeInfo;
  onSchemeChange: (scheme: SchemeInfo) => void;
  currentStepIndex: number;
  setCurrentStepIndex: (step: number) => void;
  onTriggerSimulatorAction?: (actionText: string) => void;
  serviceMode?: ServiceMode;
  onServiceModeChange?: (mode: ServiceMode) => void;
  externalVoicePrompt?: string | null;
  onClearExternalVoicePrompt?: () => void;
}

const INITIAL_PMMVY_GREETING: Message = {
  id: 'msg-0',
  role: 'assistant',
  text: 'வணக்கம் அம்மா! நான் PMMVY பிரதான் மந்திரி மாத்ரு வந்தனா யோஜனா திட்டத்திற்கான உங்கள் குரல் வழிகாட்டி. நீங்கள் அரசு இணையதளத்தில் சுயமாக விண்ணப்பிக்க நான் ஒவ்வொரு படியாக சொல்லித் தருகிறேன். நீங்கள் புதிய பயனரா அல்லது ஏற்கனவே account உள்ளவரா?',
  timestamp: new Date(),
  stepIndex: 0,
  stepTitle: 'PMMVY Voice Guide',
  screenVisualHint: 'Click "New user? I want to create an account" or "Start Speaking"',
  suggestedResponses: [
    'I am new. I don\'t have an account.',
    'Where do I apply for PMMVY?',
    'How do I check PMMVY eligibility?',
    'The page only shows User ID and Password.',
    'I already have an account.',
  ],
  schemeCard: {
    schemeName: 'Pradhan Mantri Matru Vandana Yojana (PMMVY)',
    nameTa: 'பிரதான் மந்திரி மாத்ரு வந்தனா யோஜனா (பேறுகால உதவி)',
    categoryLabel: 'Pregnancy & Maternity Support',
    whatItIs: 'A maternity benefit scheme providing direct cash assistance of ₹5,000 for the first child or ₹6,000 for the second girl child to eligible pregnant and lactating women.',
    whatItIsTa: 'கர்ப்பிணி தாய்மார்களுக்கான ₹5,000 / ₹6,000 பேறுகால நிதியுதவி திட்டம்.',
    officialDepartment: 'Ministry of Women and Child Development, Government of India',
    officialSourceUrl: 'https://www.wcd.gov.in/women/pradhan-mantri-matru-vandana-yojna',
    applicationUrl: 'https://pmmvy.wcd.gov.in',
    eligibilityUrl: 'https://www.wcd.gov.in/women/pradhan-mantri-matru-vandana-yojna',
    lastVerified: '2026-10-01',
    actions: [
      { label: 'Check PMMVY Eligibility', url: 'https://www.wcd.gov.in/women/pradhan-mantri-matru-vandana-yojna', type: 'eligibility' },
      { label: 'Open Official PMMVY Portal', url: 'https://pmmvy.wcd.gov.in', type: 'apply', isPmmvyPortal: true },
      { label: 'Official Information', url: 'https://www.wcd.gov.in/women/pradhan-mantri-matru-vandana-yojna', type: 'official' },
    ],
  },
};

const INITIAL_MYSCHEME_GREETING: Message = {
  id: 'msg-myscheme-0',
  role: 'assistant',
  text: 'நான் அரசு திட்டங்களை கண்டுபிடிக்க உங்களுக்கு உதவுகிறேன். முதலில் சில எளிய கேள்விகள் கேட்பேன். உங்கள் பதில்களின் அடிப்படையில் உங்களுக்கு பொருத்தமாக இருக்கக்கூடிய திட்டங்களை கண்டுபிடிக்க உதவுகிறேன். நான் அரசு சார்பாக நீங்கள் தகுதியானவர் என்று முடிவு செய்யவில்லை. இறுதி தகுதி மற்றும் விண்ணப்பத்தை official government website-ல் தான் சரிபார்க்க வேண்டும். உங்கள் வயது என்ன அம்மா?',
  timestamp: new Date(),
  stepIndex: 1,
  stepTitle: 'myScheme Scheme Discovery',
  screenVisualHint: 'Please state your age (e.g. 25 years old) or choose a question below',
  suggestedResponses: [
    'My age is 25.',
    'I am a woman and want to know schemes for me.',
    'Where is the link?',
    'I don\'t know which government scheme I can get.',
    'Go back to PMMVY.',
  ],
  schemeCard: MYSCHEME_PORTAL_CARD,
};

const INITIAL_GENERAL_GREETING: Message = {
  id: 'msg-general-0',
  role: 'assistant',
  text: 'வணக்கம் அம்மா! பெண்களுக்கான அரசு திட்டங்களை கண்டறிய நான் உதவுகிறேன். பேறுகால உதவி (PMMVY), கல்வி உதவித்தொகை (NSP), மகளிர் சுயஉதவி, சிறுதொழில் கடன், குடும்ப வன்முறை உதவி (சகி மையம்) அல்லது தங்குமிடம் போன்ற உங்கள் தேவையை கூறலாம். உங்களுக்கு எப்படி உதவ வேண்டும் அம்மா?',
  timestamp: new Date(),
  stepIndex: 0,
  stepTitle: 'Women Scheme Discovery',
  screenVisualHint: 'Ask about pregnancy, scholarships, business loans, livelihood, or safety support',
  suggestedResponses: [
    'I am pregnant.',
    'I am a student and need scholarship.',
    'I am facing violence at home.',
    'I want to start a small business.',
    'I want government schemes for women.',
  ],
  schemeCard: MYSCHEME_PORTAL_CARD,
};

export const VoiceCompanion: React.FC<VoiceCompanionProps> = ({
  currentScheme,
  currentStepIndex,
  setCurrentStepIndex,
  serviceMode = 'home',
  onServiceModeChange,
  externalVoicePrompt,
  onClearExternalVoicePrompt,
}) => {
  const isPmmvy = serviceMode === 'pmmvy';
  const isSchemeDiscovery = serviceMode === 'myscheme' || serviceMode === 'find_schemes';
  const [messages, setMessages] = useState<Message[]>([
    isPmmvy 
      ? INITIAL_PMMVY_GREETING 
      : isSchemeDiscovery 
      ? INITIAL_MYSCHEME_GREETING 
      : INITIAL_GENERAL_GREETING,
  ]);
  const [activeSchemeContext, setActiveSchemeContext] = useState<ActiveSchemeContext | null>(
    isPmmvy
      ? {
          currentSchemeId: 'pmmvy',
          currentSchemeName: 'Pradhan Mantri Matru Vandana Yojana (PMMVY)',
          category: 'pregnancy_maternity',
          officialLink: 'https://pmmvy.wcd.gov.in',
          officialLinkType: 'apply',
          schemeSource: 'Ministry of Women and Child Development, Government of India',
          linkVerified: true,
        }
      : null
  );
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTtsSpeaking, setIsTtsSpeaking] = useState(false);
  const [slowSpeech, setSlowSpeech] = useState(false);
  const [safetyAlert, setSafetyAlert] = useState<string | null>(null);
  const [userType, setUserType] = useState<'new_user' | 'existing_user' | 'unknown'>('unknown');
  const [showHelplineCard, setShowHelplineCard] = useState(false);
  const [showCheckWebsiteAgain, setShowCheckWebsiteAgain] = useState(false);

  // Gemini Live state
  const [liveStatus, setLiveStatus] = useState<LiveStatus>('idle');
  const [liveStatusText, setLiveStatusText] = useState<string>('Voice connection ready');
  const [isLiveActive, setIsLiveActive] = useState<boolean>(false);
  const [currentAssistantLiveText, setCurrentAssistantLiveText] = useState<string>('');
  const [showPermissionModal, setShowPermissionModal] = useState<boolean>(false);

  const liveClientRef = useRef<GeminiLiveClient | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Handle external voice prompts triggered from UI cards
  useEffect(() => {
    if (externalVoicePrompt) {
      handleSendMessage(externalVoicePrompt);
      onClearExternalVoicePrompt?.();
    }
  }, [externalVoicePrompt]);

  // Initialize Gemini Live client
  useEffect(() => {
    const client = new GeminiLiveClient({
      onStatusChange: (status, statusTextTa) => {
        setLiveStatus(status);
        if (status === 'ready') {
          setLiveStatusText('குரல் இணைப்பு தயாராக உள்ளது (Voice ready)');
        } else if (status === 'listening') {
          setLiveStatusText('கேட்கிறேன்... (Listening...)');
        } else if (status === 'speaking') {
          setLiveStatusText('பதில் அளிக்கிறேன்... (Responding...)');
        } else {
          setLiveStatusText(statusTextTa);
        }
        setIsLiveActive(status !== 'idle' && status !== 'error');
      },
      onAssistantText: (text, isAppend) => {
        setCurrentAssistantLiveText((prev) => {
          const newText = isAppend ? prev + text : text;
          if (newText.includes('1515') || newText.includes('உதவி எண்')) {
            setShowHelplineCard(true);
          }
          if (newText.includes('temporary problem') || newText.includes('502') || newText.includes('open ஆகவில்லை')) {
            setShowCheckWebsiteAgain(true);
          }
          return newText;
        });
      },
      onUserText: (text) => {
        if (!text) return;
        if (checkForSensitiveData(text)) {
          triggerSensitiveWarning();
          return;
        }

        // Automatic intent detection from voice
        const lower = text.toLowerCase();
        if (
          lower.includes('new') ||
          lower.includes('don\'t have an account') ||
          lower.includes('dont have') ||
          lower.includes('register') ||
          lower.includes('create account') ||
          lower.includes('first time') ||
          lower.includes('புதிய') ||
          lower.includes('கணக்கு இல்லை')
        ) {
          setUserType('new_user');
        } else if (
          lower.includes('already have') ||
          lower.includes('have user id') ||
          lower.includes('have account') ||
          lower.includes('login') ||
          lower.includes('ஏற்கனவே')
        ) {
          setUserType('existing_user');
        }

        if (lower.includes('don\'t see citizen') || lower.includes('dont see') || lower.includes('தெரியவில்லை')) {
          setShowHelplineCard(true);
        }

        if (
          lower.includes('website is not opening') ||
          lower.includes('error 502') ||
          lower.includes('not opening') ||
          lower.includes('502') ||
          lower.includes('திறக்கவில்லை')
        ) {
          setShowCheckWebsiteAgain(true);
        }

        if (lower.includes('go back to pmmvy') || lower.includes('back to pmmvy')) {
          onServiceModeChange?.('pmmvy');
        } else if (
          lower.includes('find government scheme') ||
          lower.includes('what schemes are available') ||
          lower.includes('myscheme')
        ) {
          onServiceModeChange?.('myscheme');
        }

        // Contextual scheme tracking for live spoken user transcript
        const matchedOnVoice = findSchemeCardForQuery(text, activeSchemeContext?.currentSchemeId, serviceMode);
        if (matchedOnVoice?.schemeId) {
          const foundScheme = getSchemeById(matchedOnVoice.schemeId);
          if (foundScheme) {
            const chosenType = matchedOnVoice.actions?.[0]?.type || 'official';
            setActiveSchemeContext(createActiveContextFromScheme(foundScheme, chosenType));
          }
        }

        setMessages((prev) => [
          ...prev,
          {
            id: `user-${Date.now()}`,
            role: 'user',
            text: text,
            timestamp: new Date(),
          },
        ]);
      },
      onInterrupted: () => {
        setCurrentAssistantLiveText((prev) => {
          if (prev.trim()) {
            setMessages((msgs) => [
              ...msgs,
              {
                id: `assistant-${Date.now()}`,
                role: 'assistant',
                text: prev.trim() + ' (Interrupted)',
                timestamp: new Date(),
                stepIndex: currentStepIndex,
              },
            ]);
          }
          return '';
        });
      },
      onPermissionDenied: () => {
        setShowPermissionModal(true);
      },
      onError: (err) => {
        console.error('Gemini Live error:', err);
      },
    });

    liveClientRef.current = client;

    return () => {
      client.disconnect();
    };
  }, [currentStepIndex, activeSchemeContext?.currentSchemeId, serviceMode]);

  // Flush live assistant text into chat thread when speaking completes
  useEffect(() => {
    if (liveStatus === 'ready' && currentAssistantLiveText.trim()) {
      const assistantText = currentAssistantLiveText.trim();
      const matchedCard = findSchemeCardForQuery(assistantText, activeSchemeContext?.currentSchemeId, serviceMode);
      if (matchedCard?.schemeId) {
        const found = getSchemeById(matchedCard.schemeId);
        if (found) {
          const chosenType = matchedCard.actions?.[0]?.type || 'official';
          setActiveSchemeContext(createActiveContextFromScheme(found, chosenType));
        }
      }
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          text: assistantText,
          timestamp: new Date(),
          stepIndex: currentStepIndex,
          suggestedResponses: [
            'Where is the official website?',
            'Where can I apply?',
            'Check Official Eligibility',
            'Repeat',
          ],
          schemeCard: matchedCard,
          openUrl: matchedCard?.actions?.[0]?.url,
        },
      ]);
      setCurrentAssistantLiveText('');
    }
  }, [liveStatus, currentAssistantLiveText, currentStepIndex, serviceMode, activeSchemeContext?.currentSchemeId]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentAssistantLiveText, isLoading]);

  const checkForSensitiveData = (text: string): boolean => {
    const clean = text.toLowerCase();
    const hasOtpPattern = /\b\d{4,6}\b/.test(clean) && (clean.includes('otp') || clean.includes('ரகசிய') || clean.includes('password') || clean.includes('பாஸ்வேர்ட்'));
    const hasAadhaarPattern = /\b\d{12}\b/.test(clean) || (clean.includes('aadhaar') && /\d{4}/.test(clean)) || (clean.includes('ஆதார்') && /\d{4}/.test(clean));
    const hasBankPattern = clean.includes('account number') || clean.includes('bank') || clean.includes('வங்கி எண்') || clean.includes('pin') || clean.includes('பின்');
    return hasOtpPattern || hasAadhaarPattern || hasBankPattern;
  };

  const triggerSensitiveWarning = () => {
    const alertMsg = 'அம்மா! உங்கள் ரகசிய எண் (OTP / Password / Aadhaar / Bank details / PIN / Facial Auth) எதையும் என்னிடம் கூற வேண்டாம். அரசு இணையதளத்தில் நீங்களே நேரடியாக தட்டச்சு செய்ய வேண்டும்.';
    setSafetyAlert(alertMsg);

    const warnMsg: Message = {
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      text: alertMsg,
      timestamp: new Date(),
      stepIndex: currentStepIndex,
      stepTitle: 'Security Reminder',
      screenVisualHint: 'Please enter all details directly on the official government website',
      suggestedResponses: [
        'I am new. I don\'t have an account.',
        'The page only shows User ID and Password.',
        'Repeat',
      ],
      isSensitiveWarning: true,
    };
    setMessages((prev) => [...prev, warnMsg]);
  };

  // Toggle Live Session ("Start Speaking" / "பேச தொடங்குங்கள்")
  const handleToggleLiveSession = async () => {
    if (!liveClientRef.current) return;

    if (isLiveActive) {
      liveClientRef.current.disconnect();
      setIsLiveActive(false);
      setLiveStatus('idle');
      setLiveStatusText('Voice connection stopped');
    } else {
      setSafetyAlert(null);
      voiceManager.stopSpeaking();
      await liveClientRef.current.startLiveSession();
    }
  };

  // Action: "Start PMMVY Guidance"
  const handleStartPMMVYGuidance = async () => {
    setSafetyAlert(null);
    if (!isLiveActive && liveClientRef.current) {
      const started = await liveClientRef.current.startLiveSession();
      if (started) {
        liveClientRef.current.startPMMVYGuidance();
        return;
      }
    } else if (isLiveActive && liveClientRef.current) {
      liveClientRef.current.startPMMVYGuidance();
      return;
    }

    handleSendMessage('நான் PMMVY திட்டத்திற்கு விண்ணப்பிக்க வேண்டும்.');
  };

  // Action: "New user? I want to create an account" (NEW CITIZEN INTENT)
  const handleSelectNewUser = async () => {
    setUserType('new_user');
    setSafetyAlert(null);
    if (isLiveActive && liveClientRef.current) {
      liveClientRef.current.selectNewUser();
    } else {
      handleSendMessage('I am new. I don\'t have an account. How do I register as a citizen on PMMVY?');
    }
  };

  // Action: "I already have an account" (EXISTING USER INTENT)
  const handleSelectExistingUser = async () => {
    setUserType('existing_user');
    setSafetyAlert(null);
    if (isLiveActive && liveClientRef.current) {
      liveClientRef.current.selectExistingUser();
    } else {
      handleSendMessage('I already have an account. I have User ID and password. How do I login?');
    }
  };

  // Action: "Start Scheme Discovery" (myScheme)
  const handleStartMySchemeGuidance = async () => {
    setSafetyAlert(null);
    onServiceModeChange?.('myscheme');
    if (!isLiveActive && liveClientRef.current) {
      const started = await liveClientRef.current.startLiveSession();
      if (started) {
        liveClientRef.current.startMySchemeGuidance();
        return;
      }
    } else if (isLiveActive && liveClientRef.current) {
      liveClientRef.current.startMySchemeGuidance();
      return;
    }

    handleSendMessage('I am a woman and I want to know what schemes are available for me.');
  };

  // Action: "Check Official Website Again" (myScheme / 502)
  const handleCheckWebsiteAgain = () => {
    setSafetyAlert(null);
    setShowCheckWebsiteAgain(false);
    if (isLiveActive && liveClientRef.current) {
      liveClientRef.current.checkWebsiteAgain();
    } else {
      handleSendMessage('Check Official Website Again');
    }
  };

  // Action: "The website is not opening" (502 / Temporary error)
  const handleWebsiteNotOpening = () => {
    setShowCheckWebsiteAgain(true);
    if (isLiveActive && liveClientRef.current) {
      liveClientRef.current.websiteNotOpening();
    } else {
      handleSendMessage('The website is not opening.');
    }
  };

  // Action: "Can you apply for me?"
  const handleCanYouApplyForMe = () => {
    if (isLiveActive && liveClientRef.current) {
      liveClientRef.current.applyForMe();
    } else {
      handleSendMessage('Can you apply for me?');
    }
  };

  // Action: "Go back to PMMVY"
  const handleGoBackToPMMVY = () => {
    onServiceModeChange?.('pmmvy');
    if (isLiveActive && liveClientRef.current) {
      liveClientRef.current.goBackToPMMVY();
    } else {
      handleSendMessage('Go back to PMMVY.');
    }
  };

  // Action: "I don't understand"
  const handleDontUnderstand = () => {
    setSafetyAlert(null);
    if (isLiveActive && liveClientRef.current) {
      liveClientRef.current.dontUnderstand();
    } else {
      handleSendMessage('I don\'t understand. Explain in simpler Tamil.');
    }
  };

  // Action: "Repeat"
  const handleRepeatLast = () => {
    setSafetyAlert(null);
    if (isLiveActive && liveClientRef.current) {
      liveClientRef.current.repeatLast();
    } else {
      const lastAssistantMsg = messages.filter((m) => m.role === 'assistant').slice(-1)[0];
      if (lastAssistantMsg) {
        voiceManager.speakTamil(lastAssistantMsg.text, {
          slow: slowSpeech,
          onStart: () => setIsTtsSpeaking(true),
          onEnd: () => setIsTtsSpeaking(false),
        });
      } else {
        handleSendMessage('Repeat the last instruction.');
      }
    }
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const trimmed = textToSend.trim();
    setInputText('');
    setSafetyAlert(null);

    if (checkForSensitiveData(trimmed)) {
      triggerSensitiveWarning();
      return;
    }

    // Detect intent locally as well
    const lower = trimmed.toLowerCase();
    let currentType = userType;
    if (
      lower.includes('new') ||
      lower.includes('don\'t have an account') ||
      lower.includes('dont have') ||
      lower.includes('register') ||
      lower.includes('create account') ||
      lower.includes('first time')
    ) {
      currentType = 'new_user';
      setUserType('new_user');
    } else if (
      lower.includes('already have') ||
      lower.includes('have user id') ||
      lower.includes('login')
    ) {
      currentType = 'existing_user';
      setUserType('existing_user');
    }

    if (lower.includes('don\'t see citizen') || lower.includes('dont see') || lower.includes('shows user id and password')) {
      setShowHelplineCard(true);
    }

    if (
      lower.includes('website is not opening') ||
      lower.includes('error 502') ||
      lower.includes('not opening') ||
      lower.includes('502') ||
      lower.includes('திறக்கவில்லை')
    ) {
      setShowCheckWebsiteAgain(true);
    }

    if (lower.includes('go back to pmmvy') || lower.includes('back to pmmvy')) {
      onServiceModeChange?.('pmmvy');
    } else if (
      lower.includes('find government scheme') ||
      lower.includes('what schemes are available') ||
      lower.includes('myscheme')
    ) {
      onServiceModeChange?.('myscheme');
    }

    if (isLiveActive && liveClientRef.current) {
      setMessages((prev) => [
        ...prev,
        {
          id: `user-${Date.now()}`,
          role: 'user',
          text: trimmed,
          timestamp: new Date(),
        },
      ]);
      liveClientRef.current.sendTextMessage(trimmed);
      return;
    }

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const historyForApi = messages.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: historyForApi,
          currentStep: currentStepIndex,
          currentScheme: activeSchemeContext?.currentSchemeName || (serviceMode === 'myscheme' ? 'myScheme' : serviceMode === 'pmmvy' ? 'PMMVY' : ''),
          currentSchemeId: activeSchemeContext?.currentSchemeId || (serviceMode === 'myscheme' ? 'myscheme' : serviceMode === 'pmmvy' ? 'pmmvy' : ''),
          userType: currentType,
          serviceMode: serviceMode || 'home',
        }),
      });

      if (!res.ok) throw new Error('API failed');

      const data = await res.json();
      const newStep = typeof data.stepIndex === 'number' && data.stepIndex > 0 
        ? data.stepIndex 
        : currentStepIndex;

      if (newStep !== currentStepIndex) {
        setCurrentStepIndex(newStep);
      }

      if (data.recommendedService && data.recommendedService !== serviceMode) {
        onServiceModeChange?.(data.recommendedService);
      }

      if (data.showCheckWebsiteAgain) {
        setShowCheckWebsiteAgain(true);
      }

      if (data.helplineFallbackNeeded || (data.reply && data.reply.includes('1515'))) {
        setShowHelplineCard(true);
      }

      const matchedCard = data.schemeCard || findSchemeCardForQuery(trimmed, activeSchemeContext?.currentSchemeId, serviceMode);

      if (data.activeSchemeContext) {
        setActiveSchemeContext(data.activeSchemeContext);
      } else if (matchedCard?.schemeId) {
        const found = getSchemeById(matchedCard.schemeId);
        if (found) {
          const chosenType = matchedCard.actions?.[0]?.type || 'official';
          setActiveSchemeContext(createActiveContextFromScheme(found, chosenType));
        }
      }

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        text: data.reply || 'அம்மா, அடுத்த படியைச் செய்யலாமா?',
        timestamp: new Date(),
        stepIndex: data.stepIndex,
        stepTitle: data.stepTitle,
        screenVisualHint: data.screenVisualHint,
        suggestedResponses: data.suggestedResponses || [
          'Where is the official website?',
          'Where can I apply?',
          'Check Official Eligibility',
          'Repeat',
        ],
        isSensitiveWarning: data.isSensitiveWarning,
        schemeCard: matchedCard,
        openUrl: data.openUrl,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      voiceManager.speakTamil(assistantMessage.text, {
        slow: slowSpeech,
        onStart: () => setIsTtsSpeaking(true),
        onEnd: () => setIsTtsSpeaking(false),
      });
    } catch (err) {
      console.error('Chat error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOfficialLinkClick = (label: string, url: string) => {
    // Spoken Tamil announcement before/when opening official link
    voiceManager.speakTamil("இப்போது official government website-க்கு செல்லலாம்.", {
      slow: slowSpeech,
      onStart: () => setIsTtsSpeaking(true),
      onEnd: () => setIsTtsSpeaking(false),
    });
  };

  // Computed voice state explicitly matching requirements: IDLE | LISTENING | THINKING | SPEAKING | ERROR
  const computedVoiceState: 'idle' | 'listening' | 'thinking' | 'speaking' | 'error' =
    liveStatus === 'error'
      ? 'error'
      : (liveStatus === 'speaking' || isTtsSpeaking)
      ? 'speaking'
      : (liveStatus === 'thinking' || isLoading)
      ? 'thinking'
      : (liveStatus === 'listening')
      ? 'listening'
      : 'idle';

  return (
    <div className="flex flex-col h-full bg-white border border-amber-200 rounded-2xl shadow-sm overflow-hidden relative font-['Mukta_Malar',sans-serif]">
      {/* Top Header */}
      <div className={`p-4 shadow-sm text-white transition-colors ${
        isSchemeDiscovery
          ? 'bg-gradient-to-r from-pink-900 via-rose-900 to-stone-900'
          : 'bg-gradient-to-r from-amber-700 via-amber-800 to-orange-800'
      }`}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className={`rounded-2xl overflow-hidden shadow-md transition-all ${
                computedVoiceState === 'speaking' ? 'ring-4 ring-emerald-300 ring-offset-2 ring-offset-pink-900 scale-105' : ''
              }`}>
                <MudhalPengalLogo size="md" showText={false} />
              </div>
              {computedVoiceState === 'speaking' && (
                <span className="absolute -bottom-1 -right-1 bg-emerald-400 border-2 border-white w-3.5 h-3.5 rounded-full animate-ping"></span>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-black text-base sm:text-lg tracking-tight leading-tight">
                  முதல் பெண்கள்
                </h2>
                <span className="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Mudhal Pengal
                </span>
                <span className="bg-amber-400 text-stone-900 text-[10px] px-2 py-0.5 rounded-full font-black uppercase">
                  {isSchemeDiscovery ? 'Schemes Guide' : serviceMode === 'pmmvy' ? 'PMMVY Guide' : 'Voice Guide'}
                </span>
              </div>
              <p className="text-amber-100 text-xs mt-0.5 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-pink-300 fill-pink-300" />
                <span>
                  {isSchemeDiscovery
                    ? 'பெண்கள் முன்னேற்ற அரசு உதவி திட்டங்கள் வழிகாட்டி'
                    : 'Spoken Tamil Guidance • Official Government Schemes'}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSlowSpeech(!slowSpeech)}
              className={`text-xs px-2.5 py-1.5 rounded-xl border flex items-center gap-1 font-medium transition-colors cursor-pointer ${
                slowSpeech
                  ? 'bg-amber-300 text-amber-950 border-amber-400 font-bold shadow-inner'
                  : 'bg-black/30 hover:bg-black/50 text-white border-white/20'
              }`}
              title="Voice Speed"
            >
              <Snail className="w-3.5 h-3.5" />
              <span>{slowSpeech ? 'Slow Voice' : 'Normal'}</span>
            </button>
          </div>
        </div>

        {/* Voice States Display: IDLE | LISTENING | THINKING | SPEAKING | ERROR */}
        <div className="mt-3 bg-black/45 border border-white/25 rounded-xl px-3.5 py-2.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            {computedVoiceState === 'speaking' ? (
              <>
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse ring-2 ring-emerald-300/50"></span>
                <span className="font-black text-emerald-300 uppercase tracking-wider text-[11px] bg-emerald-950/80 px-2 py-0.5 rounded">SPEAKING</span>
                <span className="font-extrabold text-white text-sm">Speaking... (பேசுகிறேன்...)</span>
              </>
            ) : computedVoiceState === 'thinking' ? (
              <>
                <span className="w-3 h-3 rounded-full bg-purple-400 animate-ping ring-2 ring-purple-300/50"></span>
                <span className="font-black text-purple-300 uppercase tracking-wider text-[11px] bg-purple-950/80 px-2 py-0.5 rounded">THINKING</span>
                <span className="font-extrabold text-white text-sm">Thinking... (யோசிக்கிறேன்...)</span>
              </>
            ) : computedVoiceState === 'listening' ? (
              <>
                <span className="w-3 h-3 rounded-full bg-amber-400 animate-ping ring-2 ring-amber-300/50"></span>
                <span className="font-black text-amber-300 uppercase tracking-wider text-[11px] bg-amber-950/80 px-2 py-0.5 rounded">LISTENING</span>
                <span className="font-extrabold text-white text-sm">Listening... (கேட்கிறேன்...)</span>
              </>
            ) : computedVoiceState === 'error' ? (
              <>
                <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse ring-2 ring-red-300/50"></span>
                <span className="font-black text-red-300 uppercase tracking-wider text-[11px] bg-red-950/80 px-2 py-0.5 rounded">ERROR</span>
                <span className="font-extrabold text-red-200 text-sm">Voice connection problem (குரல் இணைப்பு பிரச்சனை)</span>
              </>
            ) : (
              <>
                <span className="w-3 h-3 rounded-full bg-stone-400 ring-2 ring-stone-500/50"></span>
                <span className="font-black text-stone-300 uppercase tracking-wider text-[11px] bg-stone-800 px-2 py-0.5 rounded">IDLE</span>
                <span className="text-stone-100 font-extrabold text-sm">Tap to speak (பேச தொடங்குங்கள்)</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            {isLiveActive ? (
              <span className="text-[11px] bg-emerald-900/90 text-emerald-200 px-2.5 py-0.5 rounded-full border border-emerald-500/50 flex items-center gap-1 font-bold">
                <Radio className="w-3 h-3 text-emerald-300 animate-pulse" />
                <span>Live Voice</span>
              </span>
            ) : (
              <span className="text-[11px] text-stone-300 hidden sm:inline">
                Tap mic or button below
              </span>
            )}
          </div>
        </div>
      </div>

      {/* SERVICE SPECIFIC CONTROLS & BANNERS */}
      {isSchemeDiscovery ? (
        <div className="bg-pink-50 border-b border-pink-200 p-2.5 flex items-center justify-between gap-2 flex-wrap text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleStartMySchemeGuidance}
              className="bg-pink-800 hover:bg-pink-900 text-white font-extrabold px-3 py-1.5 rounded-xl shadow flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-300" />
              <span>Start Scheme Discovery</span>
            </button>

            <a
              href="https://www.myscheme.gov.in/ta"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleSendMessage('இப்போது நீங்கள் official government website-க்கு செல்கிறீர்கள்.')}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-xl shadow-sm flex items-center gap-1.5 transition-all ring-1 ring-emerald-400"
            >
              <span>Open Official myScheme</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {showCheckWebsiteAgain && (
              <button
                onClick={handleCheckWebsiteAgain}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-1.5 rounded-xl shadow flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Check Official Website Again</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDontUnderstand}
              className="bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 font-bold px-2.5 py-1.5 rounded-xl shadow-xs flex items-center gap-1 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-stone-600" />
              <span>I don't understand</span>
            </button>

            <button
              onClick={handleRepeatLast}
              className="bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 font-bold px-2.5 py-1.5 rounded-xl shadow-xs flex items-center gap-1 cursor-pointer"
            >
              <Repeat className="w-3.5 h-3.5 text-stone-600" />
              <span>Repeat</span>
            </button>

            <button
              onClick={handleGoBackToPMMVY}
              className="bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 font-bold px-2.5 py-1.5 rounded-xl shadow-xs flex items-center gap-1 cursor-pointer"
            >
              <span>Go back to PMMVY</span>
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* USER INTENT SELECTOR BAR: "New user? I want to create an account" vs "I already have an account" */}
          <div className="bg-amber-50 border-b border-amber-200 p-2.5 flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs text-stone-600 font-bold shrink-0">
              <span>Select your status:</span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handleSelectNewUser}
                className={`text-xs sm:text-sm font-extrabold px-3.5 py-1.5 rounded-xl border shadow-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                  userType === 'new_user'
                    ? 'bg-amber-700 text-white border-amber-800 ring-2 ring-amber-400 shadow-md'
                    : 'bg-white hover:bg-amber-100 text-amber-950 border-amber-300'
                }`}
                title="I have never registered on PMMVY before"
              >
                <UserPlus className="w-3.5 h-3.5 text-amber-600" />
                <span>New user? I want to create an account</span>
              </button>

              <button
                onClick={handleSelectExistingUser}
                className={`text-xs sm:text-sm font-bold px-3 py-1.5 rounded-xl border shadow-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                  userType === 'existing_user'
                    ? 'bg-stone-800 text-white border-stone-900 ring-2 ring-stone-400 shadow-md'
                    : 'bg-white hover:bg-stone-100 text-stone-800 border-stone-300'
                }`}
                title="I already have a User ID and password"
              >
                <LogIn className="w-3.5 h-3.5 text-stone-600" />
                <span>I already have an account</span>
              </button>
            </div>
          </div>

          {/* PMMVY Core Controls Bar */}
          <div className="bg-amber-100/90 border-b border-amber-300 p-2 flex items-center justify-between gap-2 flex-wrap text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handleStartPMMVYGuidance}
                className="bg-amber-800 hover:bg-amber-900 text-white font-extrabold px-3 py-1.5 rounded-xl shadow flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <PlayCircle className="w-4 h-4 text-amber-300" />
                <span>Start PMMVY Guidance</span>
              </button>

              <a
                href="https://pmmvy.wcd.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3 py-1.5 rounded-xl shadow flex items-center gap-1.5 transition-all"
              >
                <span>Open Official PMMVY Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDontUnderstand}
                className="bg-white hover:bg-amber-50 text-amber-900 border border-amber-300 font-bold px-3 py-1.5 rounded-xl shadow-xs flex items-center gap-1 cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
                <span>I don't understand</span>
              </button>

              <button
                onClick={handleRepeatLast}
                className="bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 font-bold px-3 py-1.5 rounded-xl shadow-xs flex items-center gap-1 cursor-pointer"
              >
                <Repeat className="w-3.5 h-3.5 text-stone-600" />
                <span>Repeat</span>
              </button>

              <button
                onClick={() => onServiceModeChange?.('myscheme')}
                className="bg-emerald-100 hover:bg-emerald-200 text-emerald-950 border border-emerald-300 font-bold px-3 py-1.5 rounded-xl shadow-xs flex items-center gap-1 cursor-pointer"
              >
                <span>Find Government Schemes</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* ACTIVE SCHEME IN CONTEXT BANNER */}
      {activeSchemeContext && (
        <div className="bg-gradient-to-r from-amber-100 via-rose-50 to-pink-100 border-b border-amber-300 px-4 py-2.5 flex items-center justify-between gap-2 text-xs flex-wrap shadow-2xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-stone-900 text-amber-300 font-black text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">
              Current Scheme
            </span>
            <span className="font-black text-stone-900 text-xs sm:text-sm">
              {activeSchemeContext.currentSchemeName}
            </span>
            <span className="text-[10px] bg-emerald-100 text-emerald-900 border border-emerald-300 px-2 py-0.5 rounded-full font-bold inline-flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-700" />
              Verified Official Source
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={activeSchemeContext.officialLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleOfficialLinkClick(activeSchemeContext.currentSchemeName, activeSchemeContext.officialLink)}
              className="inline-flex items-center gap-1.5 font-black text-white bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-800 hover:to-teal-900 px-3.5 py-1.5 rounded-xl shadow-xs ring-1 ring-emerald-300 transition-all cursor-pointer text-xs"
            >
              <span>[Open Official Website]</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}

      {/* Conversation Thread */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-amber-50/20">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-4 shadow-sm transition-all ${
                msg.role === 'user'
                  ? 'bg-amber-700 text-white rounded-tr-none'
                  : msg.isSensitiveWarning
                  ? 'bg-red-50 border-2 border-red-300 text-red-950 rounded-tl-none ring-2 ring-red-100'
                  : 'bg-white border border-amber-200 text-stone-900 rounded-tl-none'
              }`}
            >
              {msg.role === 'assistant' && msg.stepIndex && msg.stepIndex > 0 && (
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xs bg-amber-100 text-amber-900 font-extrabold px-2.5 py-0.5 rounded-full border border-amber-300">
                    Step {msg.stepIndex}: {msg.stepTitle || 'PMMVY Guide'}
                  </span>
                </div>
              )}

              {/* Spoken Tamil text */}
              <p className="text-base sm:text-lg font-medium leading-relaxed">
                {msg.text}
              </p>

              {msg.screenVisualHint && (
                <div className="mt-2.5 pt-2 border-t border-amber-100 text-xs text-amber-900 bg-amber-50/80 p-2 rounded-lg flex items-center gap-2">
                  <Info className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>
                    <strong>Screen Hint:</strong> {msg.screenVisualHint}
                  </span>
                </div>
              )}

              {/* SCHEME RESULT CARD with clickable verified official links */}
              {msg.schemeCard && (
                <div className="mt-3.5 bg-gradient-to-br from-pink-50/95 via-amber-50/70 to-rose-50/90 border-2 border-pink-300 rounded-2xl p-4 shadow-sm space-y-3 text-stone-900">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-base sm:text-lg font-black text-stone-900 tracking-tight leading-snug">
                          {msg.schemeCard.schemeName}
                        </span>
                        {msg.schemeCard.categoryLabel && (
                          <span className="bg-pink-200/80 text-pink-950 border border-pink-300 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                            {msg.schemeCard.categoryLabel}
                          </span>
                        )}
                      </div>
                      {msg.schemeCard.nameTa && (
                        <p className="text-xs sm:text-sm font-extrabold text-amber-950 mt-1">
                          {msg.schemeCard.nameTa}
                        </p>
                      )}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 px-2 py-0.5 rounded-md shrink-0 shadow-2xs">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                      Verified Source
                    </span>
                  </div>

                  {/* What it is */}
                  <div className="bg-white/95 rounded-xl p-3 border border-pink-200 text-xs sm:text-sm text-stone-800 space-y-1.5 shadow-2xs">
                    <div className="font-extrabold text-pink-950 flex items-center gap-1.5 text-xs">
                      <Sparkles className="w-3.5 h-3.5 text-pink-600" />
                      <span>What it is (திட்டம் பற்றிய விளக்கம்):</span>
                    </div>
                    <p className="leading-relaxed font-medium text-stone-800">
                      {msg.schemeCard.whatItIs}
                    </p>
                    {msg.schemeCard.whatItIsTa && (
                      <p className="text-xs text-stone-600 italic pt-1 border-t border-stone-100 leading-normal">
                        {msg.schemeCard.whatItIsTa}
                      </p>
                    )}
                  </div>

                  {/* Official Department & Verification Metadata */}
                  <div className="text-[11px] text-stone-600 flex items-center justify-between flex-wrap gap-2 pt-0.5">
                    <span>
                      Official: <strong className="text-stone-800">{msg.schemeCard.officialDepartment}</strong>
                    </span>
                    {msg.schemeCard.lastVerified && (
                      <span className="bg-white/80 px-2 py-0.5 rounded border border-stone-200 text-[10px] font-medium text-stone-500">
                        Verified: {msg.schemeCard.lastVerified}
                      </span>
                    )}
                  </div>

                  {/* CLEAR CLICKABLE OFFICIAL GOVERNMENT WEBSITE BUTTONS */}
                  <div className="pt-2 border-t border-pink-200/90 flex flex-wrap gap-2.5">
                    {msg.schemeCard.actions.map((act, idx) => (
                      <a
                        key={idx}
                        href={act.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleOfficialLinkClick(act.label, act.url)}
                        className={`text-xs sm:text-sm font-extrabold px-4 py-2.5 rounded-xl shadow-xs flex items-center gap-2 transition-all cursor-pointer active:scale-95 ${
                          act.type === 'apply'
                            ? 'bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-800 hover:to-teal-900 text-white shadow-md ring-2 ring-emerald-300'
                            : act.type === 'eligibility'
                            ? 'bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 text-white shadow-md ring-2 ring-blue-300'
                            : act.type === 'info'
                            ? 'bg-stone-800 hover:bg-stone-900 text-white shadow-sm'
                            : 'bg-white hover:bg-pink-100 text-pink-950 border-2 border-pink-300 hover:border-pink-400 font-black shadow-xs'
                        }`}
                      >
                        <span>[{act.label}]</span>
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-2 flex items-center justify-between text-xs text-stone-500 pt-1">
                {msg.role === 'assistant' ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleDontUnderstand}
                      className="text-amber-800 hover:text-amber-950 font-bold flex items-center gap-1 cursor-pointer bg-amber-50 hover:bg-amber-100 px-2 py-0.5 rounded-md border border-amber-200"
                    >
                      <HelpCircle className="w-3 h-3" />
                      <span>Simplify</span>
                    </button>
                    <button
                      onClick={handleRepeatLast}
                      className="text-stone-700 hover:text-stone-900 font-bold flex items-center gap-1 cursor-pointer bg-stone-100 hover:bg-stone-200 px-2 py-0.5 rounded-md border border-stone-200"
                    >
                      <Repeat className="w-3 h-3" />
                      <span>Repeat</span>
                    </button>
                  </div>
                ) : (
                  <span></span>
                )}
                <span className="text-[10px] text-stone-400">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Live speech incoming bubble */}
        {currentAssistantLiveText && (
          <div className="flex justify-start">
            <div className="bg-white border-2 border-emerald-400 rounded-2xl rounded-tl-none p-4 shadow-md text-stone-900 max-w-[85%] animate-in fade-in">
              <div className="flex items-center gap-2 text-xs text-emerald-700 font-bold mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>Responding... (பதில் அளிக்கிறேன்...)</span>
              </div>
              <p className="text-base sm:text-lg font-semibold leading-relaxed">
                {currentAssistantLiveText}
              </p>
            </div>
          </div>
        )}

        {/* Official Helpline Fallback Card */}
        {showHelplineCard && (
          <div className="bg-gradient-to-r from-sky-50 to-blue-50 border-2 border-blue-300 rounded-2xl p-4 shadow-sm text-xs sm:text-sm text-blue-950 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-black text-blue-900 text-sm">
                <PhoneCall className="w-4 h-4 text-blue-700" />
                <span>Official PMMVY Multilingual Helpline: 1515</span>
              </div>
              <a
                href="tel:1515"
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-3 py-1 rounded-lg text-xs"
              >
                Call 1515
              </a>
            </div>
            <p className="text-blue-900 leading-relaxed">
              அம்மா, தற்போதைய அரசு இணையதளத்தில் Citizen Registration பொத்தான் நேரடியாக தெரியவில்லை என்றால், Login button-ஐ அழுத்த வேண்டாம். மத்திய அரசின் இலவச உதவி எண் <strong>1515</strong>-க்கு அழைத்து தற்போதைய பதிவு வழியை உறுதிப்படுத்தலாம்.
            </p>
          </div>
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-amber-200 rounded-2xl rounded-tl-none p-4 shadow-sm text-sm text-amber-900 flex items-center gap-3">
              <div className="flex space-x-1.5">
                <span className="w-2.5 h-2.5 bg-amber-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2.5 h-2.5 bg-amber-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2.5 h-2.5 bg-amber-600 rounded-full animate-bounce"></span>
              </div>
              <span className="text-sm font-medium">Processing instruction...</span>
            </div>
          </div>
        )}

        {/* Safety Alert Box */}
        {safetyAlert && (
          <div className="bg-red-50 border-2 border-red-300 rounded-xl p-3 text-red-900 text-xs sm:text-sm flex items-start gap-2.5">
            <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1 font-medium">{safetyAlert}</div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Test & Spoken Chips */}
      <div className="bg-stone-50 border-t border-amber-200 px-4 py-2 flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center gap-1.5 shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-pink-600" />
          <span className="text-xs font-bold text-stone-700">Women Situations & Prompts:</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {isSchemeDiscovery ? (
            <>
              <button
                onClick={() => handleSendMessage('I am pregnant.')}
                className="text-xs bg-white hover:bg-pink-100 text-pink-950 border border-pink-200 px-3 py-1 rounded-full font-bold cursor-pointer"
              >
                "I am pregnant"
              </button>
              <button
                onClick={() => handleSendMessage('I have a small child.')}
                className="text-xs bg-white hover:bg-pink-100 text-pink-950 border border-pink-200 px-3 py-1 rounded-full font-medium cursor-pointer"
              >
                "I have a small child"
              </button>
              <button
                onClick={() => handleSendMessage('I want to find work.')}
                className="text-xs bg-white hover:bg-emerald-100 text-emerald-950 border border-stone-200 px-3 py-1 rounded-full font-medium cursor-pointer"
              >
                "I want to find work"
              </button>
              <button
                onClick={() => handleSendMessage('I want to start a small business.')}
                className="text-xs bg-white hover:bg-purple-100 text-purple-950 border border-stone-200 px-3 py-1 rounded-full font-medium cursor-pointer"
              >
                "Start a small business"
              </button>
              <button
                onClick={() => handleSendMessage('I am a student.')}
                className="text-xs bg-white hover:bg-blue-100 text-blue-950 border border-stone-200 px-3 py-1 rounded-full font-medium cursor-pointer"
              >
                "I am a student"
              </button>
              <button
                onClick={() => handleSendMessage('I need financial support.')}
                className="text-xs bg-white hover:bg-amber-100 text-amber-950 border border-stone-200 px-3 py-1 rounded-full font-medium cursor-pointer"
              >
                "Need financial support"
              </button>
              <button
                onClick={() => handleSendMessage('I don\'t know which scheme is for me.')}
                className="text-xs bg-white hover:bg-pink-100 text-pink-950 border border-stone-200 px-3 py-1 rounded-full font-medium cursor-pointer"
              >
                "Which scheme is for me?"
              </button>
              <button
                onClick={() => handleSendMessage('My age is 25.')}
                className="text-xs bg-white hover:bg-stone-100 text-stone-900 border border-stone-200 px-3 py-1 rounded-full font-medium cursor-pointer"
              >
                "My age is 25" (Q1)
              </button>
              <button
                onClick={() => handleSendMessage('Tamil Nadu')}
                className="text-xs bg-white hover:bg-stone-100 text-stone-900 border border-stone-200 px-3 py-1 rounded-full font-medium cursor-pointer"
              >
                "Tamil Nadu" (Q2)
              </button>
              <button
                onClick={() => handleSendMessage('Rural area')}
                className="text-xs bg-white hover:bg-stone-100 text-stone-900 border border-stone-200 px-3 py-1 rounded-full font-medium cursor-pointer"
              >
                "Rural area" (Q3)
              </button>
              <button
                onClick={() => handleSendMessage('Where is the link?')}
                className="text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-300 px-3 py-1 rounded-full font-bold cursor-pointer"
              >
                "Where is the link?"
              </button>
              <button
                onClick={() => handleSendMessage('Where can I apply?')}
                className="text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-300 px-3 py-1 rounded-full font-bold cursor-pointer"
              >
                "Where can I apply?"
              </button>
              <button
                onClick={handleWebsiteNotOpening}
                className="text-xs bg-white hover:bg-red-50 text-red-950 border border-red-200 px-3 py-1 rounded-full font-medium cursor-pointer"
              >
                "The website is not opening"
              </button>
              <button
                onClick={handleCanYouApplyForMe}
                className="text-xs bg-white hover:bg-purple-50 text-purple-950 border border-purple-200 px-3 py-1 rounded-full font-medium cursor-pointer"
              >
                "Can you apply for me?"
              </button>
              <button
                onClick={handleGoBackToPMMVY}
                className="text-xs bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 px-3 py-1 rounded-full font-bold cursor-pointer"
              >
                "Go back to PMMVY"
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleSendMessage('Where do I apply for PMMVY?')}
                className="text-xs bg-emerald-100 hover:bg-emerald-200 text-emerald-950 border border-emerald-300 px-3 py-1 rounded-full font-extrabold cursor-pointer"
              >
                "Where do I apply for PMMVY?"
              </button>
              <button
                onClick={() => handleSendMessage('How do I check PMMVY eligibility?')}
                className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-950 border border-blue-300 px-3 py-1 rounded-full font-extrabold cursor-pointer"
              >
                "How do I check PMMVY eligibility?"
              </button>
              <button
                onClick={() => handleSendMessage('Where is the link?')}
                className="text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-300 px-3 py-1 rounded-full font-bold cursor-pointer"
              >
                "Where is the link?"
              </button>
              <button
                onClick={() => handleSendMessage('I am new. I don\'t have an account.')}
                className="text-xs bg-white hover:bg-amber-100 text-amber-950 border border-stone-200 px-3 py-1 rounded-full font-medium cursor-pointer"
              >
                "I am new. I don't have an account"
              </button>
              <button
                onClick={() => handleSendMessage('The page only shows User ID and Password.')}
                className="text-xs bg-white hover:bg-amber-100 text-amber-950 border border-stone-200 px-3 py-1 rounded-full font-medium cursor-pointer"
              >
                "The page only shows User ID and Password"
              </button>
              <button
                onClick={() => handleSendMessage('I don\'t see Citizen Login.')}
                className="text-xs bg-white hover:bg-amber-100 text-amber-950 border border-stone-200 px-3 py-1 rounded-full font-medium cursor-pointer"
              >
                "I don't see Citizen Login"
              </button>
              <button
                onClick={() => handleSendMessage('I already have an account.')}
                className="text-xs bg-white hover:bg-amber-100 text-amber-950 border border-stone-200 px-3 py-1 rounded-full font-medium cursor-pointer"
              >
                "I already have an account"
              </button>
              <button
                onClick={handleCanYouApplyForMe}
                className="text-xs bg-white hover:bg-purple-50 text-purple-950 border border-purple-200 px-3 py-1 rounded-full font-medium cursor-pointer"
              >
                "Can you apply for me?"
              </button>
              <button
                onClick={() => onServiceModeChange?.('myscheme')}
                className="text-xs bg-pink-100 hover:bg-pink-200 text-pink-950 border border-pink-300 px-3 py-1 rounded-full font-bold cursor-pointer"
              >
                "Find Schemes for Me"
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Microphone Interaction Zone with "Tap to speak" Button */}
      <div className="bg-white border-t border-stone-200 p-4 shadow-lg">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleToggleLiveSession}
            className={`w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl font-black text-base sm:text-lg shadow-lg transition-all active:scale-95 cursor-pointer shrink-0 ${
              computedVoiceState === 'speaking'
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white ring-4 ring-emerald-300 animate-pulse'
                : computedVoiceState === 'thinking'
                ? 'bg-purple-700 hover:bg-purple-800 text-white ring-4 ring-purple-300'
                : computedVoiceState === 'listening'
                ? 'bg-amber-600 hover:bg-amber-700 text-white ring-4 ring-amber-300 animate-pulse'
                : computedVoiceState === 'error'
                ? 'bg-red-600 hover:bg-red-700 text-white ring-4 ring-red-300'
                : 'bg-gradient-to-r from-pink-600 via-rose-600 to-amber-700 hover:from-pink-700 hover:to-amber-800 text-white shadow-md'
            }`}
            title={isLiveActive ? 'Stop Speaking' : 'Tap to speak'}
          >
            {computedVoiceState === 'speaking' ? (
              <>
                <Mic className="w-6 h-6 animate-pulse" />
                <span>Speaking... (பேசுகிறேன்...)</span>
              </>
            ) : computedVoiceState === 'thinking' ? (
              <>
                <Sparkles className="w-6 h-6 animate-spin" />
                <span>Thinking... (யோசிக்கிறேன்...)</span>
              </>
            ) : computedVoiceState === 'listening' ? (
              <>
                <MicOff className="w-6 h-6 animate-pulse text-amber-200" />
                <span>Listening... (கேட்கிறேன்...)</span>
              </>
            ) : computedVoiceState === 'error' ? (
              <>
                <AlertOctagon className="w-6 h-6 animate-bounce" />
                <span>Voice connection problem</span>
              </>
            ) : (
              <>
                <Mic className="w-6 h-6 animate-bounce" />
                <span>Tap to speak (பேச தொடங்குங்கள்)</span>
              </>
            )}
          </button>

          {/* Text Input Fallback */}
          <div className="w-full flex-1 flex gap-2">
            <input
              type="text"
              placeholder={isLiveActive ? 'Speak naturally in Tamil or type here...' : 'Type in Tamil or English, or press Start Speaking...'}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(inputText);
                }
              }}
              className="flex-1 bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm sm:text-base text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white shadow-inner"
            />
            <button
              onClick={() => handleSendMessage(inputText)}
              disabled={!inputText.trim()}
              className="bg-amber-800 hover:bg-amber-900 disabled:opacity-40 text-white px-4 rounded-xl flex items-center justify-center transition-colors cursor-pointer shrink-0"
              title="Send"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-stone-500 mt-2 px-1">
          <span className="flex items-center gap-1 font-semibold text-amber-900">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Speak naturally in Tamil • You can interrupt at any moment
          </span>
          <span className="hidden sm:inline text-stone-400">
            One instruction at a time
          </span>
        </div>
      </div>

      {/* Microphone Permission Modal */}
      {showPermissionModal && (
        <div className="absolute inset-0 bg-stone-950/75 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border-2 border-red-300 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center gap-3 border-b border-stone-200 pb-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center shrink-0">
                <AlertOctagon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-stone-900 text-base">
                  Microphone Permission Required (மைக் அனுமதி தேவை)
                </h3>
                <p className="text-xs text-stone-500">
                  Please enable microphone access in your browser
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-stone-700">
              <p className="leading-relaxed">
                அம்மா, உங்கள் போனில் அல்லது கணினியில் <strong>மைக் அனுமதி (Microphone Permission)</strong> தடுக்கப்பட்டுள்ளது.
              </p>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
                <div className="font-bold text-amber-950 text-xs flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-amber-800" />
                  <span>How to enable microphone:</span>
                </div>
                <ol className="list-decimal list-inside space-y-1.5 text-stone-800 text-xs">
                  <li>
                    Tap the <strong>Lock (🔒) or Microphone (🎙️) icon</strong> in the browser address bar.
                  </li>
                  <li>
                    Change <strong>"Microphone"</strong> to <strong>"Allow" (அனுமதி)</strong>.
                  </li>
                  <li>
                    Refresh this page.
                  </li>
                </ol>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setShowPermissionModal(false)}
                className="bg-amber-800 hover:bg-amber-900 text-white font-bold px-4 py-2 rounded-xl text-xs sm:text-sm cursor-pointer"
              >
                Understood (புரிந்தது)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
