import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

import { ContentModal } from './ContentModal';
import { HeaderModal } from './HeaderModal';
import { ExamStatusEnum } from '@app/constants/enum';

interface ImproveTestModalProps {
  hasTakenExam?: {
    examId?: string;
    examStatus?: string;
    examSetDuration?: number;
    totalExams?: number;
  };
  handleReviewResult: () => void;
  handleStartTest: () => void;
  submitExam: (examId: string) => void;
}

export const ImproveTestModal = ({
  hasTakenExam,
  handleReviewResult,
  handleStartTest,
  submitExam,
}: ImproveTestModalProps) => {
  const { t } = useTranslation();

  return (
    <div className='relative flex flex-col items-center'>
      <HeaderModal title={t('MODAL.TITLE_CONFIRM_IMPROVE_TEST')} symbol='?' />

      {hasTakenExam?.examSetDuration && (
        <ContentModal
          durationKey='MODAL.DURATION_CONFIRM_IMPROVE_TEST'
          hasTakenExam={{
            examSetDuration: hasTakenExam.examSetDuration,
            examStatus: hasTakenExam.examStatus,
          }}
        />
      )}

      <div className='px-3 my-5 w-full'>
        <div className='flex flex-col gap-4 md:flex-row md:justify-center md:gap-4'>
          {hasTakenExam?.examStatus !== ExamStatusEnum.IN_PROGRESS ? (
            <Button
              onClick={handleReviewResult}
              className='w-full h-full text-base font-semibold px-3 py-2 rounded-full bg-white border !border-primary !text-orange-500 hover:border-none hover:!text-white hover:!bg-primary active:border-orange-700 active:text-orange-700 transition-colors duration-200 md:w-48 md:px-6 md:py-3 md:text-xl'
            >
              {t('MODAL.REVIEW_RESULT')}
            </Button>
          ) : (
            <Button
              onClick={() => submitExam(hasTakenExam?.examId || '')}
              className='w-full h-full text-base font-semibold px-3 py-2 rounded-full bg-white border-2 !border-orange-500 !text-orange-500 hover:border-orange-600 hover:text-orange-600 active:border-orange-700 active:text-orange-700 transition-colors duration-200 md:w-48 md:px-6 md:py-3 md:text-xl'
            >
              {t('BUTTON.EXIT_TEST')}
            </Button>
          )}

          <Button
            onClick={handleStartTest}
            disabled={(hasTakenExam?.totalExams ?? 0) >= 3}
            className={`
    w-full h-full text-base font-semibold px-3 py-2 rounded-full transition-colors duration-200 md:w-48 md:px-6 md:py-3 md:text-xl
    ${
      (hasTakenExam?.totalExams ?? 0) >= 3
        ? 'bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed'
        : 'border !border-primary !bg-orange-500 !text-white hover:!bg-white hover:!text-primary'
    }
  `}
          >
            {hasTakenExam?.examStatus === ExamStatusEnum.IN_PROGRESS
              ? t('BUTTON.CONTINUE_NOW')
              : t('MODAL.START_CONFIRM_TEST')}
          </Button>
        </div>
      </div>
    </div>
  );
};
