import React, { useState } from 'react';
import { 
  ExternalLink, 
  Sparkles, 
  HelpCircle, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle2, 
  Building, 
  Search, 
  ChevronRight, 
  ArrowLeft,
  Filter,
  ShieldCheck,
  Globe,
  Radio,
  Layers,
  Heart,
  Calendar,
  Check,
  Volume2
} from 'lucide-react';
import { VERIFIED_WOMEN_SCHEMES } from '../data/womenSchemes';
import { WomenScheme } from '../types';

interface SchemeDiscoveryGuideProps {
  onBackToHome: () => void;
  onAskQuestionInVoice: (questionText: string) => void;
  selectedSchemeId?: string | null;
}

export const MySchemeGuide: React.FC<SchemeDiscoveryGuideProps> = ({
  onBackToHome,
  onAskQuestionInVoice,
  selectedSchemeId,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [websiteErrorSimulation, setWebsiteErrorSimulation] = useState<boolean>(false);
  const [isCheckingWebsite, setIsCheckingWebsite] = useState<boolean>(false);
  const [expandedSchemeId, setExpandedSchemeId] = useState<string | null>(selectedSchemeId || null);

  const filteredSchemes = VERIFIED_WOMEN_SCHEMES.filter((scheme) => {
    if (selectedCategory === 'all') return true;
    return scheme.category === selectedCategory;
  });

  const handleCheckWebsiteAgain = () => {
    setIsCheckingWebsite(true);
    setTimeout(() => {
      setIsCheckingWebsite(false);
      setWebsiteErrorSimulation(false);
    }, 1500);
  };

  return (
    <div className="bg-white border-2 border-pink-200 rounded-3xl shadow-sm overflow-hidden flex flex-col h-full font-['Mukta_Malar',sans-serif]">
      {/* Top Header */}
      <div className="bg-stone-900 text-white px-4 py-3 border-b border-stone-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onBackToHome}
            className="text-stone-300 hover:text-white p-1 rounded-lg hover:bg-stone-800 transition-colors cursor-pointer mr-1"
            title="Back to Main Screen"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-600 to-rose-600 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
            மக
          </div>
          <div>
            <div className="text-[11px] text-pink-300 font-bold uppercase tracking-wider flex items-center gap-1">
              <Heart className="w-3 h-3 fill-pink-400 text-pink-400" />
              <span>Verified Women's Scheme Knowledge Base</span>
            </div>
            <h3 className="text-sm sm:text-base font-extrabold text-stone-100">
              Government Schemes for Women
            </h3>
          </div>
        </div>

        {/* Official Discovery Platform Links */}
        <div className="flex items-center gap-2 flex-wrap">
          <a
            href="https://www.myscheme.gov.in/ta"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onAskQuestionInVoice('இப்போது நீங்கள் official myScheme தளத்திற்கு செல்கிறீர்கள்.')}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-xs flex items-center gap-1.5 transition-all ring-1 ring-emerald-300"
            title="Search all national schemes on official myScheme portal"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Open myScheme (National Portal)</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Authority & Disclaimer Notice */}
      <div className="bg-pink-50/80 border-b border-pink-200 px-4 py-2.5 text-xs text-pink-950 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-pink-700 shrink-0" />
          <span>
            <strong>Official Authority Rule:</strong> This AI application is an independent voice navigation guide. The official government portals determine actual eligibility, authentication, and application processing.
          </span>
        </div>
        <button
          onClick={onBackToHome}
          className="text-pink-800 hover:text-pink-950 font-bold underline cursor-pointer text-xs shrink-0"
        >
          Main Menu
        </button>
      </div>

      {/* Website Error / 502 Simulation Banner */}
      {websiteErrorSimulation && (
        <div className="bg-amber-100 border-b border-amber-300 p-3 text-xs text-amber-950 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
            <div>
              <span className="font-bold block">
                Official government website இப்போது open ஆகவில்லை. Temporary technical problem இருக்கலாம் (502 / Server Error).
              </span>
              <span className="text-stone-600">Please try again after a few minutes or click the check button below.</span>
            </div>
          </div>
          <button
            onClick={handleCheckWebsiteAgain}
            disabled={isCheckingWebsite}
            className="bg-amber-800 hover:bg-amber-900 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 shrink-0 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isCheckingWebsite ? 'animate-spin' : ''}`} />
            <span>Check Again</span>
          </button>
        </div>
      )}

      {/* Scheme Discovery Categories & Filters */}
      <div className="p-3 bg-stone-50 border-b border-stone-200 flex items-center justify-between gap-2 overflow-x-auto text-xs">
        <div className="flex items-center gap-1.5 font-bold text-stone-700 shrink-0">
          <Filter className="w-3.5 h-3.5 text-pink-700" />
          <span>Categories:</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-full font-bold cursor-pointer transition-all ${
              selectedCategory === 'all'
                ? 'bg-pink-700 text-white shadow-xs'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            All Schemes ({VERIFIED_WOMEN_SCHEMES.length})
          </button>
          <button
            onClick={() => setSelectedCategory('pregnancy_maternity')}
            className={`px-3 py-1.5 rounded-full font-bold cursor-pointer transition-all ${
              selectedCategory === 'pregnancy_maternity'
                ? 'bg-pink-700 text-white shadow-xs'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            Pregnancy & Maternity
          </button>
          <button
            onClick={() => setSelectedCategory('livelihood_work')}
            className={`px-3 py-1.5 rounded-full font-bold cursor-pointer transition-all ${
              selectedCategory === 'livelihood_work'
                ? 'bg-pink-700 text-white shadow-xs'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            Work & Livelihood
          </button>
          <button
            onClick={() => setSelectedCategory('business_entrepreneurship')}
            className={`px-3 py-1.5 rounded-full font-bold cursor-pointer transition-all ${
              selectedCategory === 'business_entrepreneurship'
                ? 'bg-pink-700 text-white shadow-xs'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            Business Loans
          </button>
          <button
            onClick={() => setSelectedCategory('education_skills')}
            className={`px-3 py-1.5 rounded-full font-bold cursor-pointer transition-all ${
              selectedCategory === 'education_skills'
                ? 'bg-pink-700 text-white shadow-xs'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            Girls & Education
          </button>
          <button
            onClick={() => setSelectedCategory('financial_social')}
            className={`px-3 py-1.5 rounded-full font-bold cursor-pointer transition-all ${
              selectedCategory === 'financial_social'
                ? 'bg-pink-700 text-white shadow-xs'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            Social Support
          </button>
        </div>
      </div>

      {/* Scheme Cards Stream */}
      <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4 bg-stone-50/50">
        {/* Intro Banner */}
        <div className="p-3.5 bg-gradient-to-r from-pink-50 to-orange-50 border border-pink-200 rounded-2xl text-xs text-pink-950 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-pink-700 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold">எப்படி பயன்படும்:</span> நீங்கள் குரல் உதவியாளரிடம் உங்கள் நிலையை (வயது, மாநிலம், வேலை, கர்ப்பம் போன்றவை) கூறும்போது, இந்த சரிபார்க்கப்பட்ட அரசு திட்டங்களிலிருந்து உங்களுக்கு பொருத்தமானதை சுருக்கமாக எடுத்துரைக்கும்.
          </div>
        </div>

        {/* Scheme List Cards */}
        {filteredSchemes.map((scheme) => {
          const isExpanded = expandedSchemeId === scheme.id;
          return (
            <div
              key={scheme.id}
              className={`bg-white border-2 rounded-2xl p-4 sm:p-5 shadow-xs transition-all space-y-3 ${
                isExpanded ? 'border-pink-500 ring-2 ring-pink-100' : 'border-stone-200 hover:border-pink-300'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[11px] font-extrabold text-pink-800 bg-pink-100 px-2.5 py-0.5 rounded-full inline-block mb-1.5">
                    {scheme.categoryLabel}
                  </span>
                  <h4 className="font-black text-stone-900 text-base sm:text-lg leading-snug">
                    {scheme.officialName}
                  </h4>
                  <p className="text-xs text-stone-600 font-bold mt-0.5">
                    {scheme.nameTa}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
                  <button
                    onClick={() => {
                      onAskQuestionInVoice(`${scheme.officialName} பற்றி மிக எளிய பேச்சுத் தமிழில் எனக்கு சொல்லித் தர முடியுமா?`);
                    }}
                    className="bg-pink-100 hover:bg-pink-200 text-pink-900 font-extrabold text-xs px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Ask AI Voice Guide to explain this scheme in spoken Tamil"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-pink-700" />
                    <span className="hidden sm:inline">Explain</span>
                  </button>

                  {scheme.eligibilityUrl && (
                    <a
                      href={scheme.eligibilityUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-300 font-extrabold text-xs px-2.5 py-1.5 rounded-xl flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
                      title="Check official eligibility"
                    >
                      <span>[Check Eligibility]</span>
                      <ExternalLink className="w-3 h-3 text-blue-700" />
                    </a>
                  )}

                  {scheme.applicationUrl && (
                    <a
                      href={scheme.applicationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
                      title="Apply on official government portal"
                    >
                      <span>[How to Apply]</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                  <a
                    href={scheme.officialWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-pink-700 hover:bg-pink-800 text-white font-extrabold text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                    title="Open official government website"
                  >
                    <span>[Open Official Website]</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Simple Description */}
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                {scheme.simpleDescriptionTa}
              </p>

              {/* Key Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                  <span className="font-extrabold text-stone-900 block text-[11px] uppercase tracking-wider mb-1 text-pink-950">
                    முக்கிய பயன் (Major Benefit):
                  </span>
                  <span className="text-stone-700 font-medium">{scheme.majorBenefitTa}</span>
                </div>

                <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                  <span className="font-extrabold text-stone-900 block text-[11px] uppercase tracking-wider mb-1 text-pink-950">
                    யாருக்காக (Who It Is For):
                  </span>
                  <span className="text-stone-700 font-medium">{scheme.whoItIsForTa}</span>
                </div>
              </div>

              {/* Expandable Details Section */}
              {isExpanded ? (
                <div className="pt-3 border-t border-stone-200 space-y-3 text-xs">
                  <div>
                    <span className="font-black text-stone-900 block mb-1 text-[11px] uppercase tracking-wider">
                      முக்கிய தகுதி வரம்புகள் (Important Eligibility Factors):
                    </span>
                    <ul className="space-y-1 text-stone-700">
                      {scheme.importantEligibilityTa.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200 text-stone-800">
                    <span className="font-black text-amber-950 block mb-0.5">
                      விண்ணப்பிக்கும் முறை (Application Method):
                    </span>
                    <p>{scheme.applicationMethodTa}</p>
                  </div>

                  {/* Verification & Official Source Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-500 pt-2 border-t border-stone-100">
                    <div className="flex items-center gap-1.5">
                      <Building className="w-3 h-3 text-stone-600" />
                      <span>{scheme.officialDepartment}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <a
                        href={scheme.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-800 hover:text-pink-950 underline font-semibold flex items-center gap-1"
                      >
                        Official Government Source
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <span className="text-stone-400">Verified: {scheme.lastVerifiedDate}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <button
                      onClick={() => setExpandedSchemeId(null)}
                      className="text-xs font-bold text-stone-500 hover:text-stone-800 cursor-pointer"
                    >
                      Hide Details (குறைக்கவும்) ▲
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between text-xs pt-1 border-t border-stone-100">
                  <span className="text-[11px] text-stone-500">
                    {scheme.officialDepartment}
                  </span>
                  <button
                    onClick={() => setExpandedSchemeId(scheme.id)}
                    className="text-pink-700 hover:text-pink-900 font-bold text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Eligibility & Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {/* Fallback to myScheme Notice */}
        <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-2xl text-xs text-stone-700 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span className="font-bold text-emerald-950 block text-sm">
              தேவையான திட்டம் இதில் இல்லையா? (Need More Schemes?)
            </span>
            <span>
              மத்திய மற்றும் மாநில அரசுகளின் 1,000+ திட்டங்களை myScheme அதிகாரப்பூர்வ தளத்தில் தேடலாம்.
            </span>
          </div>
          <a
            href="https://www.myscheme.gov.in/ta"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl shrink-0 flex items-center gap-1.5 transition-colors"
          >
            <span>Search on myScheme</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Test Website Error Button (for testing 502 handling) */}
        <div className="pt-2 flex items-center justify-between text-xs text-stone-500">
          <span>Website status: Operational</span>
          <button
            onClick={() => setWebsiteErrorSimulation(!websiteErrorSimulation)}
            className="text-[11px] text-stone-500 hover:text-stone-800 underline cursor-pointer"
          >
            {websiteErrorSimulation ? 'Clear 502 Simulation' : 'Test 502 / Offline Alert'}
          </button>
        </div>
      </div>
    </div>
  );
};
