import { Button, Space } from 'antd';
import { useTranslation } from 'react-i18next';

interface QuizHeaderProps {
  onDownloadAll: () => void;
  onStartNew: () => void;
  hasQuizzes: boolean;
  startNewDisabled: boolean;
}

const QuizHeader = ({
  onDownloadAll,
  onStartNew,
  hasQuizzes,
  startNewDisabled,
}: QuizHeaderProps) => {
  const { t } = useTranslation();

  return (
    <div className='flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 px-4 sm:px-0'>
      <h1 className='text-xl sm:text-2xl font-semibold text-gray-900 text-center sm:text-left w-full sm:w-auto'>
        {t('EXAM.QUIZ_LIST_TITLE')}
      </h1>
      <Space className='flex flex-col sm:flex-row w-full sm:w-auto gap-3 sm:gap-2'>
        <Button
          type='default'
          className='!border-orange-400 !text-orange-500 !hover:border-orange-500 !hover:text-orange-600 rounded-full px-4 sm:px-6 py-2 sm:py-3 w-full h-full text-sm sm:text-base font-bold'
          disabled={!hasQuizzes}
          onClick={onDownloadAll}
        >
          {t('EXAM.DOWNLOAD_ALL')}
        </Button>
        <Button
          disabled={startNewDisabled}
          type='primary'
          className='!bg-orange-500 !hover:bg-orange-600 !border-orange-500 !hover:border-orange-600 rounded-full px-4 sm:px-6 py-2 sm:py-3 w-full h-full text-sm sm:text-base font-bold'
          onClick={onStartNew}
        >
          {t('EXAM.START_NEW_QUIZ')}
        </Button>
      </Space>
    </div>
  );
};
export default QuizHeader;
