import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'icon' | 'dark' | 'light';
  height?: number;
}

export const ProfitTraceLogo: React.FC<LogoProps> = ({
  className = '',
  variant = 'full',
  height = 36,
}) => {
  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center justify-center shrink-0 ${className}`}>
        <img
          src="/logo-icon.svg"
          alt="ProfitTrace Mark"
          style={{ height: `${height}px`, width: `${height}px` }}
          className="rounded-md object-contain"
        />
      </div>
    );
  }

  // Full logo display with exact matching colors
  const isDark = variant === 'dark';

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Visual Mark */}
      <div className="shrink-0 relative overflow-hidden rounded-md flex items-center justify-center" style={{ height: `${height}px`, width: `${height * 1.1}px` }}>
        <svg viewBox="0 0 360 320" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
          <ellipse cx="180" cy="285" rx="140" ry="12" fill={isDark ? '#2E3731' : '#E8EFE5'} />
          <path d="M 110 260 C 65 220, 55 125, 120 80 C 175 45, 265 55, 280 120 C 298 185, 270 250, 215 275 C 175 288, 138 280, 110 260 Z" fill={isDark ? '#2A332B' : '#F4F8F1'} />
          
          {/* Sprout */}
          <g fill="#93BD8C">
            <path d="M 50 270 Q 65 230 72 210" stroke="#7BA674" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 52 230 C 35 225, 25 205, 42 200 C 55 195, 62 218, 52 230 Z" />
            <path d="M 62 218 C 78 205, 88 214, 84 228 C 78 238, 65 230, 62 218 Z" />
            <path d="M 68 202 C 60 180, 82 175, 88 194 C 90 206, 76 210, 68 202 Z" />
          </g>

          {/* Upward arrow */}
          <path d="M 160 205 Q 215 130 280 75" stroke={isDark ? '#FFFFFF' : '#1F2421'} strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M 262 68 L 290 73 L 282 100 Z" fill={isDark ? '#FFFFFF' : '#1F2421'} />

          {/* Bars */}
          <rect x="175" y="200" width="26" height="75" rx="4" fill="#A4CC9E" />
          <rect x="208" y="155" width="26" height="120" rx="4" fill="#A4CC9E" />
          <rect x="241" y="110" width="26" height="165" rx="4" fill="#A4CC9E" />

          {/* Big Dollar sign */}
          <g transform="translate(90, 80)">
            <path d="M 45 10 L 45 180" stroke="#A4CC9E" strokeWidth="16" strokeLinecap="round" />
            <path d="M 74 42 C 70 24, 58 18, 42 18 C 22 18, 8 28, 8 46 C 8 66, 26 75, 50 82 C 76 89, 85 102, 85 124 C 85 148, 68 162, 42 162 C 18 162, 4 148, 2 128" 
                  stroke="#A4CC9E" strokeWidth="22" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>

          {/* Coin stack */}
          <g transform="translate(210, 215)">
            <g fill="#A4CC9E" stroke="#7BA674" strokeWidth="1.8">
              <rect x="44" y="8" width="40" height="9" rx="3" />
              <rect x="44" y="20" width="40" height="9" rx="3" />
              <rect x="44" y="32" width="40" height="9" rx="3" />
              <rect x="44" y="44" width="40" height="9" rx="3" />
            </g>
            <circle cx="32" cy="35" r="28" fill="#1F2421" stroke="#A4CC9E" strokeWidth="3.5" />
            <text x="32" y="45" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif" fontSize="26" fontWeight="900" fill="#A4CC9E" textAnchor="middle">$</text>
          </g>
        </svg>
      </div>

      {/* Typography: PROFIT / TRACE */}
      <div className="flex flex-col leading-none">
        <span
          className={`font-black tracking-tight text-[15px] ${
            isDark ? 'text-white' : 'text-[#1F2421]'
          }`}
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '0.04em' }}
        >
          PROFIT
        </span>
        <span
          className="font-black tracking-wider text-[17px] text-[#7EA878]"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '0.08em' }}
        >
          TRACE
        </span>
      </div>
    </div>
  );
};
