import {
  DeleteFilled,
  FilePdfOutlined,
  FileWordOutlined,
  FolderAddFilled,
} from '@ant-design/icons';
import { Form, Input, Button, Upload, UploadFile, Image, Divider, Modal, Spin } from 'antd';
import { Rule } from 'antd/lib/form';
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

interface PortfolioContentProps {
  edit?: boolean;
  cancelLabel?: string;
  onCancel?: () => void;
  onSave?: () => void;
  saveLabel?: string;
}

interface FileItemProps {
  file: UploadFile;
  type: 'certification' | 'experience';
  onRemove: (file: UploadFile, type: 'certification' | 'experience') => void;
  onPreview: (file: UploadFile) => void;
  isEdit: boolean;
}
const imageExtensions = ['jpg', 'jpeg', 'png'];

const FileItem: React.FC<FileItemProps> = memo(
  ({ file, type, onRemove, onPreview, isEdit }: FileItemProps) => {
    const fileSrc = useMemo(() => {
      let src = file.url || file.thumbUrl;
      if (!src && file.originFileObj) {
        src = URL.createObjectURL(file.originFileObj);
      }
      return src;
    }, [file.url, file.thumbUrl, file.originFileObj]);

    const isImageFile = useMemo(() => {
      return (
        (file.type && imageExtensions.some((ext) => file.type?.includes(ext))) ||
        file.type?.startsWith('image/')
      );
    }, [file.type]);

    const handleRemove = useCallback(() => {
      onRemove(file, type);
    }, [file, type, onRemove]);

    const handlePreview = useCallback(() => {
      onPreview(file);
    }, [file, onPreview]);

    return (
      <div key={file.uid}>
        <div className='flex flex-col md:flex-row justify-between w-full items-center gap-0 px-12 py-2'>
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
                  {file.type === 'pdf' ? (
                    <FilePdfOutlined
                      className='!text-6xl !text-[#c87351] cursor-pointer hover:!text-[#a85f42] transition-colors'
                      onClick={handlePreview}
                    />
                  ) : (
                    <FileWordOutlined
                      className='!text-6xl !text-[#c87351] cursor-pointer hover:!text-[#a85f42] transition-colors'
                      onClick={handlePreview}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
          <span className='text-end flex-wrap text-ellipsis md:w-1/2'>{file.name}</span>
        </div>
        {isEdit && <Divider className='bg-[#E5E5E5] !my-2 md:!my-0' />}
      </div>
    );
  },
);

FileItem.displayName = 'FileItem';

const PortfolioContent: React.FC<PortfolioContentProps> = memo(
  ({ edit = false, cancelLabel, saveLabel, onCancel, onSave }: PortfolioContentProps) => {
    const [form] = Form.useForm();
    const [isEdit, setIsEdit] = useState(edit);
    const [selectedFile, setSelectedFile] = useState<UploadFile | null>(null);
    const [certificationFiles, setCertificationFiles] = useState<UploadFile[]>([]);
    const [experienceFiles, setExperienceFiles] = useState<UploadFile[]>([]);
    const [deletedBECertificationFiles, setDeletedBECertificationFiles] = useState<string[]>([]);
    const [deletedBEExperiencesFiles, setDeletedBEExperiencesFiles] = useState<string[]>([]);
    console.log(selectedFile);
    const { t } = useTranslation();
    const portfolioSchema = usePortfolioSchema();
    const updatePortfolioMutation = useUpdatePortfolio();
    const { data: getPortfolio, isLoading } = useGetPortfolio();

    const validator = useMemo(
      () => [yupSync(portfolioSchema)] as unknown as Rule[],
      [portfolioSchema],
    );

    const beCertificationFiles = useMemo(
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

    const beExperienceFiles = useMemo(
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

    const allCertificationFiles = useMemo(
      () => [...beCertificationFiles, ...certificationFiles],
      [beCertificationFiles, certificationFiles],
    );

    const allExperienceFiles = useMemo(
      () => [...beExperienceFiles, ...experienceFiles],
      [beExperienceFiles, experienceFiles],
    );

    const initialValues = useMemo(() => getPortfolio || {}, [getPortfolio]);

    const handleRemoveUploadedFile = useCallback(
      (file: UploadFile, type: 'certification' | 'experience') => {
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

    const handleFilePreview = useCallback((file: UploadFile) => {
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
    }, [form, setIsEdit, onCancel]);

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
        setIsEdit,
      ],
    );

    const handleCertificationChange = useCallback(({ fileList }: { fileList: UploadFile[] }) => {
      setCertificationFiles(fileList.filter((f) => !f.url));
    }, []);

    const handleExperienceChange = useCallback(({ fileList }: { fileList: UploadFile[] }) => {
      setExperienceFiles(fileList.filter((f) => !f.url));
    }, []);

    const handleEditToggle = useCallback(() => {
      setIsEdit(true);
    }, []);

    const uploadContent = useMemo(
      () => (
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
      ),
      [t],
    );

    if (!getPortfolio && isLoading) {
      return (
        <div className='h-full flex items-center justify-center text-lg'>
          <Spin />
        </div>
      );
    }

    return (
      <div className='h-full p-6 overflow-auto bg-white shadow rounded-2xl'>
        <header className='flex flex-col mx-auto mb-8 text-center'>
          <h1 className='text-[40px] font-[700] text-[#FF8C5F] mb-6'>{t('PORTFOLIO.TITLE')}</h1>
          <p className='mx-auto text-lg text-[#686868] center tex-font-semibold'>
            {t('PORTFOLIO.SUB_TITLE')}
          </p>
          <div className='w-1/2 mx-auto'>
            <Divider className='bg-[#FF8C5F]' />
          </div>
          <p className='mx-auto mb-4 text-sm center tex-font-semibold'>
            {t('PORTFOLIO.SUB_TITLE_2')}
          </p>
        </header>

        <Form
          form={form}
          layout='vertical'
          className='w-full max-w-[900px] mx-auto'
          onFinish={handleSubmit}
          initialValues={initialValues}
        >
          <div className='flex flex-col justify-around gap-4'>
            <section>
              <h2 className='mb-4 text-xl font-semibold'>{t('PORTFOLIO.URL')}</h2>
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
                    maxCount={5}
                    accept='.png,.jpg,.jpeg,.docx,.doc,.pdf'
                    beforeUpload={() => false}
                    onChange={handleCertificationChange}
                    disabled={!isEdit}
                    showUploadList={false}
                    fileList={allCertificationFiles}
                  >
                    {uploadContent}
                  </Dragger>
                  <p className='text-sm text-gray-400 text-center mt-2'>
                    {t('PORTFOLIO.VALIDATION')}
                  </p>
                </section>
              )}
              <div className={`w-full mt-4 p-4  rounded-lg ${isEdit ? 'bg-white' : 'bg-gray-100'}`}>
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
                    maxCount={5}
                    accept='.png,.jpg,.jpeg,.docx,.doc,.pdf'
                    beforeUpload={() => false}
                    onChange={handleExperienceChange}
                    disabled={!isEdit}
                    showUploadList={false}
                    fileList={allExperienceFiles}
                  >
                    {uploadContent}
                  </Dragger>
                  <p className='text-sm text-gray-400 text-center mt-2'>
                    {t('PORTFOLIO.VALIDATION')}
                  </p>
                </section>
              )}
              <div className={`w-full mt-4 p-4  rounded-lg ${isEdit ? 'bg-white' : 'bg-gray-100'}`}>
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
          <Form.Item className='border-t border-[#E5E5E5] !mt-16 !py-8'>
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
            <iframe
              src={
                selectedFile?.url ||
                selectedFile?.thumbUrl ||
                (selectedFile?.originFileObj ? URL.createObjectURL(selectedFile.originFileObj) : '')
              }
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
