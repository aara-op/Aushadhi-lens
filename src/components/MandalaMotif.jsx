import React from 'react';

// Reusable traditional Indian mandala motif matching the hotel's printed menu corners
export const MandalaMotif = ({ className = "w-16 h-16 text-hotel-gold opacity-80" }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="currentColor" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="8" fill="currentColor" fillOpacity="0.8" />
      <circle cx="50" cy="50" r="14" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="50" cy="50" r="22" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" fill="none" />
      <circle cx="50" cy="50" r="32" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="1.2" fill="none" />
      
      {/* 8 Radial Petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
        <g key={idx} transform={`rotate(${angle} 50 50)`}>
          {/* Inner petal */}
          <path 
            d="M 50 28 C 45 38 45 42 50 44 C 55 42 55 38 50 28 Z" 
            fill="currentColor" 
            fillOpacity="0.85" 
          />
          {/* Outer leaf */}
          <path 
            d="M 50 8 C 42 22 45 32 50 32 C 55 32 58 22 50 8 Z" 
            fill="currentColor" 
            fillOpacity="0.6" 
          />
          <circle cx="50" cy="18" r="2.5" fill="currentColor" />
        </g>
      ))}
    </svg>
  );
};
