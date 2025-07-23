import { useTranslation } from 'react-i18next';

import ResultHeader from './ResultHeader';
import StepLayout from './StepLayout';
import { TestResultProvider } from './TestResultContext';
import { getStorageData } from '@app/config';
import { EXAM_LATEST } from '@app/constants/testing';

const ExamResult = () => {
  const examId = getStorageData(EXAM_LATEST);
  const { t } = useTranslation();
  if (!examId)
    return <div className='text-center mt-6 text-2xl font-bold'>{t('TEST_RESULT.NO_DATA')}</div>;
  return (
    <div className='flex flex-col gap-4 max-w-[1200px] mx-auto'>
      <TestResultProvider>
        <ResultHeader />
        <StepLayout />
      </TestResultProvider>
    </div>
  );
};

export default ExamResult;
