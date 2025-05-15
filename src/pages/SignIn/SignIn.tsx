import { LeftOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { Rule } from 'antd/lib/form';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';

import { useSignInSchema } from './signInSchema';
import { yupSync } from '@app/helpers/yupSync';
import { useLogin } from '@app/hooks';
import { Credentials } from '@app/interface/user.interface';

import './SignIn.scss';

const SignIn = () => {
  const { mutate: loginUser } = useLogin();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const signInSchema = useSignInSchema();

  const onFinish = (values: Credentials) => {
    loginUser(values);
  };
  const handleOnClickHomePage = () => {
    navigate('/');
  };

  const validator = [yupSync(signInSchema)] as unknown as Rule[];

  return (
    <div id='container-sign-in' className='flex justify-center'>
      <div className='w-full md:w-4/5 h-full'>
        <button
          onClick={handleOnClickHomePage}
          className='bg-transparent border-0 p-0 m-0 text-inherit cursor-pointer w-auto'
          type='button'
        >
          <Link
            className='flex items-center justify-start text-[#B2B2B2] text-lg !mb-14 hover:text-[#1890FF] cursor-pointer'
            to={'/'}
          >
            <div className='flex items-center justify-center'>
              <LeftOutlined size={24} />
            </div>
            {t<string>('LOGIN.BACK_TO_HOME')}
          </Link>
        </button>
        <div>
          <h1 className='text-[40px] !text-white font-bold'>{t<string>('LOGIN.TEXT')}</h1>
          <p className='text-white text-lg !mb-8 flex gap-2'>
            <div>{t<string>('LOGIN.NOT_HAVE_ACCOUNT')}</div>
            <Link
              className='!text-[#1890FF] cursor-pointer underline hover:!text-[#0056b3] bg-transparent border-none outline-none'
              to={'/register'}
            >
              {t<string>('LOGIN.REGISTER')}
            </Link>
          </p>
        </div>
        <Form
          form={form}
          layout='vertical'
          onFinish={onFinish}
          className='grid grid-cols-2 gap-4 gap-1'
        >
          <Form.Item className='col-span-2' name='email' rules={validator}>
            <Input
              className='w-full !px-6 !py-4 !border-none !outline-none !rounded-md !text-lg'
              placeholder={t<string>('LOGIN.EMAIL')}
            />
          </Form.Item>
          <Form.Item className='col-span-2' name='password' rules={validator}>
            <Input.Password
              className='col-span-2 w-full !bg-[#1955A0] !px-6 !py-4 !border-none !outline-none !rounded-md !text-lg'
              placeholder={t<string>('LOGIN.PASSWORD')}
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
              className='!text-[#1890FF] cursor-pointer underline hover:!text-[#0056b3]'
              onClick={() => navigate('/forgot-password')}
            >
              {t<string>('LOGIN.FORGOT_PASSWORD')}
            </button>
          </div>
          <Form.Item className='col-span-2 !mt-2'>
            <Button
              type='primary'
              htmlType='submit'
              className='w-full !bg-[#1890FF] !h-13 !text-[16px] !font-bold !border-none !outline-none !rounded-md !text-white'
            >
              {t<string>('LOGIN.LOGIN')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
