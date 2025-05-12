import { Button, Checkbox, Form, Input } from 'antd';
import parse from 'html-react-parser';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LuCheck, LuChevronLeft } from 'react-icons/lu';

import { useRegister } from '@app/hooks';
import { RegisterUser } from '@app/interface/user.interface';

const SignUp = () => {
  const [isLengthValid, setIsLengthValid] = useState(false);
  const [isComplexValid, setIsComplexValid] = useState(false);
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { mutate: registerUser, isLoading } = useRegister();

  const onFinish = (values: RegisterUser) => {
    console.log('Form Data:', values);
    const { fullName, email, phoneNumber, password } = values;
    registerUser({ fullName, email, phoneNumber, password });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIsLengthValid(value.length >= 8 && value.length <= 50);
    setIsComplexValid(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value));
  };

  return (
    <div className='flex justify-center'>
      <div className='w-full md:w-4/5 h-full'>
        <p className='flex item-center justify-start text-[#B2B2B2] text-lg !mb-14'>
          <div className='flex items-center justify-center'>
            <LuChevronLeft size={24} />
          </div>
          {t<string>('SIGN_UP.BACK_TO_HOME')}
        </p>
        <div>
          <h1 className='text-[40px] !text-white font-bold'>{t<string>('SIGN_UP.TITLE')}</h1>
          <p className='text-white text-lg !mb-8 flex gap-2'>
            <div>{t<string>('SIGN_UP.HAVE_ACCOUNT')}</div>
            <div className='text-[#1890FF] cursor-pointer underline'>{t<string>('LOGIN.TEXT')}</div>
          </p>
        </div>
        <Form form={form} layout='vertical' onFinish={onFinish} className='grid grid-cols-2 gap-4'>
          <Form.Item
            className='md:col-span-1 col-span-2'
            name='fullName'
            rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
          >
            <Input placeholder='Họ tên *' />
          </Form.Item>
          <Form.Item
            className='md:col-span-1 col-span-2'
            name='phoneNumber'
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
          >
            <Input className='' placeholder='Số điện thoại *' />
          </Form.Item>
          <Form.Item
            className='col-span-2'
            name='email'
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không đúng định dạng!' },
            ]}
          >
            <Input placeholder='Email *' />
          </Form.Item>
          <Form.Item
            className='col-span-2'
            name='password'
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password
              onChange={handlePasswordChange}
              className='col-span-2'
              placeholder='Mật khẩu *'
            />
          </Form.Item>
          <Form.Item
            className='col-span-2'
            name='confirm_password'
            dependencies={['password']}
            rules={[
              { required: true, message: 'Vui lòng nhập lại mật khẩu!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu nhập lại chưa đúng!'));
                },
              }),
            ]}
          >
            <Input.Password className='col-span-2' placeholder='Nhập lại mật khẩu *' />
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
              <Checkbox />
              <div>
                {parse(
                  t<string>('SIGN_UP.AGREE_TERMS', {
                    terms: `<a href="/terms" style="text-decoration: underline;">Điều khoản & Điều kiện</a>`,
                    privacy: `<a href="/privacy" style="text-decoration: underline;">Chính sách bảo mật</a>`,
                    company: 'DevPlus',
                  }),
                )}
              </div>

              <div></div>
            </div>
          </div>
          <Form.Item>
            <Button type='primary' htmlType='submit' className='w-full'>
              {t<string>('SIGN_UP.CREATE_ACCOUNT')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
