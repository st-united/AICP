import axios from 'axios';

import { API_URL } from '@app/constants';

export const getCourseDetailAPI = async (id: string) => await axios.get(`${API_URL.COURSES}/${id}`);

export const getAllCourseAPI = async (excludeId?: string) => {
  return await axios.get(API_URL.COURSES, {
    params: excludeId ? { excludeId } : {},
  });
};

export const registerCourseAPI = async (courseId: string) =>
  await axios.post(API_URL.COURSES_REGISTER(courseId));
