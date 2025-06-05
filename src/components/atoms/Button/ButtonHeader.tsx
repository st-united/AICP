import { Button } from 'antd';
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const ButtonHeader = ({ children, onClick, className = '' }: ButtonProps) => {
  return (
    <Button
      className={`flex items-center h-12 !border-[#FE7743] !py-2 !px-6 md:!py-2 md:!px-8 text-[#FE7743] font-bold rounded-full text-md md:text-lg hover:bg-[#FE7743] hover:text-white transition-all duration-300 ease-in-out cursor-pointer ${className}`}
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
    </Button>
  );
};
