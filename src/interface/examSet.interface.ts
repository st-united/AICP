export interface ExamSetDetail {
  id: string;
  examId: string;
  timeStart: Date;
  name: string;
  description: string;
  questions: Question[];
  timeLimitMinutes: number;
}

export interface Question {
  id: string;
  type: AnswerChoice;
  content: string;
  subcontent: string;
  image: string;
  sequence: string;
  answerOptions: AnswerOption[];
}

export interface AnswerOption {
  id: string;
  content: string;
  selected: boolean;
}

export enum AnswerChoice {
  SINGLE_CHOICE = 'SINGLE_CHOICE',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
}

export interface SubmitExamSetPayload {
  examId: string;
  questionId: string;
  answers: string[];
  type: AnswerChoice;
}
