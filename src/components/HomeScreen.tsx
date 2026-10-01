import React from 'react';
import { 
  Sparkles, 
  Baby, 
  Search, 
  Mic, 
  ArrowRight, 
  ExternalLink,
  PhoneCall,
  Heart,
  Globe,
  HelpCircle,
  Briefcase,
  GraduationCap,
  Store,
  Wallet,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { ServiceMode } from '../types';
import { MudhalPengalLogo } from './MudhalPengalLogo';

interface HomeScreenProps {
  onSelectService: (service: ServiceMode) => void;
  onVoicePrompt: (promptText: string) => void;
  onStartVoiceAssistant: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectService,
  onVoicePrompt,
  onStartVoiceAssistant,
}) => {
  return (
    <div className="bg-white border-2 border-stone-200 rounded-3xl shadow-sm p-5 sm:p-7 flex flex-col justify-between space-y-6 font-['Mukta_Malar',sans-serif]">
      {/* Required Main Experience Heading with Artwork Logo */}
      <div className="text-center max-w-2xl mx-auto space-y-3 flex flex-col items-center">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 text-pink-900 text-xs font-black uppercase tracking-wider">
          <Heart className="w-3.5 h-3.5 text-pink-600 fill-pink-600" />
          <span>Women Empowerment & Government Services Guide</span>
        </div>

        {/* Artwork of Woman Rising in Life */}
        <div className="flex items-center justify-center pt-1 pb-1">
          <MudhalPengalLogo size="lg" showText={false} />
        </div>

        <div>
          <div className="flex items-center justify-center gap-2.5 flex-wrap">
            <h2 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight">
              முதல் பெண்கள்
            </h2>
            <span className="text-xs sm:text-sm font-extrabold bg-gradient-to-r from-amber-600 to-rose-600 text-white px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
              Mudhal Pengal
            </span>
          </div>
          <p className="text-sm sm:text-lg font-bold text-amber-950 mt-1.5">
            பெண்கள் வாழ்வில் முன்னேற உதவும் அரசு உதவி திட்டங்கள்
          </p>
        </div>

        <p className="text-xs sm:text-sm font-medium text-stone-600 max-w-xl">
          உங்கள் சொந்த மொழியிலேயே பேசி உங்களுக்கான பேறுகால உதவி, கல்வி உதவித்தொகை, பாதுகாப்பு, தொழில் கடன் உள்ளிட்ட அரசு திட்டங்களை எளிதாக கண்டறியுங்கள்.
        </p>
      </div>

      {/* Role Clarity Badge: AI = Guide, Government website = Authority, Woman = Controls official actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-pink-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
            1
          </div>
          <div>
            <span className="font-extrabold text-stone-900 block">AI = Voice Guide</span>
            <span className="text-stone-500 text-[11px]">வழிகாட்டும் குரல் உதவியாளர்</span>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
            2
          </div>
          <div>
            <span className="font-extrabold text-stone-900 block">Govt Portal = Authority</span>
            <span className="text-stone-500 text-[11px]">இறுதி தகுதி அரசு இணையதளமே</span>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
            3
          </div>
          <div>
            <span className="font-extrabold text-stone-900 block">You = In Control</span>
            <span className="text-stone-500 text-[11px]">நீங்களே சுயமாக பதிவு செய்யுங்கள்</span>
          </div>
        </div>
      </div>

      {/* Primary & Secondary Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* PRIMARY LARGE BUTTON: Find Schemes for Me (The Main Experience) */}
        <div
          onClick={() => onSelectService('find_schemes')}
          className="group relative bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50 hover:from-pink-100 hover:to-orange-100 border-2 border-pink-300 hover:border-pink-500 rounded-3xl p-6 transition-all shadow-sm hover:shadow-md cursor-pointer flex flex-col justify-between space-y-4"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-600 to-rose-700 text-white flex items-center justify-center shadow-md">
                <Search className="w-7 h-7" />
              </div>
              <span className="text-xs font-black bg-pink-200 text-pink-900 px-3 py-1 rounded-full uppercase tracking-wider">
                Primary Option
              </span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-black text-stone-900 group-hover:text-pink-950 transition-colors">
                Find Schemes for Me
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-semibold mt-1">
                எனக்கான அரசு திட்டங்களை கண்டுபிடி
              </p>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              திட்டத்தின் பெயர் தெரியாவிட்டாலும் பரவாயில்லை! உங்கள் வயது, குடும்ப நிலை, அல்லது தேவைகளை கூறினால், உங்களுக்கு பொருத்தமான அரசு திட்டங்களை நாங்கள் கண்டறிந்து சொல்வோம்.
            </p>
          </div>

          <div className="pt-3 flex items-center justify-between text-xs sm:text-sm font-extrabold text-pink-900 border-t border-pink-200/80">
            <span className="flex items-center gap-1.5">
              <span>Start Scheme Finder</span>
              <span className="text-[11px] text-pink-700 font-medium">(குரல் வழிகாட்டல் தொடங்கு)</span>
            </span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </div>
        </div>

        {/* SECONDARY OPTION: PMMVY — Pregnancy & Maternity */}
        <div
          onClick={() => onSelectService('pmmvy')}
          className="group relative bg-gradient-to-br from-amber-50 to-orange-50/70 hover:from-amber-100 hover:to-orange-100 border-2 border-amber-300 hover:border-amber-500 rounded-3xl p-6 transition-all shadow-sm hover:shadow-md cursor-pointer flex flex-col justify-between space-y-4"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-600 to-orange-700 text-white flex items-center justify-center shadow-md">
                <Baby className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold bg-amber-200 text-amber-900 px-3 py-1 rounded-full">
                Maternity Benefit
              </span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-black text-stone-900 group-hover:text-amber-950 transition-colors">
                PMMVY — Pregnancy & Maternity
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-semibold mt-1">
                பிரதான் மந்திரி மாத்ரு வந்தனா யோஜனா
              </p>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              கர்ப்பிணி தாய்மார்களுக்கான ₹5,000 / ₹6,000 நிதியுதவி திட்டத்திற்கான விரிவான வழிகாட்டி மற்றும் அரசு இணையதள சுய-பதிவு உதவி.
            </p>
          </div>

          <div className="pt-3 flex items-center justify-between text-xs sm:text-sm font-extrabold text-amber-900 border-t border-amber-200/80">
            <span>Open PMMVY Step-by-Step Guide</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </div>
        </div>
      </div>

      {/* Prominent "Talk to Assistant" Button */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 text-white p-4 sm:p-5 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3.5 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-pink-500/20 border border-pink-400/40 text-pink-300 flex items-center justify-center shrink-0">
            <Mic className="w-6 h-6 animate-pulse text-pink-400" />
          </div>
          <div>
            <h4 className="font-black text-base sm:text-lg text-white">
              Talk to Assistant (உதவியாளரிடம் பேச தொடங்குங்கள்)
            </h4>
            <p className="text-xs sm:text-sm text-stone-300">
              மைக் பொத்தானை அழுத்தி உங்கள் தாய்மொழியிலேயே நேரடியாக பேசி திட்டங்களை கண்டறியலாம்.
            </p>
          </div>
        </div>

        <button
          onClick={onStartVoiceAssistant}
          className="w-full sm:w-auto bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-extrabold px-6 py-3 rounded-2xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 shrink-0"
        >
          <Mic className="w-5 h-5 animate-bounce" />
          <span>Talk to Assistant</span>
        </button>
      </div>

      {/* Situations Prompt Chips: Women do not need to know the scheme name */}
      <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-xs font-black text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-pink-600" />
            <span>Tell Us Your Situation (உங்கள் நிலையை சொல்லுங்கள்):</span>
          </span>
          <span className="text-[11px] text-stone-500">Click any situation to speak it to the guide</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
          <button
            onClick={() => onVoicePrompt("I am pregnant.")}
            className="p-3 bg-white hover:bg-pink-50 hover:border-pink-300 rounded-xl border border-stone-200 text-left font-semibold text-stone-800 transition-all cursor-pointer shadow-xs flex items-center justify-between"
          >
            <span>"I am pregnant." (கர்ப்பமாக உள்ளேன்)</span>
            <Baby className="w-4 h-4 text-pink-600 shrink-0" />
          </button>

          <button
            onClick={() => onVoicePrompt("I have a small child.")}
            className="p-3 bg-white hover:bg-pink-50 hover:border-pink-300 rounded-xl border border-stone-200 text-left font-semibold text-stone-800 transition-all cursor-pointer shadow-xs flex items-center justify-between"
          >
            <span>"I have a small child." (சிறு குழந்தை உள்ளது)</span>
            <Heart className="w-4 h-4 text-rose-600 shrink-0" />
          </button>

          <button
            onClick={() => onVoicePrompt("I want to find work.")}
            className="p-3 bg-white hover:bg-emerald-50 hover:border-emerald-300 rounded-xl border border-stone-200 text-left font-semibold text-stone-800 transition-all cursor-pointer shadow-xs flex items-center justify-between"
          >
            <span>"I want to find work." (வேலை தேவை)</span>
            <Briefcase className="w-4 h-4 text-emerald-600 shrink-0" />
          </button>

          <button
            onClick={() => onVoicePrompt("I want to start a small business.")}
            className="p-3 bg-white hover:bg-purple-50 hover:border-purple-300 rounded-xl border border-stone-200 text-left font-semibold text-stone-800 transition-all cursor-pointer shadow-xs flex items-center justify-between"
          >
            <span>"Start a small business." (தொழில் தொடங்க)</span>
            <Store className="w-4 h-4 text-purple-600 shrink-0" />
          </button>

          <button
            onClick={() => onVoicePrompt("I am a student.")}
            className="p-3 bg-white hover:bg-blue-50 hover:border-blue-300 rounded-xl border border-stone-200 text-left font-semibold text-stone-800 transition-all cursor-pointer shadow-xs flex items-center justify-between"
          >
            <span>"I am a student." (மாணவி)</span>
            <GraduationCap className="w-4 h-4 text-blue-600 shrink-0" />
          </button>

          <button
            onClick={() => onVoicePrompt("I need financial support.")}
            className="p-3 bg-white hover:bg-amber-50 hover:border-amber-300 rounded-xl border border-stone-200 text-left font-semibold text-stone-800 transition-all cursor-pointer shadow-xs flex items-center justify-between"
          >
            <span>"I need financial support." (நிதியுதவி தேவை)</span>
            <Wallet className="w-4 h-4 text-amber-600 shrink-0" />
          </button>

          <button
            onClick={() => onVoicePrompt("I am a woman and I don't know what government schemes I can get.")}
            className="p-3 bg-white hover:bg-pink-50 hover:border-pink-300 rounded-xl border border-stone-200 text-left font-semibold text-stone-800 transition-all cursor-pointer shadow-xs flex items-center justify-between"
          >
            <span>"What schemes can I get?" (திட்டங்கள் தெரியாது)</span>
            <HelpCircle className="w-4 h-4 text-pink-600 shrink-0" />
          </button>

          <button
            onClick={() => onVoicePrompt("I don't know which scheme is for me.")}
            className="p-3 bg-white hover:bg-indigo-50 hover:border-indigo-300 rounded-xl border border-stone-200 text-left font-semibold text-stone-800 transition-all cursor-pointer shadow-xs flex items-center justify-between"
          >
            <span>"Which scheme is for me?" (எனக்கு எது பொருந்தும்?)</span>
            <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
};
