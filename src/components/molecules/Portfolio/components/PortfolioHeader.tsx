import { Divider } from 'antd';
import React from 'react';

import { usePortfolioContext } from '../context/PortfolioContext';

const PortfolioHeader: React.FC = () => {
  const { t } = usePortfolioContext();

  return (
    <header className='portfolio-content__header'>
      <h1>{t('PORTFOLIO.TITLE')}</h1>
      <p>{t('PORTFOLIO.SUB_TITLE')}</p>
      <div className='w-1/2 mx-auto'>
        <Divider className='bg-[#FF8C5F]' />
      </div>
      <p className='mx-auto mb-4 text-sm'>{t('PORTFOLIO.SUB_TITLE_2')}</p>
    </header>
  );
};

export { PortfolioHeader };
