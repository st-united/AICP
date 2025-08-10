import { Divider } from 'antd';
import React from 'react';

import { usePortfolioContext } from '../context/PortfolioContext';

const PortfolioHeader: React.FC = () => {
  const { t, isWithUserInfo } = usePortfolioContext();

  return (
    <header className='portfolio-content__header'>
      {isWithUserInfo ? (
        <h1>{t('PORTFOLIO.TITLE')}</h1>
      ) : (
        <div className='text-black text-[20px] font-bold'>{t('PORTFOLIO.TITLE_2')}</div>
      )}
      {isWithUserInfo && (
        <div className='flex flex-col gap-6'>
          <div className='text-[#686868] text-lg'>{t('PORTFOLIO.SUB_TITLE')}</div>
          <div className='flex flex-col'>
            <div className='text-black text-base'>{t('PORTFOLIO.SUB_TITLE_2')}</div>
            <div className='w-1/6 mx-auto'>
              <Divider className='bg-[#fe7743] border-0 h-[1px] !p-0' />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export { PortfolioHeader };
