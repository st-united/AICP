import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

interface QuizHeaderProps {
  onDownloadAll: () => void;
  onStartNew: () => void;
  hasQuizzes: boolean;
  startNewDisabled: boolean;
  examId?: string | null;
  disableButtons?: boolean;
}

const QuizHeader = ({
  onDownloadAll,
  onStartNew,
  hasQuizzes,
  startNewDisabled,
  examId,
  disableButtons,
}: QuizHeaderProps) => {
  const { t } = useTranslation();

  return (
    <div className='flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6'>
      <h1 className='text-2xl md:text-3xl lg:text-3xl font-semibold text-gray-900 text-center md:text-left w-full md:w-auto'>
        {examId ? t('EXAM.QUIZ_ID_PREFIX') : t('EXAM.QUIZ_LIST_TITLE')}
        {examId && <span className='font-bold text-black'> #{examId.slice(0, 8)}</span>}
      </h1>
      {!disableButtons && (
        <div className='flex flex-col sm:flex-row md:flex-row w-full md:w-auto gap-3 sm:gap-2 md:gap-3'>
          <Button
            type='default'
            className='!border-orange-400 !text-orange-500 !hover:border-orange-500 !hover:text-orange-600 rounded-full px-4 md:px-5 lg:px-6 py-2 md:py-2.5 lg:py-3 w-full sm:flex-1 md:w-auto h-full text-sm md:text-base lg:text-lg font-bold min-w-[140px] md:min-w-[160px]'
            disabled={!hasQuizzes}
            onClick={onDownloadAll}
          >
            {!examId ? t('EXAM.DOWNLOAD_ALL') : t('EXAM.DOWNLOAD_QUIZ')}
          </Button>
          <Button
            disabled={startNewDisabled}
            type='primary'
            className={`rounded-full px-4 md:px-5 lg:px-6 py-2 md:py-2.5 lg:py-3 w-full sm:flex-1 md:w-auto h-full text-sm md:text-base lg:text-lg font-bold min-w-[140px] md:min-w-[160px] ${
              startNewDisabled
                ? '!bg-gray-400 !hover:bg-gray-400 !text-gray-200 !border-gray-400 !hover:border-gray-400 !cursor-not-allowed'
                : '!bg-orange-500 !hover:bg-orange-600 !text-white !border-orange-500 !hover:border-orange-600'
            }`}
            onClick={onStartNew}
          >
            {t('EXAM.START_NEW_QUIZ')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuizHeader;
