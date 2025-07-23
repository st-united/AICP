import ResultHeader from '@app/components/molecules/TestResult/ResultHeader';
import InterviewBooking from '@app/components/molecules/TestResult/StepComponent/InterviewBooking';
import SkillLevel from '@app/components/molecules/TestResult/StepComponent/InterviewBooking/SkillLevel';
import SuggestionList from '@app/components/molecules/TestResult/StepComponent/InterviewBooking/SuggestionList';
import SummaryBox from '@app/components/molecules/TestResult/StepComponent/InterviewBooking/SummaryBox';

const ExamOverview = () => {
  return (
    <div className='flex flex-col gap-8'>
      <ResultHeader />
      <div className='bg-white rounded-2xl shadow p-8'>
        <InterviewBooking />
      </div>
      <div className='bg-white rounded-2xl shadow p-8'>
        <SummaryBox />
        <div className='mt-6'>
          <SkillLevel />
        </div>
      </div>
      <div className='bg-white rounded-2xl shadow p-0 sm:p-8'>
        <SuggestionList />
      </div>
    </div>
  );
};
export default ExamOverview;
