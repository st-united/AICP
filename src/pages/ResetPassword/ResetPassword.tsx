import { Form, Spin } from 'antd';
import { Rule } from 'antd/lib/form';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { useResetPasswordSchema } from './ResetPasswordSchema';
import { Button, InputField } from '@app/components/ui/index';
import { yupSync } from '@app/helpers/yupSync';
import { useCheckResetPasswordToken, useUpdateForgotPassword } from '@app/hooks/useUser';
import { NotificationTypeEnum, openNotificationWithIcon } from '@app/components/atoms/notification';

export default function ResetPassword() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [searchParams, _] = useSearchParams();
  const ResetPasswordSchema = useResetPasswordSchema();
  const validator = [yupSync(ResetPasswordSchema)] as unknown as Rule[];
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const { isError } = useCheckResetPasswordToken(token || '');
  const { mutate: handleUpdateForgotPassword, isLoading } = useUpdateForgotPassword();
  useEffect(() => {
    if (isError) {
      openNotificationWithIcon(NotificationTypeEnum.ERROR, t('RESET_PASSWORD.EXPIRED'));
      navigate('/login', { replace: true });
    }
  }, [navigate, t, isError]);

  const onFinish = (values: { password: string }) => {
    const { password } = values;
    const payload = {
      password,
      token,
    };
    handleUpdateForgotPassword(payload, {
      onSuccess: () => {
        form.resetFields();
        openNotificationWithIcon(NotificationTypeEnum.SUCCESS, t('RESET_PASSWORD.RESET_SUCCESS'));
        navigate('/login', { replace: true });
      },
      onError: () => {
        form.resetFields();
        openNotificationWithIcon(NotificationTypeEnum.ERROR, t('RESET_PASSWORD.EXPIRED'));
      },
    });
  };
  return (
    <div className='flex justify-start'>
      <div className='w-full'>
        <div className='mt-14 mb-14'>
          <h1 className='text-3xl sm:text-3xl md:text-4xl lg:text-4xl text-primary font-bold'>
            {t('RESET_PASSWORD.TITLE')}
          </h1>
        </div>
        <Form form={form} onFinish={onFinish} className='!space-y-8'>
          <Form.Item name={'password'} rules={validator}>
            <InputField
              disabled={isLoading}
              type={'password'}
              placeholder={t<string>('RESET_PASSWORD.NEW_PASSWORD')}
            />
          </Form.Item>
          <Form.Item
            name={'confirm_password'}
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: t<string>('RESET_PASSWORD.REQUIRE_PASSWORD'),
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(t<string>('RESET_PASSWORD.MATCH')));
                },
              }),
            ]}
          >
            <InputField
              disabled={isLoading}
              type={'password'}
              placeholder={t<string>('RESET_PASSWORD.CONFIRM_PASSWORD')}
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
