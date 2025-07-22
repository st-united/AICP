import axios from 'axios';

import { API_URL } from '@app/constants';
import {
  GetUsersParams,
  UserDetail,
  UpdateForgotPassword,
  GetHistoryParams,
} from '@app/interface/user.interface';

export const getUsersAPI = async (params: GetUsersParams) =>
  await axios.get(API_URL.USERS, { params });

export const getUserByIdAPI = async (id: number) => await axios.get(`${API_URL.USERS}/${id}`);

export const checkHasTakenExam = async (examSetId: string) =>
  await axios.get(`${API_URL.CHECK_TAKEN_EXAM}/${examSetId}`);

export const checkHasTakenExamDefault = async () =>
  await axios.get(API_URL.CHECK_TAKEN_EXAM_DEFAULT);

export const getHistoryTestingApi = (params?: GetHistoryParams) =>
  axios.get(API_URL.HISTORY_TESTING, { params });

export const updateUser = async (user: UserDetail) =>
  await axios.patch(`${API_URL.USERS}/${user.id}`, user);

export const deleteUserAPI = async (id: number) => await axios.delete(`${API_URL.USERS}/${id}`);

export const resetPasswordApi = async (id: number) =>
  await axios.patch(`${API_URL.RESET_PASSWORD}/${id}`);

export const createUser = async (formData: FormData) =>
  await axios.post(API_URL.USERS, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const forgotPasswordApi = async (email: string) =>
  await axios.post(API_URL.FORGOT_PASSWORD, { email });

export const updateForgotPasswordApi = async (payload: UpdateForgotPassword) =>
  await axios.post(API_URL.UPDATE_FORGOT_PASSWORD, payload);

export const checkResetPasswordTokenApi = async (token: string) =>
  await axios.post(API_URL.CHECK_RESET_TOKEN, { token });

export const getDetailExam = async (examId: string) =>
  await axios.get(`${API_URL.DETAIL_EXAM}/${examId}`);
