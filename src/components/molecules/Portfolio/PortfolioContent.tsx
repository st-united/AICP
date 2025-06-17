import { DownloadOutlined } from '@ant-design/icons';
import { Form, Input, Button, Upload, Divider, Modal, Spin, Empty, Typography } from 'antd';
import { Rule } from 'antd/lib/form';
import { UploadFileStatus } from 'antd/lib/upload/interface';
import React, { useState, useMemo, useCallback, memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import './PortfolioContent.scss';
import { FileItem } from './components/FileItem';
import { UploadContent } from './components/UploadContent';
import { MAX_FILE_COUNT, ACCEPTED_FILE_TYPES } from './constants';
import { usePortfolioSchema } from './PortfolioSchema';
import { yupSync } from '@app/helpers';
import {
  useUpdatePortfolio,
  useGetPortfolio,
  useUploadPortfolioFiles,
  useDownloadPortfolioFile,
} from '@app/hooks/usePortfolio';
import { ExtendedUploadFile, Portfolio } from '@app/interface/portfolio.interface';
import {
  NotificationTypeEnum,
  openNotificationWithIcon,
} from '@app/services/notification/notificationService';

const { Dragger } = Upload;

interface PortfolioContentProps {
  edit?: boolean;
  cancelLabel?: string;
  onCancel?: () => void;
  onSave?: () => void;
  saveLabel?: string;
  portfolio?: Portfolio;
}
const mapFiles = (urls: string[] = [], prefix: string) =>
  urls.map((url: string, idx: number) => ({
    uid: `${prefix}-${idx}`,
    name: url.split('/').pop()?.split('+').slice(1).join('+') || `${prefix}-${idx + 1}`,
    status: 'done' as UploadFileStatus,
    url,
    thumbUrl: url,
    type: url.split('.').pop(),
  }));
const PortfolioContent: React.FC<PortfolioContentProps> = memo(
  ({
    edit = false,
    cancelLabel,
    saveLabel,
    onCancel,
    onSave,
    portfolio,
  }: PortfolioContentProps) => {
    const [form] = Form.useForm();
    const [isEdit, setIsEdit] = useState(edit);
    const [selectedFile, setSelectedFile] = useState<ExtendedUploadFile | null>(null);
    const { data: getPortfolio, isLoading } = useGetPortfolio(portfolio);
    const updatePortfolioMutation = useUpdatePortfolio();
    const [certificationFiles, setCertificationFiles] = useState<ExtendedUploadFile[]>(
      mapFiles(portfolio?.certificateFiles || [], 'cert'),
    );
    const [experienceFiles, setExperienceFiles] = useState<ExtendedUploadFile[]>(
      mapFiles(portfolio?.experienceFiles || [], 'exp'),
    );

    const { t } = useTranslation();
    const portfolioSchema = usePortfolioSchema();
    const uploadPortfolioFilesMutation = useUploadPortfolioFiles();
    const downloadPortfolioFileMutation = useDownloadPortfolioFile();

    const validator = useMemo(
      () => [yupSync(portfolioSchema)] as unknown as Rule[],
      [portfolioSchema],
    );

    const initialValues = useMemo(() => getPortfolio || {}, [getPortfolio]);

    useEffect(() => {
      if (getPortfolio) {
        setCertificationFiles(mapFiles(getPortfolio.certificateFiles, 'cert'));
        setExperienceFiles(mapFiles(getPortfolio.experienceFiles, 'exp'));
      }
    }, [getPortfolio]);

    const handleRemove = useCallback(
      (file: ExtendedUploadFile, type: 'certificateFiles' | 'experienceFiles') => {
        const setter = type === 'certificateFiles' ? setCertificationFiles : setExperienceFiles;
        setter((prev) => prev.filter((f) => f.uid !== file.uid));
        return false;
      },
      [],
    );

    const handleFilePreview = useCallback((file: ExtendedUploadFile) => {
      setSelectedFile(file);
    }, []);

    const handleModalClose = useCallback(() => {
      setSelectedFile(null);
    }, []);

    const resetFiles = useCallback(() => {
      if (!getPortfolio) return;
      setCertificationFiles(mapFiles(getPortfolio.certificateFiles, 'cert'));
      setExperienceFiles(mapFiles(getPortfolio.experienceFiles, 'exp'));
    }, [getPortfolio]);

    const handleCancel = useCallback(() => {
      onCancel?.();
      setIsEdit(false);
      form.resetFields();
      resetFiles();
    }, [form, onCancel, resetFiles]);

    const handleSubmit = useCallback(
      async (values: Portfolio) => {
        const isAllEmpty =
          !values.linkedInUrl?.trim() &&
          !values.githubUrl?.trim() &&
          certificationFiles.filter((f) => f.status === 'done').length === 0 &&
          experienceFiles.filter((f) => f.status === 'done').length === 0;
        if (isAllEmpty) {
          openNotificationWithIcon(NotificationTypeEnum.ERROR, t('PORTFOLIO.NO_INFO'));
          return;
        }
        const data: Portfolio = {
          linkedInUrl: values.linkedInUrl,
          githubUrl: values.githubUrl,
          certificateFiles: certificationFiles
            .filter((f) => f.status === 'done')
            .map((f) => f.url || ''),
          experienceFiles: experienceFiles
            .filter((f) => f.status === 'done')
            .map((f) => f.url || ''),
        };

        updatePortfolioMutation.mutate(data, {
          onSuccess: () => {
            setIsEdit(false);
            openNotificationWithIcon(NotificationTypeEnum.SUCCESS, t('PORTFOLIO.UPDATE_SUCCESS'));
            setCertificationFiles([]);
            setExperienceFiles([]);
            onSave?.();
          },
          onError: () => {
            openNotificationWithIcon(NotificationTypeEnum.ERROR, t('PORTFOLIO.UPDATE_FAILED'));
          },
        });
      },
      [certificationFiles, experienceFiles, updatePortfolioMutation, t, onSave],
    );

    const handleCustomUpload = useCallback(
      async (options: any, type: 'certificateFiles' | 'experienceFiles') => {
        const { file, onSuccess, onError } = options;
        const randomString = Math.random().toString(36).substring(2, 15);
        const fileId = `${type}-${Date.now()}-${randomString}`;
        const setter = type === 'certificateFiles' ? setCertificationFiles : setExperienceFiles;

        const controller = new AbortController();
        const newFile: ExtendedUploadFile = {
          uid: fileId,
          name: file.name,
          status: 'uploading' as UploadFileStatus,
          originFileObj: file,
          progress: 0,
          uploadController: controller,
          type: file.type,
        };

        setter((prev) => [...prev, newFile]);

        const formData = new FormData();
        formData.append('file', file);

        try {
          const response = await uploadPortfolioFilesMutation.mutateAsync({
            formData,
            onProgress: (percent: number) => {
              setter((prev) =>
                prev.map((f) =>
                  f.uid === fileId ? { ...f, progress: percent, status: 'uploading' } : f,
                ),
              );
            },
            controller,
          });

          const url = response.data.data;
          setter((prev) =>
            prev.map((f) =>
              f.uid === fileId
                ? {
                    ...f,
                    url,
                    status: 'done' as UploadFileStatus,
                    progress: 100,
                  }
                : f,
            ),
          );

          onSuccess(response.data);
          openNotificationWithIcon(NotificationTypeEnum.SUCCESS, t('PORTFOLIO.UPLOAD_SUCCESS'));

          setTimeout(() => {
            setter((prev) =>
              prev.map((f) => (f.uid === fileId ? { ...f, progress: undefined } : f)),
            );
          }, 2000);
        } catch (err: any) {
          if (controller.signal.aborted) {
            setter((prev) =>
              prev.map((f) =>
                f.uid === fileId ? { ...f, status: 'removed' as UploadFileStatus } : f,
              ),
            );
            openNotificationWithIcon(NotificationTypeEnum.ERROR, t('PORTFOLIO.UPLOAD_FAILED'));
          } else {
            onError(err);
            setter((prev) => prev.filter((f) => f.uid !== fileId));
            openNotificationWithIcon(NotificationTypeEnum.ERROR, t('PORTFOLIO.UPLOAD_FAILED'));
          }
        }
      },
      [uploadPortfolioFilesMutation, t],
    );

    const handleEditToggle = useCallback(() => {
      setIsEdit(true);
    }, []);

    const handleDownload = useCallback(() => {
      if (!selectedFile) return;
      const url = selectedFile?.originalUrl || selectedFile?.url;
      if (!url) return;

      const processedFileName =
        url.split('/').pop()?.split('+').slice(1).join('+') || selectedFile.name;

      downloadPortfolioFileMutation.mutate(
        { url, filename: processedFileName },
        {
          onSuccess: (response) => {
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.setAttribute('download', processedFileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
            openNotificationWithIcon(NotificationTypeEnum.SUCCESS, t('PORTFOLIO.DOWNLOAD_SUCCESS'));
          },
          onError: () => {
            openNotificationWithIcon(NotificationTypeEnum.ERROR, t('PORTFOLIO.DOWNLOAD_FAILED'));
            window.open(url, '_blank');
          },
        },
      );
    }, [selectedFile, downloadPortfolioFileMutation, t]);

    if (!getPortfolio && isLoading) {
      return (
        <div className='h-full w-full flex items-center justify-center text-lg'>
          <Spin />
        </div>
      );
    }

    return (
      <div className='portfolio-content h-full p-6 overflow-auto bg-white shadow rounded-2xl'>
        <header className='portfolio-content__header'>
          <h1>{t('PORTFOLIO.TITLE')}</h1>
          <p>{t('PORTFOLIO.SUB_TITLE')}</p>
          <div className='w-1/2 mx-auto'>
            <Divider className='bg-[#FF8C5F]' />
          </div>
          <p className='mx-auto mb-4 text-sm'>{t('PORTFOLIO.SUB_TITLE_2')}</p>
        </header>

        <Form
          form={form}
          layout='vertical'
          className='portfolio-content__form'
          onFinish={handleSubmit}
          initialValues={initialValues}
        >
          <div className='flex flex-col justify-around gap-4'>
            <section className='portfolio-content__section'>
              <h2>{t('PORTFOLIO.URL')}</h2>
              <Form.Item name='linkedInUrl' rules={validator}>
                <Input
                  className='!px-6 !py-3 !rounded-lg'
                  placeholder={t('PORTFOLIO.LINKEDIN_URL') as string}
                  disabled={!isEdit}
                />
              </Form.Item>
              <Form.Item name='githubUrl' rules={validator}>
                <Input
                  className='!px-6 !py-3 !rounded-lg'
                  placeholder={t('PORTFOLIO.GITHUB_URL') as string}
                  disabled={!isEdit}
                />
              </Form.Item>
            </section>

            <div>
              <h2 className='mb-4 text-xl font-semibold'>{t('PORTFOLIO.CERTIFICATIONS')}</h2>
              {isEdit && (
                <section className='w-full'>
                  <Dragger
                    className='custom-upload'
                    multiple
                    listType='picture'
                    customRequest={(option) => handleCustomUpload(option, 'certificateFiles')}
                    maxCount={MAX_FILE_COUNT}
                    accept={ACCEPTED_FILE_TYPES}
                    disabled={!isEdit}
                    showUploadList={false}
                  >
                    <UploadContent t={t} />
                  </Dragger>
                  <p className='text-sm text-gray-400 text-center mt-2'>
                    {t('PORTFOLIO.VALIDATION')}
                  </p>
                </section>
              )}
              <div
                className={`w-full mt-4 p-4 rounded-lg ${
                  isEdit ? 'bg-white' : 'bg-gray-100'
                } flex justify-center flex-col`}
              >
                {certificationFiles.length > 0 ? (
                  certificationFiles.map((file) => (
                    <FileItem
                      t={t}
                      key={file.uid}
                      file={file}
                      type='certificateFiles'
                      onRemove={handleRemove}
                      onPreview={handleFilePreview}
                      isEdit={isEdit}
                    />
                  ))
                ) : (
                  <Empty
                    description={<Typography.Text>{t('PORTFOLIO.NO_DATA')}</Typography.Text>}
                  />
                )}
              </div>
              <h2 className='mb-4 text-xl font-semibold'>{t('PORTFOLIO.EXPERIENCE')}</h2>
              {isEdit && (
                <section className='w-full'>
                  <Dragger
                    className='custom-upload'
                    multiple
                    listType='picture'
                    maxCount={MAX_FILE_COUNT}
                    accept={ACCEPTED_FILE_TYPES}
                    customRequest={(option) => handleCustomUpload(option, 'experienceFiles')}
                    disabled={!isEdit}
                    showUploadList={false}
                  >
                    <UploadContent t={t} />
                  </Dragger>
                  <p className='text-sm text-gray-400 text-center mt-2'>
                    {t('PORTFOLIO.VALIDATION')}
                  </p>
                </section>
              )}
              <div
                className={`w-full mt-4 p-4 rounded-lg ${
                  isEdit ? 'bg-white' : 'bg-gray-100'
                } flex justify-center flex-col`}
              >
                {experienceFiles.length > 0 ? (
                  experienceFiles.map((file) => (
                    <FileItem
                      t={t}
                      key={file.uid}
                      file={file}
                      type='experienceFiles'
                      onRemove={handleRemove}
                      onPreview={handleFilePreview}
                      isEdit={isEdit}
                    />
                  ))
                ) : (
                  <Empty
                    description={<Typography.Text>{t('PORTFOLIO.NO_DATA')}</Typography.Text>}
                  />
                )}
              </div>
            </div>
          </div>
          <Form.Item className='portfolio-content__actions'>
            <div className='flex justify-end gap-2 !flex-row'>
              {!isEdit ? (
                <Button
                  onClick={handleEditToggle}
                  className='!flex !justify-center !items-center !rounded-3xl !px-8 !py-4 !text-md !bg-[#FF8C5F] !border-[#FF8C5F] !text-white'
                >
                  {t('PORTFOLIO.EDIT')}
                </Button>
              ) : (
                <>
                  <Button
                    onClick={handleCancel}
                    className='!flex !justify-center !items-center !rounded-2xl !px-5 !py-4 !border-[#FF8C5F] !text-[#FF8C5F] !text-md hover:!bg-[#FF8C5F] hover:!text-white'
                  >
                    {cancelLabel || t('PORTFOLIO.CANCEL')}
                  </Button>
                  <Button
                    type='primary'
                    htmlType='submit'
                    className='!flex !justify-center !items-center !rounded-2xl !px-8 !py-4 !text-md !bg-[#FF8C5F] !border-[#FF8C5F] !text-white'
                  >
                    {saveLabel || t('PORTFOLIO.SAVE')}
                  </Button>
                </>
              )}
            </div>
          </Form.Item>
        </Form>

        <Modal open={!!selectedFile} onCancel={handleModalClose} footer={null}>
          <div className='w-[90vw] md:w-[80vw] lg:w-[70vw] xl:w-[60vw] h-[90vh] aspect-video !py-10'>
            <div className='mb-4 flex justify-end'>
              <DownloadOutlined
                onClick={handleDownload}
                className='!text-[#ce6339] hover:!text-[#967569] !text-3xl mr-6'
              />
            </div>

            <iframe
              src={selectedFile?.url || selectedFile?.thumbUrl}
              title='Document Preview'
              className='w-full h-full border rounded'
            />
          </div>
        </Modal>
      </div>
    );
  },
);

PortfolioContent.displayName = 'PortfolioContent';

export default PortfolioContent;
