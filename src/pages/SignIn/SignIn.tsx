import { LeftOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { Rule } from 'antd/lib/form';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';

import { useSignInSchema } from './signInSchema';
import { yupSync } from '@app/helpers/yupSync';
import { useActivateAccount, useLogin } from '@app/hooks';
import { Credentials } from '@app/interface/user.interface';

import './SignIn.scss';

const SignIn = () => {
  const { mutate: loginUser } = useLogin();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const signInSchema = useSignInSchema();

  const { mutate: activateAccount } = useActivateAccount();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const activateToken = searchParams.get('activateToken');

    if (activateToken) {
      activateAccount(activateToken);
      navigate('/login', { replace: true });
    }
  }, []);

  const onFinish = (values: Credentials) => {
    loginUser(values);
  };
  const handleOnClickHomePage = () => {
    navigate('/');
  };

  const validator = [yupSync(signInSchema)] as unknown as Rule[];

  return (
    <div id='container-sign-in' className='flex justify-center'>
      <div className='w-full md:w-5/5 h-full'>
        <button
          onClick={handleOnClickHomePage}
          className='bg-transparent border-0 p-0 m-0 text-inherit cursor-pointer w-auto'
          type='button'
        >
          <Link
            className='sign-in-link flex items-center justify-start text-lg !mb-14 hover:text-[#fe9871] cursor-pointer'
            to={'/'}
          >
            <div className='flex items-center justify-center'>
              <LeftOutlined size={24} />
            </div>
            {t('LOGIN.BACK_TO_HOME')}
          </Link>
        </button>
        <div>
          <h1 className='signin-title text-3xl sm:text-3xl md:text-3xl lg:text-4xl font-bold mb-4'>
            {t<string>('LOGIN.TEXT')}
          </h1>
          <div className='text-[#686868] text-lg !mb-8 flex gap-2'>
            <div>{t<string>('LOGIN.NOT_HAVE_ACCOUNT')}</div>
            <Link
              className='signin-link font-bold cursor-pointer underline hover:!text-[#fe9871] bg-transparent border-none outline-none'
              to={'/register'}
            >
              {t('LOGIN.REGISTER')}
            </Link>
          </div>
        </div>
        <Form form={form} layout='vertical' onFinish={onFinish} className='grid grid-cols-2 gap-4'>
          <Form.Item className='col-span-2' name='email' rules={validator}>
            <Input
              className='w-full !px-6 !py-4 !rounded-md !text-lg'
              placeholder={t('LOGIN.EMAIL') ?? ''}
            />
          </Form.Item>
          <Form.Item className='col-span-2' name='password' rules={validator}>
            <Input.Password
              className='col-span-2 w-full !px-6 !py-4 !rounded-md !text-lg'
              placeholder={t('LOGIN.PASSWORD') ?? ''}
              iconRender={(visible) =>
                visible ? (
                  <EyeOutlined color='#69c0ff' size={24} />
                ) : (
                  <EyeInvisibleOutlined color='#69c0ff' size={24} />
                )
              }
            />
          </Form.Item>
          <div className='col-span-2 text-lg text-white flex justify-end items-center'>
            <button
              className='!text-[#A22D00] font-bold cursor-pointer underline hover:!text-[#fe9871]'
              onClick={() => navigate('/forgot-password')}
            >
              {t('LOGIN.FORGOT_PASSWORD')}
            </button>
          </div>
          <Form.Item className='col-span-2 !mt-2'>
            <Button
              type='primary'
              htmlType='submit'
              className='signin-btn w-full h-[3.75rem] !text-[16px] !font-bold !border-none !outline-none !rounded-md !text-white'
            >
              {t('LOGIN.LOGIN')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
