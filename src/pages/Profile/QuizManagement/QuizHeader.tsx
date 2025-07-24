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
        <Space className='flex flex-col sm:flex-row w-full sm:w-auto gap-3 sm:gap-2'></Space>
      )}
    </div>
  );
};
export default QuizHeader;
