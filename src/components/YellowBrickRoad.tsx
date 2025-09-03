import React, { useState, useEffect, useMemo } from "react";
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
  // Dynamic site height that updates with screen size
  const [siteHeight, setSiteHeight] = useState(3408);
  const [viewBoxWidth, setViewBoxWidth] = useState(800);
  const centerX = viewBoxWidth / 2;
  const roadWidth = Math.max(160, viewBoxWidth * 0.2); // Scale road width with viewport

  // Dorothy's position state (now in SVG coordinates)
  const [dorothyPosition, setDorothyPosition] = useState({ x: centerX, y: 0 });

  // Sine wave parameters
  const amplitude = 120; // How far the road curves left/right
  const frequency = 4; // Number of complete waves
  const startY = 0; // Start at very top
  const endY = siteHeight; // End at very bottom

  // Update site height and viewport width on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      const height = document.documentElement.scrollHeight;
      setSiteHeight(height);
      
      // Set viewBox width based on screen size
      const screenWidth = window.innerWidth;
      if (screenWidth < 768) {
        // Mobile: narrower viewBox
        setViewBoxWidth(Math.max(400, screenWidth * 0.8));
      } else {
        // Desktop: standard width
        setViewBoxWidth(800);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    // Also listen for content changes that might affect height
    const observer = new MutationObserver(updateDimensions);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("resize", updateDimensions);
      observer.disconnect();
    };
  }, []);

  const centerPoints = useMemo(() => {
    const points: { x: number; y: number }[] = [];
    const numPoints = 200; // Many points for smooth curve

    for (let i = 0; i <= numPoints; i++) {
      const t = i / numPoints; // 0 to 1
      const y = startY + t * (endY - startY);
      const angle = t * frequency * Math.PI * 2;
      const x = centerX + Math.sin(angle) * amplitude;
      points.push({ x, y });
    }

    return points;
  }, [startY, endY, centerX, amplitude, frequency, siteHeight]);

  const roadShape = useMemo(() => {
    const leftPoints: { x: number; y: number }[] = [];
    const rightPoints: { x: number; y: number }[] = [];

    // Calculate left and right edges of the road
    for (let i = 0; i < centerPoints.length; i++) {
      const point = centerPoints[i];

      // Calculate direction vector for perpendicular
      let dirX = 0,
        dirY = 1;
      if (i < centerPoints.length - 1) {
        dirX = centerPoints[i + 1].x - point.x;
        dirY = centerPoints[i + 1].y - point.y;
      } else if (i > 0) {
        dirX = point.x - centerPoints[i - 1].x;
        dirY = point.y - centerPoints[i - 1].y;
      }

      // Normalize and get perpendicular
      const length = Math.sqrt(dirX * dirX + dirY * dirY);
      if (length > 0) {
        dirX /= length;
        dirY /= length;
      }

      // Perpendicular vector (rotated 90 degrees)
      const perpX = -dirY;
      const perpY = dirX;

      // Calculate left and right points
      const halfWidth = roadWidth / 2;
      leftPoints.push({
        x: point.x + perpX * halfWidth,
        y: point.y + perpY * halfWidth,
      });
      rightPoints.push({
        x: point.x - perpX * halfWidth,
        y: point.y - perpY * halfWidth,
      });
    }

    // Create path: go down left side, then back up right side
    let pathData = `M${leftPoints[0].x},${leftPoints[0].y}`;

    // Left side going down
    for (let i = 1; i < leftPoints.length; i++) {
      pathData += ` L${leftPoints[i].x},${leftPoints[i].y}`;
    }

    // Connect to right side at bottom
    pathData += ` L${rightPoints[rightPoints.length - 1].x},${
      rightPoints[rightPoints.length - 1].y
    }`;

    // Right side going up
    for (let i = rightPoints.length - 2; i >= 0; i--) {
      pathData += ` L${rightPoints[i].x},${rightPoints[i].y}`;
    }

    pathData += " Z"; // Close path

    return pathData;
  }, [centerPoints, roadWidth]);

  // Update Dorothy's position based on scroll
  useEffect(() => {
    const updateDorothyPosition = () => {
      // Get current scroll position
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Calculate which part of the road should be at the center of the screen (50vh)
      // Dorothy needs to be positioned at the road point that's currently at 50vh
      const viewportCenter = scrollY + windowHeight * 0.5;

      // Convert to SVG Y coordinate
      const svgY = (viewportCenter / siteHeight) * siteHeight;

      // Find the road point at this Y position
      const t = Math.max(0, Math.min(1, svgY / siteHeight));
      const index = Math.floor(t * (centerPoints.length - 1));
      const point = centerPoints[index] || centerPoints[0];

      // Dorothy position is directly the road point (same coordinate system)
      setDorothyPosition({
        x: point.x,
        y: point.y,
      });
    };

    // Initial position
    updateDorothyPosition();

    // Add scroll listener
    window.addEventListener("scroll", updateDorothyPosition, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateDorothyPosition);
    };
  }, [centerPoints, siteHeight, viewBoxWidth]);

  return (
    <>
      <div
        className={`absolute inset-x-0 top-0 pointer-events-none z-[5] ${className}`}
        style={{ height: `${siteHeight}px` }}
      >
        <svg
          width="100%"
          height={`${siteHeight}px`}
          viewBox={`0 0 ${viewBoxWidth} ${siteHeight}`}
          className="absolute left-0 top-0 w-full h-full"
          preserveAspectRatio="xMidYMin meet"
        >
          <defs>
            {/* Yellow Brick Pattern */}
            <pattern
              id="yellowBrickPattern"
              x="0"
              y="0"
              width="40"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              {/* Brown mortar background */}
              <rect x="0" y="0" width="40" height="20" fill="#8B4513" />

              {/* Top row bricks */}
              <rect
                x="1"
                y="1"
                width="18"
                height="8"
                fill="#FFD700"
                stroke="#DAA520"
                strokeWidth="0.3"
              />
              <rect
                x="21"
                y="1"
                width="18"
                height="8"
                fill="#FFA500"
                stroke="#FF8C00"
                strokeWidth="0.3"
              />

              {/* Bottom row bricks (offset) */}
              <rect
                x="10"
                y="10"
                width="18"
                height="8"
                fill="#FFFF99"
                stroke="#DAA520"
                strokeWidth="0.3"
              />
              <rect
                x="-9"
                y="10"
                width="18"
                height="8"
                fill="#FFD700"
                stroke="#DAA520"
                strokeWidth="0.3"
              />
              <rect
                x="31"
                y="10"
                width="18"
                height="8"
                fill="#FFA500"
                stroke="#FF8C00"
                strokeWidth="0.3"
              />
            </pattern>
          </defs>

          {/* Road shape filled with brick pattern */}
          <path
            d={roadShape}
            fill="url(#yellowBrickPattern)"
            stroke="#654321"
            strokeWidth="2"
          />
          {/* Dorothy positioned inside SVG using same coordinate system */}
          <image
            href={dorothyImage}
            x={dorothyPosition.x - (viewBoxWidth * 0.1)}
            y={dorothyPosition.y - (viewBoxWidth * 0.075)}
            width={viewBoxWidth * 0.2}
            height={viewBoxWidth * 0.3}
            className="drop-shadow-lg"
          />
        </svg>
      </div>

      {/* Emerald City Component */}
      <EmeraldCity progress={progress} isVisible={progress > 85} />
    </>
  );
};
