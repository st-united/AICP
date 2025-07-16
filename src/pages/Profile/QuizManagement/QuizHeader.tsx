import { Button, Space } from 'antd';
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
    <div className='flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 px-4 sm:px-0'>
      <h1 className='text-2xl sm:text-3xl font-semibold text-gray-900 text-center sm:text-left w-full sm:w-auto'>
        {examId ? t('EXAM.QUIZ_ID_PREFIX') : t('EXAM.QUIZ_LIST_TITLE')}
        {examId && <span className='font-bold text-black'> #{examId.slice(0, 8)}</span>}
      </h1>
      {!disableButtons && (
        <Space className='flex flex-col sm:flex-row w-full sm:w-auto gap-3 sm:gap-2'>
          <Button
            type='default'
            className='!border-orange-400 !text-orange-500 !hover:border-orange-500 !hover:text-orange-600 rounded-full px-4 sm:px-6 py-2 sm:py-3 w-full h-full text-base sm:text-lg font-bold'
            disabled={!hasQuizzes}
            onClick={onDownloadAll}
          >
            {!examId ? t('EXAM.DOWNLOAD_ALL') : t('EXAM.DOWNLOAD_QUIZ')}
          </Button>
          <Button
            disabled={startNewDisabled}
            type='primary'
            className='!bg-orange-500 !hover:bg-orange-600 !border-orange-500 !hover:border-orange-600 rounded-full px-4 sm:px-6 py-2 sm:py-3 w-full h-full text-base sm:text-lg font-bold'
            onClick={onStartNew}
          >
            {t('EXAM.START_NEW_QUIZ')}
          </Button>
        </Space>
      )}
    </div>
  );
};
export default QuizHeader;
