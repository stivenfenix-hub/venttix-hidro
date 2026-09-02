import React from 'react';

interface VenttixLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'image' | 'badge' | 'navbar';
}

export const VenttixLogo: React.FC<VenttixLogoProps> = ({ 
  className = '', 
  size = 'lg',
  variant = 'navbar'
}) => {
  // Dimension mapping - Made distinctly larger as requested
  const heightClasses = {
    sm: 'h-10 sm:h-12',
    md: 'h-14 sm:h-16',
    lg: 'h-18 sm:h-22 md:h-24',
    xl: 'h-32 sm:h-40'
  };

  const selectedHeight = heightClasses[size];

  // Pure SVG reproducing the exact uploaded Venttix Store logo image
  const ExactLogoSvg = () => (
    <svg 
      viewBox="0 0 500 500" 
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Signature Venttix Yellow Background (#FFC801) */}
      <rect width="500" height="500" rx="36" fill="#FFC801" />

      <g fill="#111111">
        {/* Geometric V Wing Symbol matching the exact image logo */}
        {/* Left thick diagonal arm */}
        <path d="M 155 135 L 188 135 L 245 252 L 212 252 Z" />
        
        {/* Main V bottom to top right */}
        <path d="M 212 252 L 245 252 L 333 135 L 300 135 Z" />
        
        {/* Parallel upper right wing */}
        <path d="M 252 208 L 285 208 L 333 135 L 300 135 Z" />

        {/* Lower diagonal branch */}
        <path d="M 268 212 L 322 252 L 342 252 L 288 212 Z" />

        {/* Brand Name Typography: VENTTIX */}
        <text 
          x="250" 
          y="328" 
          textAnchor="middle" 
          fontFamily="Montserrat, 'Arial Black', sans-serif" 
          fontWeight="900" 
          fontSize="60" 
          letterSpacing="1"
        >
          VENTTIX
        </text>

        {/* Sub-brand Typography: STORE (positioned on bottom right) */}
        <text 
          x="396" 
          y="358" 
          textAnchor="end" 
          fontFamily="Montserrat, 'Arial Black', sans-serif" 
          fontWeight="800" 
          fontSize="23" 
          letterSpacing="1.5"
        >
          STORE
        </text>
      </g>
    </svg>
  );

  if (variant === 'image') {
    return (
      <div className={`inline-block aspect-square ${selectedHeight} ${className}`}>
        <ExactLogoSvg />
      </div>
    );
  }

  // Default navbar & footer presentation: exact logo badge
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`aspect-square ${selectedHeight} rounded-2xl overflow-hidden shadow-lg shadow-yellow-500/20 border border-yellow-400/50 shrink-0`}>
        <ExactLogoSvg />
      </div>
    </div>
  );
};
