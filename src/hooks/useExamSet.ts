import { useMutation, useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { QUERY_KEY } from '@app/constants';
import { ExamSetDetail, Question, SubmitExamSetPayload } from '@app/interface/examSet.interface';
import { getExamSetsApi, submitDraftQuestionApi, submitExamSetApi } from '@app/services';
import {
  NotificationTypeEnum,
  openNotificationWithIcon,
} from '@app/services/notification/notificationService';

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
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
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
      onSuccess({ message }) {
        openNotificationWithIcon(NotificationTypeEnum.SUCCESS, message);
        navigate('/scheduler');
      },
      onError({ response }) {
        openNotificationWithIcon(NotificationTypeEnum.ERROR, response.data.message);
      },
    },
  );
};
