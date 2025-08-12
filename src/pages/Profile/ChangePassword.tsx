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
    return NUMBER_LENGTH_REGEX.test(values?.newPassword || '');
  }, [values]);

  const isComplexValid = useMemo(() => {
    return PASSWORD_REGEX_PATTERN_WITHOUT_NUMBER_LIMIT_AND_SPECIAL_CHARACTER.test(
      values?.newPassword || '',
    );
  }, [values]);

  const isFormValid = useMemo(() => {
    if (!values) return false;

    const { oldPassword, newPassword, confirmPassword } = values;
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length > 0);
    const isNewPasswordDifferent = newPassword && oldPassword && newPassword !== oldPassword;
    const isPasswordMatch = newPassword === confirmPassword;

    return !hasErrors && isPasswordMatch && isNewPasswordDifferent;
  }, [form, values]);

  const validator = [yupSync(changePasswordSchema)] as unknown as Rule[];

  return (
    <div className='flex justify-center w-full h-full' id='change-password-form'>
      <div className='w-full max-w-full bg-white rounded-2xl shadow flex flex-col items-center overflow-y-auto'>
        <div className='flex justify-center my-5 sm:mt-4 sm:mb-0'>
          <div className='bg-blue-100 rounded-full p-3 sm:p-4'>
            <div className='bg-blue-200 rounded-full  p-2 sm:p-3'>
              <img
                src={Lock}
                alt='Lock Icon'
                className='w-12 h-12 sm:w-14 sm:h-14s md:w-16 md:h-16'
              />
            </div>
          </div>
        </div>
        <Form
          form={form}
          layout='vertical'
          onFinish={onFinish}
          validateTrigger={['onChange', 'onBlur']}
          className='w-full lg:w-2/3 xl:w-1/2 px-5 sm:px-6 md:px-8 box-border space-y-7 sm:space-y-0'
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
              className='input-custom'
            />
          </Form.Item>

          {/* New Password */}
          <Form.Item
            label={<span className='text-base sm:text-lg'>{t('PROFILE.NEW_PASSWORD')}</span>}
            name='newPassword'
            rules={[
              ...validator,
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const oldPassword = getFieldValue('oldPassword');
                  if (!value || value !== oldPassword) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(t<string>('VALIDATE.NEW_PASSWORD_DIFFERENT')));
                },
              }),
            ]}
            required
          >
            <Input.Password
              placeholder={t<string>('PROFILE.PLACEHOLDER_NEW_PASSWORD')}
              iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
              onCopy={(e) => e.preventDefault()}
              className='input-custom'
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
              className='input-custom'
              onPaste={(e) => e.preventDefault()}
            />
          </Form.Item>

          {/* Password Requirements */}
          <div className='text-base text-gray-600 flex flex-col gap-y-2 !mt-4 !mb-2'>
            <div className={`flex gap-2 ${isLengthValid ? 'text-green-500' : 'text-grey'}`}>
              <div>
                <CheckOutlined className='text-[1.2rem]' />
              </div>
              <div>{t<string>('PROFILE.PASSWORD_REQUIREMENT')}</div>
            </div>
            <div className={`flex gap-2 ${isComplexValid ? 'text-green-500' : 'text-grey'}`}>
              <div>
                <CheckOutlined className='text-[1.2rem]' />
              </div>
              <div>{t<string>('PROFILE.PASSWORD_COMPLEXITY')}</div>
            </div>
          </div>

          {/* Submit Button */}
          <Form.Item className='flex justify-center'>
            <Button
              htmlType='submit'
              className={`w-full px-8 sm:px-12 md:px-14 h-12 text-base sm:text-lg rounded-full text-white font-bold transition-colors duration-200
                ${
                  isFormValid
                    ? 'bg-[#2563eb] hover:!bg-[#2563eb] !border-[#2563eb] hover:!text-white'
                    : 'bg-[#60a5fa] hover:!bg-[#60a5fa] !border-[#60a5fa] hover:!text-white'
                }
              `}
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
