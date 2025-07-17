import { CheckOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useChangePasswordSchema } from './changePasswordSchema';
import { Lock } from '@app/assets/images';
import {
  NUMBER_LENGTH_REGEX,
  PASSWORD_REGEX_PATTERN_WITHOUT_NUMBER_LIMIT_AND_SPECIAL_CHARACTER,
} from '@app/constants/regex';
import { yupSync } from '@app/helpers/yupSync';
import { useChangePassword } from '@app/hooks';
import { ChangePassword } from '@app/interface/user.interface';
import type { Rule } from 'antd/lib/form';
import './changePassword.scss';

const PasswordChangeForm = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { mutate: changePassword, isLoading } = useChangePassword();
  const changePasswordSchema = useChangePasswordSchema();

  const onFinish = (values: ChangePassword) => {
    const { oldPassword, newPassword, confirmPassword } = values;
    changePassword({ oldPassword, newPassword, confirmPassword });
  };

  const values = Form.useWatch([], form); // Watch all form values

  const isLengthValid = useMemo(() => {
    return (
      NUMBER_LENGTH_REGEX.test(values?.newPassword || '') &&
      NUMBER_LENGTH_REGEX.test(values?.confirmPassword || '')
    );
  }, [values]);

  const isComplexValid = useMemo(() => {
    return (
      PASSWORD_REGEX_PATTERN_WITHOUT_NUMBER_LIMIT_AND_SPECIAL_CHARACTER.test(
        values?.newPassword || '',
      ) &&
      PASSWORD_REGEX_PATTERN_WITHOUT_NUMBER_LIMIT_AND_SPECIAL_CHARACTER.test(
        values?.confirmPassword || '',
      )
    );
  }, [values]);

  const validator = [yupSync(changePasswordSchema)] as unknown as Rule[];

  return (
    <div className='flex justify-center w-full h-full' id='change-password-form'>
      <div className='w-full max-w-full bg-white rounded-2xl p-6 shadow flex flex-col items-center'>
        {/* Lock image */}
        <div className='flex justify-center'>
          <div className='bg-blue-100 rounded-full p-4 sm:p-6'>
            <div className='bg-blue-200 rounded-full p-3 sm:p-4'>
              <img
                src={Lock}
                alt='Lock Icon'
                className='w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24'
              />
            </div>
          </div>
        </div>

        <Form
          form={form}
          layout='vertical'
          onFinish={onFinish}
          validateTrigger={['onChange', 'onBlur']}
          className='w-full md:w-full xl:w-1/2'
        >
          {/* Old Password */}
          <Form.Item
            label={<span className='text-base sm:text-lg'>{t('PROFILE.OLD_PASSWORD')}</span>}
            name='oldPassword'
            rules={validator}
            required
          >
            <Input.Password
              placeholder={t<string>('PROFILE.PLACEHOLDER_OLD_PASSWORD')}
              iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
              className='rounded-md px-4 py-3 sm:px-6 sm:py-4 text-base sm:text-lg'
            />
          </Form.Item>

          {/* New Password */}
          <Form.Item
            label={<span className='text-base sm:text-lg'>{t('PROFILE.NEW_PASSWORD')}</span>}
            name='newPassword'
            rules={validator}
            required
          >
            <Input.Password
              placeholder={t<string>('PROFILE.PLACEHOLDER_NEW_PASSWORD')}
              iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
              onCopy={(e) => e.preventDefault()}
              className='rounded-md px-4 py-3 sm:px-6 sm:py-4 text-base sm:text-lg'
            />
          </Form.Item>

          {/* Confirm Password */}
          <Form.Item
            label={<span className='text-base sm:text-lg'>{t('PROFILE.CONFIRM_PASSWORD')}</span>}
            name='confirmPassword'
            dependencies={['newPassword']}
            required
            rules={[
              {
                required: true,
                message: t<string>('VALIDATE.REQUIRED', { field: t('PROFILE.CONFIRM_PASSWORD') }),
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(t<string>('VALIDATE.MATCH', { field: t('PROFILE.NEW_PASSWORD') })),
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder={t<string>('PROFILE.PLACEHOLDER_CONFIRM_PASSWORD')}
              iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
              className='rounded-md px-4 py-3 sm:px-6 sm:py-4 text-base sm:text-lg'
              onPaste={(e) => e.preventDefault()}
            />
          </Form.Item>

          {/* Password Requirements */}
          <div className='text-lg sm:text-base text-[#8B8B8B] mb-4'>
            <div className={`flex gap-2 ${isLengthValid ? 'text-green-500' : 'text-grey'}`}>
              <div>
                <CheckOutlined style={{ fontSize: '24px' }} />
              </div>
              <div>{t<string>('PROFILE.PASSWORD_REQUIREMENT')}</div>
            </div>
            <div className={`flex gap-2 ${isComplexValid ? 'text-green-500' : 'text-grey'}`}>
              <div>
                <CheckOutlined style={{ fontSize: '24px' }} />
              </div>
              <div>{t<string>('PROFILE.PASSWORD_COMPLEXITY')}</div>
            </div>
          </div>

          {/* Submit Button */}
          <Form.Item className='flex justify-center'>
            <Button
              htmlType='submit'
              className='w-full px-8 sm:px-12 md:px-14 bg-[#60a5fa] hover:!bg-[#2563eb] hover:!border-[#2563eb] h-12 text-base sm:text-lg rounded-full text-white hover:!text-white font-bold'
              loading={isLoading}
            >
              {t('PROFILE.SAVE')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default PasswordChangeForm;
