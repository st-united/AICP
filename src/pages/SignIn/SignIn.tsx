import { LeftOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Form, Input, Image } from 'antd';
import { Rule } from 'antd/lib/form';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';

import { useSignInSchema } from './signInSchema';
import { NAVIGATE_URL } from '@app/constants';
import { yupSync } from '@app/helpers/yupSync';
import { useActivateAccount, useLogin, useLoginWithGoogle } from '@app/hooks';
import { Credentials, GoogleCredentials } from '@app/interface/user.interface';

import { auth, provider } from '../../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { GoogleIcon } from '@app/assets/svgs';

import './SignIn.scss';

const SignIn = () => {
  const { mutate: loginUser } = useLogin();
  const { mutate: loginWithGoogle } = useLoginWithGoogle();
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

  const handleGoogleLogin = async () => {
    const result = await signInWithPopup(auth, provider);
    const googleIdToken = await result.user.getIdToken();
    const credentialsToPass: GoogleCredentials = { idToken: googleIdToken };
    loginWithGoogle(credentialsToPass);
  };

  const validator = [yupSync(signInSchema)] as unknown as Rule[];

  return (
    <div id='container-sign-in' className='flex justify-center'>
      <div className='w-full md:w-5/5 h-full'>
        <button
          onClick={handleOnClickHomePage}
          className='bg-transparent cursor-pointer w-auto'
          type='button'
        >
          <Link
            className='flex items-center justify-start text-lg !mb-14 hover:text-primary-light cursor-pointer'
            to={'/'}
          >
            <div className='flex items-center justify-center'>
              <LeftOutlined size={24} />
            </div>
            {t('LOGIN.BACK_TO_HOME')}
          </Link>
        </button>
        <div>
          <h1 className='text-primary text-3xl sm:text-3xl md:text-3xl lg:text-4xl font-bold mb-4'>
            {t<string>('LOGIN.TEXT')}
          </h1>
          <div className='text-primary-gray text-lg !mb-8 flex gap-2'>
            <div>{t<string>('LOGIN.NOT_HAVE_ACCOUNT')}</div>
            <Link
              className='text-primary-bold font-bold cursor-pointer underline hover:!text-primary-light bg-transparent border-none outline-none'
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
              placeholder={t('PLACEHOLDER.FIELD_REQUIRED', { field: t('LOGIN.EMAIL') }) ?? ''}
            />
          </Form.Item>
          <Form.Item className='col-span-2' name='password' rules={validator}>
            <Input.Password
              className='col-span-2 w-full !px-6 !py-4 !rounded-md !text-lg'
              placeholder={t('PLACEHOLDER.FIELD_REQUIRED', { field: t('LOGIN.PASSWORD') }) ?? ''}
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
            <button className='cursor-pointer'>
              <Link
                to={NAVIGATE_URL.FORGOT_PASSWORD}
                className='text-primary-bold font-bold underline hover:!text-primary-light transition duration-300'
              >
                {t('LOGIN.FORGOT_PASSWORD')}
              </Link>
            </button>
          </div>
          <Form.Item className='col-span-2 !mt-2'>
            <Button
              type='primary'
              htmlType='submit'
              className='w-full h-[3.75rem] !bg-primary-bold text-[1rem] text-white font-bold !border-none !outline-none !rounded-md hover:!bg-primary-light hover:text-black transition duration-300'
            >
              {t('LOGIN.LOGIN')}
            </Button>
          </Form.Item>
          <div className='col-span-2 text-center italic text-gray-500 my-2'>{t('LOGIN.OR')}</div>

          <Form.Item className='col-span-2'>
            <Button
              onClick={handleGoogleLogin}
              className='w-full h-[3.75rem] font-semibold text-gray-700 rounded-md hover:bg-gray-100 transition duration-300'
            >
              <Image
                src={GoogleIcon}
                alt='Google Icon'
                preview={false}
                className='!w-5 !h-5 mr-2'
              />
              {t('LOGIN.LOGIN_WITH_GOOGLE')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
