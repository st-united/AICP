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
    <Card className='h-full w-full relative bg-[#02185B] text-white rounded-3xl'>
      <div className='absolute top-9 smM:top-7 left-0 h-3/5 mdM:h-4/5 w-1 bg-primary rounded-r-full'></div>
      <div className='flex flex-col h-full smM:justify-between mdM:gap-6 mdM:py-6'>
        <h3 className='text-white text-xl text-center smM:text-start smM::text-2xl font-bold mb-3'>
          {title}
        </h3>
        <p className='!text-white text-base text-center smM:text-start smM:text-lg mdM:text-xl mb-4'>
          {description}
        </p>
        <Link
          className='!text-primary text-center text-base smM:text-lg mdM:text-xl smM:text-start font-semibold underline cursor-pointer hover:!text-[#ea9c77]'
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
