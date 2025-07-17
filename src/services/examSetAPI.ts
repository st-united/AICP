import axios from 'axios';

import { API_URL } from '@app/constants';
import { SubmitExamSetPayload } from '@app/interface/examSet.interface';

export const getExamSetsApi = () => axios.get(`${API_URL.EXAM_SETS_INPUT_TEST}`);

export const submitDraftQuestionApi = (params: SubmitExamSetPayload) =>
  axios.post(`${API_URL.ANSWERS}`, params);

export const submitExamSetApi = (examSetId: string) =>
  axios.patch(`${API_URL.ANSWERS}/${examSetId}`);

export const deleteExamByIdApi = (examSetId: string) =>
  axios.delete(`${API_URL.DETAIL_EXAM}/${examSetId}`);
export const getExamResultApi = (examId: string) =>
  axios.get(API_URL.EXAM_RESULT.replace(':id', examId));
export const downloadCertificateApi = (examId: string) =>
  axios.get(API_URL.EXAM_CERTIFICATE.replace(':id', examId), {
    responseType: 'blob',
  });
