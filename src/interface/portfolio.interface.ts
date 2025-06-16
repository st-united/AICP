import { UploadFile } from 'antd';

export interface Portfolio {
  userId?: string;
  linkedInUrl?: string;
  githubUrl?: string;
  certifications?: string[];
  experiences?: string[];
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
  type: 'certification' | 'experience';
  onRemove: (file: ExtendedUploadFile, type: 'certification' | 'experience') => void;
  onPreview: (file: ExtendedUploadFile) => void;
  isEdit: boolean;
}

export type UploadContentProps = {
  t: (key: string) => string;
};
