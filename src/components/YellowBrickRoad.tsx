import React, { useMemo, useRef, useEffect, useState } from "react";
import { EmeraldCity } from "./EmeraldCity";
import dorothyImage from "../assets/dorothy.png";

interface YellowBrickRoadProps {
  progress: number; // 0 to 100
  className?: string;
}

export const YellowBrickRoad: React.FC<YellowBrickRoadProps> = ({
  progress,
  className = "",
}) => {
  const pathRef = useRef<SVGPathElement>(null);
  const [dorothyPosition, setDorothyPosition] = useState({
    x: 0,
    y: 0,
    angle: 0,
  });
  const [documentHeight, setDocumentHeight] = useState(0);
  const [pathLength, setPathLength] = useState(0);

  // Calculate document height
  useEffect(() => {
    const updateHeight = () => {
      setDocumentHeight(document.documentElement.scrollHeight);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // Calculate responsive dimensions
  const { viewBoxWidth, strokeWidthBase, dorothyWidth, dorothyHeight } =
    useMemo(() => {
      if (typeof window === "undefined") {
        // Server-side rendering defaults - use similar fixed pixel approach
        const dorothyPixelHeight = 150;
        const dorothyAspectRatio = 3 / 4;
        const dorothyPixelWidth = dorothyPixelHeight * dorothyAspectRatio;
        // Assume default screen width for SSR calculation
        const defaultScreenWidth = 1200;
        const defaultViewBoxWidth = 800;
        const viewBoxToPixelRatio = defaultViewBoxWidth / defaultScreenWidth;

        return {
          viewBoxWidth: 400,
          strokeWidthBase: 120,
          dorothyWidth: dorothyPixelWidth * viewBoxToPixelRatio,
          dorothyHeight: dorothyPixelHeight * viewBoxToPixelRatio,
        };
      }

      const aspectRatio = window.innerWidth / window.innerHeight;
      const isWide = aspectRatio > 1.5;
      const isNarrow = aspectRatio < 0.7;

      let width = 400;
      let strokeBase = 240; // Increased base stroke width for wider road

      if (isWide) {
        width = Math.min(450, window.innerWidth * 0.25);
        strokeBase = 220; // Increased for wide screens
      } else if (isNarrow) {
        width = Math.max(200, window.innerWidth * 0.4);
        strokeBase = 160; // Increased for narrow screens
      } else {
        width = 300;
        strokeBase = 200; // Increased for normal screens
      }

      // Fixed Dorothy size in pixels for consistent visual appearance
      const dorothyPixelHeight = 200; // Fixed pixel height regardless of screen size
      const dorothyAspectRatio = 3 / 4; // width/height ratio from original image
      const dorothyPixelWidth = dorothyPixelHeight * dorothyAspectRatio;

      // Convert pixel size to SVG coordinate system
      // The SVG viewBox scales to fit the screen, so we need to convert pixel size to viewBox units
      const svgWidthInPixels = window.innerWidth; // SVG takes full width
      const viewBoxToPixelRatio = (width * 2) / svgWidthInPixels; // viewBox units per pixel

      const dorothyWidth = dorothyPixelWidth * viewBoxToPixelRatio;
      const dorothyHeight = dorothyPixelHeight * viewBoxToPixelRatio;

      return {
        viewBoxWidth: width * 2,
        strokeWidthBase: strokeBase * 0.6, // Slightly increased multiplier
        dorothyWidth: dorothyWidth,
        dorothyHeight: dorothyHeight,
      };
    }, []);

  // Use fixed viewBox height for predictable coordinate space
  const viewBoxHeight = 5000;

  // Responsive path that adapts to viewBox width
  const pathData = useMemo(() => {
    const centerX = viewBoxWidth / 2;
    const curveAmount = viewBoxWidth * 0.125;
    const pathHeight = viewBoxHeight * 0.95; // Use 95% of viewBox height (4750)
    const segmentHeight = pathHeight / 8;

    return `
      M${centerX} 0
      C${centerX + curveAmount} ${segmentHeight * 0.5} ${
      centerX - curveAmount
    } ${segmentHeight} ${centerX} ${segmentHeight * 1.5}
      C${centerX + curveAmount * 1.4} ${segmentHeight * 2} ${
      centerX - curveAmount * 1.8
    } ${segmentHeight * 2.5} ${centerX} ${segmentHeight * 3}
      C${centerX + curveAmount * 2.2} ${segmentHeight * 3.5} ${
      centerX - curveAmount * 2.4
    } ${segmentHeight * 4} ${centerX} ${segmentHeight * 4.5}
      C${centerX + curveAmount * 1.8} ${segmentHeight * 5} ${
      centerX - curveAmount * 1.6
    } ${segmentHeight * 5.5} ${centerX} ${segmentHeight * 6}
      C${centerX + curveAmount * 1.4} ${segmentHeight * 6.5} ${
      centerX - curveAmount * 1.8
    } ${segmentHeight * 7} ${centerX} ${segmentHeight * 7.5}
      C${centerX + curveAmount * 0.4} ${segmentHeight * 7.75} ${
      centerX - curveAmount * 0.4
    } ${segmentHeight * 7.9} ${centerX} ${pathHeight * 0.98}
      L${centerX} ${pathHeight}
    `;
  }, [viewBoxWidth]);

  // Calculate path length
  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      setPathLength(length);
    }
  }, [pathData]);

  // Calculate Dorothy's position along the path
  useEffect(() => {
    if (pathRef.current && pathLength > 0) {
      // Calculate position along path based on progress
      const distance = (progress / 100) * pathLength;
      const point = pathRef.current.getPointAtLength(distance);

      // Get the angle of the path at this point for rotation
      const point2 = pathRef.current.getPointAtLength(
        Math.min(distance + 1, pathLength)
      );
      const angle =
        (Math.atan2(point2.y - point.y, point2.x - point.x) * 180) / Math.PI +
        90;

      setDorothyPosition({
        x: point.x,
        y: point.y,
        angle: angle,
      });
    }
  }, [progress, pathLength]);

  return (
    <>
      <div
        className={`absolute inset-x-0 top-0 pointer-events-none z-[5] ${className}`}
        style={{ height: `${documentHeight}px` }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          className="absolute left-0 top-0 w-full h-full"
          preserveAspectRatio="none"
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

            {/* Shadow filter for Dorothy */}
            <filter id="dorothyShadow">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
              <feOffset dx="2" dy="4" result="offsetblur" />
              <feFlood floodColor="#000000" floodOpacity="0.3" />
              <feComposite in2="offsetblur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Road Border */}
          <path
            ref={pathRef}
            d={pathData}
            fill="none"
            stroke="#8B4513"
            strokeWidth={strokeWidthBase}
            strokeLinecap="round"
            strokeLinejoin="round"
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
            opacity="0.8"
          />

          {/* Dorothy and Toto */}
          {progress > 0 && (
            <image
              href={dorothyImage}
              x={dorothyPosition.x - dorothyWidth / 2}
              y={dorothyPosition.y - dorothyHeight}
              width={dorothyWidth}
              height={dorothyHeight}
              filter="url(#dorothyShadow)"
              style={
                {
                  transition: "all 0.3s ease-out",
                  transformOrigin: `${dorothyPosition.x}px ${dorothyPosition.y}px`,
                  transform: `rotate(${(dorothyPosition.angle || 0) + 180}deg)`,
                  imageRendering: "pixelated",
                } as React.CSSProperties
              }
            />
          )}
        </svg>
      </div>

      {/* Emerald City Component */}
      <EmeraldCity progress={progress} isVisible={progress > 85} />
    </>
  );
};
