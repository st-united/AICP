import { CheckOutlined, EyeInvisibleOutlined, EyeOutlined, LeftOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { Rule } from 'antd/lib/form';
import parse from 'html-react-parser';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';

import { useSignUpSchema } from './signUpSchema';
import PhoneInput from '@app/components/atoms/PhoneInput/PhoneInput';
import {
  NUMBER_LENGTH_REGEX,
  PASSWORD_REGEX_PATTERN_WITHOUT_NUMBER_LIMIT_AND_SPECIAL_CHARACTER,
} from '@app/constants/regex';
import { yupSync } from '@app/helpers/yupSync';
import { useRegister } from '@app/hooks';
import { RegisterUser } from '@app/interface/user.interface';

import './SignUp.scss';

const SignUp = () => {
  const [isLengthValid, setIsLengthValid] = useState(false);
  const [isComplexValid, setIsComplexValid] = useState(false);
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { mutate: registerUser, isLoading } = useRegister();
  const [isChecked, setIsChecked] = useState(false);
  const signUpSchema = useSignUpSchema();
  const navigate = useNavigate();

  const handleCheckboxChange = (e: CheckboxChangeEvent) => {
    setIsChecked(e.target.checked);
  };

  const onFinish = (values: RegisterUser) => {
    const { fullName, email, phoneNumber, password } = values;
    registerUser({ fullName, email, phoneNumber, password });
  };

  const handleOnClickHomePage = () => {
    navigate('/');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIsLengthValid(NUMBER_LENGTH_REGEX.test(value));
    setIsComplexValid(
      PASSWORD_REGEX_PATTERN_WITHOUT_NUMBER_LIMIT_AND_SPECIAL_CHARACTER.test(value),
    );
  };

  const validator = [yupSync(signUpSchema)] as unknown as Rule[];

  return (
    <div className='flex justify-center' id='container-sign-up'>
      <div className='w-full md:w-4/5 h-full'>
        <button
          onClick={handleOnClickHomePage}
          className='bg-transparent cursor-pointer w-auto'
          type='button'
        >
          <Link
            className='flex items-center text-primary-gray justify-start text-lg !mb-14 hover:text-primary-light cursor-pointer'
            to={'/'}
          >
            <div className='flex items-center justify-center'>
              <LeftOutlined size={24} />
            </div>
            {t('LOGIN.BACK_TO_HOME')}
          </Link>
        </button>

        <div>
          <h1 className='text-[40px] !text-primary font-bold'>{t<string>('SIGN_UP.TITLE')}</h1>
          <div className='text-white text-lg !mb-4 flex gap-2'>
            <div className='text-primary-gray'>{t<string>('SIGN_UP.HAVE_ACCOUNT')}</div>
            <div
              className='text-primary-bold cursor-pointer underline hover:text-primary-light'
              onClick={() => navigate('/login')}
              aria-hidden='true'
            >
              {t<string>('LOGIN.LOGIN')}
            </div>
          </div>
        </div>
        <Form
          form={form}
          layout='vertical'
          onFinish={onFinish}
          className='grid grid-cols-2 md:gap-4 gap-1'
          validateTrigger={['onChange', 'onBlur']}
        >
          <Form.Item className='md:col-span-1 col-span-2' name='fullName' rules={validator}>
            <Input
              className='w-full !px-6 !py-4 !rounded-md !text-lg'
              placeholder={t('SIGN_UP.FULL_NAME') as string}
            />
          </Form.Item>
          <Form.Item className='md:col-span-1 col-span-2' name='phoneNumber' rules={validator}>
            <PhoneInput
              className='w-full h-[62px] ml-2'
              placeholder={t('SIGN_UP.PHONE') as string}
            />
          </Form.Item>
          <Form.Item className='col-span-2' name='email' rules={validator}>
            <Input
              className='w-full !px-6 !py-4 !rounded-md !text-lg'
              placeholder={t('SIGN_UP.EMAIL') as string}
            />
          </Form.Item>
          <Form.Item className='col-span-2' name='password' rules={validator}>
            <Input.Password
              onChange={handlePasswordChange}
              className='col-span-2 w-full !px-6 !py-4 !rounded-md !text-lg'
              placeholder={t<string>('SIGN_UP.PASSWORD')}
              iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>
          <Form.Item
            className='col-span-2'
            name='confirm_password'
            dependencies={['password']}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(String(t('VALIDATE.MATCH', { field: t('SIGN_UP.PASSWORD') }))),
                  );
                },
              }),
              ...validator,
            ]}
          >
            <Input.Password
              className='col-span-2 w-full !px-6 !py-4 !rounded-md !text-lg'
              placeholder={t<string>('PROFILE.PLACEHOLDER_CONFIRM_PASSWORD')}
              iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>

          <div className='col-span-2 text-lg text-[#686868]'>
            <div className={`flex gap-2 ${isLengthValid ? 'text-green-500' : 'text-primary-gray'}`}>
              <CheckOutlined />
              <div>{t<string>('SIGN_UP.PASSWORD_REQUIREMENT')}</div>
            </div>
            <div
              className={`flex gap-2 ${isComplexValid ? 'text-green-500' : 'text-primary-gray'}`}
            >
              <CheckOutlined />
              <div>{t<string>('SIGN_UP.PASSWORD_COMPLEXITY')}</div>
            </div>
            <div className='flex gap-2 !mt-6 !text-[16px]'>
              <Checkbox onChange={handleCheckboxChange} />
              <div>
                {parse(
                  t<string>('SIGN_UP.AGREE_TERMS', {
                    terms: `<a href="/terms-and-conditions" style="text-decoration: underline; color: #A22D00;">${t<string>(
                      'SIGN_UP.TERMS',
                    )}</a>`,
                    privacy: `<a href="/privacy-policy" style="text-decoration: underline; color: #A22D00;">${t<string>(
                      'SIGN_UP.PRIVACY',
                    )}</a>`,
                    company: t('SIGN_UP.COMPANY'),
                  }),
                )}
              </div>
            </div>
          </div>

          <Form.Item className='col-span-2 !mt-2'>
            <Button
              htmlType='submit'
              className='w-full h-[3.75rem] !bg-primary-bold text-[1rem] text-white font-bold !border-none !outline-none !rounded-md hover:!bg-primary-light hover:!text-black transition duration-300'
              loading={isLoading}
              disabled={!isChecked}
            >
              {t('SIGN_UP.CREATE_ACCOUNT')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
