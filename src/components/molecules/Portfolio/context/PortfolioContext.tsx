import { UseMutationResult } from '@tanstack/react-query';
import { Form, FormInstance } from 'antd';
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from 'react';
import { useTranslation } from 'react-i18next';

import {
  mapFiles,
  createDownloadLink,
  createBlobDownloadLink,
  getProcessedFileName,
  prepareFilesForUpload,
  isDocxFile,
} from '../utils/fileUtils';
import { PortfolioFileType } from '@app/constants/portfolioFileType';
import {
  useUpdatePortfolio,
  useGetPortfolio,
  useDownloadPortfolioFile,
} from '@app/hooks/usePortfolio';
import {
  ExtendedUploadFile,
  PortfolioContextType,
  PortfolioRequest,
} from '@app/interface/portfolio.interface';
import {
  openNotificationWithIcon,
  NotificationTypeEnum,
} from '@app/services/notification/notificationService';

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

interface PortfolioProviderProps {
  children: ReactNode;
  onCancel?: () => void;
  onSave?: () => void;
  edit?: boolean;
  saveLabel?: string;
  cancelLabel?: string;
}

export const PortfolioProvider: React.FC<PortfolioProviderProps> = ({
  children,
  onCancel,
  onSave,
  edit = false,
  saveLabel,
  cancelLabel,
}) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [isEdit, setIsEdit] = useState(edit);
  const [selectedFile, setSelectedFile] = useState<ExtendedUploadFile | null>(null);
  const [isPreviewLoading, setIsPreviewLoading] = useState(true);
  const [docxError, setDocxError] = useState<string | null>(null);

  const { data: getPortfolio, isLoading } = useGetPortfolio();
  const updatePortfolioMutation = useUpdatePortfolio();
  const downloadPortfolioFileMutation = useDownloadPortfolioFile();

  const [certificationFiles, setCertificationFiles] = useState<ExtendedUploadFile[]>([]);
  const [experienceFiles, setExperienceFiles] = useState<ExtendedUploadFile[]>([]);
  const [removedCertificationFiles, setRemovedCertificationFiles] = useState<string[]>([]);
  const [removedExperienceFiles, setRemovedExperienceFiles] = useState<string[]>([]);

  useEffect(() => {
    if (getPortfolio) {
      setCertificationFiles(mapFiles(getPortfolio.certificateFiles, 'cert'));
      setExperienceFiles(mapFiles(getPortfolio.experienceFiles, 'exp'));
      setRemovedCertificationFiles([]);
      setRemovedExperienceFiles([]);
    }
  }, [getPortfolio]);

  const handleRemove = useCallback((file: ExtendedUploadFile, type: PortfolioFileType) => {
    if (type === PortfolioFileType.CERTIFICATION) {
      setCertificationFiles((prev) => prev.filter((f) => f.uid !== file.uid));

      if (file.url && !file.originFileObj) {
        setRemovedCertificationFiles((prev) => [...prev, file.url!]);
      }
    } else {
      setExperienceFiles((prev) => prev.filter((f) => f.uid !== file.uid));
      if (file.url && !file.originFileObj) {
        setRemovedExperienceFiles((prev) => [...prev, file.url!]);
      }
    }
    return false;
  }, []);

  const handleFilePreview = useCallback((file: ExtendedUploadFile) => {
    if (file && file.originFileObj && isDocxFile(file.name)) {
      setDocxError(null);
      setSelectedFile(file);
    } else {
      setSelectedFile(file);
    }
  }, []);

  const handleModalClose = useCallback(() => {
    setSelectedFile(null);
    if (selectedFile && selectedFile.originFileObj && selectedFile.name.endsWith('.pdf')) {
      window.URL.revokeObjectURL(selectedFile?.url || '');
    }
  }, [selectedFile]);

  const resetFiles = useCallback(() => {
    if (!getPortfolio) return;
    setCertificationFiles(mapFiles(getPortfolio.certificateFiles, 'cert'));
    setExperienceFiles(mapFiles(getPortfolio.experienceFiles, 'exp'));
    setRemovedCertificationFiles([]);
    setRemovedExperienceFiles([]);
  }, [getPortfolio]);

  const handleCancel = useCallback(() => {
    onCancel?.();
    setIsEdit(false);
    form.resetFields();
    resetFiles();
  }, [form, onCancel, resetFiles]);

  const handleSubmit = useCallback(
    async (values: PortfolioRequest) => {
      const isAllEmpty =
        !values.linkedInUrl?.trim() &&
        !values.githubUrl?.trim() &&
        certificationFiles.length === 0 &&
        experienceFiles.length === 0;

      if (isAllEmpty) {
        openNotificationWithIcon(NotificationTypeEnum.ERROR, t('PORTFOLIO.NO_INFO'));
        return;
      }

      const data = new FormData();
      values.linkedInUrl && data.append('linkedInUrl', values.linkedInUrl);
      values.githubUrl && data.append('githubUrl', values.githubUrl);

      const newCertificationFiles = prepareFilesForUpload(certificationFiles);
      const newExperienceFiles = prepareFilesForUpload(experienceFiles);

      newCertificationFiles.forEach((file) => data.append('certificateFiles', file));
      newExperienceFiles.forEach((file) => data.append('experienceFiles', file));

      if (removedCertificationFiles.length > 0) {
        data.append('deleted_certifications', JSON.stringify(removedCertificationFiles));
      }

      if (removedExperienceFiles.length > 0) {
        data.append('deleted_experiences', JSON.stringify(removedExperienceFiles));
      }

      updatePortfolioMutation.mutate(data, {
        onSuccess: () => {
          setIsEdit(false);
          openNotificationWithIcon(NotificationTypeEnum.SUCCESS, t('PORTFOLIO.UPDATE_SUCCESS'));
          setCertificationFiles(mapFiles(getPortfolio?.certificateFiles, 'cert'));
          setExperienceFiles(mapFiles(getPortfolio?.experienceFiles, 'exp'));
          setRemovedCertificationFiles([]);
          setRemovedExperienceFiles([]);
          onSave?.();
        },
        onError: (error: any) => {
          openNotificationWithIcon(
            NotificationTypeEnum.ERROR,
            error.response?.data?.message || t('PORTFOLIO.UPDATE_FAILED'),
          );
        },
      });
    },
    [
      certificationFiles,
      experienceFiles,
      removedCertificationFiles,
      removedExperienceFiles,
      updatePortfolioMutation,
      t,
      getPortfolio?.certificateFiles,
      getPortfolio?.experienceFiles,
      onSave,
    ],
  );

  const handleEditToggle = useCallback(() => {
    setIsEdit(true);
  }, []);

  const handleDownload = useCallback(() => {
    if (!selectedFile) return;

    if (selectedFile.originFileObj) {
      const file = selectedFile.originFileObj as File;
      createDownloadLink(file, selectedFile.name || file.name);
      openNotificationWithIcon(NotificationTypeEnum.SUCCESS, t('PORTFOLIO.DOWNLOAD_SUCCESS'));
      return;
    }

    const url = selectedFile?.originalUrl || selectedFile?.url;
    if (!url) return;

    const processedFileName = getProcessedFileName(url, selectedFile.name);

    downloadPortfolioFileMutation.mutate(
      { url: url, filename: processedFileName },
      {
        onSuccess: (response) => {
          const blob = new Blob([response.data], { type: response.headers['content-type'] });
          createBlobDownloadLink(blob, processedFileName);
          openNotificationWithIcon(NotificationTypeEnum.SUCCESS, t('PORTFOLIO.DOWNLOAD_SUCCESS'));
        },
        onError: (error: unknown) => {
          const errorMessage =
            error && typeof error === 'object' && 'response' in error
              ? (error as any).response?.data?.message || t('PORTFOLIO.DOWNLOAD_FAILED')
              : t('PORTFOLIO.DOWNLOAD_FAILED');
          openNotificationWithIcon(NotificationTypeEnum.ERROR, errorMessage);
          window.open(url, '_blank');
        },
      },
    );
  }, [selectedFile, downloadPortfolioFileMutation, t]);

  const handleCertificationChange = useCallback(
    ({ fileList }: { fileList: ExtendedUploadFile[] }) => {
      setCertificationFiles(fileList);
    },
    [],
  );

  const handleExperienceChange = useCallback(({ fileList }: { fileList: ExtendedUploadFile[] }) => {
    setExperienceFiles(fileList);
  }, []);

  const value: PortfolioContextType = {
    isEdit,
    selectedFile,
    certificationFiles,
    experienceFiles,
    removedCertificationFiles,
    removedExperienceFiles,
    isLoading,
    isPreviewLoading,
    docxError,

    setIsEdit,
    setSelectedFile,
    setCertificationFiles,
    setExperienceFiles,
    setIsPreviewLoading,
    setDocxError,

    handleRemove,
    handleFilePreview,
    handleModalClose,
    handleDownload,
    handleCertificationChange,
    handleExperienceChange,

    handleSubmit,
    handleCancel,
    handleEditToggle,
    resetFiles,

    saveLabel,
    cancelLabel,
    onCancel,
    onSave,

    getPortfolio,
    updatePortfolioMutation,
    downloadPortfolioFileMutation,
    t,
    form,
  };

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
};

export const usePortfolioContext = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolioContext must be used within a PortfolioProvider');
  }
  return context;
};
