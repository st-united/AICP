import {
  CloseOutlined,
  MenuUnfoldOutlined,
  WarningOutlined,
  QuestionOutlined,
} from '@ant-design/icons';
import { Button, Divider, Modal, Progress, Spin } from 'antd';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import QuestionDisplay from './QuestionDisplay';
import QuestionIndexPanel from './QuestionIndexPanel';
import { useDeleteExam, useGetExamSet, useSubmitDraftQuestion, useSubmitExam } from '@app/hooks';
import { AnswerChoice, Question } from '@app/interface/examSet.interface';
import './QuestionIndexPanel.scss';

const Testing = () => {
  const { t } = useTranslation();
  const [currentQuestion, setCurrentQuestion] = useState<{ id: string; timestamp: number }>({
    id: '',
    timestamp: 0,
  });
  const [answeredQuestions, setAnsweredQuestions] = useState<string[]>([]);
  const [currentQuestionScroll, setCurrentQuestionScroll] = useState<string>('');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string[]>>({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [unansweredQuestions, setUnansweredQuestions] = useState<Question[]>([]);
  const { data: examSet } = useGetExamSet();
  const submitDraftQuestionMutation = useSubmitDraftQuestion();
  const { mutate: submitExam, isLoading: isSubmitting } = useSubmitExam();
  const { mutate: deleteExam, isLoading: isDeleting } = useDeleteExam();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const totalTime = useRef(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const hasSubmittedRef = useRef(false);

  useEffect(() => {
    if (examSet?.questions) {
      examSet.questions.forEach((question) => {
        const selectedOptions = question.answerOptions
          .filter((option) => !!option.selected)
          .map((option) => {
            return option.id;
          });

        if (selectedOptions.length > 0) {
          setSelectedAnswers((prev) => ({
            ...prev,
            [question.id]: selectedOptions,
          }));
          setAnsweredQuestions((prev) => [...prev, question.id]);
        }
      });
    }
  }, [examSet]);

  const handleQuestionSelect = useCallback((questionId: string) => {
    setCurrentQuestion({ id: questionId, timestamp: Date.now() });
    setCurrentQuestionScroll(questionId);
  }, []);

  const handleAnswerSelect = useCallback(
    (questionId: string, answerId: string) => {
      const question = examSet?.questions.find((q: Question) => q.id === questionId);
      if (!question) return;

      setSelectedAnswers((prev) => {
        const currentAnswers = prev[question.id] || [];
        let newAnswers: string[];

        if (question.type === AnswerChoice.MULTIPLE_CHOICE) {
          newAnswers = currentAnswers.includes(answerId)
            ? currentAnswers.filter((id) => id !== answerId)
            : [...currentAnswers, answerId];
        } else {
          newAnswers = [answerId];
        }

        submitDraftQuestionMutation.mutate({
          examId: examSet?.examId || '',
          questionId,
          answers: newAnswers,
          type: question.type,
        });

        if (newAnswers.length > 0 && !answeredQuestions.includes(question.id)) {
          setAnsweredQuestions((prev) => [...prev, question.id]);
        } else if (newAnswers.length === 0 && answeredQuestions.includes(question.id)) {
          setAnsweredQuestions((prev) => prev.filter((id) => id !== question.id));
        }

        return {
          ...prev,
          [question.id]: newAnswers,
        };
      });
    },
    [answeredQuestions, examSet?.examId, examSet?.questions, submitDraftQuestionMutation],
  );

  const handleSubmit = useCallback(() => {
    if (!examSet) return;

    const unanswered = examSet.questions.filter(
      (question) => !answeredQuestions.includes(question.id),
    );
    setUnansweredQuestions(unanswered);
    setIsSubmitModalOpen(true);
  }, [examSet, answeredQuestions, setUnansweredQuestions]);

  const handleConfirmSubmit = useCallback(() => {
    if (!examSet || hasSubmittedRef.current) return;
    hasSubmittedRef.current = true;
    submitExam(examSet.examId, {
      onSuccess: () => {
        setIsSubmitModalOpen(false);
      },
    });
  }, [examSet, submitExam]);

  const handleQuestionClick = useCallback((questionId: string) => {
    setIsSubmitModalOpen(false);
    setCurrentQuestion({ id: questionId, timestamp: Date.now() });
    const questionElement = document.getElementById(`question-${questionId}`);
    if (questionElement) {
      questionElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleQuestionInViewChange = (id: string, timestamp?: number) => {
    setCurrentQuestion({ id, timestamp: timestamp ?? Date.now() });
  };

  useEffect(() => {
    if (!examSet) return;

    const timeStart = dayjs(examSet.timeStart);
    const timeEnd = timeStart.add(examSet.timeLimitMinutes, 'minute');
    const now = dayjs();

    const total = timeEnd.diff(timeStart, 'second');
    const remaining = Math.max(timeEnd.diff(now, 'second'), 0);

    totalTime.current = total;
    setRemainingTime(remaining);
  }, [examSet]);

  useEffect(() => {
    if (!examSet || totalTime.current === 0) return;

    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        const next = prev - 1;

        if (next <= 0) {
          clearInterval(interval);
          if (!hasSubmittedRef.current) {
            hasSubmittedRef.current = true;
            submitExam?.(examSet.examId);
          }
          return 0;
        }

        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [examSet, submitExam]);

  if (!examSet) {
    return (
      <div className='text-center p-10'>
        <Spin size='large' />
      </div>
    );
  }

  const formatSeconds = (seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');

    return h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`;
  };

  const getStrokeColor = (percent: number) => {
    if (percent <= 33.33) return '#001342';
    if (percent <= 66.6) return '#F5A623';
    return '#FF4D4F';
  };

  const percent = Math.min(((totalTime.current - remainingTime) / totalTime.current) * 100, 100);
  const isShaking = remainingTime <= 60;

  return (
    <div className='exam-container relative overflow-hidden h-full'>
      {/* Header - Improved mobile spacing */}

      <div className='justify-start items-center w-full text-lg sm:text-xl md:text-[32px] leading-tight font-extrabold gap-1 sm:gap-2 flex-col sm:flex-row text-center'>
        <span className='text-[#FE7743]'>{t('TEST.TEST_TITLE')}</span>{' '}
        <span className='text-[#02185B]'>{t('TEST.TEST_TITLE_AI')}</span>
      </div>

      <div className='flex flex-col sm:flex-row p-2 sm:p-3 md:p-6 custom-no-padding-bottom'>
        {/* Desktop sidebar */}
        <div className='hidden sm:flex flex-col w-[300px] md:w-80 lg:w-96 space-y-6'>
          <QuestionIndexPanel
            questions={examSet.questions}
            currentQuestion={currentQuestion}
            currentQuestionScroll={currentQuestionScroll}
            answeredQuestions={answeredQuestions}
            onQuestionSelect={handleQuestionSelect}
            isAutoScrolling={isAutoScrolling}
          />
        </div>

        <div className='smM:hidden fixed top-52 right-0 p-3 bg-white z-10 rounded-full shadow-lg cursor-pointer'>
          <MenuUnfoldOutlined
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='text-2xl text-[#FE7743] block'
            style={{ fontSize: '24px', color: '#FE7743' }}
          />
        </div>

        {/* Mobile menu overlay - Improved */}
        {isMenuOpen && (
          <div className='sm:hidden fixed inset-0 z-30'>
            <button
              onClick={() => setIsMenuOpen(false)}
              className='absolute inset-0 bg-black/50'
              aria-label='Close menu overlay'
            />
            <div className='absolute right-2 top-20 bottom-2 w-[280px] bg-white rounded-2xl shadow-xl overflow-hidden'>
              <div className='h-full'>
                <QuestionIndexPanel
                  questions={examSet.questions}
                  currentQuestion={currentQuestion}
                  currentQuestionScroll={currentQuestionScroll}
                  answeredQuestions={answeredQuestions}
                  onQuestionSelect={(questionId) => {
                    handleQuestionSelect(questionId);
                    setIsMenuOpen(false);
                  }}
                  isAutoScrolling={isAutoScrolling}
                />
              </div>
            </div>
          </div>
        )}

        {/* Main content area - Improved mobile spacing */}
        <div className='flex-1 sm:ml-6 shadow-xl rounded-xl'>
          <div className='flex flex-col w-full bg-white p-3 sm:p-6 md:p-10 rounded-xl'>
            <div className='w-full'>
              <div className='flex justify-between mb-2'>
                <span className='text-sm font-medium text-[#333]'>
                  {formatSeconds(remainingTime)}
                </span>
                <span className='text-xs text-gray-500 sm:hidden'>
                  {answeredQuestions.length}/{examSet.questions.length}
                </span>
              </div>

              <Progress
                className={`${isShaking ? 'shake' : ''}`}
                percent={percent}
                strokeColor={getStrokeColor(percent)}
                size={['100%', 12]}
                showInfo={false}
              />
            </div>

            <Divider className='my-3 sm:my-4' />

            {/* Improved mobile height calculation */}
            <div
              className='overflow-y-auto 
              h-[calc(100vh-270px)]
              sm:h-[calc(100vh-310px)]
              md:h-[calc(100vh-360px)]
              h-2xl:h-[calc(100vh-310px)]'
            >
              <QuestionDisplay
                questions={examSet.questions}
                currentQuestion={currentQuestion}
                currentQuestionScroll={currentQuestionScroll}
                onQuestionInViewChange={handleQuestionInViewChange}
                onAnswerSelect={(questionId, answerId) => {
                  const question = examSet.questions.find((q: Question) => q.id === questionId);
                  if (question) {
                    handleAnswerSelect(question.id, answerId);
                  }
                }}
                selectedAnswers={selectedAnswers}
                setIsAutoScrolling={setIsAutoScrolling}
              />

              {/* Submit button - Better mobile styling */}
              <div className='flex justify-center mt-4 mb-1 px-4'>
                <Button
                  className='bg-[#FE7743] rounded-3xl text-white px-8 py-3 h-auto text-base sm:text-lg font-bold border-[#FE7743] hover:border-2 hover:border-[#FE7743] hover:bg-white hover:text-[#FE7743] w-full sm:w-auto'
                  onClick={handleSubmit}
                >
                  {t('BUTTON.SUBMIT')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Modal - Improved mobile responsive */}
      <Modal
        width='95%'
        style={{ maxWidth: '750px' }}
        open={isSubmitModalOpen}
        onOk={handleConfirmSubmit}
        onCancel={() => setIsSubmitModalOpen(false)}
        footer={null}
        closeIcon={
          <div className='flex border border-black rounded-full cursor-pointer items-center justify-center w-8 h-8'>
            <CloseOutlined className='text-sm' />
          </div>
        }
      >
        {unansweredQuestions.length > 0 ? (
          <div className='flex item-center justify-center flex-col gap-3 p-2 sm:p-4'>
            {/* Icon container */}
            <div className='flex items-center justify-center'>
              <div className='p-2 sm:p-3 bg-[#FEEEEE] rounded-full'>
                <div className='flex p-3 sm:p-4 bg-[#FFDEDE] rounded-full'>
                  <WarningOutlined className='text-3xl sm:text-[45px] text-[#FF0000]' />
                </div>
              </div>
            </div>

            <h2 className='text-2xl font-bold text-black mb-1 text-center'>{t('SUBMIT.TITLE')}</h2>
            <p className='text-base sm:text-lg font-medium text-center py-2 sm:p-2'>
              <Trans
                i18nKey={'SUBMIT.UNANSWERED_MESSAGE'}
                values={{ count: unansweredQuestions.length }}
                components={{ bold: <span className='font-bold text-[#FE7743]' /> }}
              />
            </p>

            {/* Stats section - Better mobile layout */}
            <div className='text-sm sm:text-lg flex flex-col gap-2 font-medium px-2'>
              <div className='flex gap-2'>
                <span>{t('TEST.TOTAL_QUESTION')}:</span>
                <span className='font-bold'>{examSet.questions.length}</span>
              </div>
              <div className='flex gap-2'>
                <span>{t('TEST.ANSWERED_QUESTION')}:</span>
                <span className='font-bold'>{answeredQuestions.length}</span>
              </div>
              <div className='flex flex-col sm:flex-row gap-2 sm:items-center'>
                <span>{t('TEST.UNANSWERED_QUESTION')}:</span>
                <span className='font-bold text-[#FE7743]'>
                  {unansweredQuestions.slice(0, 3).map((question, index) => {
                    const questionIndex =
                      examSet.questions.findIndex((q) => q.id === question.id) + 1;
                    return (
                      <React.Fragment key={question.id}>
                        {index > 0 && ', '}
                        <button
                          type='button'
                          onClick={() => handleQuestionClick(question.id)}
                          className='text-[#FE7743] hover:underline focus:outline-none focus:underline'
                          aria-label={`Go to question ${questionIndex}`}
                        >
                          {`Câu ${questionIndex}`}
                        </button>
                      </React.Fragment>
                    );
                  })}
                  {unansweredQuestions.length > 3 && (
                    <span className='text-[#FE7743]'>
                      {' ('}
                      <span
                        className='cursor-pointer hover:underline'
                        onClick={() => {
                          if (unansweredQuestions.length > 3) {
                            handleQuestionClick(unansweredQuestions[0].id);
                          }
                        }}
                        role='button'
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && unansweredQuestions.length > 3) {
                            handleQuestionClick(unansweredQuestions[0].id);
                          }
                        }}
                      >
                        {t('TEST.MORE')}
                      </span>
                      {')'}
                    </span>
                  )}
                </span>
              </div>
            </div>

            <span className='text-sm sm:text-lg font-medium px-2'>{t('TEST.CHECK_ANSWER')}</span>

            {/* Buttons - Stack on mobile */}
            <div className='flex items-center justify-center gap-2 sm:gap-4 mt-4 sm:mt-6 flex-col sm:flex-row px-2'>
              <Button
                onClick={() => submitExam(examSet.examId)}
                loading={isSubmitting}
                disabled={isSubmitting}
                className='border-2 border-[#FE7743] rounded-3xl text-[#FE7743] px-6 sm:px-8 py-2 h-auto text-sm sm:text-lg font-bold hover:border-[#ff5029] hover:text-[#ff5029] w-full sm:w-auto'
              >
                {t('BUTTON.SUBMMIT_NOW')}
              </Button>
              <Button
                onClick={() => setIsSubmitModalOpen(false)}
                disabled={isSubmitting}
                className='bg-[#FE7743] border-2 border-[#ff682d] rounded-3xl text-white px-6 sm:px-8 py-2 h-auto text-sm sm:text-lg font-bold hover:bg-[#ff5029] hover:border-[#ff5029] hover:text-white w-full sm:w-auto'
              >
                {t('BUTTON.CONTINUE_NOW')}
              </Button>
            </div>
          </div>
        ) : (
          <div className='flex item-center justify-center flex-col gap-4 p-2 sm:p-4'>
            <div className='flex items-center justify-center'>
              <div className='p-2 sm:p-3 bg-[#E6F1FF] rounded-full'>
                <div className='flex p-3 sm:p-4 bg-[#BBDBFF] rounded-full'>
                  <QuestionOutlined className='text-3xl sm:text-[45px] text-[#0069E2]' />
                </div>
              </div>
            </div>
            <p className='text-xl sm:text-2xl font-bold text-center py-2 sm:py-4'>
              {t('TEST.CONFIRM')}
            </p>
            <span className='text-sm sm:text-lg flex flex-col gap-2 font-medium text-justify px-2'>
              {t('TEST.CHECK_CONFIRM')}
            </span>
            <div className='text-justify px-2'>
              <span className='text-sm sm:text-lg font-bold text-[#FF7236]'>
                {t('TEST.WARNING')}:{' '}
              </span>
              <span className='text-sm sm:text-lg font-medium'>{t('TEST.CONFIRM_WARNING')}</span>
            </div>
            <div className='flex items-center justify-center gap-2 sm:gap-4 mt-4 sm:mt-6 flex-col sm:flex-row px-2'>
              <Button
                onClick={() => setIsSubmitModalOpen(false)}
                disabled={isSubmitting}
                className='rounded-3xl px-6 sm:px-8 py-2 h-auto text-sm sm:text-lg font-bold text-[#686868] shadow-lg border-none hover:text-[#494949] w-full sm:w-auto'
              >
                {t('BUTTON.CANCEL_TEST')}
              </Button>
              <Button
                onClick={() => submitExam(examSet.examId)}
                loading={isSubmitting}
                disabled={isSubmitting}
                className='bg-[#FE7743] border-2 border-[#ff682d] rounded-3xl text-white px-6 sm:px-8 py-2 h-auto text-sm sm:text-lg font-bold hover:bg-[#ff5029] hover:border-[#ff5029] hover:text-white w-full sm:w-auto'
              >
                {t('BUTTON.SUBMIT')}
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Exit Warning Modal - Mobile improvements */}
      <Modal
        width='95%'
        style={{ maxWidth: '700px' }}
        open={isModalOpen}
        footer={null}
        closable={true}
        maskClosable={true}
        onCancel={() => setIsModalOpen(false)}
        centered
      >
        <div className='flex flex-col gap-3 sm:gap-4 p-2 sm:p-4'>
          <div className='flex items-center justify-center'>
            <div className='p-2 sm:p-3 bg-[#FEEEEE] rounded-full'>
              <div className='flex p-3 sm:p-4 bg-[#FFDEDE] rounded-full'>
                <WarningOutlined className='text-3xl sm:text-[45px] text-[#FF0000]' />
              </div>
            </div>
          </div>
          <h2 className='text-lg sm:text-2xl font-bold text-black mb-2 sm:mb-4 text-center px-2'>
            {t('TEST.CLOSE_WARNING_TITLE')}
          </h2>
          <p className='text-sm sm:text-lg font-medium mb-2 sm:mb-4 text-center px-2'>
            {t('SUBMIT.UNANSWERED_NUMBERS_MESSAGE', { count: unansweredQuestions.length })}
          </p>
          <div className='flex gap-1 items-start justify-start px-2'>
            <p className='text-sm sm:text-lg font-bold min-w-[50px] sm:min-w-[67px] uppercase text-[#FF7236]'>
              {t('SUBMIT.NOTE')}:
            </p>
            <p className='text-sm sm:text-lg font-medium'>{t('SUBMIT.NOTE_MESSAGE')}</p>
          </div>
          <div className='flex items-center justify-center mt-2 sm:mt-4 gap-2 sm:gap-4 flex-col sm:flex-row px-2'>
            <Button
              onClick={() => deleteExam(examSet.examId)}
              loading={isDeleting}
              disabled={isDeleting}
              className='rounded-3xl px-6 sm:px-8 py-2 h-auto text-sm sm:text-lg font-bold text-[#686868] shadow-lg border-none hover:text-[#494949] w-full sm:w-auto'
            >
              {t('BUTTON.EXIT_NOW')}
            </Button>
            <Button
              onClick={() => setIsModalOpen(false)}
              className='bg-[#FE7743] border-2 border-[#ff682d] rounded-3xl text-white px-6 sm:px-8 py-2 h-auto text-sm sm:text-lg font-bold hover:bg-[#ff5029] hover:border-[#ff5029] hover:text-white w-full sm:w-auto'
            >
              {t('BUTTON.CONTINUE_NOW')}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Testing;
