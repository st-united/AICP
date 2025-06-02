import { Card } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

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
    <Card className='h-[12rem] sm:h-full relative bg-[#02185B] text-white my-3 rounded-3xl sm:mx-6 sm:p-4 lg:mx-4 lg:p-6 w-[20rem] md:w-[24rem] max-w-full sm:max-w-sm'>
      <div className='absolute top-10 sm:top-7 left-0 h-3/5 sm:h-4/5 w-1 bg-[#FE7743] rounded-r-full'></div>
      <div className='flex flex-col h-full sm:justify-between min-h-[12rem]'>
        <h3 className='text-white text-xl text-center sm:text-start sm:text-2xl md:text-xl lg:text-2xl font-semibold mb-3'>
          {title}
        </h3>
        <p className='!text-white text-base text-center sm:text-start sm:text-xl md:text-base lg:text-xl mb-4'>
          {description}
        </p>
        <Link
          className='!text-[#FE7743] text-center sm:text-start font-semibold underline cursor-pointer hover:!text-[#ea9c77]'
          onClick={onLinkClick}
          to={''}
        >
          {linkText}
        </Link>
      </div>
    </Card>
  );
};

export default RecommendCard;
