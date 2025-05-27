import { useEffect, useRef } from 'react';

interface QuestionProps {
  questions: { id: number; name: string; description: string }[];
  currentQuestion: number;
  onQuestionInViewChange: (id: number) => void;
}

const Question = ({ questions, onQuestionInViewChange }: QuestionProps) => {
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const middleY = window.innerHeight / 3;

      for (let i = 0; i < questionRefs.current.length; i++) {
        const el = questionRefs.current[i];
        if (el) {
          const rect = el.getBoundingClientRect();
          const isMiddle = rect.top < middleY && rect.bottom > middleY;

          if (isMiddle) {
            onQuestionInViewChange(questions[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [questions, onQuestionInViewChange]);

  return (
    <div className='flex flex-col gap-4 p-4 overflow-y-auto h-full'>
      {questions.map((question, index) => (
        <div
          key={question.id}
          ref={(el) => (questionRefs.current[index] = el)}
          className='p-4 border rounded shadow mb-4 h-[300px]'
        >
          <h2 className='text-xl font-bold'>{question.name}</h2>
          <p className='text-gray-700'>{question.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Question;
