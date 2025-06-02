import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const ButtonHeader: React.FC<ButtonProps> = ({ children, onClick, className = '' }) => {
  return (
    <div
      className={`flex items-center border border-[#FE7743] !py-2 !px-6 md:!py-2 md:!px-8 text-[#FE7743] font-bold rounded-full text-md md:text-lg hover:bg-[#FE7743] hover:text-white transition-all duration-300 ease-in-out cursor-pointer ${className}`}
      role='button'
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {children}
    </div>
  );
};

export default ButtonHeader;
