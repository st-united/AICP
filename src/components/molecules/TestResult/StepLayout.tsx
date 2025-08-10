import { Steps } from 'antd';
import { useTranslation } from 'react-i18next';

import InterviewBooking from './StepComponent/InterviewBooking';
import SkillLevel from './StepComponent/InterviewBooking/SkillLevel';
import SuggestionList from './StepComponent/InterviewBooking/SuggestionList';
import SummaryBox from './StepComponent/InterviewBooking/SummaryBox';
import PortfolioStep from './StepComponent/PortfolioStep';
import { useTestResultContext } from './TestResultContext';

import './StepLayout.scss';

const StepLayout = () => {
  const { t } = useTranslation();
  const { currentStep, setCurrentStep, isPortfolioExpanded } = useTestResultContext();

  const steps = [
    {
      title: (
        <div className='flex justify-center items-center text-center'>
          <span className='text-xs sm:text-sm md:text-base font-medium'>
            {t('TEST_RESULT.STEP_TEST')}
          </span>
        </div>
      ),
      disabled: true,
    },
    {
      title: (
        <div className='flex justify-center items-center text-center'>
          <span className='text-xs sm:text-sm md:text-base font-medium'>
            {t('TEST_RESULT.STEP_PORTFOLIO')}
          </span>
        </div>
      ),
      content: <PortfolioStep />,
    },
    {
      title: (
        <div className='flex justify-center items-center text-center'>
          <span className='text-xs sm:text-sm md:text-base font-medium'>
            {t('TEST_RESULT.STEP_BOOKING')}
          </span>
        </div>
      ),
      content: <InterviewBooking />,
    },
  ];

  return (
    <div className='space-y-4 sm:space-y-6'>
      <div className='bg-white rounded-xl sm:rounded-2xl shadow-sm sm:shadow px-4 sm:px-6 lg:px-8 py-4 sm:py-6'>
        <div className='custom-steps flex flex-col items-center justify-center relative'>
          {currentStep === 1 && !isPortfolioExpanded && (
            <div className='flex items-center justify-center text-orange-500 text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-center mb-4 sm:mb-6 px-2'>
              {t('TEST_RESULT.EVALUATION_PATH')}
            </div>
          )}

          <div className='w-full relative'>
            <Steps
              labelPlacement='vertical'
              className='!cursor-pointer w-full max-w-2xl mx-auto'
              onChange={(current) => setCurrentStep(current)}
              size='default'
              current={currentStep}
              items={steps}
              responsive={false}
            />
          </div>
        </div>

        <div className='mt-8 sm:mt-12 md:mt-16 lg:mt-20'>{steps[currentStep || 1].content}</div>
      </div>

      {currentStep === 2 && (
        <>
          <div className='bg-white rounded-xl sm:rounded-2xl shadow-sm sm:shadow px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6'>
            <SummaryBox />
            <SkillLevel />
          </div>
          <SuggestionList />
        </>
      )}
    </div>
  );
};

export default StepLayout;
