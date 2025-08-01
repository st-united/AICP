import { DownloadOutlined } from '@ant-design/icons';
import { Spin, Checkbox } from 'antd';
import { Dayjs } from 'dayjs';
import { t } from 'i18next';
import { useState, useMemo } from 'react';

import ExamDetailView from './ExamDetailView';
import DateFilter from './QuizManagement/DateFilterProps';
import EmptyState from './QuizManagement/EmptyState';
import ErrorState from './QuizManagement/ErrorState';
import QuizCard from './QuizManagement/QuizCard';
import QuizHeader from './QuizManagement/QuizHeader';
import { DATE_TIME } from '@app/constants';
import { ExamStatusEnum } from '@app/constants/enum';
import { useExamDetail, useGetHistory } from '@app/hooks';
import { useNavigate } from 'react-router-dom';
import './ExamHistory.scss';

const ExamHistory = () => {
  const [selectedQuizzes, setSelectedQuizzes] = useState<Set<string>>(new Set());
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);
  const navigate = useNavigate();

  const apiParams = useMemo(() => {
    if (!dateRange?.[0] && !dateRange?.[1]) return undefined;
    return {
      startDate: dateRange?.[0]?.format(DATE_TIME.YEAR_MONTH_DATE),
      endDate: dateRange?.[1]?.format(DATE_TIME.YEAR_MONTH_DATE),
    };
  }, [dateRange]);

  const {
    data: historyData,
    isLoading: isExamLoading,
    error: examError,
    refetch,
  } = useGetHistory(apiParams);
  const {
    data: examDetail,
    isLoading: isDetailLoading,
    error: detailError,
  } = useExamDetail(selectedQuizId || '');

  const isLoading = isExamLoading && isDetailLoading;
  const hasQuizzes = !!historyData?.length;
  const showDetailView = selectedQuizId && examDetail;
  const totalQuizzes = historyData?.length || 0;
  const selectedCount = selectedQuizzes.size;
  const allChecked = totalQuizzes > 0 && selectedCount === totalQuizzes;
  const someChecked = selectedCount > 0 && !allChecked;

  const hasInProgressQuiz = useMemo(() => {
    if (!historyData) return false;
    return historyData.some((quiz) =>
      [
        ExamStatusEnum.IN_PROGRESS,
        ExamStatusEnum.SUBMITTED,
        ExamStatusEnum.WAITING_FOR_REVIEW,
      ].includes(quiz.examStatus),
    );
  }, [historyData]);

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

  const handleDownloadAll = () => {
    // Todo
  };

  const handleStartNew = () => {
    // Todo
  };

  const handleStartFirst = () => {
    // Todo
  };

  if (isLoading) return <Spin className='flex items-center justify-center h-full' />;
  if (examError || detailError) return <ErrorState onRetry={refetch} />;

  return (
    <div className='h-full !rounded-2xl'>
      <div className='max-w-7xl mx-auto space-y-4 h-full flex flex-col overflow-y-auto px-2'>
        <QuizHeader
          onDownloadAll={handleDownloadAll}
          onStartNew={handleStartNew}
          hasQuizzes={hasQuizzes}
          startNewDisabled={hasInProgressQuiz}
          examId={selectedQuizId}
          disableButtons={historyData?.length === 0 ? true : false}
        />

        {showDetailView ? (
          <ExamDetailView exam={examDetail} onBack={() => setSelectedQuizId(null)} />
        ) : (
          <>
            <DateFilter onDateChange={setDateRange} value={dateRange} />
            {!hasQuizzes ? (
              <EmptyState onStartFirst={handleStartFirst} />
            ) : (
              <div className='quiz-history__list scroll-hidden overflow-y-auto flex-1 space-y-4 px-1 p-4'>
                {historyData.map((quiz) => (
                  <QuizCard
                    key={quiz.id}
                    quiz={quiz}
                    onCheckboxChange={handleCheckboxChange}
                    isChecked={selectedQuizzes.has(quiz.id)}
                    onClick={() =>
                      quiz.examStatus !== ExamStatusEnum.IN_PROGRESS &&
                      navigate(`/history/${quiz.id}`)
                    }
                    disabled={quiz.examStatus === ExamStatusEnum.IN_PROGRESS}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ExamHistory;
