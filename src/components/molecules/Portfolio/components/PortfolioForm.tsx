import { Form, Input, Button } from 'antd';
import React, { useMemo } from 'react';

import { FileList } from './FileList';
import { FileUpload } from './FileUpload';
import { usePortfolioContext } from '../context/PortfolioContext';
import { usePortfolioSchema } from '../PortfolioSchema';
import { PortfolioFileType } from '@app/constants/portfolioFileType';
import { yupSync } from '@app/helpers';

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
  } = usePortfolioContext();

  const portfolioSchema = usePortfolioSchema();
  const validator = useMemo(
    () => [yupSync(portfolioSchema)] as unknown as any[],
    [portfolioSchema],
  );

  const initialValues = useMemo(() => getPortfolio || {}, [getPortfolio]);

  return (
    <Form
      form={form}
      layout='vertical'
      className='portfolio-content__form'
      onFinish={handleSubmit}
      initialValues={initialValues}
    >
      <div className='flex flex-col justify-around gap-4'>
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
      </div>
      <div>
        <h2 className='mb-4 text-xl font-semibold'>{t('PORTFOLIO.CERTIFICATIONS')}</h2>
        <FileUpload type={PortfolioFileType.CERTIFICATION} />
        <FileList type={PortfolioFileType.CERTIFICATION} />
        <h2 className='mb-4 text-xl font-semibold'>{t('PORTFOLIO.EXPERIENCE')}</h2>
        <FileUpload type={PortfolioFileType.EXPERIENCE} />
        <FileList type={PortfolioFileType.EXPERIENCE} />
      </div>

      <Form.Item className='portfolio-content__actions'>
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
                className='!flex !justify-center !items-center !rounded-2xl !px-8 !py-4 !text-md !bg-[#FF8C5F] !border-[#FF8C5F] !text-white hover:shadow-md'
              >
                {saveLabel || t('PORTFOLIO.SAVE')}
              </Button>
            </>
          )}
        </div>
      </Form.Item>
    </Form>
  );
};

export { PortfolioForm };
