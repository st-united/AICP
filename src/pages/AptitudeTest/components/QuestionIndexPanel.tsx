import { Divider } from 'antd';
import { useTranslation } from 'react-i18next';

interface QuestionIndexPanelProps {
  questions: { id: number; name: string; description: string }[];
  currentQuestion: number;
  answeredQuestions: number[];
  flaggedQuestions: number[];
  onFlagToggle: (id: number) => void;
  onQuestionSelect: (id: number) => void;
}

const QuestionIndexPanel = ({
  questions,
  currentQuestion,
  answeredQuestions,
  flaggedQuestions,
  onFlagToggle,
  onQuestionSelect,
}: QuestionIndexPanelProps) => {
  const { t } = useTranslation();

  // Helper function to determine class names for a question box
  const getClassNames = (id: number): string => {
    const isCurrent = id === currentQuestion;
    const isFlagged = flaggedQuestions.includes(id);
    const isAnswered = answeredQuestions.includes(id);

    let baseClass =
      'border-[1px] rounded-[5px] w-[50px] h-[50px] flex items-center justify-center font-normal text-lg cursor-pointer';

    if (isFlagged) {
      baseClass += ' bg-[#FE7743] text-white';
    } else if (isAnswered) {
      baseClass += ' bg-[#FFE9E1] text-[#444444]';
    } else {
      baseClass += ' bg-gray-200 text-gray-700 border-[#D9D9D9]';
    }

    if (isCurrent) {
      baseClass += ' border-black';
    }

    return baseClass;
  };

  // const renderQuestionBox = (questionId: number) => (
  //   <div
  //     key={questionId}
  //     className={getClassNames(questionId)}
  //     onClick={() => onQuestionSelect(questionId)}
  //     onContextMenu={(e) => {
  //       e.preventDefault();
  //       onFlagToggle(questionId);
  //     }}
  //   >
  //     {questionId}
  //   </div>
  // );

  return (
    <div className='flex flex-col w-full rounded-[20px] p-8 shadow-custom bg-white'>
      {/* Header */}
      <span className='flex justify-center text-2xl font-bold w-full text-[#02185B]'>
        {t('TEST.QUESTION_INDEX')}
      </span>
      <Divider />

      {/* Question Grid */}
      {/* <div className='flex items-center justify-center'>
        <div className='grid grid-cols-4 gap-4 justify-items-center'>
          {questions.map((question) => renderQuestionBox(question.id))}
        </div>
      </div> */}
    </div>
  );
};

export default QuestionIndexPanel;
