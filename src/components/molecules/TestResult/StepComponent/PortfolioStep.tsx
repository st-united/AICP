import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

import PortfolioContent from '../../Portfolio/PortfolioContent';
import { useTestResultContext } from '../TestResultContext';

const PortfolioStep = () => {
  const { t } = useTranslation();
  const { onNext, isPortfolioExpanded, setIsPortfolioExpanded } = useTestResultContext();
  return (
    <>
      {!isPortfolioExpanded ? (
        <div className='flex items-center justify-center'>
          <div className='md:w-4/5 flex flex-col items-center justify-center gap-4 px-4 md:px-16 text-center text-xl font-semibold text-[#5B5B5B] '>
            {t('TEST_RESULT.PORTFOLIO_STEP_DESC')}
            <Button
              type='primary'
              className='rounded-full text-lg font-bold px-6 py-5 mb-6'
              onClick={() => setIsPortfolioExpanded(true)}
            >
              {t('TEST_RESULT.PORTFOLIO_STEP_BUTTON')}
            </Button>
          </div>
        </div>
      ) : (
        <PortfolioContent
          onSave={onNext}
          onCancel={onNext}
          edit={true}
          saveLabel={t('TEST_RESULT.PORTFOLIO_STEP_SAVE') as string}
          cancelLabel={t('TEST_RESULT.PORTFOLIO_STEP_CANCEL') as string}
        />
      )}
    </>
  );
};
export default PortfolioStep;
