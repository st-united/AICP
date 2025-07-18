import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { getStorageData } from '@app/config';
import { EXAM_LATEST } from '@app/constants/testing';
import { useGetExamResult } from '@app/hooks';
import { ExamSetResult } from '@app/interface/examSet.interface';

interface TestResultContextProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  onNext: () => void;
  isPortfolioExpanded: boolean;
  setIsPortfolioExpanded: (expanded: boolean) => void;
  data: ExamSetResult;
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
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [isPortfolioExpanded, setIsPortfolioExpanded] = useState(false);
  const examId = getStorageData(EXAM_LATEST);
  const { data } = useGetExamResult(examId);
  const onNext = () => {
    setCurrentStep(currentStep + 1);
  };
  if (!data)
    return <div className='text-center mt-6 text-2xl font-bold'>{t('TEST_RESULT.NO_DATA')}</div>;
  return (
    <TestResultContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        onNext,
        isPortfolioExpanded,
        setIsPortfolioExpanded,
        data,
      }}
    >
      {children}
    </TestResultContext.Provider>
  );
};
