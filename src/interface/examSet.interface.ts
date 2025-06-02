export interface ExamSetDetail {
  id: string;
  name: string;
  description: string;
  questions: Question[];
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
}

export enum AnswerChoice {
  SINGLE_CHOICE = 'SINGLE_CHOICE',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
}

export interface SubmitExamSetPayload {
  examSetId: string;
  questionId: string;
  answerId: string[];
  type: AnswerChoice;
}
