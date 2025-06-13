import {
  DeleteFilled,
  DownloadOutlined,
  FilePdfOutlined,
  FileWordFilled,
  FolderAddFilled,
} from '@ant-design/icons';
import { Form, Input, Button, Upload, UploadFile, Image, Divider, Modal, Spin } from 'antd';
import { Rule } from 'antd/lib/form';
import DOMPurify from 'dompurify';
import html2pdf from 'html2pdf.js';
import mammoth from 'mammoth';
import React, { useState, useMemo, useCallback, memo } from 'react';
import { useTranslation } from 'react-i18next';

import './PortfolioContent.scss';
import { usePortfolioSchema } from './PortfolioSchema';
import { yupSync } from '@app/helpers';
import { useUpdatePortfolio, useGetPortfolio } from '@app/hooks/usePortfolio';
import { Portfolio } from '@app/interface/portfolio.interface';
import {
  NotificationTypeEnum,
  openNotificationWithIcon,
} from '@app/services/notification/notificationService';

const { Dragger } = Upload;

const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png'];
const MAX_FILE_COUNT = 20;
const ACCEPTED_FILE_TYPES = '.png,.jpg,.jpeg,.docx,.doc,.pdf';
const PDF_MIME_TYPES = ['application/pdf', 'pdf'];

interface PortfolioContentProps {
  edit?: boolean;
  cancelLabel?: string;
  onCancel?: () => void;
  onSave?: () => void;
  saveLabel?: string;
}

type ExtendedUploadFile = UploadFile & { originalUrl?: string };

interface FileItemProps {
  file: ExtendedUploadFile;
  type: 'certification' | 'experience';
  onRemove: (file: ExtendedUploadFile, type: 'certification' | 'experience') => void;
  onPreview: (file: ExtendedUploadFile) => void;
  isEdit: boolean;
}

type UploadContentProps = {
  t: (key: string) => string;
};

