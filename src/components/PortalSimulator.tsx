import React from 'react';
import { 
  ExternalLink, 
  Lock, 
  Sparkles, 
  Smartphone, 
  AlertCircle,
  Building,
  HelpCircle,
  AlertTriangle,
  UserX,
  PhoneCall,
  UserCheck,
  CheckCircle2
} from 'lucide-react';
import { SchemeInfo } from '../types';

interface PortalSimulatorProps {
  scheme: SchemeInfo;
  currentStepIndex: number;
  onActionCompleted: (actionLabel: string) => void;
  onTargetPointed: (targetName: string) => void;
  onStartGuidance?: () => void;
}

export const PortalSimulator: React.FC<PortalSimulatorProps> = ({
  scheme,
  currentStepIndex,
  onActionCompleted,
}) => {
  return (
    <div className="bg-white border-2 border-amber-300 rounded-2xl shadow-md overflow-hidden flex flex-col h-full font-['Mukta_Malar',sans-serif]">
      {/* Official Government Portal Distinction Header */}
      <div className="bg-stone-900 text-white px-4 py-3 border-b border-stone-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
            Gov
          </div>
          <div>
            <div className="text-[11px] text-amber-300 font-bold uppercase tracking-wider flex items-center gap-1">
              <Building className="w-3 h-3" />
              <span>Ministry of Women and Child Development, Govt of India</span>
            </div>
            <h3 className="text-sm font-extrabold text-stone-100">
              Official PMMVY Website Visual Guide
            </h3>
          </div>
        </div>

        {/* REQUIRED BUTTON: "Open Official PMMVY Portal" */}
        <a
          href="https://pmmvy.wcd.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm px-4 py-2 rounded-xl shadow-md flex items-center gap-2 transition-all active:scale-95 cursor-pointer ring-2 ring-emerald-300"
          title="Opens official government portal in new window"
        >
          <span>Open Official PMMVY Portal</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Clear Disclaimer Ribbon */}
      <div className="bg-amber-100/95 border-b border-amber-300 px-4 py-2 text-xs text-amber-950 flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-amber-800 shrink-0" />
        <span className="leading-snug">
          <strong>Notice:</strong> This is a <strong>Voice Guide</strong>, NOT the government website. When you click the green button above, you move to the official government portal <strong>pmmvy.wcd.gov.in</strong>.
        </span>
      </div>

      {/* Visual Guide Body */}
      <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4 bg-gradient-to-b from-stone-50 to-amber-50/20">

        {/* CRITICAL WARNING CARD: Normal Login vs New Citizen Registration */}
        <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-red-950 font-bold text-xs sm:text-sm">
            <UserX className="w-5 h-5 text-red-600 shrink-0" />
            <span>IMPORTANT: Normal Login Page is NOT for New Citizens!</span>
          </div>
          <p className="text-xs text-stone-700 leading-relaxed">
            The official PMMVY website has a regular login form with <strong>User ID, Password, and CAPTCHA</strong>. 
            <span className="text-red-700 font-bold block mt-1">
              ⚠️ If you are a new citizen without an account, DO NOT enter User ID or Password here! This page is only for existing account holders.
            </span>
          </p>
        </div>

        {/* What to look for on official homepage */}
        <div className="bg-white border-2 border-amber-300 rounded-xl p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-stone-900 text-sm sm:text-base flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-emerald-700" />
              <span>What to look for on official pmmvy.wcd.gov.in:</span>
            </h4>
            <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
              Citizen Flow
            </span>
          </div>

          <p className="text-xs text-stone-600 leading-relaxed">
            Look for a dedicated option on the official website labeled:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-950 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>"Citizen Login"</span>
            </div>
            <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-950 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>"New User / Register"</span>
            </div>
          </div>
        </div>

        {/* Fallback Helpline Card if Citizen Login is not visible */}
        <div className="bg-sky-50 border-2 border-sky-300 rounded-xl p-4 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sky-950 text-xs sm:text-sm flex items-center gap-1.5">
              <PhoneCall className="w-4 h-4 text-sky-700" />
              <span>Can't find Citizen Login on the page?</span>
            </h4>
            <a
              href="tel:1515"
              className="bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs px-3 py-1 rounded-lg"
            >
              Call 1515
            </a>
          </div>

          <p className="text-xs text-sky-900 leading-relaxed">
            If the current live website does not visibly expose the Citizen Registration button, 
            <strong> do not click the normal User ID/Password Login button</strong>. 
            Instead, call the official PMMVY multilingual helpline <strong>1515</strong> to confirm the current citizen route, or visit your local Anganwadi center.
          </p>
        </div>

        {/* Official Website Quick Link Card */}
        <div className="p-4 bg-emerald-50/70 border border-emerald-300 rounded-xl flex items-center justify-between gap-3 text-xs text-emerald-950">
          <div>
            <span className="font-bold block text-sm">Ready to check the official site?</span>
            <span className="text-stone-600 text-xs">Opens pmmvy.wcd.gov.in in a separate browser tab</span>
          </div>
          <a
            href="https://pmmvy.wcd.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl text-xs shrink-0 flex items-center gap-1.5"
          >
            <span>Open Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
};
