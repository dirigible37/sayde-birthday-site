import React, { useState, useEffect } from "react";

interface PresentRevealProps {
  isVisible: boolean;
  onComplete?: () => void;
  className?: string;
}

export const PresentReveal: React.FC<PresentRevealProps> = ({
  isVisible,
  onComplete,
  className = "",
}) => {
  const [showPresent, setShowPresent] = useState(false);
  const [showGiftCard, setShowGiftCard] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer1 = setTimeout(() => setShowPresent(true), 500);
      const timer2 = setTimeout(() => setShowGiftCard(true), 1500);
      const timer3 = setTimeout(() => setShowConfetti(true), 2000);
      const timer4 = setTimeout(() => onComplete?.(), 3000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
      };
    }
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`
      absolute inset-0 z-30 
      flex flex-col items-center justify-center 
      bg-gradient-to-b from-black/0 to-black/50
      px-4 py-8
      ${className}
    `}
    >
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Present Box Container */}
      <div
        className={`
        flex flex-col items-center space-y-8 max-w-md mx-auto
        transform transition-all duration-1000 ease-out
        ${showPresent ? "scale-100 opacity-100" : "scale-0 opacity-0"}
      `}
      >
        {/* Present Box */}
        <div
          className={`
          relative
          transform transition-all duration-1000 ease-out
          ${showGiftCard ? "scale-75" : "scale-100"}
        `}
        >
          {/* Gift Box */}
          <div className="w-48 h-32 bg-gradient-to-br from-red-500 to-red-700 rounded-lg shadow-2xl">
            {/* Ribbon Horizontal */}
            <div className="absolute top-1/2 left-0 right-0 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 transform -translate-y-1/2" />
            {/* Ribbon Vertical */}
            <div className="absolute top-0 bottom-0 left-1/2 w-8 bg-gradient-to-b from-yellow-400 to-yellow-600 transform -translate-x-1/2" />
            {/* Bow */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="w-12 h-8 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full" />
              <div className="absolute top-1 left-1/2 w-8 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full transform -translate-x-1/2" />
            </div>
          </div>

          {/* Lid Animation */}
          <div
            className={`
            absolute -top-4 left-0 right-0
            w-48 h-8 bg-gradient-to-br from-red-400 to-red-600 rounded-t-lg
            transform transition-all duration-1000 ease-out
            ${showGiftCard ? "rotate-12 -translate-y-8 translate-x-4" : ""}
          `}
          />
        </div>

        {/* Digital Gift Card */}
        <div
          className={`
          relative
          transition-all duration-1000 ease-out
          ${
            showGiftCard
              ? "scale-100 opacity-100 translate-y-0"
              : "scale-0 opacity-0 translate-y-8"
          }
        `}
        >
          <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-teal-600 p-6 md:p-8 rounded-2xl shadow-2xl max-w-sm">
            <div className="text-center text-white">
              <h2 className="text-xl md:text-2xl font-bold mb-4">
                🎉 Happy Birthday! 🎉
              </h2>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-4">
                <h3 className="text-lg md:text-xl font-semibold mb-2">
                  Ticketmaster Gift Card
                </h3>
                <p className="text-lg md:text-xl font-bold">$350.00</p>
              </div>
              <p className="text-sm opacity-90">
                To be used at Wizard of Oz show at The Sphere
              </p>
              <div className="mt-4 text-xs opacity-75">
                Call mom for details
              </div>
            </div>
          </div>
        </div>

        {/* Credits */}
        <div
          className={`
          relative
          transition-all duration-1000 delay-500 ease-out
          ${
            showGiftCard
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }
        `}
        >
          <div className="text-center text-white bg-black/80 backdrop-blur-sm rounded-xl p-4 md:p-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Happy 35th Birthday, Sayde! 🎂
            </h1>
            <div className="mt-4 space-y-2 text-sm md:text-base opacity-90">
              <div>
                <span className="font-semibold">Idea for the tickets:</span> Joss Mohr
              </div>
              <div>
                <span className="font-semibold">Website idea and creation:</span> Winslow Mohr
              </div>
              <div>
                <span className="font-semibold">Copy and photos:</span> Jan Haskell-Mohr
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
