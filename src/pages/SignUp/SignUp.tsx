import { Button, Checkbox, Form, Input } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { Rule } from 'antd/lib/form';
import parse from 'html-react-parser';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LuCheck, LuChevronLeft, LuEye, LuEyeClosed } from 'react-icons/lu';

import { useSignUpSchema } from './signUpSchema';
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

  const handleCheckboxChange = (e: CheckboxChangeEvent) => {
    setIsChecked(e.target.checked);
  };

  const onFinish = (values: RegisterUser) => {
    const { fullName, email, phoneNumber, password } = values;
    registerUser({ fullName, email, phoneNumber, password });
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
    <div className='flex justify-center'>
      <div className='w-full md:w-4/5 h-full'>
        <div className='flex item-center justify-start text-[#B2B2B2] text-lg !mb-8'>
          <div className='flex items-center justify-center'>
            <LuChevronLeft size={24} />
          </div>
          {t<string>('SIGN_UP.BACK_TO_HOME')}
        </div>
        <div>
          <h1 className='text-[40px] !text-white font-bold'>{t<string>('SIGN_UP.TITLE')}</h1>
          <div className='text-white text-lg !mb-4 flex gap-2'>
            <div>{t<string>('SIGN_UP.HAVE_ACCOUNT')}</div>
            <div className='text-[#1890FF] cursor-pointer underline'>{t<string>('LOGIN.TEXT')}</div>
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
              className='w-full !px-6 !py-4 !border-none !outline-none !rounded-md !text-lg'
              placeholder={t<string>('SIGN_UP.FULL_NAME')}
            />
          </Form.Item>
          <Form.Item className='md:col-span-1 col-span-2' name='phoneNumber' rules={validator}>
            <Input
              className='w-full !px-6 !py-4 !border-none !outline-none !rounded-md !text-lg'
              placeholder={t<string>('SIGN_UP.PHONE')}
            />
          </Form.Item>
          <Form.Item className='col-span-2' name='email' rules={validator}>
            <Input
              className='w-full !px-6 !py-4 !border-none !outline-none !rounded-md !text-lg'
              placeholder={t<string>('SIGN_UP.EMAIL')}
            />
          </Form.Item>
          <Form.Item className='col-span-2' name='password' rules={validator}>
            <Input.Password
              onChange={handlePasswordChange}
              className='col-span-2 w-full !bg-[#1955A0] !px-6 !py-4 !border-none !outline-none !rounded-md !text-lg'
              placeholder={t<string>('SIGN_UP.PASSWORD')}
              iconRender={(visible) =>
                visible ? (
                  <LuEye color='#69c0ff' size={24} />
                ) : (
                  <LuEyeClosed color='#69c0ff' size={24} />
                )
              }
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
                    new Error(
                      t<string>('VALIDATE.MATCH', { field: t<string>('SIGN_UP.PASSWORD') }),
                    ),
                  );
                },
              }),
              ...validator,
            ]}
          >
            <Input.Password
              className='col-span-2 w-full !bg-[#1955A0] !px-6 !py-4 !border-none !outline-none !rounded-md !text-lg'
              placeholder={t<string>('PROFILE.PLACEHOLDER_CONFIRM_PASSWORD')}
              iconRender={(visible) =>
                visible ? (
                  <LuEye color='#69c0ff' size={24} />
                ) : (
                  <LuEyeClosed color='#69c0ff' size={24} />
                )
              }
            />
          </Form.Item>

          <div className='col-span-2 text-lg text-white'>
            <div className={`flex gap-2 ${isLengthValid ? 'text-green-500' : 'text-white'}`}>
              <div>
                <LuCheck size={24} />
              </div>
              <div>{t<string>('SIGN_UP.PASSWORD_REQUIREMENT')}</div>
            </div>
            <div className={`flex gap-2 ${isComplexValid ? 'text-green-500' : 'text-white'}`}>
              <div>
                <LuCheck size={24} />
              </div>
              <div>{t<string>('SIGN_UP.PASSWORD_COMPLEXITY')}</div>
            </div>
            <div className='flex gap-2 !mt-6 !text-[16px]'>
              <Checkbox onChange={handleCheckboxChange} />
              <div>
                {parse(
                  t<string>('SIGN_UP.AGREE_TERMS', {
                    terms: `<a href="/terms" style="text-decoration: underline;">${t<string>(
                      'SIGN_UP.TERMS',
                    )}</a>`,
                    privacy: `<a href="/privacy" style="text-decoration: underline;">${t<string>(
                      'SIGN_UP.PRIVACY',
                    )}</a>`,
                    company: t<string>('SIGN_UP.COMPANY'),
                  }),
                )}
              </div>
            </div>
          </div>

          <Form.Item className='col-span-2 !mt-2'>
            <Button
              htmlType='submit'
              className='w-full !bg-[#1890FF] !h-13 !text-[16px] !font-bold !border-none !outline-none !rounded-md !text-white'
              loading={isLoading}
              disabled={!isChecked}
            >
              {t<string>('SIGN_UP.CREATE_ACCOUNT')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
