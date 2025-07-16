import axios from 'axios';

import { API_URL } from '@app/constants';
import { Credentials, GoogleCredentials, RegisterUser } from '@app/interface/user.interface';

export const loginApi = (credentials: Credentials) => axios.post(API_URL.LOGIN, credentials);

export const loginWithGoogleApi = (GoogleCredentials: GoogleCredentials) =>
  axios.post(API_URL.LOGIN_WITH_GOOGLE, GoogleCredentials);

export const refreshTokenApi = () => axios.get(API_URL.REFRESH_TOKEN);

export const getLogout = () => axios.get(API_URL.LOGOUT);

export const registerApi = (registerUserDto: RegisterUser) =>
  axios.post(API_URL.REGISTER_USER, registerUserDto);

export const getActivateAccount = (token: string) =>
  axios.get(`${API_URL.ACTIVATE_ACCOUNT}?token=${token}`);
