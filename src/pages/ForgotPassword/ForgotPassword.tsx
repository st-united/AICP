import { ArrowLeftOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import { useTranslation } from 'react-i18next';

import { InputField, Button } from '@app/components/ui/index';
import { useForgotPassword } from '@app/hooks/useUser';

export default function ForgotPassword() {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const { mutate } = useForgotPassword();
  const onFinish = (values: { email: string }) => {
    const { email } = values;
    mutate(email, {
      onSuccess: (data) => {
        form.setFields([
          {
            name: 'email',
            errors: [t('FORGOT_PASSWORD.SEND_EMAIL_SUCCESS')],
          },
        ]);
      },
      onError: (error: any) => {
        form.setFields([
          {
            name: 'email',
            errors: [error.response.data.message || t('FORGOT_PASSWORD.NOT_FOUND')],
          },
        ]);
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
            {t('FORGOT_PASSWORD.TITLE')} {t('FORGOT_PASSWORD.REGISTER')}
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
                message: t('VALIDATE.REQUIRED', { field: 'Email' }),
              },
            ]}
          >
            <InputField type={'email'} placeholder={'Email *'} />
          </Form.Item>
          <Button type='primary' className={'w-full'}>
            {t('FORGOT_PASSWORD.RESET_PASSWORD')}
          </Button>
        </Form>
      </div>
    </div>
  );
}
