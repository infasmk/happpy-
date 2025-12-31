import React from 'react';

// Simplified for internal page use if needed, otherwise just a spacer
const SectionDivider: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`w-full flex items-center justify-center my-8 opacity-50 ${className}`}>
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
        <div className="mx-2 text-rose-300">✦</div>
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
    </div>
  );
};

export default SectionDivider;