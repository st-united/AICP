import axios from 'axios';

import { API_URL } from '@app/constants';

export const sendOtp = (phone: string) => {
  return axios.post(API_URL.ZALO_OTP_SEND_OTP, { phone });
};

export const verifyOtp = (data: { phone: string; otp: string }) => {
  return axios.post(API_URL.ZALO_OTP_VERIFY, data);
};

export const checkOtpStatus = (phone: string) => {
  return axios.get(`${API_URL.ZALO_OTP_CHECK_STATUS}?phone=${phone}`);
};
