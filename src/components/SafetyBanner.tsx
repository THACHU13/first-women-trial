import React from 'react';
import { ShieldCheck, AlertTriangle, EyeOff, Lock, ExternalLink, Sparkles } from 'lucide-react';

export const SafetyBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100 border-2 border-amber-300 rounded-2xl p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-700 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5 font-bold">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-extrabold text-amber-950 text-sm sm:text-base flex items-center gap-1.5">
              <span>முக்கிய அறிவிப்பு & பாதுகாப்பு உறுதிமொழி</span>
              <span className="text-xs bg-amber-200 text-amber-900 px-2.5 py-0.5 rounded-full font-bold">
                குரல் வழிகாட்டி மட்டுமே
              </span>
            </h4>
          </div>

          <div className="mt-1 text-stone-800 text-xs sm:text-sm leading-relaxed space-y-1">
            <p>
              • <strong>இது அரசு இணையதளம் அல்ல:</strong> இந்த செயலி உங்களுக்கு வழிகாட்ட உதவும் <strong>குரல் வழிகாட்டி (Voice Guide)</strong> மட்டுமே.
            </p>
            <p>
              • <strong>அதிகாரப்பூர்வ PMMVY இணையதளம்:</strong> நீங்கள் மத்திய அரசின் 
              <a
                href="https://pmmvy.wcd.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-900 font-bold underline mx-1 inline-flex items-center gap-0.5 hover:text-orange-950"
              >
                pmmvy.wcd.gov.in
                <ExternalLink className="w-3 h-3 inline" />
              </a>
              என்ற அதிகாரப்பூர்வ தளத்திலேயே அனைத்து தகவல்களையும் சுயமாக பதிவு செய்ய வேண்டும்.
            </p>
            <p className="text-red-800 font-bold">
              • OTP, கடவுச்சொல், ஆதார் எண், வங்கி எண் அல்லது முக அங்கீகாரத்தை யாரிடமும் பகிராதீர்கள். அரசு இணையதளத்தில் நீங்களே நேரடியாக பதிவு செய்யுங்கள்.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3 pt-2 border-t border-amber-200/80 text-xs text-amber-900 font-medium">
            <div className="flex items-center gap-1.5">
              <EyeOff className="w-4 h-4 text-amber-700 shrink-0" />
              <span>OTP / ரகசிய எண்கள் கேட்கப்படாது</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-amber-700 shrink-0" />
              <span>ஆவண பதிவேற்றம் இங்கு இல்லை</span>
            </div>
            <div className="flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>இறுதி முடிவு அரசு இணையதளத்துக்கே உரியது</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
