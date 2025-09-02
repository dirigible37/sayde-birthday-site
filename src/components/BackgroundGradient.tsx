import React from 'react';

interface BackgroundGradientProps {
  className?: string;
}

export const BackgroundGradient: React.FC<BackgroundGradientProps> = ({ 
  className = '' 
}) => {
  return (
    <div 
      className={`
        fixed inset-0 -z-10
        bg-gradient-to-b 
        from-sky-blue-100 
        via-sky-blue-300 
        to-sky-blue-800
        ${className}
      `}
    />
  );
};