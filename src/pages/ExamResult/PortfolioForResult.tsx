import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import PortfolioConfirmationModal from '@app/components/molecules/Portfolio/components/PortfolioConfirmationModal';
import PortfolioContent from '@app/components/molecules/Portfolio/PortfolioContent';
import { NAVIGATE_URL } from '@app/constants';
import {
  PORTFOLIO_FIELD_DISPLAY_NAMES,
  PortfolioRequest,
} from '@app/interface/portfolio.interface';

const PortfolioForResult: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [confirmationModalState, setConfirmationModalState] = useState<
    | {
        values: PortfolioRequest;
        onConfirm: () => void;
      }
    | undefined
  >();

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
