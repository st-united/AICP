import { Divider } from 'antd';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Question } from '@app/interface/examSet.interface';

interface QuestionIndexPanelProps {
  questions: Question[];
  currentQuestion: { id: string; timestamp: number };
  currentQuestionScroll: string;
  answeredQuestions: string[];
  flaggedQuestions: string[];
  onFlagToggle: (id: string) => void;
  onQuestionSelect: (id: string) => void;
  isAutoScrolling: boolean;
}

const QuestionIndexPanel = ({
  questions,
  currentQuestion,
  currentQuestionScroll,
  answeredQuestions,
  flaggedQuestions,
  onFlagToggle,
  onQuestionSelect,
  isAutoScrolling,
}: QuestionIndexPanelProps) => {
  const { t } = useTranslation();

  const getQuestionStatus = useCallback(
    (id: string) => {
      if (flaggedQuestions.includes(id)) return 'flagged';
      if (answeredQuestions.includes(id)) return 'answered';
      return 'default';
    },
    [answeredQuestions, flaggedQuestions],
  );

  const getQuestionClasses = useCallback(
    (id: string) => {
      const isCurrent = id === currentQuestion.id;
      const status = getQuestionStatus(id);

      const baseClasses =
        'w-12 smM:w-10 h-12 smM:h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center text-sm font-semibold cursor-pointer transition-all duration-200 hover:scale-105';

      const statusClasses = {
        flagged: 'bg-[#FE7743] text-white shadow-md',
        answered: 'bg-[#FFE9E1] border border-[#FFE9E1]',
        default: 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200',
      };

      const currentClass = isCurrent ? 'ring-2 ring-[#FE7743] ring-offset-2' : '';

      const disabledDuringScrollClass =
        isAutoScrolling && !isCurrent ? 'opacity-50 grayscale pointer-events-none' : '';

      return `${baseClasses} ${statusClasses[status]} ${currentClass} ${disabledDuringScrollClass}`;
    },
    [currentQuestion.id, getQuestionStatus, isAutoScrolling],
  );

  return (
    <div className='flex flex-col items-center justify-center bg-white rounded-xl p-6 shadow-lg border border-gray-100 h-full'>
      <div className='text-2xl font-bold text-center text-blue-900'>{t('TEST.QUESTION_INDEX')}</div>
      <Divider />
      <div className='flex-1'>
        <div className='grid grid-cols-4 gap-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 p-2 w-full h-[calc(100vh-590px)]'>
          {questions.map((question, index) => (
            <button
              key={question.id}
              disabled={isAutoScrolling}
              className={getQuestionClasses(question.id)}
              onClick={() => onQuestionSelect(question.id)}
              onContextMenu={(e) => {
                e.preventDefault();
                onFlagToggle(question.id);
              }}
              title={`Question ${question.id} - ${getQuestionStatus(question.id)}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionIndexPanel;
