import { LeftOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import { useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router-dom';

import { InputField, Button } from '@app/components/ui/index';
import { useResendActivationEmail } from '@app/hooks';

export default function ActivationExpired() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [form] = Form.useForm();
  const { mutate: resendActivationEmail, isLoading } = useResendActivationEmail();

  const email = searchParams.get('email') || '';

  useEffect(() => {
    if (email) {
      form.setFieldsValue({ email });
    }
  }, [email, form]);

  const onFinish = () => {
    resendActivationEmail(email);
  };

  return (
    <div className='flex justify-start h-full w-full'>
      <div className='w-full'>
        <Link
          to='/login'
          className='mb-12 font-medium flex items-center gap-x-1 text-primary-gray text-base sm:text-lg md:text-xl hover:text-primary'
        >
          <LeftOutlined size={24} />
          <span>{t('ACTIVATION_EXPIRED.TURN_BACK_SIGN_IN')}</span>
        </Link>

        <div className='flex flex-col gap-y-4'>
          <h1 className='text-3xl sm:text-4xl md:text-4xl lg:text-[40px] text-primary font-bold'>
            {t('ACTIVATION_EXPIRED.TITLE')}
          </h1>
          <p className='text-primary-gray text-base sm:text-lg md:text-xl'>
            {t('ACTIVATION_EXPIRED.DESCRIPTION_1')}
          </p>
          <p className='text-primary-gray text-base sm:text-lg md:text-xl'>
            <Trans
              i18nKey='ACTIVATION_EXPIRED.DESCRIPTION_2'
              components={{ strong: <strong className='font-bold' /> }}
            />
          </p>
        </div>
        <div className='max-w-md mx-auto mt-[40px] flex flex-col gap-y-[40px]'>
          <Form form={form} onFinish={onFinish} className='flex flex-col gap-y-[40px]'>
            <Form.Item name={'email'} className='!mb-0'>
              <InputField
                disabled={true}
                type={'text'}
                placeholder={email || 'Email *'}
                className='text-sm sm:text-base md:text-lg placeholder:text-sm sm:placeholder:text-base md:placeholder:text-lg !px-6 !py-4 !rounded-md'
              />
            </Form.Item>
            <Button type='primary' className={'w-full, !h-[60px]'} loading={isLoading}>
              <span className='font-bold text-sm sm:text-base md:text-lg'>
                {t('ACTIVATION_EXPIRED.RESEND_EMAIL')}
              </span>
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
