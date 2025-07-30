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
    const { fullName, email, password } = values;
    const phoneNumberWithoutBracket = values.phoneNumber?.replace('(', '').replace(')', '');
    registerUser({ fullName, email, phoneNumber: phoneNumberWithoutBracket, password });
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
    <div className='flex justify-center min-h-screen px-4 py-6 md:py-0' id='container-sign-up'>
      <div className='w-full max-w-md md:max-w-2xl lg:w-4/5 h-full'>
        <button
          onClick={handleOnClickHomePage}
          className='bg-transparent cursor-pointer w-auto mb-4 md:mb-0'
          type='button'
        >
          <Link
            className='flex items-center text-primary-gray justify-start text-base md:text-lg !mb-3 md:!mb-5 hover:text-primary-light cursor-pointer'
            to={'/'}
          >
            <div className='flex items-center justify-center mr-2'>
              <LeftOutlined className='text-sm md:text-base' />
            </div>
            {t('LOGIN.BACK_TO_HOME')}
          </Link>
        </button>

        <div className='mb-6 mt-4 lg:mt-3 md:mb-8 md:mt-32'>
          <h1 className='text-2xl md:text-[40px] !text-primary font-bold mb-3 md:mb-4'>
            {t<string>('SIGN_UP.TITLE')}
          </h1>
          <div className='text-base md:text-lg !mb-6 md:!mb-8 flex flex-col sm:flex-row gap-1 sm:gap-2'>
            <div className='text-primary-gray'>{t<string>('SIGN_UP.HAVE_ACCOUNT')}</div>
            <div
              className='text-primary-bold font-bold cursor-pointer underline hover:!text-primary-light bg-transparent border-none outline-none hover:no-underline'
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
          className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-2'
          validateTrigger={['onChange', 'onBlur']}
        >
          <Form.Item name='fullName' rules={validator}>
            <Input
              className='w-full !px-4 md:!px-6 !py-3 md:!py-4 !rounded-md !text-base md:!text-lg'
              placeholder={t('SIGN_UP.FULL_NAME') as string}
            />
          </Form.Item>
          <Form.Item name='phoneNumber' rules={validator}>
            <PhoneInput
              className='w-full h-[50px] md:h-[62px]'
              placeholder={t('SIGN_UP.PHONE') as string}
            />
          </Form.Item>
          <Form.Item className='md:col-span-2' name='email' rules={validator}>
            <Input
              className='w-full !px-4 md:!px-6 !py-3 md:!py-4 !rounded-md !text-base md:!text-lg'
              placeholder={t('SIGN_UP.EMAIL') as string}
            />
          </Form.Item>
          <Form.Item className='md:col-span-2' name='password' rules={validator}>
            <Input.Password
              onChange={handlePasswordChange}
              className='w-full !px-4 md:!px-6 !py-3 md:!py-4 !rounded-md !text-base md:!text-lg'
              placeholder={t<string>('SIGN_UP.PASSWORD')}
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
          <Form.Item
            className='md:col-span-2'
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
              className='w-full !px-4 md:!px-6 !py-3 md:!py-4 !rounded-md !text-base md:!text-lg'
              placeholder={t<string>('PROFILE.PLACEHOLDER_CONFIRM_PASSWORD')}
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

          <div className='md:col-span-2 text-sm md:text-base text-[#686868] space-y-2'>
            <div
              className={`flex gap-2 items-start ${
                isLengthValid ? 'text-green-500' : 'text-primary-gray'
              }`}
            >
              <CheckOutlined className='mt-0.5 flex-shrink-0' />
              <div>{t<string>('SIGN_UP.PASSWORD_REQUIREMENT')}</div>
            </div>
            <div
              className={`flex gap-2 items-start ${
                isComplexValid ? 'text-green-500' : 'text-primary-gray'
              }`}
            >
              <CheckOutlined className='mt-0.5 flex-shrink-0' />
              <div>{t<string>('SIGN_UP.PASSWORD_COMPLEXITY')}</div>
            </div>
            <div className='flex gap-2 items-start !mt-4 md:!mt-6 !text-sm md:!text-base'>
              <Checkbox onChange={handleCheckboxChange} className='mt-0.5 flex-shrink-0' />
              <div className='leading-relaxed'>
                {parse(
                  t<string>('SIGN_UP.AGREE_TERMS', {
                    terms: `<a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" style="text-decoration: underline; color: #A22D00;">${t<string>(
                      'SIGN_UP.TERMS',
                    )}</a>`,
                    privacy: `<a href="/privacy-policy" target="_blank" rel="noopener noreferrer" style="text-decoration: underline; color: #A22D00;">${t<string>(
                      'SIGN_UP.PRIVACY',
                    )}</a>`,
                    company: t('SIGN_UP.COMPANY'),
                  }),
                )}
              </div>
            </div>
          </div>

          <Form.Item className='md:col-span-2 !mt-6'>
            <Button
              htmlType='submit'
              className='w-full h-12 md:h-[3.75rem] !bg-primary-bold text-sm md:text-[1rem] !text-white font-bold !border-none !outline-none !rounded-md hover:!bg-primary-light hover:!text-white transition duration-300'
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
