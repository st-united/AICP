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

export const TestResultProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isPortfolioExpanded, setIsPortfolioExpanded] = useState(false);
  const examId = getStorageData(EXAM_LATEST);
  const { data, isLoading } = useGetExamResult(examId);
  const onNext = () => {
    setCurrentStep(currentStep + 1);
  };
  if (isLoading) {
    return <Spin />;
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
