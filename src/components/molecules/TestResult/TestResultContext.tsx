import { createContext, useContext, useState, ReactNode } from 'react';

import { getStorageData } from '@app/config';
import { EXAM_LATEST, TEST_RESULT_CURRENT_STEP } from '@app/constants/testing';
import { useGetExamResult } from '@app/hooks';
import { ExamSetResult } from '@app/interface/examSet.interface';

interface TestResultContextProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  onNext: () => void;
  isPortfolioExpanded: boolean;
  setIsPortfolioExpanded: (expanded: boolean) => void;
  data: ExamSetResult | undefined;
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
