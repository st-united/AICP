import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Modal, Radio, Checkbox } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './ResultDetail.scss';

import { ExamSetResult, QuestionResult, Answer } from '@app/interface/examSet.interface';

interface ResultDetailProps {
  visible: boolean;
  onClose: () => void;
  examResult: ExamSetResult | undefined;
}

const ResultDetail: React.FC<ResultDetailProps> = ({ visible, onClose, examResult }) => {
  const { t } = useTranslation();
  const getQuestionStatus = (question: QuestionResult) => {
    const correctAnswers = question.answers
      .filter((answer: Answer) => answer.isCorrect)
      .map((answer: Answer) => answer.id);
    const userAnswers = question.userAnswers || [];

    if (userAnswers.length === 0) return 'skipped';

    const isCorrect =
      correctAnswers.length === userAnswers.length &&
      correctAnswers.every((id: string) => userAnswers.includes(id));

    return isCorrect ? 'correct' : 'incorrect';
  };

  const getBorderColor = (status: string) => {
    switch (status) {
      case 'correct':
        return 'border-[#269900]';
      case 'incorrect':
        return 'border-[#FF0000]';
      case 'skipped':
        return 'border-[#B6B6B6]';
      default:
        return 'border-[#BFBFBF]';
    }
  };

  const getBackgroundColor = (answerId: string, question: QuestionResult) => {
    const isSelected = question.userAnswers?.includes(answerId);
    const isCorrect = question.answers.find((a: Answer) => a.id === answerId)?.isCorrect;

    if (!isSelected) return '';
    return isCorrect ? 'bg-green-100' : 'bg-red-100';
  };
  const isMultipleChoice = (question: QuestionResult) => {
    console.log(
      question.sequence,
      question.answers.filter((answer: Answer) => answer.isCorrect).length,
    );
    return question.answers.filter((answer: Answer) => answer.isCorrect).length > 1;
  };

  return (
    <Modal
      title={
        <div className='flex justify-between items-center font-bold text-4xl'>
          <span className=' text-[#fe7743] text-center w-full'>
            {t('TEST_RESULT.RESULT_DETAIL_TITLE')}
          </span>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
      className='!h-full'
    >
      <div className='space-y-6 h-[80vh] overflow-auto pt-16'>
        <div className='space-y-6'>
          {examResult?.questions.map((question: QuestionResult, questionIndex: number) => {
            const status = getQuestionStatus(question);

            return (
              <div
                key={question.questionId}
                className={`border-l-[6px] border-2 ${getBorderColor(
                  status,
                )} bg-white rounded-lg p-4 shadow-sm`}
              >
                <div className='flex justify-between items-start mb-4'>
                  <h3 className='text-[22px] font-bold text-black'>
                    {t('TEST_RESULT.QUESTION_NUMBER', {
                      number: question.sequence || questionIndex + 1,
                    })}
                  </h3>
                </div>

                <p className='text-black font-semibold text-lg mb-4'>{question.question}</p>

                <div className='space-y-2'>
                  {question.answers.map((answer: Answer) => {
                    const isSelected = question.userAnswers?.includes(answer.id);
                    const isCorrect = answer.isCorrect;

                    return (
                      <div className='flex justify-between h-full result-check' key={answer.id}>
                        <div
                          className={`min-w-[95%] w-[95%] h-full flex items-center p-3 rounded-lg border-2 ${getBackgroundColor(
                            answer.id,
                            question,
                          )}`}
                        >
                          {isMultipleChoice(question) ? (
                            <Checkbox
                              checked={isSelected}
                              disabled
                              className={`$${
                                isSelected
                                  ? isCorrect
                                    ? '!text-[#269900]'
                                    : '!text-red-600'
                                  : '!text-gray-400'
                              }`}
                            />
                          ) : (
                            <Radio
                              checked={isSelected}
                              disabled
                              className={`$${
                                isSelected
                                  ? isCorrect
                                    ? '!text-[#269900]'
                                    : '!text-red-600'
                                  : '!text-gray-400'
                              }`}
                            />
                          )}

                          <span className='ml-3 text-gray-700 text-[16px]'>{answer.content}</span>
                        </div>
                        {isSelected && (
                          <div className='flex flex-1 justify-center items-center align-middle self-center xs:pl-[4px]'>
                            {isCorrect ? (
                              <CheckOutlined className='text-green-500 check-icon text-2xl' />
                            ) : (
                              <CloseOutlined className='text-red-500 close-icon text-2xl' />
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

export default ResultDetail;
