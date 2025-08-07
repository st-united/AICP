import { InterviewShift } from '@app/constants/enum';

export const PAGE_SIZE = 9;

export interface CreateScheduleParams {
  examId: string;
  interviewDate: string; // YYYY-MM-DD
  interviewShift: InterviewShift;
}

export interface InterviewRequest {
  id: string;
  interviewDate: string;
  timeSlot: string;
  examId: string;
}

export interface CheckInterviewRequestResponse {
  hasInterviewRequest: boolean;
  interviewRequest?: InterviewRequest;
}

export interface Mentor {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string | null;
  specialization?: string;
  experience?: number;
}

export default interface MentorBooking {
  id: string;
  mentorId: string;
  userId: string;
  timeSlot: string;
  scheduledAt: string;
  status: string;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
  codeOrder: string;
  mentor: Mentor;
}
