import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

import { ContentModal } from './ContentModal';
import { HeaderModal } from './HeaderModal';

interface NewTestModalProps {
  confirmProps: {
    onClose: () => void;
  };
  handleStartTest: () => void;
  hasTakenExam?: {
    examSetDuration: number;
    examStatus?: string;
  };
}

export const NewTestModal = ({
  confirmProps,
  handleStartTest,
  hasTakenExam,
}: NewTestModalProps) => {
  const { t } = useTranslation();

  return (
    <div className='relative flex flex-col items-center justify-center'>
      <HeaderModal
        title={t('MODAL.TITLE_CONFIRM_TAKE_NEW_TEST')}
        onClose={confirmProps.onClose}
        symbol='?'
      />

      <ContentModal
        durationKey='MODAL.DURATION_CONFIRM_TAKE_NEW_TEST'
        hasTakenExam={hasTakenExam}
      />

      <div className='px-3 w-full flex justify-center items-center my-8'>
        <Button
          onClick={handleStartTest}
          className='w-[150px] h-full text-lg font-semibold px-4 py-2 rounded-full border !border-primary !bg-orange-500 hover:!bg-white hover:!text-primary active:bg-orange-700 !text-white transition-colors duration-200 md:w-auto md:min-w-[12rem] md:px-8 md:py-3 md:text-xl'
        >
          {t('MODAL.START_CONFIRM_TEST')}
        </Button>
      </div>
    </div>
  );
};
