import { ArrowLeftOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import { useTranslation } from 'react-i18next';

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
    <div className='!p-12 flex justify-start h-full w-full'>
      <div className='w-full'>
        <p className='text-white !mb-14 flex align-items gap-x-1'>
          <span>
            <ArrowLeftOutlined className='-translate-y-[2px]' />
          </span>
          <span>{t('FORGOT_PASSWORD.TURN_BACK_SIGN_IN')}</span>
        </p>
        <div>
          <h1 className='text-4xl !text-white !font-bold'>{t('FORGOT_PASSWORD.TITLE')}</h1>
          <p className='text-white !mb-8'>
            {t('FORGOT_PASSWORD.NO_ACCOUNT')} {t('FORGOT_PASSWORD.REGISTER')}
          </p>
        </div>
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className='!space-y-8'
        >
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
            <InputField disabled={isLoading} type={'email'} placeholder={'Email *'} />
          </Form.Item>
          <Button disabled={isLoading} type='primary' className={'w-full'}>
            {isLoading ? t('FORGOT_PASSWORD.SEND_LOADING') : t('FORGOT_PASSWORD.RESET_PASSWORD')}
          </Button>
        </Form>
      </div>
    </div>
  );
}
