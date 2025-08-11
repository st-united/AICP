export interface CheckInterviewRequestResponse {
  hasInterviewRequest: boolean;
  interviewRequest: boolean;
}
export interface UserInterviewRequestResponse {
  id: string;
  interviewDate: string;
  timeSlot: string;
  examId: string;
}
export interface UserInterviewRequestRequest {
  examId: string;
  interviewDate?: string;
  timeSlot?: string;
}
