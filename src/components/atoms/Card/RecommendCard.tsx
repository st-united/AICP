import { Card } from 'antd';
import React from 'react';

interface RecommendCardProps {
  title: string;
  description: string;
  linkText: string;
  onLinkClick?: () => void;
}

const RecommendCard: React.FC<RecommendCardProps> = ({
  title,
  description,
  linkText,
  onLinkClick,
}) => {
  return (
    <Card
      bordered={false}
      className='relative bg-[#02185B] text-white my-3 rounded-3xl sm:mx-6 sm:p-4 lg:mx-4 lg:p-6 w-[20rem] md:w-[25rem] max-w-full sm:max-w-sm'
    >
      {/* Thanh cam bên trái */}
      <div className='absolute top-20 sm:top-5 left-0 h-2/5 sm:h-4/5 w-1 bg-[#FE7743] rounded-r-full'></div>
      <div className='flex flex-col h-full justify-between min-h-[12rem]'>
        <h3 className='text-white text-xl sm:text-2xl font-semibold mb-3'>{title}</h3>
        <p className='text-base sm:text-xl mb-4'>{description}</p>
        <a
          className='!text-[#FE7743] font-semibold underline cursor-pointer mt-auto hover:!text-[#ea9c77]'
          onClick={onLinkClick}
        >
          {linkText}
        </a>
      </div>
    </Card>
  );
};

export default RecommendCard;
