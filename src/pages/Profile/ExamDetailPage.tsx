import { Spin } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';

import ExamDetailView from './ExamDetailView';
import ErrorState from './QuizManagement/ErrorState';
import { useExamDetail } from '@app/hooks';

const ExamDetailPage = () => {
  const { examId } = useParams<{ examId: string }>();
  console.log(examId);

  const navigate = useNavigate();

  const { data: examDetail, isLoading, error, refetch } = useExamDetail(examId || '');

  if (isLoading) return <Spin className='flex items-center justify-center h-full' />;
  if (error || !examDetail) return <ErrorState onRetry={refetch} />;

  return <ExamDetailView exam={examDetail} onBack={() => navigate(-1)} />;
};

export default ExamDetailPage;
