import React from "react";

const ReadOnRouteLogo = ({ width = 40, height = 40, color = "#4F46E5" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Book */}
      <rect x="10" y="10" width="44" height="28" rx="2" fill={color} />
      <line x1="10" y1="24" x2="54" y2="24" stroke="white" strokeWidth="2" />
      <line x1="10" y1="32" x2="54" y2="32" stroke="white" strokeWidth="2" />

      {/* Wheels */}
      <circle cx="18" cy="46" r="6" fill={color} />
      <circle cx="46" cy="46" r="6" fill={color} />

      {/* Motion lines */}
      <line x1="2" y1="18" x2="10" y2="18" stroke={color} strokeWidth="2" />
      <line x1="2" y1="26" x2="10" y2="26" stroke={color} strokeWidth="2" />

      {/* Text */}
      <text x="32" y="62" textAnchor="middle" fontSize="10" fill={color} fontFamily="Arial, sans-serif">
        ReadOnRoute
      </text>
    </svg>
  );
};

export default ReadOnRouteLogo;
