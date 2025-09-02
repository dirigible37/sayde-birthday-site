import React, { useMemo } from "react";
import { EmeraldCity } from "./EmeraldCity";

interface YellowBrickRoadProps {
  progress: number; // 0 to 100
  className?: string;
}

export const YellowBrickRoad: React.FC<YellowBrickRoadProps> = ({
  progress,
  className = "",
}) => {
  // Calculate responsive dimensions
  const { viewBoxWidth, viewBoxHeight, strokeWidthBase } = useMemo(() => {
    if (typeof window === "undefined") {
      return { viewBoxWidth: 400, viewBoxHeight: 4000, strokeWidthBase: 150 };
    }

    const aspectRatio = window.innerWidth / window.innerHeight;
    const isWide = aspectRatio > 1.5; // Landscape tablets/desktop
    const isNarrow = aspectRatio < 0.7; // Narrow phones

    let width = 400;
    let strokeBase = 150;

    if (isWide) {
      // Wider viewBox for wide screens - road takes less horizontal space
      width = Math.min(450, window.innerWidth * 0.25);
      strokeBase = Math.min(140, width * 0.3);
    } else if (isNarrow) {
      // Narrower viewBox for narrow phones - road takes more space
      width = Math.max(200, window.innerWidth * 0.4);
      strokeBase = Math.max(80, width * 0.4);
    } else {
      // Standard mobile/tablet
      width = 300;
      strokeBase = 100;
    }

    return {
      viewBoxWidth: width * 2,
      viewBoxHeight: 4000,
      strokeWidthBase: strokeBase * 0.5,
    };
  }, []);

  const totalLength = 600;
  const currentLength = Math.max(0, (progress / 100) * totalLength);
  console.log("🚀 ~ YellowBrickRoad ~ currentLength:", currentLength);
  const dashOffset = Math.min(
    550,
    progress <= 0 ? totalLength + 100 : totalLength - currentLength
  );
  console.log("🚀 ~ YellowBrickRoad ~ dashOffset:", dashOffset);

  // Responsive path that adapts to viewBox width
  const pathData = useMemo(() => {
    const centerX = viewBoxWidth / 2;
    const curveAmount = viewBoxWidth * 0.125; // 12.5% of width for curves

    return `
      M${centerX} 0
      C${centerX + curveAmount} 200 ${centerX - curveAmount} 400 ${centerX} 600
      C${centerX + curveAmount * 1.4} 800 ${
      centerX - curveAmount * 1.8
    } 1000 ${centerX} 1200
      C${centerX + curveAmount * 2.2} 1400 ${
      centerX - curveAmount * 2.4
    } 1600 ${centerX} 1800
      C${centerX + curveAmount * 1.8} 2000 ${
      centerX - curveAmount * 1.6
    } 2200 ${centerX} 2400
      C${centerX + curveAmount * 1.4} 2600 ${
      centerX - curveAmount * 1.8
    } 2800 ${centerX} 3000
      C${centerX + curveAmount} 3200 ${
      centerX - curveAmount
    } 3400 ${centerX} 3600
      C${centerX + curveAmount * 0.4} 3700 ${
      centerX - curveAmount * 0.4
    } 3800 ${centerX} 3900
      C${centerX} 3950 ${centerX} 4000 ${centerX} 4000
    `;
  }, [viewBoxWidth]);

  return (
    <>
      <div
        className={`fixed inset-0 pointer-events-none z-[5] overflow-hidden ${className}`}
      >
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          className="absolute left-0 top-0 w-full h-full"
          preserveAspectRatio="xMidYMin slice"
          style={
            {
              "--stroke-base": `${strokeWidthBase}px`,
            } as React.CSSProperties
          }
        >
          <defs>
            {/* Simplified Brick Pattern */}
            <pattern
              id="brickPattern"
              x="0"
              y="0"
              width="40"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="40" height="24" fill="#CD853F" />
              <rect x="2" y="2" width="16" height="8" fill="#FFD700" rx="1" />
              <rect x="22" y="2" width="16" height="8" fill="#FFA500" rx="1" />
              <rect x="12" y="12" width="16" height="8" fill="#FFD700" rx="1" />
              <rect x="32" y="12" width="6" height="8" fill="#FFA500" rx="1" />
              <rect x="2" y="12" width="6" height="8" fill="#FFA500" rx="1" />
            </pattern>

            {/* Road Gradient */}
            <linearGradient id="roadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#B8860B" />
              <stop offset="20%" stopColor="#DAA520" />
              <stop offset="50%" stopColor="#FFD700" />
              <stop offset="80%" stopColor="#DAA520" />
              <stop offset="100%" stopColor="#B8860B" />
            </linearGradient>
          </defs>

          {/* Road Border */}
          <path
            d={pathData}
            fill="none"
            stroke="#8B4513"
            strokeWidth={strokeWidthBase}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={totalLength}
            strokeDashoffset={dashOffset}
            style={{
              transition: "stroke-dashoffset 0.5s ease-out",
            }}
            opacity="0.8"
          />

          {/* Brick Texture Overlay */}
          <path
            d={pathData}
            fill="none"
            stroke="url(#brickPattern)"
            strokeWidth={strokeWidthBase - 10}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={totalLength}
            strokeDashoffset={dashOffset}
            style={{
              transition: "stroke-dashoffset 0.5s ease-out",
            }}
            opacity="0.8"
          />
        </svg>
      </div>

      {/* Emerald City Component */}
      <EmeraldCity progress={progress} isVisible={progress > 85} />
    </>
  );
};
