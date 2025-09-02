import React from 'react';

interface YellowBrickRoadProps {
  progress: number; // 0 to 100
  className?: string;
}

export const YellowBrickRoad: React.FC<YellowBrickRoadProps> = ({ 
  progress, 
  className = '' 
}) => {
  const totalLength = 4000;
  const currentLength = (progress / 100) * totalLength;

  // More natural, winding path
  const pathData = `
    M200 0
    C220 80 180 160 200 240
    C230 320 170 400 190 480
    C160 560 240 640 210 720
    C250 800 150 880 180 960
    C140 1040 260 1120 220 1200
    C280 1280 160 1360 200 1440
    C170 1520 230 1600 190 1680
    C240 1760 160 1840 200 1920
    C180 2000 220 2080 200 2160
    C160 2240 240 2320 200 2400
    C230 2480 170 2560 190 2640
    C150 2720 250 2800 210 2880
    C240 2960 160 3040 200 3120
    C180 3200 220 3280 200 3360
    C170 3440 230 3520 200 3600
    C190 3680 210 3760 200 3840
    C200 3920 200 4000 200 4000
  `;

  return (
    <div className={`fixed inset-0 pointer-events-none z-5 ${className}`}>
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 400 4000"
        className="absolute left-0 top-0 w-full h-full"
        preserveAspectRatio="xMidYMin meet"
      >
        <defs>
          {/* Brick Pattern */}
          <pattern id="brickPattern" x="0" y="0" width="40" height="24" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="40" height="24" fill="#DAA520"/>
            <rect x="2" y="2" width="16" height="8" fill="#FFD700" rx="1"/>
            <rect x="22" y="2" width="16" height="8" fill="#FFD700" rx="1"/>
            <rect x="12" y="12" width="16" height="8" fill="#FFD700" rx="1"/>
            <rect x="2" y="2" width="16" height="8" fill="none" stroke="#B8860B" strokeWidth="0.5"/>
            <rect x="22" y="2" width="16" height="8" fill="none" stroke="#B8860B" strokeWidth="0.5"/>
            <rect x="12" y="12" width="16" height="8" fill="none" stroke="#B8860B" strokeWidth="0.5"/>
          </pattern>

          {/* Road Gradient */}
          <linearGradient id="roadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B8860B"/>
            <stop offset="20%" stopColor="#DAA520"/>
            <stop offset="50%" stopColor="#FFD700"/>
            <stop offset="80%" stopColor="#DAA520"/>
            <stop offset="100%" stopColor="#B8860B"/>
          </linearGradient>

          {/* Road Shadow Gradient */}
          <linearGradient id="shadowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.3)"/>
            <stop offset="50%" stopColor="rgba(0,0,0,0.1)"/>
            <stop offset="100%" stopColor="rgba(0,0,0,0.3)"/>
          </linearGradient>

          {/* Mortar lines */}
          <pattern id="mortarLines" x="0" y="0" width="20" height="12" patternUnits="userSpaceOnUse">
            <line x1="0" y1="6" x2="20" y2="6" stroke="#8B7355" strokeWidth="1"/>
            <line x1="10" y1="0" x2="10" y2="12" stroke="#8B7355" strokeWidth="1"/>
          </pattern>
        </defs>

        {/* Road Base Shadow */}
        <path
          d={pathData}
          fill="none"
          stroke="rgba(0, 0, 0, 0.2)"
          strokeWidth="120"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="translate(4, 4)"
        />

        {/* Road Base */}
        <path
          d={pathData}
          fill="none"
          stroke="url(#roadGradient)"
          strokeWidth="100"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={totalLength}
          strokeDashoffset={totalLength - currentLength}
          style={{
            transition: 'stroke-dashoffset 0.5s ease-out'
          }}
        />

        {/* Road Border Left */}
        <path
          d={pathData}
          fill="none"
          stroke="#8B7355"
          strokeWidth="104"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={totalLength}
          strokeDashoffset={totalLength - currentLength}
          style={{
            transition: 'stroke-dashoffset 0.5s ease-out'
          }}
          opacity="0.7"
        />

        {/* Brick Texture Overlay */}
        <path
          d={pathData}
          fill="none"
          stroke="url(#brickPattern)"
          strokeWidth="96"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={totalLength}
          strokeDashoffset={totalLength - currentLength}
          style={{
            transition: 'stroke-dashoffset 0.5s ease-out'
          }}
          opacity="0.9"
        />

        {/* Mortar Lines */}
        <path
          d={pathData}
          fill="none"
          stroke="url(#mortarLines)"
          strokeWidth="92"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={totalLength}
          strokeDashoffset={totalLength - currentLength}
          style={{
            transition: 'stroke-dashoffset 0.5s ease-out'
          }}
          opacity="0.6"
        />

        {/* Center Highlight */}
        <path
          d={pathData}
          fill="none"
          stroke="#FFFF99"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={totalLength}
          strokeDashoffset={totalLength - currentLength}
          style={{
            transition: 'stroke-dashoffset 0.5s ease-out'
          }}
          opacity="0.4"
        />

        {/* Road Sparkles/Shine Effect */}
        {progress > 10 && (
          <path
            d={pathData}
            fill="none"
            stroke="rgba(255, 255, 255, 0.6)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="8 24"
            strokeDashoffset={totalLength - currentLength + 10}
            style={{
              transition: 'stroke-dashoffset 0.5s ease-out'
            }}
          />
        )}
      </svg>
    </div>
  );
};