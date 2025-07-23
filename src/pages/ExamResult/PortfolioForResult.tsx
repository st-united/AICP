import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import PortfolioContent from '@app/components/molecules/Portfolio/PortfolioContent';
import { NAVIGATE_URL } from '@app/constants/navigate';

const PortfolioForResult: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <PortfolioContent
      onSave={() => {
        navigate(NAVIGATE_URL.RESULT);
      }}
      onCancel={() => {
        navigate(NAVIGATE_URL.RESULT);
      }}
      edit={true}
      saveLabel={t('PORTFOLIO.RESULT_PORTFOLIO_SAVE_BUTTON') as string}
      cancelLabel={t('PORTFOLIO.RESULT_PORTFOLIO_BACK_BUTTON') as string}
    />
  );
};

export default PortfolioForResult;
