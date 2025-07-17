import ResultHeader from './ResultHeader';
import StepLayout from './StepLayout';
import { TestResultProvider } from './TestResultContext';
const ExamResult = () => {
  return (
    <div className='flex flex-col gap-4 max-w-[1200px] mx-auto'>
      <ResultHeader />
      <TestResultProvider>
        <StepLayout />
      </TestResultProvider>
    </div>
  );
};

export default ExamResult;
