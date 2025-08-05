import axios from 'axios';

import { API_URL } from '@app/constants';

export const userBookingApi = async () => await axios.post(`${API_URL.BOOKING}`);
export const checkBookingApi = async () => await axios.get(`${API_URL.CHECK_BOOKING}`);
