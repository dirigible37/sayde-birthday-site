import React from "react";

// Import Sayde images
import Sayde35A from "../assets/Sayde35A.jpg";
import Sayde35B from "../assets/Sayde35B.jpg";
import Sayde35F from "../assets/Sayde35F.jpg";
import Sayde35G from "../assets/Sayde35G.jpg";
import Sayde35H from "../assets/Sayde35H.jpg";
import Sayde35I from "../assets/Sayde35I.jpg";
import Sayde35J from "../assets/Sayde35J.jpg";
import Sayde35K from "../assets/Sayde35K.jpg";
import Sayde35L from "../assets/Sayde35L.jpg";
import Sayde35M from "../assets/Sayde35M.jpg";

interface SaydePhotoProps {
  side: 'left' | 'right';
  isVisible: boolean;
  src: string;
  alt: string;
}

const SaydePhoto: React.FC<SaydePhotoProps> = ({ side, isVisible, src, alt }) => {
  const positionClass = side === 'left' 
    ? 'left-2 sm:left-4 md:left-8 lg:left-16' 
    : 'right-2 sm:right-4 md:right-8 lg:right-16';

  const animationClass = isVisible 
    ? 'opacity-100 animate-fade-in-up' 
    : 'opacity-0';

  return (
    <div 
      className={`
        absolute top-1/2 transform -translate-y-1/2 z-20
        ${positionClass}
        ${animationClass}
        transition-all duration-700 ease-out
      `}
    >
      <div className="bg-white p-3 pb-8 shadow-lg transform transition-transform duration-300 hover:scale-105">
        <img
          src={src}
          alt={alt}
          className="w-48 h-36 md:w-56 md:h-42 lg:w-64 lg:h-48 object-cover"
          loading="lazy"
        />
      </div>
    </div>
  );
};

// Export individual photo components
export const SaydePhoto1: React.FC<{ side: 'left' | 'right'; isVisible: boolean }> = ({ side, isVisible }) => (
  <SaydePhoto side={side} isVisible={isVisible} src={Sayde35A} alt="Sayde photo 1" />
);

export const SaydePhoto2: React.FC<{ side: 'left' | 'right'; isVisible: boolean }> = ({ side, isVisible }) => (
  <SaydePhoto side={side} isVisible={isVisible} src={Sayde35B} alt="Sayde photo 2" />
);

export const SaydePhoto3: React.FC<{ side: 'left' | 'right'; isVisible: boolean }> = ({ side, isVisible }) => (
  <SaydePhoto side={side} isVisible={isVisible} src={Sayde35F} alt="Sayde photo 3" />
);

export const SaydePhoto4: React.FC<{ side: 'left' | 'right'; isVisible: boolean }> = ({ side, isVisible }) => (
  <SaydePhoto side={side} isVisible={isVisible} src={Sayde35G} alt="Sayde photo 4" />
);

export const SaydePhoto5: React.FC<{ side: 'left' | 'right'; isVisible: boolean }> = ({ side, isVisible }) => (
  <SaydePhoto side={side} isVisible={isVisible} src={Sayde35H} alt="Sayde photo 5" />
);

export const SaydePhoto6: React.FC<{ side: 'left' | 'right'; isVisible: boolean }> = ({ side, isVisible }) => (
  <SaydePhoto side={side} isVisible={isVisible} src={Sayde35I} alt="Sayde photo 6" />
);

export const SaydePhoto7: React.FC<{ side: 'left' | 'right'; isVisible: boolean }> = ({ side, isVisible }) => (
  <SaydePhoto side={side} isVisible={isVisible} src={Sayde35J} alt="Sayde photo 7" />
);

export const SaydePhoto8: React.FC<{ side: 'left' | 'right'; isVisible: boolean }> = ({ side, isVisible }) => (
  <SaydePhoto side={side} isVisible={isVisible} src={Sayde35K} alt="Sayde photo 8" />
);

export const SaydePhoto9: React.FC<{ side: 'left' | 'right'; isVisible: boolean }> = ({ side, isVisible }) => (
  <SaydePhoto side={side} isVisible={isVisible} src={Sayde35L} alt="Sayde photo 9" />
);

export const SaydePhoto10: React.FC<{ side: 'left' | 'right'; isVisible: boolean }> = ({ side, isVisible }) => (
  <SaydePhoto side={side} isVisible={isVisible} src={Sayde35M} alt="Sayde photo 10" />
);