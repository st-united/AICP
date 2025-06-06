export interface UseMentorInfiniteParams {
  search?: string;
  scheduledDate?: string | null;
  timeSlot?: string | null;
  take: number;
  skip?: number;
}

export const PAGE_SIZE = 9;

export interface CreateScheduleParams {
  userId: string;
  mentorId: string;
  scheduledAt: string; // YYYY-MM-DD
  timeSlot: string; // e.g., 'AM_08_09'
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
