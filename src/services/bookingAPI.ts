import axios from 'axios';

import { API_URL } from '@app/constants';
import { UserInterviewRequestRequest } from '@app/interface/booking.interface';

export const userInterviewRequestApi = async (data: UserInterviewRequestRequest) =>
  await axios.post(`${API_URL.BOOKING}`, data);
export const checkInterviewRequestApi = async () => await axios.post(`${API_URL.CHECK_BOOKING}`);
