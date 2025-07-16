import axios from 'axios';

import { API_URL } from '@app/constants';

export const sendOtp = () => {
  return axios.post(API_URL.ZALO_OTP_SEND_OTP);
};

export const verifyOtp = (otp: string) => {
  return axios.post(API_URL.ZALO_OTP_VERIFY, { otp });
};

export const checkOtpStatus = () => {
  return axios.post(API_URL.ZALO_OTP_CHECK_STATUS);
};
export const callingCode = () => {
  return axios.get(`${API_URL.ZALO_OTP_COUNTRY_CODE}`);
};

export const canSendOtp = () => {
  return axios.get(API_URL.ZALO_OTP_CAN_SEND);
};
