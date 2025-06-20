import axios from 'axios';

import { API_URL } from '@app/constants';
import { CreateScheduleParams, UseMentorInfiniteParams } from '@app/interface/mentor.interface';

export const getMentorsAvailableAPI = async (params: UseMentorInfiniteParams) =>
  await axios.get(API_URL.MENTORS_AVAILABLE, { params });

export const fetchBookedSlots = async (mentorId: string) => {
  return await axios.get(`/mentors/booked-slots`, {
    params: { mentorId },
  });
};

export const createBookedSlots = async (data: CreateScheduleParams) => {
  return await axios.post(`/mentors/create-scheduler`, data);
};
export const mentorSelfActivationApi = async (token: string) => {
  await axios.patch(API_URL.ACTIVE_MENTOR_BY_LINK, { token });
};
