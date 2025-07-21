import { createContext, useContext, useState, ReactNode } from 'react';

import { getStorageData } from '@app/config';
import { EXAM_LATEST } from '@app/constants/testing';
import { useGetExamResult } from '@app/hooks';
import { ExamSetResult } from '@app/interface/examSet.interface';
import { Spin } from 'antd';

interface TestResultContextProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  onNext: () => void;
  isPortfolioExpanded: boolean;
  setIsPortfolioExpanded: (expanded: boolean) => void;
  data: ExamSetResult;
  isLoading: boolean;
}

const TestResultContext = createContext<TestResultContextProps | undefined>(undefined);

export const useTestResultContext = () => {
  const context = useContext(TestResultContext);
  if (!context) {
    throw new Error('useTestResultContext must be used within a TestResultProvider');
  }
  return context;
};

const TEST_RESULT_CURRENT_STEP = 'TEST_RESULT_CURRENT_STEP';

export const TestResultProvider = ({ children }: { children: ReactNode }) => {
  const getInitialStep = () => {
    const savedStep = localStorage.getItem(TEST_RESULT_CURRENT_STEP);
    return savedStep ? Number(savedStep) : 1;
  };
  const [currentStep, setCurrentStepState] = useState<number>(getInitialStep());
  const [isPortfolioExpanded, setIsPortfolioExpanded] = useState(false);
  const examId = getStorageData(EXAM_LATEST);
  const { data, isLoading } = useGetExamResult(examId);
  const setCurrentStep = (step: number) => {
    setCurrentStepState(step);
    localStorage.setItem(TEST_RESULT_CURRENT_STEP, String(step));
  };
  const onNext = () => {
    setCurrentStep(currentStep + 1);
  };
  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spin />
      </div>
    );
  }
  return (
    <TestResultContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        onNext,
        isPortfolioExpanded,
        setIsPortfolioExpanded,
        data,
        isLoading,
      }}
    >
      {children}
    </TestResultContext.Provider>
  );
};
