import React from 'react';
import { FileText, CheckCircle2, AlertCircle, ExternalLink, Shield } from 'lucide-react';
import { SchemeInfo } from '../types';

interface DocumentChecklistProps {
  scheme: SchemeInfo;
  onAskForHelp: (docName: string) => void;
}

export const DocumentChecklist: React.FC<DocumentChecklistProps> = ({ scheme, onAskForHelp }) => {
  return (
    <div className="bg-white border border-amber-200 rounded-2xl p-4 shadow-sm font-['Mukta_Malar',sans-serif]">
      <div className="flex items-center justify-between mb-3 border-b border-amber-100 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-stone-900 text-sm sm:text-base">
              PMMVY விண்ணப்பத்திற்கு தேவையான காகித ஆவணங்கள்
            </h3>
            <p className="text-xs text-stone-500">
              இவற்றை உங்கள் மேஜையில் கைவசம் எடுத்து வைத்துக் கொள்ளுங்கள்
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {scheme.documentsNeeded.map((doc, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-2.5 bg-amber-50/50 hover:bg-amber-100/50 rounded-xl border border-amber-100/80 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span className="text-xs sm:text-sm font-semibold text-stone-800">{doc}</span>
            </div>
            <button
              onClick={() => onAskForHelp(doc)}
              className="text-[11px] text-amber-900 hover:text-amber-950 bg-white hover:bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-200 transition-colors font-bold cursor-pointer shrink-0"
              title="இதைக் குறித்து குரல் வழிகாட்டியிடம் கேட்க"
            >
              விளக்கம்
            </button>
          </div>
        ))}
      </div>

      <div className="mt-3.5 p-2.5 bg-sky-50 border border-sky-200 rounded-xl flex items-start gap-2 text-xs text-sky-900">
        <Shield className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">பாதுகாப்பு நினைவூட்டல்:</span> இந்த ஆவணங்களை யாரிடமும் கொடுக்க வேண்டியதில்லை. அதில் உள்ள எண்களை அதிகாரப்பூர்வ PMMVY அரசு இணையதளத்தில் பார்த்து நீங்களே டைப் செய்ய மட்டுமே பயன்படும்.
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-stone-600 pt-2 border-t border-amber-100">
        <span className="text-stone-500">அதிகாரப்பூர்வ மத்திய அரசு தளம்:</span>
        <a
          href="https://pmmvy.wcd.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-800 hover:text-amber-950 font-bold inline-flex items-center gap-1 underline underline-offset-2"
        >
          pmmvy.wcd.gov.in
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};
