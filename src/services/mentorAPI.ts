import axios from 'axios';

import { API_URL } from '@app/constants';
import { CreateScheduleParams } from '@app/interface/mentor.interface';

export const checkMyInterview = async (examId: string) => {
  return await axios.get(`${API_URL.CHECK_MY_INTERVIEW}/${examId}`);
};

export const createBookedSlots = async (data: CreateScheduleParams) => {
  return await axios.post(API_URL.SCHEDULE, data);
};
