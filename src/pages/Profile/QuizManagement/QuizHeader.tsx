import { Space } from 'antd';
import { useTranslation } from 'react-i18next';

interface QuizHeaderProps {
  examId?: string | null;
  disableButtons?: boolean;
}

const QuizHeader = ({ examId, disableButtons }: QuizHeaderProps) => {
  const { t } = useTranslation();

  return (
    <div className='flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6'>
      <h1 className='text-2xl md:text-3xl lg:text-3xl font-semibold text-gray-900 text-center md:text-left w-full md:w-auto'>
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
