import React, { useState } from 'react';
import { 
  Building2, 
  HelpCircle, 
  PhoneCall, 
  Sparkles, 
  FileCheck2, 
  Monitor, 
  Mic, 
  ShieldCheck, 
  HeartHandshake,
  MapPin,
  ExternalLink,
  Info,
  Search,
  Baby,
  Home as HomeIcon,
  Globe
} from 'lucide-react';
import { PMMVY_SCHEME } from './data/schemes';
import { SafetyBanner } from './components/SafetyBanner';
import { VoiceCompanion } from './components/VoiceCompanion';
import { PortalSimulator } from './components/PortalSimulator';
import { DocumentChecklist } from './components/DocumentChecklist';
import { HomeScreen } from './components/HomeScreen';
import { MySchemeGuide } from './components/MySchemeGuide';
import { MudhalPengalLogo } from './components/MudhalPengalLogo';
import { ServiceMode } from './types';

export default function App() {
  const selectedScheme = PMMVY_SCHEME;
  const [serviceMode, setServiceMode] = useState<ServiceMode>('home');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(1);
  const [activeMobileTab, setActiveMobileTab] = useState<'voice' | 'screen' | 'docs'>('voice');
  const [showPmmvyHelpModal, setShowPmmvyHelpModal] = useState<boolean>(false);
  const [externalVoicePrompt, setExternalVoicePrompt] = useState<string | null>(null);

  const handleTriggerVoicePrompt = (promptText: string) => {
    setExternalVoicePrompt(promptText);
    setActiveMobileTab('voice');
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col font-['Mukta_Malar',sans-serif]">
      {/* Top Navigation Bar */}
      <header className="bg-stone-900 text-white border-b-2 border-stone-800 shadow-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Logo & Branding - முதல் பெண்கள் (Mudhal Pengal) */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setServiceMode('home')}>
            <MudhalPengalLogo size="md" showText={true} textColor="white" />
          </div>

          {/* Service Switcher Tabs in Header */}
          <div className="flex items-center bg-stone-800 p-1 rounded-xl border border-stone-700">
            <button
              onClick={() => setServiceMode('home')}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                serviceMode === 'home'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-stone-300 hover:text-white hover:bg-stone-700'
              }`}
            >
              <HomeIcon className="w-3.5 h-3.5" />
              <span>Home (முகப்பு)</span>
            </button>

            <button
              onClick={() => setServiceMode('pmmvy')}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                serviceMode === 'pmmvy'
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'text-stone-300 hover:text-white hover:bg-stone-700'
              }`}
            >
              <Baby className="w-3.5 h-3.5 text-amber-300" />
              <span>PMMVY</span>
            </button>

            <button
              onClick={() => setServiceMode('myscheme')}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                serviceMode === 'myscheme' || serviceMode === 'find_schemes'
                  ? 'bg-pink-700 text-white shadow-xs'
                  : 'text-stone-300 hover:text-white hover:bg-stone-700'
              }`}
            >
              <Search className="w-3.5 h-3.5 text-pink-300" />
              <span>Find Schemes for Me</span>
            </button>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {serviceMode === 'myscheme' || serviceMode === 'find_schemes' ? (
              <a
                href="https://www.myscheme.gov.in/ta"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors shadow-sm ring-1 ring-emerald-300"
                title="Open Official myScheme (myscheme.gov.in/ta)"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Open Official myScheme</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <a
                href="https://pmmvy.wcd.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors shadow-sm ring-1 ring-emerald-300"
                title="Open Official PMMVY Portal (pmmvy.wcd.gov.in)"
              >
                <span>Open Official PMMVY Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {/* Official Helpline 1515 */}
            <a
              href="tel:1515"
              className="bg-blue-700 hover:bg-blue-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
              title="Official PMMVY Multilingual Helpline 1515"
            >
              <PhoneCall className="w-3.5 h-3.5 text-blue-200" />
              <span>Helpline 1515</span>
            </a>

            {/* Field Help Modal Button */}
            <button
              onClick={() => setShowPmmvyHelpModal(true)}
              className="bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white px-3 py-1.5 rounded-xl text-xs font-bold border border-stone-700 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Anganwadi & Field Help"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">Anganwadi Support</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto w-full p-3 sm:p-5 flex-1 flex flex-col gap-4">
        {/* Safety & Voice Guide Identity Banner */}
        <SafetyBanner />

        {/* Mobile View Switcher Tabs */}
        <div className="lg:hidden flex bg-white p-1 rounded-xl border border-stone-200 shadow-sm">
          <button
            onClick={() => setActiveMobileTab('voice')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeMobileTab === 'voice'
                ? 'bg-amber-700 text-white shadow-sm'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span>Voice Guide</span>
          </button>
          <button
            onClick={() => setActiveMobileTab('screen')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeMobileTab === 'screen'
                ? 'bg-amber-700 text-white shadow-sm'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span>
              {serviceMode === 'home'
                ? 'Services Menu'
                : (serviceMode === 'myscheme' || serviceMode === 'find_schemes')
                ? 'Schemes Guide'
                : 'Portal Simulator'}
            </span>
          </button>
          {serviceMode === 'pmmvy' && (
            <button
              onClick={() => setActiveMobileTab('docs')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                activeMobileTab === 'docs'
                  ? 'bg-amber-700 text-white shadow-sm'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Required Documents</span>
            </button>
          )}
        </div>

        {/* Dual-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 items-stretch">
          {/* Left Column: Voice Assistant Companion */}
          <div
            className={`lg:col-span-6 flex flex-col h-[700px] lg:h-[750px] ${
              activeMobileTab === 'voice' ? 'block' : 'hidden lg:flex'
            }`}
          >
            <VoiceCompanion
              currentScheme={selectedScheme}
              onSchemeChange={() => {}}
              currentStepIndex={currentStepIndex}
              setCurrentStepIndex={setCurrentStepIndex}
              serviceMode={serviceMode}
              onServiceModeChange={(mode) => setServiceMode(mode)}
              externalVoicePrompt={externalVoicePrompt}
              onClearExternalVoicePrompt={() => setExternalVoicePrompt(null)}
            />
          </div>

          {/* Right Column: Home Screen OR PMMVY Official Portal Visual Guide OR myScheme Guide */}
          <div
            className={`lg:col-span-6 flex flex-col gap-4 h-[700px] lg:h-[750px] ${
              activeMobileTab === 'screen'
                ? 'block'
                : activeMobileTab === 'docs'
                ? 'block'
                : 'hidden lg:flex'
            }`}
          >
            {serviceMode === 'home' ? (
              <div className="h-full overflow-y-auto">
                <HomeScreen
                  onSelectService={(service) => {
                    const target = (service === 'find_schemes' || service === 'myscheme') ? 'myscheme' : service;
                    setServiceMode(target);
                    if (target === 'myscheme') {
                      handleTriggerVoicePrompt('I am a woman and I want to know what schemes are available for me.');
                    } else if (target === 'pmmvy') {
                      handleTriggerVoicePrompt('Start PMMVY Guidance');
                    }
                  }}
                  onVoicePrompt={(promptText) => {
                    handleTriggerVoicePrompt(promptText);
                  }}
                  onStartVoiceAssistant={() => {
                    setActiveMobileTab('voice');
                    handleTriggerVoicePrompt('I am a woman and I want to know what schemes are available for me.');
                  }}
                />
              </div>
            ) : (serviceMode === 'myscheme' || serviceMode === 'find_schemes') ? (
              <div className="h-full overflow-hidden">
                <MySchemeGuide
                  onBackToHome={() => setServiceMode('home')}
                  onAskQuestionInVoice={(questionText) => {
                    handleTriggerVoicePrompt(questionText);
                  }}
                />
              </div>
            ) : activeMobileTab === 'docs' ? (
              <div className="h-full overflow-y-auto">
                <DocumentChecklist
                  scheme={selectedScheme}
                  onAskForHelp={() => {
                    setActiveMobileTab('voice');
                  }}
                />
              </div>
            ) : (
              <div className="flex flex-col h-full gap-4">
                <div className="flex-1 min-h-[460px]">
                  <PortalSimulator
                    scheme={selectedScheme}
                    currentStepIndex={currentStepIndex}
                    onActionCompleted={() => {
                      if (currentStepIndex < selectedScheme.sampleSteps.length) {
                        setCurrentStepIndex(currentStepIndex + 1);
                      }
                    }}
                    onTargetPointed={() => {}}
                  />
                </div>

                <div className="shrink-0 hidden sm:block">
                  <DocumentChecklist
                    scheme={selectedScheme}
                    onAskForHelp={() => {
                      setActiveMobileTab('voice');
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* PMMVY Official Anganwadi & Helpline Modal */}
      {showPmmvyHelpModal && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-amber-200 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-stone-900 text-base sm:text-lg">
                    Official Support & Helplines
                  </h3>
                  <p className="text-xs text-stone-500">
                    If you cannot register online or need assistance
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPmmvyHelpModal(false)}
                className="text-stone-400 hover:text-stone-700 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-stone-700 text-xs sm:text-sm">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 leading-relaxed">
                <p className="font-bold text-amber-950 mb-1">
                  அம்மா, ஆன்லைனில் சொந்தமாக பதிவு செய்ய வழி தெரியவில்லை என்றால்:
                </p>
                <p className="text-stone-700">
                  நீங்கள் எந்த கட்டணமும் செலுத்தாமல் உங்கள் பகுதி <strong>அங்கன்வாடி பணியாளர் (Anganwadi Worker - AWW)</strong> அல்லது <strong>ஆஷா பணியாளர் (ASHA Worker)</strong> மூலமாகவும் உங்கள் அசல் ஆவணங்களை சமர்ப்பித்து இலவசமாக பதிவு செய்து கொள்ளலாம்.
                </p>
              </div>

              <div className="border border-stone-200 rounded-xl p-3 space-y-2">
                <div className="font-bold text-stone-900 text-xs uppercase tracking-wider">
                  Official Government Helplines
                </div>
                <div className="flex items-center justify-between text-xs py-1.5 border-b border-stone-100">
                  <span className="font-medium">PMMVY Multilingual Helpline:</span>
                  <a href="tel:1515" className="font-bold text-blue-700 text-sm hover:underline">1515</a>
                </div>
                <div className="flex items-center justify-between text-xs py-1.5 border-b border-stone-100">
                  <span className="font-medium">National Women Helpline:</span>
                  <a href="tel:181" className="font-bold text-pink-700 text-sm hover:underline">181</a>
                </div>
                <div className="flex items-center justify-between text-xs py-1.5">
                  <span className="font-medium">Official Government Portals:</span>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://pmmvy.wcd.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-amber-800 underline flex items-center gap-1"
                    >
                      PMMVY
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href="https://www.myscheme.gov.in/ta"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-emerald-800 underline flex items-center gap-1"
                    >
                      myScheme
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setShowPmmvyHelpModal(false)}
                className="bg-amber-800 hover:bg-amber-900 text-white font-bold px-5 py-2 rounded-xl text-xs sm:text-sm cursor-pointer"
              >
                Close (மூடுக)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-stone-200/80 border-t border-stone-300 py-3.5 px-4 text-center text-xs text-stone-600">
        <p className="font-semibold text-stone-700">
          முதல் பெண்கள் (Mudhal Pengal) • பெண்கள் முன்னேற்றத்திற்கான அரசு சேவைகள் தமிழ் குரல் வழிகாட்டி
        </p>
        <p className="text-[11px] text-stone-500 mt-0.5">
          Official Government Portals: pmmvy.wcd.gov.in • myscheme.gov.in • scholarships.gov.in • Women Helpline: 181 • PMMVY: 1515
        </p>
      </footer>
    </div>
  );
}
