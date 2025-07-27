import { useTranslation } from 'react-i18next';

import InterviewBooking from '@app/components/molecules/TestResult/StepComponent/InterviewBooking';
import SkillLevel from '@app/components/molecules/TestResult/StepComponent/InterviewBooking/SkillLevel';
import SuggestionList from '@app/components/molecules/TestResult/StepComponent/InterviewBooking/SuggestionList';
import SummaryBox from '@app/components/molecules/TestResult/StepComponent/InterviewBooking/SummaryBox';

const ExamOverview = () => {
  return (
    <div className='flex flex-col gap-8'>
      <div className='bg-white rounded-2xl shadow p-8'>
        <InterviewBooking />
      </div>
      <div className='bg-white rounded-2xl shadow p-8'>
        <SummaryBox />
      </div>
      <div className='bg-white rounded-2xl shadow mt-6 p-2 sm:p-8'>
        <SkillLevel />
      </div>
      <div className='bg-white rounded-2xl shadow p-0 sm:p-8'>
        <SuggestionList />
      </div>
    </div>
  );
};
export default ExamOverview;