const FileItem: React.FC<FileItemProps> = memo(
  ({ file, type, onRemove, onPreview, isEdit }: FileItemProps) => {
    const [isConverting, setIsConverting] = useState(false);

    const fileSrc = useMemo(() => {
      let src = file.url || file.thumbUrl;
      if (!src && file.originFileObj) {
        src = URL.createObjectURL(file.originFileObj);
      }
      return src;
    }, [file.url, file.thumbUrl, file.originFileObj]);

    const isImageFile = useMemo(() => {
      return (
        (file.type && IMAGE_EXTENSIONS.some((ext) => file.type?.includes(ext))) ||
        file.type?.startsWith('image/')
      );
    }, [file.type]);

    const isPdfFile = useMemo(() => {
      return file.type && PDF_MIME_TYPES.some((type) => file.type?.includes(type));
    }, [file.type]);

    const handleRemove = useCallback(() => {
      onRemove(file, type);
    }, [file, type, onRemove]);

    const convertWordToPdf = useCallback(
      async (file: File) => {
        try {
          setIsConverting(true);
          const arrayBuffer = await file.arrayBuffer();
          const result = await mammoth.convertToHtml({ arrayBuffer });
          const html = DOMPurify.sanitize(result.value);

          const element = document.createElement('div');
          element.innerHTML = html;
          document.body.appendChild(element);

          const opt = {
            margin: 1,
            filename: `${file.name.split('.')[0]}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
          };
          const pdf = await html2pdf().set(opt).from(element).output('blob');
          const pdfUrl = URL.createObjectURL(pdf);
          const fileData: ExtendedUploadFile = {
            ...file,
            url: pdfUrl,
            uid: Date.now().toString(),
          };
          onPreview(fileData);
          document.body.removeChild(element);
        } catch (error) {
          openNotificationWithIcon(NotificationTypeEnum.ERROR, error as string);
        } finally {
          setIsConverting(false);
        }
      },
      [onPreview],
    );

    const handleNewFilePreview = useCallback(() => {
      if (isPdfFile) {
        const pdfUrl = URL.createObjectURL(file.originFileObj as File);
        onPreview({ ...file, url: pdfUrl, originalUrl: pdfUrl });
      } else {
        convertWordToPdf(file.originFileObj as File);
      }
    }, [file, isPdfFile, onPreview, convertWordToPdf]);

    const handleExistingFilePreview = useCallback(() => {
      if (isPdfFile) {
        onPreview(file);
      } else {
        const officeUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(
          file.url || '',
        )}&embedded=true`;
        onPreview({ ...file, url: officeUrl, originalUrl: file.url });
      }
    }, [file, isPdfFile, onPreview]);

    const handlePreview = useCallback(() => {
      if (file.originFileObj) {
        handleNewFilePreview();
      } else {
        handleExistingFilePreview();
      }
    }, [file.originFileObj, handleNewFilePreview, handleExistingFilePreview]);

    return (
      <div
        key={file.uid}
        className={`${
          file.originFileObj &&
          'relative rounded-xl p-[2px] my-2 bg-gradient-to-br from-[#ff9946] via-[#f3f3f3] to-[#fd7200] animate-gradient'
        }`}
      >
        <div
          className={`flex flex-col md:flex-row justify-between w-full items-center gap-0 px-12 py-2 ${
            file.originFileObj && 'bg-white'
          } rounded-xl p-6`}
        >
          <div className='relative w-1/2'>
            {isEdit && (
              <Button
                type='text'
                icon={<DeleteFilled className='!text-xl text-red-700' />}
                className={`${
                  isEdit ? 'cursor-pointer' : 'cursor-not-allowed'
                } absolute left-0 top-1`}
                onClick={handleRemove}
                disabled={!isEdit}
              />
            )}
            <div
              className={`ml-0 ${
                isEdit ? 'md:ml-10' : 'md:ml-0'
              } flex justify-center md:justify-start items-center w-full`}
            >
              {isImageFile ? (
                <div className='custom-img'>
                  <Image src={fileSrc} alt={file.name} />
                </div>
              ) : (
                <div className='flex items-center justify-center p-5'>
                  {isPdfFile ? (
                    <FilePdfOutlined
                      className='!text-6xl !text-[#c87351] cursor-pointer hover:!text-[#a85f42] hover:scale-105 transition-colors'
                      onClick={handlePreview}
                    />
                  ) : (
                    <div className='relative'>
                      <FileWordFilled
                        className='!text-6xl !text-[#2a318a] cursor-pointer hover:!text-[#5a58e0] hover:scale-105 transition-colors'
                        onClick={handlePreview}
                      />
                      {isConverting && (
                        <div className='absolute inset-0 flex items-center justify-center'>
                          <Spin size='small' />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <span className='text-end flex-wrap text-ellipsis md:w-1/2'>{file.name}</span>
        </div>
        {isEdit && !file.originFileObj && <Divider className='bg-[#E5E5E5] !my-2 md:!my-0' />}
      </div>
    );
  },
);

FileItem.displayName = 'FileItem';

const UploadContent = memo<UploadContentProps>(({ t }: UploadContentProps) => (
  <div className='w-full flex items-center justify-center text-gray-400'>
    <div className='flex flex-col items-center justify-center p-4 rounded-xl gap-2'>
      <FolderAddFilled className='text-4xl !text-[#FF8C5F]' />
      <span className='text-sm px-10'>{t('PORTFOLIO.CHOOSE_FILE')}</span>
      <Divider orientation='center' className='!text-sm !my-0 !text-gray-400'>
        {t('PORTFOLIO.OR')}
      </Divider>
      <div className='text-sm text-[#FF8C5F] border-[#FF8C5F] border-2 border-solid rounded-xl px-2 py-1'>
        {t('PORTFOLIO.PICK_FILE')}
      </div>
    </div>
  </div>
));

UploadContent.displayName = 'UploadContent';

const getPreviewSrc = (file: UploadFile | null) => {
  if (!file) return '';
  return file.url || file.thumbUrl || '';
};

const PortfolioContent: React.FC<PortfolioContentProps> = memo(
  ({ edit = false, cancelLabel, saveLabel, onCancel, onSave }: PortfolioContentProps) => {
    const [form] = Form.useForm();
    const [isEdit, setIsEdit] = useState(edit);
    const [selectedFile, setSelectedFile] = useState<ExtendedUploadFile | null>(null);
    const [certificationFiles, setCertificationFiles] = useState<ExtendedUploadFile[]>([]);
    const [experienceFiles, setExperienceFiles] = useState<ExtendedUploadFile[]>([]);
    const [deletedBECertificationFiles, setDeletedBECertificationFiles] = useState<string[]>([]);
    const [deletedBEExperiencesFiles, setDeletedBEExperiencesFiles] = useState<string[]>([]);

    const { t } = useTranslation();
    const portfolioSchema = usePortfolioSchema();
    const updatePortfolioMutation = useUpdatePortfolio();
    const { data: getPortfolio, isLoading } = useGetPortfolio();

    const validator = useMemo(
      () => [yupSync(portfolioSchema)] as unknown as Rule[],
      [portfolioSchema],
    );

    const beCertificationFiles: UploadFile[] = useMemo(
      () =>
        (getPortfolio?.certifications || [])
          .filter((url: string) => !deletedBECertificationFiles.includes(url))
          .map((url: string, idx: number) => ({
            uid: `be-cert-${idx}`,
            name: url.split('/').pop()?.split('+').slice(1).join('+') || `cert-${idx + 1}`,
            status: 'done' as const,
            url,
            thumbUrl: url,
            type: url.split('.').pop(),
          })),
      [getPortfolio?.certifications, deletedBECertificationFiles],
    );

    const beExperienceFiles: UploadFile[] = useMemo(
      () =>
        (getPortfolio?.experiences || [])
          .filter((url: string) => !deletedBEExperiencesFiles.includes(url))
          .map((url: string, idx: number) => ({
            uid: `be-exp-${idx}`,
            name: url.split('/').pop()?.split('+').slice(1).join('+') || `exp-${idx + 1}`,
            status: 'done' as const,
            url,
            thumbUrl: url,
            type: url.split('.').pop(),
          })),
      [getPortfolio?.experiences, deletedBEExperiencesFiles],
    );

    const allCertificationFiles: UploadFile[] = useMemo(
      () => [...beCertificationFiles, ...certificationFiles],
      [beCertificationFiles, certificationFiles],
    );

    const allExperienceFiles: UploadFile[] = useMemo(
      () => [...beExperienceFiles, ...experienceFiles],
      [beExperienceFiles, experienceFiles],
    );

    const initialValues = useMemo(() => getPortfolio || {}, [getPortfolio]);

    const handleRemoveUploadedFile = useCallback(
      (file: ExtendedUploadFile, type: 'certification' | 'experience') => {
        if (file.url) {
          if (type === 'certification') {
            setDeletedBECertificationFiles((prev) => [...prev, file.url as string]);
          } else {
            setDeletedBEExperiencesFiles((prev) => [...prev, file.url as string]);
          }
        } else {
          if (type === 'certification') {
            setCertificationFiles((prev) => prev.filter((f) => f.uid !== file.uid));
          } else {
            setExperienceFiles((prev) => prev.filter((f) => f.uid !== file.uid));
          }
        }
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

    const handleCancel = useCallback(() => {
      onCancel?.();
      setIsEdit(false);
      form.resetFields();
      setCertificationFiles([]);
      setExperienceFiles([]);
      setDeletedBECertificationFiles([]);
      setDeletedBEExperiencesFiles([]);
    }, [form, onCancel]);

    const handleSubmit = useCallback(
      async (values: Portfolio) => {
        const formData = new FormData();

        if (values.linkedInUrl) {
          formData.append('linkedInUrl', values.linkedInUrl);
        }
        if (values.githubUrl) {
          formData.append('githubUrl', values.githubUrl);
        }

        certificationFiles.forEach((file) => {
          formData.append('certifications', file.originFileObj as File);
        });
        experienceFiles.forEach((file) => {
          formData.append('experiences', file.originFileObj as File);
        });

        deletedBECertificationFiles.forEach((file) => {
          formData.append('deleted_certifications', file);
        });
        deletedBEExperiencesFiles.forEach((file) => {
          formData.append('deleted_experiences', file);
        });

        updatePortfolioMutation.mutate(formData, {
          onSuccess: () => {
            setIsEdit(false);
            openNotificationWithIcon(NotificationTypeEnum.SUCCESS, t('PORTFOLIO.UPDATE_SUCCESS'));
            setCertificationFiles([]);
            setExperienceFiles([]);
            setDeletedBECertificationFiles([]);
            setDeletedBEExperiencesFiles([]);
            onSave?.();
          },
          onError: () => {
            openNotificationWithIcon(NotificationTypeEnum.ERROR, t('PORTFOLIO.UPDATE_FAILED'));
          },
        });
      },
      [
        certificationFiles,
        experienceFiles,
        deletedBECertificationFiles,
        deletedBEExperiencesFiles,
        updatePortfolioMutation,
        t,
        onSave,
      ],
    );

    const handleCertificationChange = useCallback(
      ({ fileList }: { fileList: ExtendedUploadFile[] }) => {
        setCertificationFiles(fileList.filter((f) => !f.url));
      },
      [],
    );

    const handleExperienceChange = useCallback(
      ({ fileList }: { fileList: ExtendedUploadFile[] }) => {
        setExperienceFiles(fileList.filter((f) => !f.url));
      },
      [],
    );

    const handleEditToggle = useCallback(() => {
      setIsEdit(true);
    }, []);

    if (!getPortfolio && isLoading) {
      return (
        <div className='h-full flex items-center justify-center text-lg'>
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
                    maxCount={MAX_FILE_COUNT}
                    accept={ACCEPTED_FILE_TYPES}
                    beforeUpload={() => false}
                    onChange={handleCertificationChange}
                    disabled={!isEdit}
                    showUploadList={false}
                    fileList={allCertificationFiles}
                  >
                    <UploadContent t={t} />
                  </Dragger>
                  <p className='text-sm text-gray-400 text-center mt-2'>
                    {t('PORTFOLIO.VALIDATION')}
                  </p>
                </section>
              )}
              <div className={`w-full mt-4 p-4 rounded-lg ${isEdit ? 'bg-white' : 'bg-gray-100'}`}>
                {allCertificationFiles.map((file) => (
                  <FileItem
                    key={file.uid}
                    file={file}
                    type='certification'
                    onRemove={handleRemoveUploadedFile}
                    onPreview={handleFilePreview}
                    isEdit={isEdit}
                  />
                ))}
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
                    beforeUpload={() => false}
                    onChange={handleExperienceChange}
                    disabled={!isEdit}
                    showUploadList={false}
                    fileList={allExperienceFiles}
                  >
                    <UploadContent t={t} />
                  </Dragger>
                  <p className='text-sm text-gray-400 text-center mt-2'>
                    {t('PORTFOLIO.VALIDATION')}
                  </p>
                </section>
              )}
              <div className={`w-full mt-4 p-4 rounded-lg ${isEdit ? 'bg-white' : 'bg-gray-100'}`}>
                {allExperienceFiles.map((file) => (
                  <FileItem
                    key={file.uid}
                    file={file}
                    type='experience'
                    onRemove={handleRemoveUploadedFile}
                    onPreview={handleFilePreview}
                    isEdit={isEdit}
                  />
                ))}
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
            {!selectedFile?.type?.includes('pdf') && selectedFile?.originalUrl && (
              <div className='mb-4 flex justify-end'>
                <DownloadOutlined
                  onClick={() => {
                    if (selectedFile?.originalUrl) {
                      window.open(selectedFile.originalUrl, '_blank');
                    }
                  }}
                  className='!text-[#ce6339] hover:!text-[#967569] !text-4xl mr-6'
                />
              </div>
            )}

            <iframe
              src={getPreviewSrc(selectedFile)}
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
