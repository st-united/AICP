import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

import { noExamHistory } from '@app/assets/images';

interface EmptyStateProps {
  onStartFirst: () => void;
}

const EmptyState = ({ onStartFirst }: EmptyStateProps) => {
  const { t } = useTranslation();

  return (
    <div className='w-full flex flex-col items-center justify-center sm:mx-auto px-6 sm:px-8 shadow-sm bg-white rounded-xl sm:rounded-2xl hover:shadow-md transition-shadow duration-200 max-w-4xl mx-auto'>
      <div className='flex flex-col items-center justify-center p-6'>
        <img
          src={noExamHistory}
          alt='Empty quiz illustration'
          className='object-contain w-3/4 sm:w-1/2 max-h-48 sm:max-h-60 mx-auto'
        />
        <h2 className='text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 text-center px-4'>
          {t('EXAM.NO_QUIZ_TITLE')}
        </h2>

        <div className='text-gray-500 text-center mb-6 sm:mb-8 leading-relaxed px-4'>
          <p className='text-sm sm:text-base mb-2'>{t('EXAM.NO_QUIZ_DESC_1')}</p>
          <p className='text-sm sm:text-base'>{t('EXAM.NO_QUIZ_DESC_2')}</p>
        </div>

        <Button
          type='primary'
          size='large'
          className='w-full sm:w-auto !bg-orange-500 hover:bg-orange-600 !border-orange-500 !hover:border-orange-600 rounded-full px-6 sm:px-8 py-2 h-auto text-sm sm:text-base font-medium shadow-lg hover:shadow-xl transition-all duration-200'
          onClick={onStartFirst}
        >
          {t('EXAM.START_FIRST_QUIZ')}
        </Button>
      </div>
    </div>
  );
};

export default EmptyState;
