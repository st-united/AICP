import axios, { InternalAxiosRequestConfig } from 'axios';

import { getStorageData, removeStorageData, setStorageData } from '../storage';
import { ACCESS_TOKEN, API_URL, REFRESH_TOKEN, USER_PROFILE } from '@app/constants';
import { refreshTokenApi } from '@app/services';

const BASE_URL = import.meta.env.VITE_BASE_URL_API;
axios.defaults.baseURL = BASE_URL;

// Manual access token for development
const MANUAL_ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YjFkMGQzMy1lYTliLTQ5YTItYWI4Mi0xYzFhZDg4MzIyNGQiLCJlbWFpbCI6ImJ1aXh1YW50aGllbi4wMTA1QGdtYWlsLmNvbSIsImlhdCI6MTc0NzIwNTE2MSwiZXhwIjoxNzQ3MjkxNTYxfQ.wQT8aHVWDM_jqzxlulda_xKWW0Mm03sTlhzIBMFD5yU';

axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (config.url === API_URL.LOGIN) {
      return config;
    }

    if (config.url === API_URL.REFRESH_TOKEN) {
      const refreshToken = getStorageData(REFRESH_TOKEN);
      if (refreshToken) {
        config.headers['Authorization'] = `Bearer ${refreshToken}`;
      }

      return config;
    }

    // Use manual access token for all requests
    config.headers['Authorization'] = `Bearer ${MANUAL_ACCESS_TOKEN}`;

    return config;
  },
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;

    if (config.url === API_URL.REFRESH_TOKEN && response.data?.error === 'Unauthorized') {
      removeToken();
    }

    if (response.data?.message === 'Unauthorized') {
      await handleUnauthorized();
    }

    if (response.data?.message === 'TOKEN_EXPIRED') {
      removeToken();
    }

    return Promise.reject(error);
  },
);

async function removeToken() {
  removeStorageData(USER_PROFILE);
  removeStorageData(ACCESS_TOKEN);
  removeStorageData(REFRESH_TOKEN);
}

async function handleUnauthorized() {
  const { data } = await refreshTokenApi();
  setStorageData(ACCESS_TOKEN, data.data.accessToken);
}
