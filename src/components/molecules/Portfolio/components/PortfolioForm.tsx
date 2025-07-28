import { Form, Input, Button, Select, Radio } from 'antd';
import React, { useMemo } from 'react';
import * as yup from 'yup';

import { FileList } from './FileList';
import { FileUpload } from './FileUpload';
import { usePortfolioContext } from '../context/PortfolioContext';
import { usePortfolioSchema } from '../PortfolioSchema';
import { PortfolioFileType } from '@app/constants/portfolioFileType';
import { yupSync } from '@app/helpers';
import { PortfolioRequest } from '@app/interface/portfolio.interface';

const PortfolioForm: React.FC = () => {
  const {
    isEdit,
    form,
    handleSubmit,
    handleCancel,
    handleEditToggle,
    getPortfolio,
    t,
    saveLabel,
    cancelLabel,
    isUpdating,
    isWithUserInfo = false,
  } = usePortfolioContext();

  const portfolioSchema = usePortfolioSchema();
  const isStudent = Form.useWatch('isStudent', form);
  const validator = useMemo(
    () => [yupSync(portfolioSchema)] as unknown as any[],
    [portfolioSchema],
  );

  const initialValues = useMemo(() => getPortfolio || {}, [getPortfolio]);

  const onSubmit = async (values: PortfolioRequest) => {
    try {
      if (isWithUserInfo) {
        await portfolioSchema.validate(values, { abortEarly: false });
      }
      handleSubmit(values);
    } catch (validationError) {
      if (validationError instanceof yup.ValidationError) {
        const errors = validationError.inner.reduce<Record<string, { errors: string[] }>>(
          (acc, err) => {
            if (err.path) {
              acc[err.path] = { errors: [err.message] };
            }
            return acc;
          },
          {},
        );
        form.setFields(
          Object.entries(errors).map(([name, config]) => ({
            name: name as keyof PortfolioRequest,
            ...config,
          })),
        );
      }
    }
  };
  return (
    <Form
      form={form}
      layout='vertical'
      className='portfolio-content__form'
      onFinish={onSubmit}
      initialValues={initialValues}
    >
      {isWithUserInfo && (
        <div className='flex flex-col justify-around gap-4'>
          <section className='portfolio-content__section mb-[16px]'>
            <h2>
              {t('PORTFOLIO.USER_INFO')} <span className='text-red-500'>*</span>
            </h2>
            <Form.Item name='isStudent' rules={validator}>
              <Radio.Group className='flex xsL:flex-row flex-col gap-4 w-full'>
                <div className='rounded-lg p-3 bg-white border border-gray-300 w-full'>
                  <Radio value={true} disabled={!isEdit}>
                    {t('USER.STUDENT')}
                  </Radio>
                </div>
                <div className='rounded-lg p-3 bg-white border border-gray-300 w-full'>
                  <Radio value={false} disabled={!isEdit}>
                    {t('USER.WORKER')}
                  </Radio>
                </div>
              </Radio.Group>
            </Form.Item>
          </section>

          <section
            className={`portfolio-content__section mb-[16px] transition-all duration-300 ease-in-out ${
              isStudent
                ? 'opacity-100 max-h-[500px] overflow-hidden'
                : 'opacity-0 max-h-0 overflow-hidden'
            }`}
          >
            <h2>
              {t('PORTFOLIO.INFO_DETAIL')}
              <span className='text-red-500'> *</span>
            </h2>
            <Form.Item name='university' rules={validator}>
              <Input
                className='!px-6 !py-3 !rounded-lg'
                placeholder={t('PORTFOLIO.UNIVERSITY') as string}
                disabled={!isEdit}
              />
            </Form.Item>
            <Form.Item name='studentCode' rules={validator}>
              <Input
                className='!px-6 !py-3 !rounded-lg'
                placeholder={t('PORTFOLIO.STUDENT_CODE') as string}
                disabled={!isEdit}
              />
            </Form.Item>
          </section>
        </div>
      )}
      <section className='portfolio-content__section mb-[16px]'>
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
        <h2 className='mb-4 text-xl font-semibold' id='certificateFiles'>
          {t('PORTFOLIO.CERTIFICATIONS')}
        </h2>
        <FileUpload type={PortfolioFileType.CERTIFICATION} />
        <FileList type={PortfolioFileType.CERTIFICATION} />
        <h2 className='mb-4 text-xl font-semibold' id='experienceFiles'>
          {t('PORTFOLIO.EXPERIENCE')}
        </h2>
        <FileUpload type={PortfolioFileType.EXPERIENCE} />
        <FileList type={PortfolioFileType.EXPERIENCE} />
      </div>

      {/* <Form.Item className='portfolio-content__actions'>
        <div className='flex justify-end gap-2 !flex-row'>
          {!isEdit ? (
            <Button
              type='primary'
              onClick={handleEditToggle}
              className='!flex !justify-center !items-center !rounded-3xl !px-8 !py-4 !text-md !text-white font-bold'
            >
              {t('PORTFOLIO.EDIT')}
            </Button>
          ) : (
            <>
              <Button
                onClick={handleCancel}
                className='!flex !justify-center !items-center !rounded-2xl !px-5 !py-4 !border-[#FF8C5F] !text-[#FF8C5F] !text-md hover:shadow-md'
              >
                {cancelLabel || t('PORTFOLIO.CANCEL')}
              </Button>
              <Button
                type='primary'
                htmlType='submit'
                disabled={isUpdating}
                loading={isUpdating}
                className='!flex !justify-center !items-center !rounded-2xl !px-8 !py-4 !text-md !bg-[#FF8C5F] !border-[#FF8C5F] !text-white hover:shadow-md'
              >
                {saveLabel || t('PORTFOLIO.SAVE')}
              </Button>
            </>
          )}
        </div>
      </Form.Item> */}
    </Form>
  );
};

export { PortfolioForm };
