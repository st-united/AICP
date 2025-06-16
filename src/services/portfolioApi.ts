import axios from 'axios';

import { API_URL } from '@app/constants';
import { Portfolio } from '@app/interface/portfolio.interface';

export const updatePortfolioApi = async (data: Portfolio) => {
  return await axios.patch(API_URL.PORTFOLIO, data);
};

export const getPortfolioApi = async () => {
  return await axios.get(API_URL.PORTFOLIO);
};

export const uploadPortfolioFilesApi = async (
  formData: FormData,
  onProgress: (percent: number) => void,
  controller?: AbortController,
) => {
  return await axios.post(API_URL.PORTFOLIO_UPLOAD_FILE, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (event) => {
      const percent = Math.round((event.loaded * 100) / (event.total || 1));
      onProgress(percent);
    },
    signal: controller?.signal,
  });
};

export const downloadPortfolioFileApi = async (url: string, filename: string) => {
  return await axios.get(API_URL.PORTFOLIO_DOWNLOAD, {
    params: { url, filename },
    responseType: 'blob',
  });
};
