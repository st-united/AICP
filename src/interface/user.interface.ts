import { GetListParams } from './common.interface';
import { ExamLevelEnum, ExamStatusEnum, SFIALevel } from '@app/constants/enum';

export interface UserColumns {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  operation: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface GoogleCredentials {
  idToken: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  dob?: string | null;
  avatarUrl?: string;
  permissions?: string[];
  province: string;
  job?: string[];
  referralCode: string;
  isStudent: boolean;
  university?: string;
  studentCode?: string;
}

export interface UserDetail {
  id: number;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  gender: string;
  identityId: string;
  avatar: string;
}

export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UserCreateParams {
  name: string;
  password: string;
  email: string;
  phone: string;
  address: string;
  gender: string;
  identityId: string;
  dateOfBirth: string;
}

export interface AssignPermissionParams {
  id: number;
  role: number;
  permissions: number[];
}

export interface GetUsersParams extends GetListParams {
  search: string;
  status: string | null;
}

export interface RegisterUser {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
}
export interface UpdateForgotPassword {
  token: string | null;
  password: string;
}
export interface HasTakenExam {
  hasTakenExam: boolean;
  examSetDuration: number;
  examId?: string;
  examStatus?: ExamStatusEnum;
}

export interface ExamAttempt {
  id?: string;
  examStatus?: ExamStatusEnum;
  examSetName?: string;
  examSetDuration?: number;
}

export interface HistoryTesting {
  id: string;
  examStatus: ExamStatusEnum;
  sfiaLevel: SFIALevel;
  examLevel?: {
    examLevel: ExamLevelEnum | null;
  };
  createdAt: Date;
  attempt?: number;
  isLatest?: boolean;
}

export interface GetHistoryParams {
  startDate?: string;
  endDate?: string;
  examSetName?: string;
}
export interface Job {
  id: number;
  name: string;
}

export interface Aspect {
  id: string;
  name: string;
  represent: string;
  score: number;
}

export interface DetailExam {
  id: string;
  startedAt: string;
  sfiaLevel: SFIALevel | null;
  examLevel?: {
    examLevel: ExamLevelEnum | null;
  };
  mindsetScore: PillarScore;
  skillsetScore: PillarScore;
  toolsetScore: PillarScore;
  overallScore: number;
  examStatus: ExamStatusEnum;
  createdAt: string;
  examSet: {
    id: string;
    name: string;
  };
}

export interface PillarScore {
  id: string;
  name: string;
  score: number;
  aspects: Aspect[];
  level: string;
}

export interface UpdateUserStudentInfo {
  isStudent: boolean;
  university?: string;
  studentCode?: string;
}

export interface ProfileJob {
  id: string;
  name: string;
}
