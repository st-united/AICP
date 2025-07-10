import axios from 'axios';

import { API_URL } from '@app/constants';
import { CallingCode } from '@app/interface/callingCode.interface';

export const sendOtp = (phone: string) => {
  return axios.post(API_URL.ZALO_OTP_SEND_OTP, { phone });
};

export const verifyOtp = (data: { phone: string; otp: string }) => {
  return axios.post(API_URL.ZALO_OTP_VERIFY, data);
};

export const checkOtpStatus = () => {
  return axios.post(API_URL.ZALO_OTP_CHECK_STATUS);
};
export const callingCode = () => {
  return axios.get<CallingCode[]>(`${API_URL.ZALO_OTP_COUNTRY_CODE}`);
};
