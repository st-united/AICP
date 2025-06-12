import React, { useCallback, useMemo, memo } from 'react';
// import { useNavigate } from 'react-router-dom';

import PortfolioContent from '@app/components/molecules/Portfolio/PortfolioContent';
// import { NAVIGATE_URL } from '@app/constants';
const PortfolioPage: React.FC = memo(() => {
  // const navigate = useNavigate();
  // const handleSave = useCallback(() => {
  //   console.log('Portfolio save action triggered');
  //   navigate(NAVIGATE_URL.LANDING_PAGE);
  // }, [navigate]);

  // const handleCancel = useCallback(() => {
  //   console.log('Portfolio cancel action triggered');
  //   navigate(NAVIGATE_URL.SIGN_OUT);
  // }, [navigate]);

  // const portfolioConfig = useMemo(
  //   () => ({
  //     edit: true,
  //     saveLabel: 'Hoàn tất',
  //     cancelLabel: 'Để sau',
  //   }),
  //   [],
  // );
  return <PortfolioContent />;
  //  return <PortfolioContent {...portfolioConfig} onSave={handleSave} onCancel={handleCancel} />;
});

PortfolioPage.displayName = 'PortfolioPage';

export default PortfolioPage;
