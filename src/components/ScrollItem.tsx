import React, { type ReactNode } from 'react';

interface ScrollItemProps {
  children: ReactNode;
  side: 'left' | 'right';
  isVisible: boolean;
  className?: string;
}

export const ScrollItem: React.FC<ScrollItemProps> = ({ 
  children, 
  side, 
  isVisible,
  className = '' 
}) => {
  const animationClass = isVisible 
    ? side === 'left' 
      ? 'animate-slide-in-left opacity-100' 
      : 'animate-slide-in-right opacity-100'
    : 'opacity-0 translate-x-8';

  const positionClass = side === 'left' 
    ? 'left-4 md:left-8 lg:left-16 text-left' 
    : 'right-4 md:right-8 lg:right-16 text-right';

  return (
    <div 
      className={`
        absolute top-1/2 transform -translate-y-1/2 z-20
        px-2 py-4 max-w-xs md:max-w-md lg:max-w-lg
        ${positionClass}
        ${animationClass}
        transition-all duration-700 ease-out
        ${className}
      `}
    >
      <div className={`
        bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-4 md:p-6
        border border-white/30
        ${side === 'left' ? 'rounded-l-lg md:rounded-r-2xl' : 'rounded-r-lg md:rounded-l-2xl'}
        hover:shadow-2xl hover:bg-white/98 transition-all duration-300
      `}>
        {children}
      </div>
    </div>
  );
};