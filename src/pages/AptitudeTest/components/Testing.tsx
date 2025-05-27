import { useState } from 'react';

import CountTime from './CountTime';
import Question from './Question';
import QuestionIndexPanel from './QuestionIndexPanel';

const data = [
  {
    id: 1,
    name: 'Question 1',
    description: 'Description for question 1',
  },
  {
    id: 2,
    name: 'Question 2',
    description: 'Description for question 2',
  },
  {
    id: 3,
    name: 'Question 3',
    description: 'Description for question 3',
  },
  {
    id: 4,
    name: 'Question 4',
    description: 'Description for question 4',
  },
  {
    id: 5,
    name: 'Question 5',
    description: 'Description for question 5',
  },
  {
    id: 6,
    name: 'Question 6',
    description: 'Description for question 6',
  },
  {
    id: 7,
    name: 'Question 7',
    description: 'Description for question 7',
  },
  {
    id: 8,
    name: 'Question 8',
    description: 'Description for question 8',
  },
  {
    id: 9,
    name: 'Question 9',
    description: 'Description for question 9',
  },
  {
    id: 10,
    name: 'Question 10',
    description: 'Description for question 10',
  },
  {
    id: 11,
    name: 'Question 11',
    description: 'Description for question 11',
  },
  {
    id: 12,
    name: 'Question 12',
    description: 'Description for question 12',
  },
  {
    id: 13,
    name: 'Question 13',
    description: 'Description for question 13',
  },
  {
    id: 14,
    name: 'Question 14',
    description: 'Description for question 14',
  },
  {
    id: 15,
    name: 'Question 15',
    description: 'Description for question 15',
  },
  {
    id: 16,
    name: 'Question 16',
    description: 'Description for question 16',
  },
  {
    id: 17,
    name: 'Question 17',
    description: 'Description for question 17',
  },
  {
    id: 18,
    name: 'Question 18',
    description: 'Description for question 18',
  },
  {
    id: 19,
    name: 'Question 19',
    description: 'Description for question 19',
  },
  {
    id: 20,
    name: 'Question 20',
    description: 'Description for question 20',
  },
  {
    id: 21,
    name: 'Question 21',
    description: 'Description for question 21',
  },
  {
    id: 22,
    name: 'Question 22',
    description: 'Description for question 22',
  },
  {
    id: 23,
    name: 'Question 23',
    description: 'Description for question 23',
  },
  {
    id: 24,
    name: 'Question 24',
    description: 'Description for question 24',
  },
  {
    id: 25,
    name: 'Question 25',
    description: 'Description for question 25',
  },
  {
    id: 26,
    name: 'Question 26',
    description: 'Description for question 26',
  },
  {
    id: 27,
    name: 'Question 27',
    description: 'Description for question 27',
  },
  {
    id: 28,
    name: 'Question 28',
    description: 'Description for question 28',
  },
  {
    id: 29,
    name: 'Question 29',
    description: 'Description for question 29',
  },
  {
    id: 30,
    name: 'Question 30',
    description: 'Description for question 30',
  },
  {
    id: 31,
    name: 'Question 31',
    description: 'Description for question 31',
  },
  {
    id: 32,
    name: 'Question 32',
    description: 'Description for question 32',
  },
  {
    id: 33,
    name: 'Question 33',
    description: 'Description for question 33',
  },
  {
    id: 34,
    name: 'Question 34',
    description: 'Description for question 34',
  },
  {
    id: 35,
    name: 'Question 35',
    description: 'Description for question 35',
  },
  {
    id: 36,
    name: 'Question 36',
    description: 'Description for question 36',
  },
  {
    id: 37,
    name: 'Question 37',
    description: 'Description for question 37',
  },
  {
    id: 38,
    name: 'Question 38',
    description: 'Description for question 38',
  },
  {
    id: 39,
    name: 'Question 39',
    description: 'Description for question 39',
  },
  {
    id: 40,
    name: 'Question 40',
    description: 'Description for question 40',
  },
];

const Testing = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([4]);
  const [flaggedQuestions, setFlaggedQuestions] = useState<number[]>([1, 2, 3]);

  const handleFlagToggle = (id: number) => {
    setFlaggedQuestions((prev) =>
      prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id],
    );
  };

  return (
    <div className='container mx-auto p-4'>
      <div className='grid grid-cols-1 md:grid-cols-[25%_75%] gap-4'>
        <div className='flex flex-col gap-6'>
          <CountTime initialTime={40 * 60} />
          <QuestionIndexPanel
            questions={data}
            currentQuestion={currentQuestion}
            answeredQuestions={answeredQuestions}
            flaggedQuestions={flaggedQuestions}
            onFlagToggle={handleFlagToggle}
            onQuestionSelect={setCurrentQuestion}
          />
        </div>
        <div className=''>
          <Question
            questions={data}
            currentQuestion={currentQuestion}
            onQuestionInViewChange={(id) => setCurrentQuestion(id)}
          />
        </div>
      </div>
    </div>
  );
};

export default Testing;
