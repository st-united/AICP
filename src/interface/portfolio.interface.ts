import { UploadFile } from 'antd';

export interface Portfolio {
  userId?: string;
  linkedInUrl?: string;
  githubUrl?: string;
  certificateFiles?: string[];
  experienceFiles?: string[];
}

export type ExtendedUploadFile = UploadFile & {
  originalUrl?: string;
  progress?: number;
  uploadController?: AbortController;
  uploadStatus?: 'uploading' | 'paused' | 'canceled' | 'done' | 'error';
  remainingTime?: number;
};
export interface FileItemProps {
  t: (key: string) => string;
  file: ExtendedUploadFile;
  type: 'certificateFiles' | 'experienceFiles';
  onRemove: (file: ExtendedUploadFile, type: 'certificateFiles' | 'experienceFiles') => void;
  onPreview: (file: ExtendedUploadFile) => void;
  isEdit: boolean;
}

export type UploadContentProps = {
  t: (key: string) => string;
};
