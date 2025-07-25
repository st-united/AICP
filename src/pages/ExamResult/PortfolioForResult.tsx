import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import InterviewBookingModal from '@app/components/atoms/InterviewBookingModal/InterviewBookingModal';
import PortfolioContent from '@app/components/molecules/Portfolio/PortfolioContent';

const PortfolioForResult: React.FC = () => {
  const { t } = useTranslation();
  const [openInterviewBookingModal, setOpenInterviewBookingModal] = useState(false);
  return (
    <div className='bg-white rounded-2xl shadow p-8 mt-8'>
      <PortfolioContent
        onSave={() => {
          setOpenInterviewBookingModal(true);
        }}
        onCancel={() => {
          setOpenInterviewBookingModal(true);
        }}
        edit={true}
        saveLabel={t('PORTFOLIO.RESULT_PORTFOLIO_SAVE_BUTTON') as string}
        cancelLabel={t('PORTFOLIO.RESULT_PORTFOLIO_BACK_BUTTON') as string}
        isWithUserInfo={true}
      />
      <InterviewBookingModal
        open={openInterviewBookingModal}
        onCancel={() => {
          setOpenInterviewBookingModal(false);
        }}
      />
    </div>
  );
};

export default PortfolioForResult;
