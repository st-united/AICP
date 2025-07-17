export interface ExamSetDetail {
  id: string;
  examId: string;
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
export interface ExamSetResult {
  elapsedTime: number;
  questions: QuestionResult[];
  correctCount: number;
  wrongCount: number;
  skippedCount: number;
  level: string;
  description: string;
  learningPath: string;
  recommendedCourses: Course[];
}
export interface QuestionResult {
  questionId: string;
  question: string;
  answers: Answer[];
  sequence: number;
  userAnswers: string[];
  status: QuestionStatus;
}
export enum QuestionStatus {
  CORRECT = 'correct',
  WRONG = 'wrong',
  SKIPPED = 'skipped',
}
export interface Answer {
  id: string;
  content: string;
  isCorrect: boolean;
}
export interface Course {
  id: string;
  title: string;
  description: string;
  provider: string;
  url: string;
  linkImage: string;
  courseType: string;
  durationHours: string;
  difficultyLevel: null;
  aspectId: string;
  domainId: string;
  sfiaLevels: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
