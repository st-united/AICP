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
        <div className='flex justify-center items-center whitespace-nowrap'>
          {t('TEST_RESULT.STEP_TEST')}
        </div>
      ),
      disabled: true,
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
    <div>
      <div className='bg-white rounded-2xl shadow px-8 py-4'>
        <div className='custom-steps flex flex-col items-center justify-center relative'>
          {(currentStep === 1 || currentStep === 2) && !isPortfolioExpanded && (
            <div className='flex items-center mt-2 justify-center text-orange-500 text-xl md:text-4xl font-bold text-center'>
              {t('TEST_RESULT.EVALUATION_PATH')}
            </div>
          )}
          <Steps
            labelPlacement='vertical'
            className='!cursor-pointer w-[90%] absolute top-10 left-1/2 -translate-x-1/2'
            onChange={(current) => setCurrentStep(current)}
            size='default'
            current={currentStep}
            items={steps}
          />
        </div>
        <div className='mt-40 md:mt-28'>{steps[currentStep || 1].content}</div>
      </div>
      {currentStep === 2 && (
        <>
          <div className='bg-white rounded-2xl shadow px-8 py-4 mt-6'>
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
