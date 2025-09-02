import React from "react";

interface EmeraldCityProps {
  progress: number;
  isVisible: boolean;
}

export const EmeraldCity: React.FC<EmeraldCityProps> = ({
  progress,
  isVisible,
}) => {
  if (!isVisible) return null;

  const opacity = Math.min((progress - 85) / 15, 1);

  return (
    <div className="fixed bottom-0 left-0 w-full pointer-events-none z-20">
      <div
        className="city-container transition-opacity duration-1000 ease-out relative"
        style={{ opacity }}
      >
        {/* Sky Background */}
        <div
          className="absolute inset-0 w-full h-[400px]"
          style={{
            background: `
              linear-gradient(180deg, 
                rgba(25, 25, 112, 1) 0%,
                rgba(138, 43, 226, 1) 30%,
                rgba(255, 140, 0, 1) 60%,
                rgba(255, 215, 0, 1) 85%,
                transparent 100%
              )
            `,
          }}
        />

        <svg
          width="100vw"
          height="400"
          viewBox="0 0 1400 400"
          className="max-w-none relative"
          preserveAspectRatio="xMidYMax meet"
        >
          <defs>
            {/* Enhanced Gradients */}
            <radialGradient id="emeraldGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00FF7F" stopOpacity="0.8" />
              <stop offset="30%" stopColor="#00FF7F" stopOpacity="0.5" />
              <stop offset="60%" stopColor="#228B22" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#228B22" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="palaceGlow" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#00FF7F" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#228B22" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#191970" stopOpacity="0.8" />
              <stop offset="30%" stopColor="#8A2BE2" stopOpacity="0.6" />
              <stop offset="60%" stopColor="#FF8C00" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FFD700" stopOpacity="0.2" />
            </linearGradient>

            <linearGradient
              id="buildingGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#32CD32" />
              <stop offset="50%" stopColor="#228B22" />
              <stop offset="100%" stopColor="#1F5F1F" />
            </linearGradient>

            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Mountain silhouette background */}
          <path
            d="M0 250 L200 180 L400 220 L600 160 L800 200 L1000 170 L1200 210 L1400 190 L1400 400 L0 400 Z"
            fill="rgba(0, 0, 0, 0.2)"
          />

          {/* Multiple layers of glow for depth */}
          <circle
            cx="700"
            cy="250"
            r="600"
            fill="url(#emeraldGlow)"
            opacity="0.2"
          />
          <circle
            cx="700"
            cy="250"
            r="400"
            fill="url(#palaceGlow)"
            opacity="0.3"
          />
          <circle
            cx="700"
            cy="250"
            r="200"
            fill="url(#emeraldGlow)"
            opacity="0.4"
            filter="url(#glow)"
          />

          {/* Light rays emanating from city */}
          <g opacity="0.3">
            <path d="M700 250 L500 0 L550 0 Z" fill="rgba(255, 215, 0, 0.2)" />
            <path d="M700 250 L850 0 L900 0 Z" fill="rgba(255, 215, 0, 0.2)" />
            <path
              d="M700 250 L600 50 L650 50 Z"
              fill="rgba(0, 255, 127, 0.2)"
            />
            <path
              d="M700 250 L750 50 L800 50 Z"
              fill="rgba(0, 255, 127, 0.2)"
            />
          </g>

          {/* City skyline */}
          <g transform="translate(700, 350)">
            {/* Far Left Towers - Extended */}
            <rect
              x="-600"
              y="-80"
              width="45"
              height="70"
              fill="#1F5F1F"
              rx="4"
            />
            <polygon points="-615,-80 -577.5,-110 -540,-80" fill="#228B22" />
            <circle cx="-577.5" cy="-105" r="7" fill="#00FF7F" />

            <rect
              x="-520"
              y="-90"
              width="40"
              height="80"
              fill="#1F5F1F"
              rx="4"
            />
            <polygon points="-530,-90 -500,-120 -470,-90" fill="#228B22" />
            <circle cx="-500" cy="-115" r="6" fill="#00FF7F" />

            <rect
              x="-440"
              y="-100"
              width="35"
              height="90"
              fill="#1F5F1F"
              rx="4"
            />
            <polygon points="-450,-100 -422.5,-130 -395,-100" fill="#228B22" />
            <circle cx="-422.5" cy="-125" r="6" fill="#00FF7F" />

            <rect
              x="-360"
              y="-80"
              width="30"
              height="70"
              fill="#228B22"
              rx="3"
            />
            <polygon points="-370,-80 -345,-105 -320,-80" fill="#32CD32" />
            <circle cx="-345" cy="-100" r="5" fill="#00FF7F" />

            <rect
              x="-300"
              y="-110"
              width="40"
              height="100"
              fill="#228B22"
              rx="4"
            />
            <polygon points="-310,-110 -280,-140 -250,-110" fill="#32CD32" />
            <circle cx="-280" cy="-135" r="7" fill="#00FF7F" />

            {/* Left Side Towers */}
            <rect
              x="-220"
              y="-120"
              width="40"
              height="110"
              fill="#228B22"
              rx="4"
            />
            <polygon points="-230,-120 -200,-150 -170,-120" fill="#32CD32" />
            <circle cx="-200" cy="-145" r="8" fill="#00FF7F" />

            <rect
              x="-140"
              y="-95"
              width="35"
              height="85"
              fill="#228B22"
              rx="3"
            />
            <polygon points="-150,-95 -122.5,-120 -95,-95" fill="#32CD32" />
            <circle cx="-122.5" cy="-115" r="6" fill="#00FF7F" />

            {/* Central Palace Complex - Much Taller and Grander */}
            <rect
              x="-80"
              y="-250"
              width="160"
              height="230"
              fill="url(#buildingGradient)"
              rx="8"
            />
            <rect x="-70" y="-260" width="140" height="10" fill="#32CD32" />
            <polygon points="-100,-260 0,-320 100,-260" fill="#32CD32" />
            <circle
              cx="0"
              cy="-310"
              r="20"
              fill="#FFD700"
              filter="url(#glow)"
            />

            {/* Palace Windows - Glowing */}
            {[-60, -40, -20, 0, 20, 40, 60].map((x, i) =>
              [-220, -190, -160, -130, -100, -70, -40].map((y, j) => (
                <rect
                  key={`${i}-${j}`}
                  x={x - 5}
                  y={y - 8}
                  width="10"
                  height="16"
                  fill="#FFFF99"
                  opacity={0.8 + Math.sin(progress * 0.1 + i + j) * 0.2}
                  rx="2"
                />
              ))
            )}

            {/* Central Spires - Taller and More Ornate */}
            <rect
              x="-35"
              y="-280"
              width="20"
              height="50"
              fill="#32CD32"
              rx="3"
            />
            <rect
              x="15"
              y="-280"
              width="20"
              height="50"
              fill="#32CD32"
              rx="3"
            />
            <polygon points="-35,-280 -25,-300 -15,-280" fill="#FFD700" />
            <polygon points="15,-280 25,-300 35,-280" fill="#FFD700" />
            <circle
              cx="-25"
              cy="-295"
              r="5"
              fill="#00FF7F"
              filter="url(#glow)"
            />
            <circle
              cx="25"
              cy="-295"
              r="5"
              fill="#00FF7F"
              filter="url(#glow)"
            />

            {/* Grand Entrance */}
            <rect
              x="-30"
              y="-50"
              width="60"
              height="50"
              fill="#1F5F1F"
              rx="15"
            />
            <rect
              x="-20"
              y="-40"
              width="40"
              height="40"
              fill="#000000"
              opacity="0.5"
              rx="10"
            />

            {/* Right Side Towers */}
            <rect
              x="110"
              y="-95"
              width="35"
              height="85"
              fill="#228B22"
              rx="3"
            />
            <polygon points="100,-95 127.5,-120 155,-95" fill="#32CD32" />
            <circle cx="127.5" cy="-115" r="6" fill="#00FF7F" />

            <rect
              x="180"
              y="-110"
              width="38"
              height="100"
              fill="#228B22"
              rx="3"
            />
            <polygon points="170,-110 199,-135 228,-110" fill="#32CD32" />
            <circle cx="199" cy="-130" r="7" fill="#00FF7F" />

            <rect
              x="250"
              y="-120"
              width="40"
              height="110"
              fill="#228B22"
              rx="4"
            />
            <polygon points="240,-120 270,-150 300,-120" fill="#32CD32" />
            <circle cx="270" cy="-145" r="8" fill="#00FF7F" />

            <rect
              x="320"
              y="-85"
              width="32"
              height="75"
              fill="#228B22"
              rx="3"
            />
            <polygon points="310,-85 336,-110 362,-85" fill="#32CD32" />
            <circle cx="336" cy="-105" r="5" fill="#00FF7F" />

            {/* Far Right Towers - Extended */}
            <rect
              x="380"
              y="-100"
              width="35"
              height="90"
              fill="#228B22"
              rx="3"
            />
            <polygon points="370,-100 397.5,-130 425,-100" fill="#32CD32" />
            <circle cx="397.5" cy="-125" r="6" fill="#00FF7F" />

            <rect
              x="450"
              y="-90"
              width="40"
              height="80"
              fill="#1F5F1F"
              rx="4"
            />
            <polygon points="440,-90 470,-120 500,-90" fill="#228B22" />
            <circle cx="470" cy="-115" r="6" fill="#00FF7F" />

            <rect
              x="520"
              y="-110"
              width="40"
              height="100"
              fill="#228B22"
              rx="4"
            />
            <polygon points="510,-110 540,-140 570,-110" fill="#32CD32" />
            <circle cx="540" cy="-135" r="7" fill="#00FF7F" />

            <rect
              x="590"
              y="-80"
              width="45"
              height="70"
              fill="#1F5F1F"
              rx="4"
            />
            <polygon points="575,-80 612.5,-110 650,-80" fill="#228B22" />
            <circle cx="612.5" cy="-105" r="7" fill="#00FF7F" />

            {/* City Gates - Extended */}
            <rect
              x="-400"
              y="-20"
              width="80"
              height="20"
              fill="#2F4F2F"
              rx="6"
            />
            <rect
              x="-395"
              y="-15"
              width="70"
              height="15"
              fill="#228B22"
              rx="3"
            />

            <rect
              x="-250"
              y="-20"
              width="80"
              height="20"
              fill="#2F4F2F"
              rx="6"
            />
            <rect
              x="-245"
              y="-15"
              width="70"
              height="15"
              fill="#228B22"
              rx="3"
            />

            <rect
              x="-80"
              y="-20"
              width="160"
              height="20"
              fill="#2F4F2F"
              rx="6"
            />
            <rect
              x="-75"
              y="-15"
              width="150"
              height="15"
              fill="#228B22"
              rx="3"
            />

            <rect
              x="170"
              y="-20"
              width="80"
              height="20"
              fill="#2F4F2F"
              rx="6"
            />
            <rect
              x="175"
              y="-15"
              width="70"
              height="15"
              fill="#228B22"
              rx="3"
            />

            <rect
              x="320"
              y="-20"
              width="80"
              height="20"
              fill="#2F4F2F"
              rx="6"
            />
            <rect
              x="325"
              y="-15"
              width="70"
              height="15"
              fill="#228B22"
              rx="3"
            />

            {/* Magical Sparkle field - More varied and dynamic */}
            {[...Array(80)].map((_, i) => {
              const randomX = -650 + Math.random() * 1300;
              const randomY = -350 + Math.random() * 330;
              const size = 0.5 + Math.random() * 3;
              const delay = Math.random() * 3;
              const duration = 1 + Math.random() * 2;

              return (
                <g key={i}>
                  <circle
                    cx={randomX}
                    cy={randomY}
                    r={size}
                    fill={Math.random() > 0.5 ? "#FFFF99" : "#00FF7F"}
                    opacity={0.6 + Math.sin(progress * 0.05 + i) * 0.4}
                    style={{
                      animation: `twinkle ${duration}s ease-in-out ${delay}s infinite alternate`,
                    }}
                  />
                  {/* Add occasional star shapes for variety */}
                  {Math.random() > 0.8 && (
                    <path
                      d={`M${randomX},${randomY - 5} L${
                        randomX + 2
                      },${randomY} L${randomX},${randomY + 5} L${
                        randomX - 2
                      },${randomY} Z`}
                      fill="#FFD700"
                      opacity={0.8}
                      style={{
                        animation: `twinkle ${
                          duration * 1.5
                        }s ease-in-out ${delay}s infinite alternate`,
                        transform: `rotate(${Math.random() * 360}deg)`,
                        transformOrigin: `${randomX}px ${randomY}px`,
                      }}
                    />
                  )}
                </g>
              );
            })}

            {/* Rising magical particles */}
            {[...Array(20)].map((_, i) => (
              <circle
                key={`particle-${i}`}
                cx={-400 + i * 60}
                r={1.5}
                fill="#00FF7F"
                opacity={0.6}
                style={{
                  animation: `rise 4s ease-out ${i * 0.2}s infinite`,
                }}
              >
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  from="0 0"
                  to={`${Math.sin(i) * 30} -400`}
                  dur="4s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0"
                  to="0.8"
                  dur="1s"
                  begin={`${i * 0.2}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.8"
                  to="0"
                  dur="1s"
                  begin={`${i * 0.2 + 3}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
};
