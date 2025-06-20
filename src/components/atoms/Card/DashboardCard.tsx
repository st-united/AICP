import { Card, Button } from 'antd';
import React from 'react';
import './DashboardCard.scss';

interface DashboardCardProps {
  title: string;
  description: string;
  buttonText: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  buttonText,
  icon,
  onClick,
}) => {
  return (
    <Card className='custom-card w-full mdM:w-[90%] rounded-xl py-4 shadow-[0_0_10px_0_rgba(0,0,0,0.15)] transition-transform duration-300 hover:scale-105 bg-white'>
      <div className='flex flex-col justify-between h-full'>
        <div className='flex justify-between'>
          <div className='flex flex-col md:justify-between mdM:mb-12'>
            <h2 className='text-lg mdM:text-2xl font-semibold mb-1 mdM:mb-6'>{title}</h2>
            <p className='text-black mb-8 mdM:text-xl'>{description}</p>
          </div>
          <span className='text-3xl smM:text-5xl text-[#02185B] '>{icon}</span>
        </div>

        <div className='flex items-center justify-center smM:justify-start'>
          <Button
            type='primary'
            onClick={onClick}
            className='h-12 mdL:h-14 px-8 !text-white border !border-primary !rounded-full outline-none !bg-primary text-lg md:text-xl font-bold hover:!bg-white hover:!text-primary transition-all duration-300'
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default DashboardCard;
