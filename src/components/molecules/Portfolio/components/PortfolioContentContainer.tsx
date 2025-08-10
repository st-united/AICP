import { Spin } from 'antd';
import React from 'react';

import { PortfolioForm } from './PortfolioForm';
import { usePortfolioContext } from '../context/PortfolioContext';

const PortfolioContentContainer: React.FC = () => {
  const { isLoading } = usePortfolioContext();

  if (isLoading) {
    return (
      <div className='h-full w-full flex items-center justify-center text-lg'>
        <Spin />
      </div>
    );
  }

  return (
    <div className='portfolio-content'>
      <PortfolioForm />
    </div>
  );
};

export { PortfolioContentContainer };
