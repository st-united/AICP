import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import PortfolioConfirmationModal from '@app/components/molecules/Portfolio/components/PortfolioConfirmationModal';
import PortfolioContent from '@app/components/molecules/Portfolio/PortfolioContent';
import InterviewSuccessModal from '@app/components/molecules/TestResult/StepComponent/InterviewBooking/InterviewSuccessModal';
import { NAVIGATE_URL } from '@app/constants';
import {
  PORTFOLIO_FIELD_DISPLAY_NAMES,
  PortfolioRequest,
} from '@app/interface/portfolio.interface';

const PortfolioForResult: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [openInterviewBookingModal, setOpenInterviewBookingModal] = useState(false);
  const [confirmationModalState, setConfirmationModalState] = useState<
    | {
        values: PortfolioRequest;
        onConfirm: () => void;
      }
    | undefined
  >();
  const missingItems = useMemo(() => {
    return confirmationModalState
      ? Object.keys(confirmationModalState.values)
          .filter((key) => {
            const value = confirmationModalState.values[key as keyof PortfolioRequest];
            return (
              (value === undefined ||
                value === null ||
                value === '' ||
                (Array.isArray(value) && value.length === 0)) &&
              key !== 'university' &&
              key !== 'studentCode'
            );
          })
          .map((key) => ({
            name: t(PORTFOLIO_FIELD_DISPLAY_NAMES[key as keyof PortfolioRequest]),
            onClick: () => {
              setConfirmationModalState(undefined);
              const element = document.getElementById(key);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            },
          }))
      : [];
  }, [confirmationModalState, t]);

  return (
    <div className='bg-white rounded-2xl shadow p-8 mt-8'>
      <PortfolioContent
        onCancel={() => {
          navigate(NAVIGATE_URL.RESULT);
        }}
        edit={true}
        saveLabel={t('PORTFOLIO.RESULT_PORTFOLIO_SAVE_BUTTON') as string}
        cancelLabel={t('PORTFOLIO.RESULT_PORTFOLIO_BACK_BUTTON') as string}
        isWithUserInfo={true}
        triggerConfirmationModal={(values, onConfirm) => {
          setConfirmationModalState({ values, onConfirm });
        }}
        onSave={() => {
          setOpenInterviewBookingModal(true);
        }}
      />
      <InterviewSuccessModal
        open={openInterviewBookingModal}
        onCancel={() => {
          setOpenInterviewBookingModal(false);
        }}
      />
      <PortfolioConfirmationModal
        isOpen={!!confirmationModalState}
        onClose={() => setConfirmationModalState(undefined)}
        onConfirm={() => {
          confirmationModalState?.onConfirm();
          setConfirmationModalState(undefined);
        }}
        onContinue={() => {
          setConfirmationModalState(undefined);
        }}
        missingItems={missingItems}
        t={t}
      />
    </div>
  );
};

export default PortfolioForResult;
