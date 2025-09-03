import React from "react";
import emeraldCityImage from "../assets/Emerald.png";

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
        <img
          src={emeraldCityImage}
          alt="Emerald City"
          className="w-full h-auto object-cover"
          style={{
            filter: 'drop-shadow(0 0 20px rgba(0, 255, 127, 0.3))',
          }}
        />
      </div>
    </div>
  );
};
