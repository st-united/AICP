import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { NotificationTypeEnum, openNotificationWithIcon } from '@app/components/atoms/notification';
import { setStorageData } from '@app/config';
import { NAVIGATE_URL, QUERY_KEY } from '@app/constants';
import { EXAM_LATEST, TEST_RESULT_CURRENT_STEP } from '@app/constants/testing';
import {
  ExamSetDetail,
  ExamSetResult,
  Question,
  SubmitExamSetPayload,
} from '@app/interface/examSet.interface';
import {
  deleteExamByIdApi,
  downloadCertificateApi,
  getExamResultApi,
  getExamSetsApi,
  submitDraftQuestionApi,
  submitExamSetApi,
} from '@app/services';

export const useCountdown = (initialTime: number) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = useCallback((value: number) => value.toString().padStart(2, '0'), []);

  return {
    timeLeft,
    hours: Math.floor(timeLeft / 3600),
    minutes: Math.floor((timeLeft % 3600) / 60),
    seconds: timeLeft % 60,
    formatTime,
  };
};

export const useQuestionNavigation = (
  questions: Question[],
  onQuestionChange: (id: string, timestamp: number) => void,
) => {
  const questionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const viewportMiddle = window.innerHeight / 3;

      for (let i = 0; i < questionRefs.current.length; i++) {
        const element = questionRefs.current[i];
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        const isInMiddleView = rect.top < viewportMiddle && rect.bottom > viewportMiddle;

        if (isInMiddleView) {
          onQuestionChange(questions[i].id, Date.now());
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [questions, onQuestionChange]);

  const setQuestionRef = useCallback((index: number, element: HTMLElement | null) => {
    questionRefs.current = questionRefs.current.slice();
    questionRefs.current[index] = element;
  }, []);

  const scrollToQuestion = useCallback(
    (questionId: string) => {
      const index = questions.findIndex((q) => q.id === questionId);
      if (index !== -1 && questionRefs.current[index]) {
        const element = questionRefs.current[index];
        if (element) {
          const container = element.closest('.overflow-y-auto');
          if (container) {
            const yOffset = 0;
            const containerRect = container.getBoundingClientRect();
            const elementRect = element.getBoundingClientRect();
            const scrollTop = elementRect.top - containerRect.top + container.scrollTop + yOffset;
            container.scrollTo({ top: scrollTop, behavior: 'smooth' });
          }
        }
      }
    },
    [questions],
  );

  return { setQuestionRef, scrollToQuestion };
};

export const useGetExamSet = () =>
  useQuery<ExamSetDetail>(
    [QUERY_KEY.EXAM_SETS],
    async () => {
      const { data } = await getExamSetsApi();
      return data.data;
    },
    {
      cacheTime: 0,
      staleTime: 0,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      refetchInterval: false,
      refetchIntervalInBackground: false,
    },
  );

export const useSubmitDraftQuestion = () => {
  return useMutation((params: SubmitExamSetPayload) => submitDraftQuestionApi(params));
};

export const useSubmitExam = () => {
  const navigate = useNavigate();

  return useMutation(
    async (examId: string) => {
      const { data } = await submitExamSetApi(examId);
      return data;
    },
    {
      onSuccess({ message }, examId) {
        setStorageData(EXAM_LATEST, examId);
        setStorageData(TEST_RESULT_CURRENT_STEP, 1);
        openNotificationWithIcon(NotificationTypeEnum.SUCCESS, message);
        navigate(NAVIGATE_URL.TEST_RESULT_DETAIL);
      },
      onError({ response }) {
        openNotificationWithIcon(NotificationTypeEnum.ERROR, response.data.message);
      },
    },
  );
};
export const useDeleteExam = () => {
  const navigate = useNavigate();

  return useMutation(
    async (examId: string) => {
      const { data } = await deleteExamByIdApi(examId);
      return data;
    },
    {
      onSuccess() {
        navigate('/');
      },
      onError({ response }) {
        openNotificationWithIcon(NotificationTypeEnum.ERROR, response.data.message);
      },
    },
  );
};
export const useGetExamResult = (examId: string) => {
  return useQuery<ExamSetResult>({
    queryKey: [QUERY_KEY.EXAM_RESULT, examId],
    queryFn: async () => {
      const response = await getExamResultApi(examId);
      return response.data.data;
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};
export const useDownloadCertificate = () => {
  return useMutation((examId: string) => downloadCertificateApi(examId));
};
