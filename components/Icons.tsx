
import React from 'react';

interface IconProps {
  className?: string;
}

export const RefreshIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 4v5h5M20 20v-5h-5M4 4a12.94 12.94 0 0115.14 11.53M20 20a12.94 12.94 0 01-15.14-11.53"
    />
  </svg>
);
