import { Card, Button } from 'antd';
import React from 'react';

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
    <Card className='w-[20rem] sm:w-[25rem] rounded-xl shadow-[0_0_10px_0_rgba(0,0,0,0.15)] transition-transform duration-300 hover:scale-105 bg-white'>
      <div className='flex justify-between items-start'>
        <div className='w-[15rem] flex flex-col justify-between h-full min-h-[12rem]'>
          <h2 className='text-lg font-semibold mb-1'>{title}</h2>
          <p className='text-black mb-14 '>{description}</p>
          <Button
            type='primary'
            onClick={onClick}
            className='w-[15rem] !text-white h-10 !rounded-full outline-none border-none bg-[#FE7743] text-lg md:text-xl font-bold hover:bg-[#ea9c77] transition-all duration-300'
          >
            {buttonText}
          </Button>
        </div>
        <span className='text-3xl sm:text-5xl text-[#02185B] '>{icon}</span>
      </div>
    </Card>
  );
};

export default DashboardCard;
