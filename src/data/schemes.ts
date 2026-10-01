import { SchemeInfo } from '../types';

export const PMMVY_SCHEME: SchemeInfo = {
  id: 'pmmvy',
  titleTa: 'பிரதமர் மாத்ரு வந்தனா யோஜனா (PMMVY)',
  titleEn: 'Pradhan Mantri Matru Vandana Yojana (PMMVY)',
  benefitTa: 'முதல் குழந்தைக்கு ₹5,000 / 2-வது பெண் குழந்தைக்கு ₹6,000 பேறுகால நிதியுதவி',
  departmentTa: 'பெண்கள் மற்றும் குழந்தைகள் மேம்பாட்டு அமைச்சகம், இந்திய அரசு (Ministry of Women & Child Development)',
  descriptionTa: 'கர்ப்பிணி மற்றும் பாலூட்டும் தாய்மார்களின் ஊட்டச்சத்து மற்றும் சுகாதாரத்திற்கான மத்திய அரசு திட்டம். அதிகாரப்பூர்வ PMMVY இணையதளத்தில் Citizen Login மூலம் நீங்களே சுயமாக விண்ணப்பிக்கலாம்.',
  officialUrl: 'https://pmmvy.wcd.gov.in',
  documentsNeeded: [
    'தாய்-சேய் பாதுகாப்பு அட்டை (MCP Card / RCH பதிவு எண்)',
    'தாயின் அசல் ஆதார் அட்டை (Mother Aadhaar Card)',
    'கணவரின் ஆதார் அட்டை (Husband Aadhaar Card)',
    'ஆதாருடன் இணைக்கப்பட்ட தாயின் தனி வங்கி கணக்கு புத்தகம் (Bank Passbook / Post Office Account)',
    'குழந்தையின் பிறப்புச் சான்றிதழ் (இரண்டாவது தவணை அல்லது பெண் குழந்தைக்கு மட்டும்)',
  ],
  sampleSteps: [
    {
      stepNumber: 1,
      titleTa: 'PMMVY அதிகாரப்பூர்வ அரசு இணையதளத்தை திறத்தல்',
      instructionTa: 'அம்மா, முதலில் உங்கள் போனில் pmmvy.wcd.gov.in என்ற அதிகாரப்பூர்வ அரசு இணையதளத்தை திறக்கலாம்.',
      simplifiedTa: 'திரையில் உள்ள "அதிகாரப்பூர்வ PMMVY தளம்" என்ற பச்சை நிற பொத்தானை தொட்டு அரசு இணையதளத்திற்கு செல்லுங்கள் அம்மா.',
      screenTarget: 'pmmvy-portal-btn',
      targetDescriptionTa: 'அதிகாரப்பூர்வ PMMVY அரசு இணையதள இணைப்பு',
    },
    {
      stepNumber: 2,
      titleTa: 'குடிமக்கள் உள்நுழைவு (Citizen Login) தேர்வு செய்தல்',
      instructionTa: 'அரசு இணையதளத்தின் வலது மேல் பகுதியில் உள்ள "Citizen Login" (குடிமக்கள் உள்நுழைவு) என்ற பொத்தானை விரலால் தொடுங்கள் அம்மா.',
      simplifiedTa: 'திரையின் மேலே வலது பக்கம் இருக்கும் "Citizen Login" கட்டத்தில் விரல் வையுங்கள் அம்மா.',
      screenTarget: 'citizen-login-btn',
      targetDescriptionTa: 'Citizen Login பொத்தான்',
    },
    {
      stepNumber: 3,
      titleTa: 'கைபேசி எண் மற்றும் OTP பதிவு செய்தல்',
      instructionTa: 'உங்கள் செல்போன் எண்ணை டைப் செய்து OTP பெறுங்கள். அந்த OTP-யை அரசு இணையதளத்தில் நீங்களே நேரடியாக தட்டச்சு செய்யுங்கள்.',
      simplifiedTa: 'உங்கள் போனுக்கு வரும் ரகசிய எண்ணை யாரிடமும் சொல்ல வேண்டாம். நீங்களே அரசு இணையதள பெட்டியில் தட்டச்சு செய்யுங்கள் அம்மா.',
      screenTarget: 'otp-input',
      targetDescriptionTa: 'OTP உள்ளிடும் பெட்டி',
    },
    {
      stepNumber: 4,
      titleTa: 'முக அங்கீகாரம் (Facial Authentication)',
      instructionTa: 'அமைச்சக விதிகளின்படி, புதிய பதிவுக்கு உங்கள் முகத்தை கேமராவில் காட்டி முக அங்கீகாரம் செய்ய வேண்டும். நீங்களே கேமராவை பார்த்து கண் சிமிட்டுங்கள்.',
      simplifiedTa: 'போன் கேமரா முன் உங்கள் முகத்தை நேராக வைத்து கண் சிமிட்டுங்கள் அம்மா. இது உங்கள் பாதுகாப்புக்காக அரசு கேட்கும் முறை.',
      screenTarget: 'face-auth-btn',
      targetDescriptionTa: 'முக அங்கீகார திரை (Facial Auth)',
    },
    {
      stepNumber: 5,
      titleTa: 'தாய்-சேய் அட்டை (MCP) & வங்கி விவரங்களை பதிவு செய்தல்',
      instructionTa: 'உங்கள் தாய்-சேய் அட்டையில் உள்ள RCH எண்ணையும், உங்கள் ஆதார் இணைக்கப்பட்ட வங்கி கணக்கு விவரங்களையும் அரசு படிவத்தில் நிரப்புங்கள்.',
      simplifiedTa: 'உங்கள் கையில் உள்ள தாய்-சேய் அட்டை மற்றும் வங்கி புத்தகத்தை பார்த்து விவரங்களை நீங்களே தட்டச்சு செய்யுங்கள் அம்மா.',
      screenTarget: 'mcp-details',
      targetDescriptionTa: 'விண்ணப்ப படிவ விவரங்கள்',
    },
  ],
};

export const POPULAR_SCHEMES: SchemeInfo[] = [PMMVY_SCHEME];
