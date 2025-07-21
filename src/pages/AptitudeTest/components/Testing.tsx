import {
  CloseOutlined,
  MenuUnfoldOutlined,
  WarningOutlined,
  QuestionOutlined,
} from '@ant-design/icons';
import { Button, Divider, Modal, Progress, Spin } from 'antd';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import CountdownTimer from './CountdownTimer';
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
  const [flaggedQuestions, setFlaggedQuestions] = useState<string[]>([]);
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

  const handleFlagToggle = useCallback((questionId: string) => {
    setFlaggedQuestions((prev) =>
      prev.includes(questionId) ? prev.filter((id) => id !== questionId) : [...prev, questionId],
    );
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

  const handleCloseModal = useCallback(() => {
    if (!examSet?.questions) return;
    const unanswered = examSet.questions.filter(
      (question) => !answeredQuestions.includes(question.id),
    );
    if (unanswered.length > 0) {
      setUnansweredQuestions(unanswered);
    }
    setIsModalOpen(true);
  }, [examSet, answeredQuestions, setUnansweredQuestions]);

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
    <div className='relative overflow-hidden'>
      <div className='flex flex-col justify-start items-center w-full py-8 px-6 gap-4'>
        <div className='flex text-xl smM:text-2xl leading-[22px] font-extrabold gap-2 smM:flex-row flex-col text-center'>
          <span className='text-[#FE7743]'>{t('TEST.TEST_TITLE')}</span>
          <span className='text-[#02185B]'>{t('TEST.TEST_TITLE_AI')}</span>
        </div>
        <span className='text-[#686868] max-w-[500px] smM:max-w-none smM:min-w-[600px] text-lg smM:text-xl font-semibold text-center'>
          {t('TEST.SUB_TITLE')}
        </span>
      </div>

      <div className='smM:flex p-3 smM:p-6 custom-no-padding-bottom'>
        <div className='hidden smM:flex flex-col w-[300px] smM:w-80 md:w-96 space-y-6'>
          <QuestionIndexPanel
            questions={examSet.questions}
            currentQuestion={currentQuestion}
            currentQuestionScroll={currentQuestionScroll}
            answeredQuestions={answeredQuestions}
            flaggedQuestions={flaggedQuestions}
            onFlagToggle={handleFlagToggle}
            onQuestionSelect={handleQuestionSelect}
            isAutoScrolling={isAutoScrolling}
          />
        </div>

        <div className='smM:hidden fixed top-52 left-0 p-3 bg-white z-10 rounded-full shadow-lg cursor-pointer'>
          <MenuUnfoldOutlined
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='flex text-2xl'
          />
        </div>

        {isMenuOpen && (
          <div className='smM:hidden'>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setIsMenuOpen(!isMenuOpen);
                }
              }}
              className='fixed top-0 left-0 w-full h-full bg-black/50 z-10'
              aria-label='Close menu overlay'
            />
            <div className='fixed bg-white z-10 left-2 top-24 rounded-3xl w-[300px]'>
              <div className='fixed top-52 p-3 left-[280px] bg-white z-10 rounded-full shadow-lg'>
                <MenuUnfoldOutlined
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className='flex text-2xl'
                />
              </div>
              <QuestionIndexPanel
                questions={examSet.questions}
                currentQuestion={currentQuestion}
                currentQuestionScroll={currentQuestionScroll}
                answeredQuestions={answeredQuestions}
                flaggedQuestions={flaggedQuestions}
                onFlagToggle={handleFlagToggle}
                onQuestionSelect={handleQuestionSelect}
                isAutoScrolling={isAutoScrolling}
              />
            </div>
          </div>
        )}

        <div className='flex-1 smM:ml-6'>
          <div className='flex flex-col w-full bg-white p-6 mdM:p-10 rounded-xl mdM:pr-0 pr-0'>
            <div className='w-full'>
              <div className='flex justify-between mb-1'>
                <span className='text-[14px] text-[#333]'>{formatSeconds(remainingTime)}</span>
              </div>

              <Progress
                className={`pr-6 mdM:pr-10 ${isShaking ? 'shake' : ''}`}
                percent={percent}
                strokeColor={getStrokeColor(percent)}
                size={['100%', 16]}
                showInfo={false}
              />
            </div>
            <div className='pr-6 mdM:pr-10'>
              <Divider />
            </div>
            <div className='overflow-y-auto mdM:h-[calc(100vh-320px)] smM:h-[calc(100vh-310px)] h-[calc(100vh-330px)]'>
              <QuestionDisplay
                questions={examSet.questions}
                currentQuestion={currentQuestion}
                currentQuestionScroll={currentQuestionScroll}
                onQuestionInViewChange={handleQuestionInViewChange}
                flaggedQuestions={flaggedQuestions}
                onFlagToggle={handleFlagToggle}
                onAnswerSelect={(questionId, answerId) => {
                  const question = examSet.questions.find((q: Question) => q.id === questionId);
                  if (question) {
                    handleAnswerSelect(question.id, answerId);
                  }
                }}
                selectedAnswers={selectedAnswers}
                setIsAutoScrolling={setIsAutoScrolling}
              />
              <div className='flex justify-center mb-2'>
                <Button
                  className='bg-[#FE7743] rounded-3xl text-white px-12 py-2 h-full text-lg font-bold border-[#FE7743] hover:border-2 hover:border-[#FE7743] hover:bg-white hover:text-[#FE7743] hover:cursor-pointer'
                  onClick={handleSubmit}
                >
                  {t('BUTTON.SUBMIT')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        width={750}
        open={isSubmitModalOpen}
        onOk={handleConfirmSubmit}
        onCancel={() => setIsSubmitModalOpen(false)}
        okText={t('BUTTON.CONFIRM')}
        cancelText={t('BUTTON.CANCEL')}
        footer={null}
        closeIcon={
          <div className='flex border border-black rounded-full cursor-pointer items-center justify-center'>
            <CloseOutlined className='flex text-xl text-black p-2' />
          </div>
        }
      >
        {unansweredQuestions.length > 0 ? (
          <div className='flex item-center justify-center flex-col gap-3 p-4'>
            <div className='flex items-center justify-center '>
              <div className='p-3 bg-[#FEEEEE] rounded-full'>
                <div className='flex p-4 bg-[#FFDEDE] rounded-full'>
                  <WarningOutlined className='flex text-[45px] text-[#FF0000]' />
                </div>
              </div>
            </div>
            <p className='text-lg font-medium text-center py-4'>
              {t('SUBMIT.UNANSWERED_MESSAGE', { count: unansweredQuestions.length })}
            </p>
            <div className='text-lg flex flex-col gap-2 font-medium'>
              <div className='flex gap-2'>
                <span>{t('TEST.TOTAL_QUESTION')}:</span>
                <span className='font-bold'>{examSet.questions.length}</span>
              </div>
              <div className='flex gap-2'>
                <span>{t('TEST.ANSWERED_QUESTION')}:</span>
                <span className='font-bold'>{answeredQuestions.length}</span>
              </div>
              <div className='flex gap-2'>
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
            <span className='text-lg font-medium'>{t('TEST.CHECK_ANSWER')}</span>
            <div className='flex items-center justify-center gap-4 mt-6 flex-col smM:flex-row'>
              <Button
                onClick={() => submitExam(examSet.examId)}
                loading={isSubmitting}
                disabled={isSubmitting}
                className='border-2 border-[#FE7743] rounded-3xl text-[#FE7743] px-8 py-2 h-full text-lg font-bold hover:border-[#ff5029] hover:text-[#ff5029]'
              >
                {t('BUTTON.SUBMMIT_NOW')}
              </Button>
              <Button
                onClick={() => setIsSubmitModalOpen(false)}
                disabled={isSubmitting}
                className='bg-[#FE7743] border-2 border-[#ff682d] rounded-3xl text-white px-8 py-2 h-full text-lg font-bold hover:bg-[#ff5029] hover:border-[#ff5029] hover:text-white'
              >
                {t('BUTTON.CONTINUE_NOW')}
              </Button>
            </div>
          </div>
        ) : (
          <div className='flex item-center justify-center flex-col gap-4 p-4'>
            <div className='flex items-center justify-center '>
              <div className='p-3 bg-[#E6F1FF] rounded-full'>
                <div className='flex p-4 bg-[#BBDBFF] rounded-full'>
                  <QuestionOutlined className='flex text-[45px] text-[#0069E2]' />
                </div>
              </div>
            </div>
            <p className='text-2xl font-bold text-center py-4'>{t('TEST.CONFIRM')}</p>
            <span className='text-lg flex flex-col gap-2 font-medium text-justify'>
              {t('TEST.CHECK_CONFIRM')}
            </span>
            <div className='text-justify'>
              <span className='text-lg font-bold text-[#FF7236]'>{t('TEST.WARNING')}: </span>
              <span className='text-lg font-medium'>{t('TEST.CONFIRM_WARNING')}</span>
            </div>
            <div className='flex items-center justify-center gap-4 mt-6'>
              <Button
                onClick={() => setIsSubmitModalOpen(false)}
                disabled={isSubmitting}
                className='rounded-3xl px-8 py-2 h-full text-lg font-bold text-[#686868] shadow-lg border-none hover:text-[#494949]'
              >
                {t('BUTTON.CANCEL_TEST')}
              </Button>
              <Button
                onClick={() => submitExam(examSet.examId)}
                loading={isSubmitting}
                disabled={isSubmitting}
                className='bg-[#FE7743] border-2 border-[#ff682d] rounded-3xl text-white px-8 py-2 h-full text-lg font-bold hover:bg-[#ff5029] hover:border-[#ff5029] hover:text-white'
              >
                {t('BUTTON.SUBMIT')}
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        width={700}
        open={isModalOpen}
        footer={null}
        closable={true}
        maskClosable={true}
        onCancel={() => setIsModalOpen(false)}
        centered
      >
        <div className='flex flex-col gap-4 p-4'>
          <div className='flex items-center justify-center '>
            <div className='p-3 bg-[#FEEEEE] rounded-full'>
              <div className='flex p-4 bg-[#FFDEDE] rounded-full'>
                <WarningOutlined className='flex text-[45px] text-[#FF0000]' />
              </div>
            </div>
          </div>
          <h2 className='text-2xl font-bold text-black mb-4 text-center'>
            {t('TEST.CLOSE_WARNING_TITLE')}
          </h2>
          <p className='text-lg font-medium mb-4 sm:text-left text-center'>
            {t('SUBMIT.UNANSWERED_NUMBERS_MESSAGE', { count: unansweredQuestions.length })}
          </p>
          <div className='flex gap-1 items-start justify-start'>
            <p className='flex text-lg font-bold min-w-[67px] uppercase text-[#FF7236]'>
              {t('SUBMIT.NOTE')}:
            </p>
            <p className='text-lg font-medium'>{t('SUBMIT.NOTE_MESSAGE')}</p>
          </div>
          <div className='flex items-center justify-center mt-4 gap-4'>
            <Button
              onClick={() => deleteExam(examSet.examId)}
              loading={isDeleting}
              disabled={isDeleting}
              className='rounded-3xl px-8 py-2 h-full text-lg font-bold text-[#686868] shadow-lg border-none hover:text-[#494949]'
            >
              {t('BUTTON.EXIT_NOW')}
            </Button>
            <Button
              onClick={() => setIsModalOpen(false)}
              className='bg-[#FE7743] border-2 border-[#ff682d] rounded-3xl text-white px-8 py-2 h-full text-lg font-bold hover:bg-[#ff5029] hover:border-[#ff5029] hover:text-white'
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
