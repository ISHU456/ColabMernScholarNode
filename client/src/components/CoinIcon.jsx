import React from 'react';

const CoinIcon = ({ className = "w-4 h-4", size = 16 }) => {
  return (
    <div 
      className={`${className} bg-yellow-400 rounded-full border-2 border-yellow-600 flex items-center justify-center shadow-sm overflow-hidden`}
      style={{ width: size, height: size }}
    >
      <span className="text-[10px] font-black text-yellow-900 leading-none">$</span>
    </div>
  );
};

export default CoinIcon;
