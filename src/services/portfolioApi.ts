import axios from 'axios';

import { API_URL } from '@app/constants';
import { Portfolio } from '@app/interface/portfolio.interface';

export const updatePortfolioApi = async (formData: FormData) => {
  console.log('formdata:', formData.get('foundationalCertifications'));
  return await axios.patch(API_URL.PORTFOLIO, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const getPortfolioApi = async () => {
  return await axios.get(API_URL.PORTFOLIO);
};
