import { LeftOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import { Rule } from 'antd/lib/form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useForgotPasswordSchema } from './ForgotPasswordSchema';
import { InputField, Button } from '@app/components/ui/index';
import { yupSync } from '@app/helpers/yupSync';
import { useForgotPassword } from '@app/hooks/useUser';
import { NotificationTypeEnum, openNotificationWithIcon } from '@app/components/atoms/notification';

import './ForgotPassword.scss';

export default function ForgotPassword() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const forgotPasswordSchema = useForgotPasswordSchema();
  const validator = [yupSync(forgotPasswordSchema)] as unknown as Rule[];

  const { mutate: handleForgotPassword, isLoading } = useForgotPassword();
  const onFinish = (values: { email: string }) => {
    const { email } = values;
    handleForgotPassword(email, {
      onSuccess: (data) => {
        openNotificationWithIcon(NotificationTypeEnum.SUCCESS, t('FORGOT_PASSWORD.SUCCESS'));
        form.resetFields();
      },
      onError: (error: any) => {
        form.setFields([
          {
            name: 'email',
          },
        ]);
        openNotificationWithIcon(NotificationTypeEnum.ERROR, t('FORGOT_PASSWORD.NOT_FOUND'));
      },
    });
  };

  return (
    <div className='flex justify-center' id='container-forgot-password'>
      <div className='w-full md:w-4/5 h-full'>
        <Link
          to={'/login'}
          className='mb-5 font-medium flex align-items gap-x-1 text-primary-gray text-lg hover:text-primary'
        >
          <div className='flex items-center justify-center'>
            <LeftOutlined size={24} />
          </div>
          <span>{t('FORGOT_PASSWORD.TURN_BACK_SIGN_IN')}</span>
        </Link>
        <div>
          <h1 className='text-[40px] !text-primary font-bold'>{t('FORGOT_PASSWORD.TITLE')}</h1>
          <p className='text-primary-gray mt-4 mb-6 sm:my-4 md:my-6 lg:my-8 text-lg'>
            <span className='font-medium'>{t('FORGOT_PASSWORD.NO_ACCOUNT')}</span>{' '}
            <Link
              className={'text-primary-bold font-bold underline hover:underline hover:text-primary'}
              to={'/register'}
            >
              {t('FORGOT_PASSWORD.REGISTER')}
            </Link>
          </p>
        </div>
        <Form form={form} onFinish={onFinish} className='space-y-2'>
          <Form.Item name={'email'} rules={validator}>
            <InputField disabled={isLoading} type={'text'} placeholder={'Email *'} />
          </Form.Item>
          <Button disabled={isLoading} type='primary' className={'w-full'}>
            {isLoading ? t('FORGOT_PASSWORD.SEND_LOADING') : t('FORGOT_PASSWORD.RESET_PASSWORD')}
          </Button>
        </Form>
      </div>
    </div>
  );
}
