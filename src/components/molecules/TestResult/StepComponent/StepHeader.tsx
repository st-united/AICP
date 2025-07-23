import { useTranslation } from 'react-i18next';

const StepHeader = () => {
  const { t } = useTranslation();
  return (
    <div className='flex items-center justify-center text-orange-500 text-xl md:text-4xl font-bold text-center mt-6'>
      {t('TEST_RESULT.EVALUATION_PATH')}
    </div>
  );
};

export default StepHeader;
