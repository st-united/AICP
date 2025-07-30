import { LeftOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Form, Input, Image } from 'antd';
import { Rule } from 'antd/lib/form';
import { signInWithPopup } from 'firebase/auth';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';

import { useSignInSchema } from './signInSchema';
import { auth, provider } from '../../config/firebase';
import { GoogleIcon } from '@app/assets/svgs';
import { NAVIGATE_URL } from '@app/constants';
import { yupSync } from '@app/helpers/yupSync';
import { useActivateAccount, useLogin, useLoginWithGoogle } from '@app/hooks';
import { Credentials, GoogleCredentials } from '@app/interface/user.interface';

import './SignIn.scss';

const SignIn = () => {
  const { mutate: loginUser } = useLogin();
  const { mutate: loginWithGoogle } = useLoginWithGoogle();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const signInSchema = useSignInSchema();

  const { mutate: activateAccount } = useActivateAccount();
  const hasActivated = useRef(false);

  useEffect(() => {
    if (hasActivated.current) return;

    const searchParams = new URLSearchParams(window.location.search);
    const activateToken = searchParams.get('activateToken');
    const email = searchParams.get('email');

    if (activateToken && email) {
      activateAccount({ activateToken, email });
      hasActivated.current = true;
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
    <div id='container-sign-in' className='flex justify-center min-h-screen px-4 py-6 md:py-0'>
      <div className='w-full max-w-md md:max-w-2xl lg:w-4/5 h-full'>
        <button
          onClick={handleOnClickHomePage}
          className='bg-transparent cursor-pointer w-auto mb-4 md:mb-0'
          type='button'
        >
          <Link
            className='flex text-primary-gray items-center justify-start text-base md:text-lg !mb-3 md:!mb-5 hover:text-primary-light cursor-pointer'
            to={'/'}
          >
            <div className='flex items-center justify-center mr-2'>
              <LeftOutlined className='text-sm md:text-base' />
            </div>
            {t('LOGIN.BACK_TO_HOME')}
          </Link>
        </button>
        <div className='mb-6 mt-20 md:mb-8 md:mt-40'>
          <h1 className='text-2xl md:text-[40px] !text-primary font-bold mb-3 md:mb-4'>
            {t<string>('LOGIN.TEXT')}
          </h1>
        </div>
        <Form form={form} layout='vertical' onFinish={onFinish} className='w-full space-y-4'>
          <Form.Item name='email' rules={validator} className='mb-4'>
            <Input
              className='w-full !px-4 md:!px-6 !py-3 md:!py-4 !rounded-md !text-base md:!text-lg'
              placeholder={t('PLACEHOLDER.FIELD_REQUIRED', { field: t('LOGIN.EMAIL') }) ?? ''}
            />
          </Form.Item>
          <Form.Item name='password' rules={validator} className='mb-4'>
            <Input.Password
              className='w-full !px-4 md:!px-6 !py-3 md:!py-4 !rounded-md !text-base md:!text-lg'
              placeholder={t('PLACEHOLDER.FIELD_REQUIRED', { field: t('LOGIN.PASSWORD') }) ?? ''}
              iconRender={(visible) =>
                visible ? (
                  <EyeOutlined className='text-base md:text-lg' style={{ color: '#69c0ff' }} />
                ) : (
                  <EyeInvisibleOutlined
                    className='text-base md:text-lg'
                    style={{ color: '#69c0ff' }}
                  />
                )
              }
            />
          </Form.Item>
          <div className='text-base md:text-lg text-white flex justify-between items-center mb-4'>
            <button className='cursor-pointer'>
              <Link
                className='text-primary-bold font-bold cursor-pointer underline hover:!text-primary-light bg-transparent border-none outline-none'
                to={'/register'}
              >
                {t('LOGIN.REGISTER')}
              </Link>
            </button>
            <button className='cursor-pointer'>
              <Link
                to={NAVIGATE_URL.FORGOT_PASSWORD}
                className='text-primary-bold font-bold underline hover:!text-primary-light transition duration-300'
              >
                {t('LOGIN.FORGOT_PASSWORD')}
              </Link>
            </button>
          </div>
          <Form.Item className='!mt-6'>
            <Button
              type='primary'
              htmlType='submit'
              className='w-full h-12 md:h-[3.75rem] !bg-primary-bold text-sm md:text-[1rem] text-white font-bold !border-none !outline-none !rounded-md hover:!bg-primary-light hover:text-black transition duration-300'
            >
              {t('LOGIN.LOGIN')}
            </Button>
          </Form.Item>
          <div className='text-center italic text-gray-500 my-4 md:my-6 text-sm md:text-base'>
            {t('LOGIN.OR')}
          </div>

          <Form.Item>
            <Button
              onClick={handleGoogleLogin}
              className='w-full h-12 md:h-[3.75rem] font-semibold text-gray-700 rounded-md hover:bg-gray-100 transition duration-300 text-sm md:text-base flex items-center justify-center'
            >
              <Image
                src={GoogleIcon}
                alt='Google Icon'
                preview={false}
                className='!w-5 !h-5 md:!w-7 md:!h-7 mr-2 md:mr-3'
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
