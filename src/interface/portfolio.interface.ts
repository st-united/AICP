import { UseMutateFunction, UseMutationResult } from '@tanstack/react-query';
import { FormInstance, UploadFile } from 'antd';
import { AxiosError } from 'axios';

import { PortfolioFileType } from '@app/constants/portfolioFileType';

export interface PortfolioRequest {
  linkedInUrl?: string;
  githubUrl?: string;
  certificateFiles?: File[];
  experienceFiles?: File[];
}

export interface PortfolioResponse {
  userId: string;
  linkedInUrl?: string;
  githubUrl?: string;
  certificateFiles?: string[];
  experienceFiles?: string[];
}

export type ExtendedUploadFile = UploadFile & {
  originalUrl?: string;
  // progress?: number;
  // uploadController?: AbortController;
  // uploadStatus?: 'uploading' | 'paused' | 'canceled' | 'done' | 'error';
  // remainingTime?: number;
};

export interface FileItemProps {
  t: (key: string) => string;
  file: ExtendedUploadFile;
  type: PortfolioFileType;
  onRemove: (file: ExtendedUploadFile, type: PortfolioFileType) => void;
  onPreview: (file: ExtendedUploadFile) => void;
  isEdit: boolean;
}

export interface PortfolioContextType {
  isEdit: boolean;
  selectedFile: ExtendedUploadFile | null;
  certificationFiles: ExtendedUploadFile[];
  experienceFiles: ExtendedUploadFile[];
  removedCertificationFiles: string[];
  removedExperienceFiles: string[];
  isLoading: boolean;
  isPreviewLoading: boolean;
  docxError: string | null;

  setIsEdit: (edit: boolean) => void;
  setSelectedFile: (file: ExtendedUploadFile | null) => void;
  setCertificationFiles: (files: ExtendedUploadFile[]) => void;
  setExperienceFiles: (files: ExtendedUploadFile[]) => void;
  setIsPreviewLoading: (loading: boolean) => void;
  setDocxError: (error: string | null) => void;

  handleRemove: (file: ExtendedUploadFile, type: PortfolioFileType) => void;
  handleFilePreview: (file: ExtendedUploadFile) => void;
  handleModalClose: () => void;
  handleDownload: () => void;
  handleCertificationChange: ({ fileList }: { fileList: ExtendedUploadFile[] }) => void;
  handleExperienceChange: ({ fileList }: { fileList: ExtendedUploadFile[] }) => void;

  handleSubmit: (values: PortfolioRequest) => Promise<void>;
  handleCancel: () => void;
  handleEditToggle: () => void;
  resetFiles: () => void;

  saveLabel?: string;
  cancelLabel?: string;
  onCancel?: () => void;
  onSave?: () => void;

  getPortfolio: PortfolioResponse | undefined;
  updatePortfolioMutation: UseMutateFunction<
    PortfolioResponse,
    AxiosError<unknown, any>,
    FormData,
    unknown
  >;
  isUpdating: boolean;
  downloadPortfolioFileMutation: UseMutationResult<
    unknown,
    unknown,
    { url: string; filename: string }
  >;
  t: (key: string) => string;
  form: FormInstance<PortfolioRequest>;
}
