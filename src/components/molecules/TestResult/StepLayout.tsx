import { Steps } from 'antd';
import { useTranslation } from 'react-i18next';

import InterviewBooking from './StepComponent/InterviewBooking';
import PortfolioStep from './StepComponent/PortfolioStep';
import { useTestResultContext } from './TestResultContext';

import './StepLayout.scss'; // Will create this file with custom styles

const StepLayout = () => {
  const { t } = useTranslation();
  const { currentStep, setCurrentStep, isPortfolioExpanded } = useTestResultContext();
  const steps = [
    {
      title: (
        <div className='flex justify-center items-center whitespace-nowrap'>
          {t('TEST_RESULT.STEP_TEST')}
        </div>
      ),
    },
    {
      title: (
        <div className='flex justify-center items-center whitespace-nowrap'>
          {t('TEST_RESULT.STEP_PORTFOLIO')}
        </div>
      ),
      content: <PortfolioStep />,
    },
    {
      title: (
        <div className='flex justify-center items-center whitespace-nowrap'>
          {t('TEST_RESULT.STEP_BOOKING')}
        </div>
      ),
      content: <InterviewBooking />,
    },
  ];
  return (
    <div className='bg-white rounded-2xl shadow px-8 py-4'>
      <div className='custom-steps flex flex-col items-center justify-center relative'>
        {currentStep === 1 && !isPortfolioExpanded && (
          <div className='flex items-center mt-2 justify-center text-orange-500 text-xl md:text-2xl font-bold text-center'>
            {t('TEST_RESULT.EVALUATION_PATH')}
          </div>
        )}
        <Steps
          labelPlacement='vertical'
          className='!cursor-pointer w-[90%] absolute top-6 left-1/2 -translate-x-1/2'
          onChange={(current) => setCurrentStep(current)}
          size='default'
          current={currentStep}
          items={steps}
        />
        <div className='mt-40 md:mt-28'>{steps[currentStep || 0].content}</div>
      </div>
    </div>
  );
};

export default StepLayout;
