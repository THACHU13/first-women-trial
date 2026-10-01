import React from 'react';

interface MudhalPengalLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showText?: boolean;
  textColor?: 'dark' | 'white';
  className?: string;
}

export const MudhalPengalLogo: React.FC<MudhalPengalLogoProps> = ({
  size = 'md',
  showText = false,
  textColor = 'white',
  className = '',
}) => {
  // Dimension presets
  const dim = {
    sm: { icon: 36, textTitle: 'text-base', textSub: 'text-[10px]' },
    md: { icon: 48, textTitle: 'text-lg', textSub: 'text-[11px]' },
    lg: { icon: 64, textTitle: 'text-2xl', textSub: 'text-xs' },
    hero: { icon: 100, textTitle: 'text-3xl sm:text-4xl', textSub: 'text-sm' },
  }[size];

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Artwork Emblem of Woman Rising in Life */}
      <div 
        className="relative shrink-0 rounded-2xl overflow-hidden shadow-lg p-0.5 bg-gradient-to-br from-amber-400 via-rose-500 to-amber-700 transition-transform duration-300 hover:scale-105"
        style={{ width: dim.icon, height: dim.icon }}
      >
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full rounded-[14px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="முதல் பெண்கள் - Logo artwork of woman rising and progressing in life"
        >
          <defs>
            {/* Sky Dawn Gradient */}
            <linearGradient id="mpSkyGrad" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#4A0E17" />
              <stop offset="35%" stopColor="#881337" />
              <stop offset="70%" stopColor="#BE123C" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>

            {/* Rising Sun Glow Gradient */}
            <radialGradient id="mpSunGlow" cx="60" cy="55" r="50" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#F59E0B" stopOpacity="0.7" />
              <stop offset="80%" stopColor="#E11D48" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#BE123C" stopOpacity="0" />
            </radialGradient>

            {/* Woman Silhouette Gradient */}
            <linearGradient id="mpWomanGrad" x1="45" y1="25" x2="85" y2="105" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFBEB" />
              <stop offset="50%" stopColor="#FED7AA" />
              <stop offset="100%" stopColor="#FDBA74" />
            </linearGradient>

            {/* Lotus Blossom Gradient */}
            <linearGradient id="mpLotusGrad" x1="30" y1="90" x2="90" y2="115" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FDA4AF" />
              <stop offset="50%" stopColor="#FB7185" />
              <stop offset="100%" stopColor="#F43F5E" />
            </linearGradient>

            {/* Gold Halo Glow */}
            <linearGradient id="mpGoldAccent" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>

          {/* Background Canvas */}
          <rect width="120" height="120" rx="14" fill="url(#mpSkyGrad)" />

          {/* Radiant Sun of Hope and Dawn */}
          <circle cx="62" cy="52" r="38" fill="url(#mpSunGlow)" />

          {/* Dawn Radiance Rays */}
          <g stroke="#FEF08A" strokeWidth="1" strokeOpacity="0.35" strokeDasharray="2 3">
            <line x1="62" y1="12" x2="62" y2="24" />
            <line x1="90" y1="24" x2="82" y2="33" />
            <line x1="102" y1="52" x2="90" y2="52" />
            <line x1="90" y1="80" x2="82" y2="72" />
            <line x1="34" y1="24" x2="42" y2="33" />
            <line x1="22" y1="52" x2="34" y2="52" />
          </g>

          {/* Soaring Bird 1 (Progress & Freedom) */}
          <path
            d="M 88 28 Q 93 24 98 25 Q 94 27 92 30 Q 94 32 99 35 Q 92 33 88 28 Z"
            fill="#FEF3C7"
            opacity="0.9"
          />

          {/* Soaring Bird 2 (Higher aspiration) */}
          <path
            d="M 74 18 Q 78 15 82 16 Q 79 18 77 20 Q 79 22 83 24 Q 78 22 74 18 Z"
            fill="#FDE68A"
            opacity="0.8"
          />

          {/* Woman's Graceful Profile Looking Upward to the Dawn */}
          {/* Hair bun with jasmine flower garland */}
          <circle cx="43" cy="50" r="14" fill="#1C1917" />
          {/* Jasmine blossoms in hair */}
          <circle cx="34" cy="46" r="3.2" fill="#FEF9C3" />
          <circle cx="36" cy="41" r="3" fill="#FEF9C3" />
          <circle cx="41" cy="38" r="3" fill="#FEF9C3" />
          <circle cx="34" cy="52" r="2.8" fill="#FEF9C3" />
          <circle cx="37" cy="57" r="2.8" fill="#FEF9C3" />

          {/* Head & Neck Profile */}
          <path
            d="M 45 42
               C 49 32, 60 30, 66 36
               C 69 39, 70 43, 67 47
               C 70 48, 72 50, 71 52
               C 69 53, 67 54, 68 56
               C 70 58, 67 60, 63 60
               C 61 63, 58 66, 60 74
               C 56 75, 52 74, 49 71
               C 47 67, 45 61, 45 54
               Z"
            fill="url(#mpWomanGrad)"
          />

          {/* Vermilion Bindi (Thilagam / பொட்டு) */}
          <circle cx="65" cy="42" r="1.8" fill="#BE123C" />

          {/* Saree & Torso - Flourishing with Dignity */}
          <path
            d="M 46 72
               C 40 76, 32 86, 28 105
               C 42 107, 78 107, 92 105
               C 88 88, 76 77, 60 73
               C 56 72, 50 72, 46 72
               Z"
            fill="#FFF1F2"
            opacity="0.95"
          />

          {/* Saree Pallu / Border Accent in Golden Crimson */}
          <path
            d="M 46 72
               C 52 80, 60 92, 65 106
               C 68 106, 73 106, 75 105
               C 70 91, 62 79, 56 73
               Z"
            fill="url(#mpGoldAccent)"
            opacity="0.9"
          />

          {/* Sacred Blooming Lotus at Foundation (Resilience & Rising) */}
          {/* Center Lotus Petal */}
          <path
            d="M 60 88
               C 64 94, 66 102, 60 110
               C 54 102, 56 94, 60 88
               Z"
            fill="#FFE4E6"
          />
          {/* Left Inner Petal */}
          <path
            d="M 60 93
               C 53 96, 47 103, 50 110
               C 55 108, 59 104, 60 99
               Z"
            fill="url(#mpLotusGrad)"
            opacity="0.95"
          />
          {/* Right Inner Petal */}
          <path
            d="M 60 93
               C 67 96, 73 103, 70 110
               C 65 108, 61 104, 60 99
               Z"
            fill="url(#mpLotusGrad)"
            opacity="0.95"
          />
          {/* Left Outer Lotus Leaf */}
          <path
            d="M 52 98
               C 43 101, 36 107, 40 112
               C 46 111, 51 107, 53 102
               Z"
            fill="#FB7185"
            opacity="0.8"
          />
          {/* Right Outer Lotus Leaf */}
          <path
            d="M 68 98
               C 77 101, 84 107, 80 112
               C 74 111, 69 107, 67 102
               Z"
            fill="#FB7185"
            opacity="0.8"
          />

          {/* Circular Golden Ring Edge */}
          <rect
            x="2"
            y="2"
            width="116"
            height="116"
            rx="12"
            stroke="url(#mpGoldAccent)"
            strokeWidth="2"
            strokeOpacity="0.75"
          />
        </svg>
      </div>

      {/* Typography for Brand Name */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1
              className={`font-black tracking-tight leading-tight ${dim.textTitle} ${
                textColor === 'white' ? 'text-white' : 'text-stone-900'
              }`}
            >
              முதல் பெண்கள்
            </h1>
            <span className="text-[10px] bg-gradient-to-r from-amber-500 to-rose-600 text-white font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">
              Mudhal Pengal
            </span>
          </div>
          <p
            className={`font-semibold tracking-wide ${dim.textSub} ${
              textColor === 'white' ? 'text-amber-200/90' : 'text-stone-600'
            }`}
          >
            பெண்கள் முன்னேற்ற அரசு வழிகாட்டி • AI Voice Guide for Women
          </p>
        </div>
      )}
    </div>
  );
};
