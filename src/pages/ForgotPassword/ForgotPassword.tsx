import { ArrowLeftOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { InputField, Button } from '@app/components/ui/index';
import { useForgotPassword } from '@app/hooks/useUser';
import {
  NotificationTypeEnum,
  openNotificationWithIcon,
} from '@app/services/notification/notificationService';

export default function ForgotPassword() {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const { mutate: res, isLoading } = useForgotPassword();
  const onFinish = (values: { email: string }) => {
    const { email } = values;
    res(email, {
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

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className='flex justify-start h-full w-full'>
      <div className='w-full'>
        <Link
          to={'/login'}
          className='text-white !mb-14 flex align-items gap-x-1 text-[#B2B2B2] text-lg hover:text-[#1890FF]'
        >
          <span>
            <ArrowLeftOutlined className='-translate-y-[2px]' />
          </span>
          <span>{t('FORGOT_PASSWORD.TURN_BACK_SIGN_IN')}</span>
        </Link>
        <div>
          <h1 className='text-3xl sm:text-3xl md:text-4xl lg:text-4xl !text-white !font-bold'>
            {t('FORGOT_PASSWORD.TITLE')}
          </h1>
          <p className='text-white mt-4 mb-6 sm:my-4 md:my-6 lg:my-8 text-lg'>
            <span>{t('FORGOT_PASSWORD.NO_ACCOUNT')}</span>{' '}
            <Link className={'text-[#1890FF] underline hover:underline'} to={'/register'}>
              {t('FORGOT_PASSWORD.REGISTER')}
            </Link>
          </p>
        </div>
        <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} className='space-y-2'>
          <Form.Item
            name={'email'}
            rules={[
              {
                required: true,
                message: t('VALIDATE.REQUIRED', { field: 'Email' }) as string,
              },
              {
                type: 'email',
                message: t('FORGOT_PASSWORD.EMAIL_VALID', { field: 'Email' }) as string,
              },
            ]}
          >
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
