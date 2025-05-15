import { Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { InputField, Button } from '@app/components/ui/index';
import { PASSWORD_REGEX_PATTERN } from '@app/constants/regex';
import { useUpdateForgotPassword } from '@app/hooks/useUser';
import {
  NotificationTypeEnum,
  openNotificationWithIcon,
} from '@app/services/notification/notificationService';

export default function ResetPassword() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [searchParams, _] = useSearchParams();
  const token = searchParams.get('token');

  const { mutate: res, isLoading } = useUpdateForgotPassword();
  const onFinish = (values: { password: string }) => {
    const { password } = values;
    const payload = {
      password,
      token,
    };
    res(payload, {
      onSuccess: (data) => {
        form.resetFields();
        openNotificationWithIcon(NotificationTypeEnum.SUCCESS, t('MODAL.SUGGESTION_COPY_PASSWORD'));
      },
      onError: (error) => {
        form.resetFields();
        openNotificationWithIcon(NotificationTypeEnum.ERROR, t('RESET_PASSWORD.EXPIRED'));
      },
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='!p-12 flex justify-start h-full w-full'>
      <div className='w-full'>
        <div className='!mt-14 !mb-14'>
          <h1 className='text-4xl !text-white !font-bold'>{t('RESET_PASSWORD.TITLE')}</h1>
        </div>
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className='!space-y-8'
        >
          <Form.Item
            name={'password'}
            rules={[
              {
                required: true,
                message: t<string>('VALIDATE.REQUIRED', { field: 'Password' }),
              },
              {
                pattern: PASSWORD_REGEX_PATTERN,
                message: t<string>('VALIDATE.RULE_PASSWORD', { field: 'Password' }),
              },
            ]}
          >
            <InputField
              disabled={isLoading}
              type={'password'}
              placeholder={t('RESET_PASSWORD.NEW_PASSWORD') as string}
            />
          </Form.Item>
          <Form.Item
            name={'confirm_password'}
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: t('VALIDATE.REQUIRED', { field: 'Password' }) as string,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(t<string>('VALIDATE.MATCH', { field: 'Password' })),
                  );
                },
              }),
            ]}
          >
            <InputField
              disabled={isLoading}
              type={'password'}
              placeholder={t('RESET_PASSWORD.CONFIRM_PASSWORD') as string}
            />
          </Form.Item>
          <Button disabled={isLoading} type='primary' className={'w-full'}>
            {isLoading ? t('FORGOT_PASSWORD.SEND_LOADING') : t('FORGOT_PASSWORD.RESET_PASSWORD')}
          </Button>
        </Form>
      </div>
    </div>
  );
}
