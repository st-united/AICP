import { FlagOutlined } from '@ant-design/icons';
import { Checkbox, Divider, Radio, Tooltip } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useQuestionNavigation } from '@app/hooks';
import './QuestionDisplay.scss';
import { AnswerChoice, AnswerOption, Question } from '@app/interface/examSet.interface';

interface QuestionProps {
  questions: Question[];
  currentQuestion: string;
  onQuestionInViewChange: (id: string) => void;
  flaggedQuestions: string[];
  onFlagToggle: (id: string) => void;
  onAnswerSelect: (questionId: string, answerId: string) => void;
  selectedAnswers: Record<string, string[]>;
}

const QuestionDisplay = ({
  questions,
  currentQuestion,
  onQuestionInViewChange,
  flaggedQuestions,
  onFlagToggle,
  onAnswerSelect,
  selectedAnswers,
}: QuestionProps) => {
  const { setQuestionRef, scrollToQuestion } = useQuestionNavigation(
    questions,
    onQuestionInViewChange,
  );
  const { t } = useTranslation();
  const prevQuestionRef = useRef(currentQuestion);

  useEffect(() => {
    if (prevQuestionRef.current !== currentQuestion) {
      scrollToQuestion(currentQuestion);
      prevQuestionRef.current = currentQuestion;
    }
  }, [currentQuestion, scrollToQuestion]);

  const handleAnswerSelect = (questionId: string, answerId: string) => {
    onAnswerSelect(questionId, answerId);
  };

  const renderAnswerInput = (question: Question, answer: AnswerOption) => {
    const isSelected = selectedAnswers[question.id]?.includes(answer.id);

    if (question.type === AnswerChoice.MULTIPLE_CHOICE) {
      return (
        <Checkbox
          className={`${
            isSelected ? 'bg-[#FFE9E1] border-[#FFC8B3]' : 'border-[#DCDCDC]'
          } checkbox-answer border p-4 rounded-2xl  w-full h-full`}
          checked={isSelected}
          onChange={() => handleAnswerSelect(question.id, answer.id)}
        >
          {answer.content}
        </Checkbox>
      );
    } else {
      return (
        <Radio
          className={`${
            isSelected ? 'bg-[#FFE9E1] border-[#FFC8B3]' : 'border-[#DCDCDC]'
          } radio-answer border p-4 rounded-2xl  w-full h-full`}
          checked={isSelected}
          onChange={() => handleAnswerSelect(question.id, answer.id)}
        >
          {answer.content}
        </Radio>
      );
    }
  };

  return (
    <div className='min-h-screen pr-6 mdM:pr-10'>
      {questions.map((question, index) => (
        <div
          key={question.id}
          ref={(el) => setQuestionRef(index, el)}
          data-question-id={question.id}
        >
          <div className='space-y-2'>
            <div className='flex justify-between items-center'>
              <h3 className='text-2xl font-bold text-black'>
                {t('TEST.QUESTION')} {index + 1}:
              </h3>
              <Tooltip title={t('TEST.FLAG_QUESTION')} placement='top' trigger={'hover'}>
                <FlagOutlined
                  className={`flex text-xl border p-2 rounded-lg cursor-pointer ${
                    flaggedQuestions.includes(question.id)
                      ? 'bg-[#02185B] text-white border-[#02185B]'
                      : 'border-[#02185B] text-[#02185B]'
                  }`}
                  onClick={() => onFlagToggle(question.id)}
                />
              </Tooltip>
            </div>
            <p className='text-black leading-relaxed font-semibold text-lg'>{question.content}</p>
            <p className='text-[#686868] font-medium text-sm'>
              {question.type === AnswerChoice.MULTIPLE_CHOICE
                ? t('TEST.MULTIPLE_CHOICE')
                : t('TEST.SINGLE_CHOICE')}
            </p>

            <div className='grid grid-cols-1 gap-4'>
              {question.answerOptions.map((answer) => (
                <div key={answer.id} className='h-full w-full'>
                  {renderAnswerInput(question, answer)}
                </div>
              ))}
            </div>
          </div>
          <Divider />
        </div>
      ))}
    </div>
  );
};

export default QuestionDisplay;
