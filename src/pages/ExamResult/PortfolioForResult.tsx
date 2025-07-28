import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import PortfolioConfirmationModal from '@app/components/molecules/Portfolio/components/PortfolioConfirmationModal';
import PortfolioContent from '@app/components/molecules/Portfolio/PortfolioContent';
import InterviewSuccessModal from '@app/components/molecules/TestResult/StepComponent/InterviewBooking/InterviewSuccessModal';
import { NAVIGATE_URL } from '@app/constants';
import { useCheckBooking, useUserBooking } from '@app/hooks/useBooking';
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
  const { data: bookingStatus } = useCheckBooking();
  const { mutate: userBooking } = useUserBooking();
  const handleBooking = () => {
    if (!bookingStatus?.hasBooking) {
      userBooking(undefined, {
        onSuccess: () => {
          setOpenInterviewBookingModal(true);
        },
      });
    }
  };
  const missingItems = useMemo(() => {
    if (!confirmationModalState) return [];

    const excludedFields = new Set(['university', 'studentCode']);

    return Object.entries(confirmationModalState.values)
      .filter(([key, value]) => {
        if (excludedFields.has(key)) return false;

        return (
          value === undefined ||
          value === null ||
          value === '' ||
          (Array.isArray(value) && value.length === 0)
        );
      })
      .map(([key]) => ({
        name: t(PORTFOLIO_FIELD_DISPLAY_NAMES[key as keyof PortfolioRequest]),
        onClick: () => {
          setConfirmationModalState(undefined);
          const element = document.getElementById(key);
          element?.scrollIntoView({ behavior: 'smooth' });
        },
      }));
  }, [confirmationModalState, t]);

  const handleCancel = useCallback(() => {
    setConfirmationModalState(undefined);
    navigate(NAVIGATE_URL.RESULT);
  }, [navigate]);

  return (
    <div className='bg-white rounded-2xl shadow p-8'>
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
          handleBooking();
        }}
      />
      <InterviewSuccessModal
        open={openInterviewBookingModal}
        onCancel={() => {
          handleCancel();
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
