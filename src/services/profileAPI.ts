import axios from 'axios';

import { API_URL } from '@app/constants';
import { ChangePassword, Job, UserProfile } from '@app/interface/user.interface';

export const changePassword = (password: ChangePassword) =>
  axios.post(API_URL.CHANGE_PASSWORD, password);

export const getProfileApi = () => axios.get<{ data: UserProfile }>(API_URL.GET_PROFILE);

export const getjobApi = () => axios.get<{ data: Job[] }>(API_URL.GET_JOB);

export const updateProfileApi = async (user: UserProfile) =>
  await axios.patch(`${API_URL.UPDATE_PROFILE}`, user);

export const uploadAvatarApi = async (identityId: string, formData: FormData) => {
  return await axios.post(`${API_URL.UPLOAD_AVATAR}/${identityId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
