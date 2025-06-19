import { Spin, Checkbox } from 'antd';
import { Dayjs } from 'dayjs';
import { useState, useMemo } from 'react';
import { DownloadOutlined } from '@ant-design/icons';

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
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);

  const apiParams = useMemo(() => {
    const [start, end] = dateRange || [];
    if (!start && !end) return undefined;

    const result: Record<string, string> = {};

    if (start) {
      result.startDate = start.format(DATE_TIME.YEAR_MONTH_DATE);
    }

    if (end) {
      result.endDate = end.format(DATE_TIME.YEAR_MONTH_DATE);
    }

    return result;
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

  const handleCheckAll = (checked: boolean) => {
    if (!historyData) return;
    setSelectedQuizzes(checked ? new Set(historyData.map((quiz) => quiz.id)) : new Set());
  };

  const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
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

  const totalQuizzes = historyData?.length || 0;
  const selectedCount = selectedQuizzes.size;

  const allChecked = totalQuizzes > 0 && selectedCount === totalQuizzes;
  const someChecked = selectedCount > 0 && !allChecked;

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

        {error ? (
          <ErrorState onRetry={refetch} />
        ) : !hasQuizzes && !isLoading ? (
          <EmptyState onStartFirst={handleStartFirst} />
        ) : (
          <div className='relative overflow-y-auto flex-1 space-y-4 p-2'>
            {isLoading && (
              <div className='absolute inset-0 bg-white/60 flex items-center justify-center z-10'>
                <Spin />
              </div>
            )}

            <div className='flex items-center space-x-2 mb-2 z-0'>
              <Checkbox
                checked={allChecked}
                indeterminate={someChecked}
                onChange={(e) => handleCheckAll(e.target.checked)}
              />
              <p className='font-medium'>Chọn tất cả</p>

              <button
                onClick={handleDownloadAll}
                className='w-[25px] h-[25px] flex items-center justify-center rounded-md border border-orange-500 text-orange-500 hover:bg-orange-50 transition'
              >
                <DownloadOutlined className='text-base' />
              </button>
            </div>

            {historyData?.map((quiz) => (
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
