import { Spin } from 'antd';
import { Moment } from 'moment';
import { useState, useMemo } from 'react';

import DateFilter from './QuizManagement/DateFilterProps';
import EmptyState from './QuizManagement/EmptyState';
import ErrorState from './QuizManagement/ErrorState';
import QuizCard from './QuizManagement/QuizCard';
import QuizHeader from './QuizManagement/QuizHeader';
import { DATE_TIME } from '@app/constants';
import { ExamStatusEnum } from '@app/constants/enum';
import { useGetHistory } from '@app/hooks';

const ExamHistory = () => {
  const [selectedQuizzes, setSelectedQuizzes] = useState<Set<string>>(new Set());
  const [dateRange, setDateRange] = useState<[Moment | null, Moment | null] | null>(null);

  const apiParams = useMemo(() => {
    if (!dateRange || !dateRange[0] || !dateRange[1]) {
      return undefined;
    }
    return {
      startDate: dateRange[0].format(DATE_TIME.YEAR_MONTH_DATE),
      endDate: dateRange[1].format(DATE_TIME.YEAR_MONTH_DATE),
    };
  }, [dateRange]);

  const { data: historyData, isLoading, error, refetch } = useGetHistory(apiParams);

  const handleCheckboxChange = (quizId: string, checked: boolean) => {
    const newSelectedQuizzes = new Set(selectedQuizzes);
    if (checked) {
      newSelectedQuizzes.add(quizId);
    } else {
      newSelectedQuizzes.delete(quizId);
    }
    setSelectedQuizzes(newSelectedQuizzes);
  };

  const handleDateChange = (dates: [Moment | null, Moment | null] | null) => {
    setDateRange(dates);
  };

  const handleDownloadAll = () => {
    // Todo
  };

  const handleStartNew = () => {
    // Todo
  };

  const handleStartFirst = () => {
    // Todo
  };

  const hasInProgressQuiz = useMemo(() => {
    if (!historyData) return false;

    return historyData.some(
      (quiz) =>
        quiz.examStatus === ExamStatusEnum.IN_PROGRESS ||
        quiz.examStatus === ExamStatusEnum.SUBMITTED ||
        quiz.examStatus === ExamStatusEnum.WAITING_FOR_REVIEW,
    );
  }, [historyData]);

  if (isLoading) {
    return <Spin className='flex items-center justify-center h-full' />;
  }
  if (error) {
    return <ErrorState onRetry={refetch} />;
  }

  const hasQuizzes = historyData && historyData.length > 0;

  return (
    <div className='h-full !rounded-2xl bg-gray-50 p-2 sm:p-6'>
      <div className='max-w-4xl mx-auto space-y-4 h-full flex flex-col'>
        <QuizHeader
          onDownloadAll={handleDownloadAll}
          onStartNew={handleStartNew}
          hasQuizzes={!!hasQuizzes}
          startNewDisabled={hasInProgressQuiz}
        />

        <DateFilter onDateChange={handleDateChange} value={dateRange} />

        {!hasQuizzes ? (
          <EmptyState onStartFirst={handleStartFirst} />
        ) : (
          <div className='overflow-y-auto flex-1 space-y-4 p-2'>
            {historyData.map((quiz) => (
              <QuizCard
                key={quiz.id}
                quiz={quiz}
                onCheckboxChange={handleCheckboxChange}
                isChecked={selectedQuizzes.has(quiz.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamHistory;
