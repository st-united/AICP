import { Button, Input, message, Typography, Alert, Space, Select } from 'antd';
import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import OTPInput from '@app/components/atoms/OTPInput/OTPInput';
import { PHONE_REGEX_PATTERN } from '@app/constants/regex';
import { useUpdateProfile } from '@app/hooks/useProfile';
import { useSendOtp, useVerifyOtp, useCallingCode, useCheckOtpStatus } from '@app/hooks/useZaloOtp';
import { RootState } from '@app/redux/store';
import './OTPVerification.scss';
const { Title, Text } = Typography;

interface OTPVerificationProps {
  onSuccess?: () => void;
  onBack?: () => void;
  showTitle?: boolean;
  showBackButton?: boolean;
  className?: string;
}

enum LocalStep {
  CONFIRM_PHONE = 'CONFIRM_PHONE',
  UPDATE_PHONE = 'UPDATE_PHONE',
  OTP = 'OTP',
  VERIFIED = 'VERIFIED',
}

export const OTPVerification = ({
  onSuccess,
  showTitle = true,
  className,
}: OTPVerificationProps) => {
  const { t } = useTranslation();
  const { user } = useSelector((state: RootState) => state.auth);
  const [localStep, setLocalStep] = useState<LocalStep>(LocalStep.CONFIRM_PHONE);
  const [phone, setPhone] = useState(user?.phoneNumber || '');
  const [newPhone, setNewPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState('');
  const { data: CallingCode } = useCallingCode();
  const [selectedCallingCode, setSelectedCallingCode] = useState('+84');
  const { mutate: sendOtpMutation } = useSendOtp();
  const { mutate: verifyOtpMutation, isPending: isVerifyingOtp } = useVerifyOtp();
  const { mutate: updateProfileMutation, isPending: isUpdatingProfile } = useUpdateProfile();
  const { data: checkOtpStatus } = useCheckOtpStatus();
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);
  useEffect(() => {
    if (checkOtpStatus) {
      setLocalStep(LocalStep.VERIFIED);
    }
  }, [checkOtpStatus]);
  const maskPhone = (phone: string) => {
    if (!phone) return '';
    return phone.slice(0, -4) + '****';
  };

  const handleConfirmPhone = () => {
    setLocalStep(LocalStep.OTP);
    handleSendOtp(phone);
  };

  const handleUpdatePhone = () => {
    if (!newPhone) {
      message.error(t('OTP.PHONE_REQUIRED'));
      return;
    }
    const fullPhone = selectedCallingCode + newPhone;
    if (!PHONE_REGEX_PATTERN.test(fullPhone)) {
      message.error(t('OTP.PHONE_INVALID'));
      return;
    }
    setIsUpdating(true);
    updateProfileMutation(
      {
        fullName: user?.fullName || '',
        email: user?.email || '',
        referralCode: user?.referralCode || '',
        phoneNumber: fullPhone,
        dob: user?.dob,
        avatar: user?.avatar,
        permissions: user?.permissions,
        province: user?.province,
        job: user?.job,
      },
      {
        onSuccess: () => {
          setPhone(fullPhone);
          setLocalStep(LocalStep.OTP);
          setIsUpdating(false);
          setNewPhone('');
          handleSendOtp(fullPhone);
          message.success(t('PROFILE.UPDATE_SUCCESS'));
        },
        onError: () => {
          setIsUpdating(false);
          message.error(t('PROFILE.UPDATE_FAILED'));
        },
      },
    );
  };

  const handleSendOtp = (targetPhone: string) => {
    if (!targetPhone) {
      message.error(t('OTP.PHONE_REQUIRED'));
      return;
    }
    sendOtpMutation(targetPhone, {
      onSuccess: () => {
        setCountdown(60);
        setOtp('');
        message.success(t('OTP.SEND_OTP_SUCCESS'));
      },
      onError: () => {
        message.error(t('OTP.SEND_OTP_ERROR'));
      },
    });
  };

  const handleVerifyOtp = useCallback(() => {
    if (!otp) {
      message.error(t('OTP.OTP_REQUIRED'));
      return;
    }
    setIsVerifying(true);
    verifyOtpMutation(
      { phone, otp },
      {
        onSuccess: () => {
          setIsVerifying(false);
          message.success(t('OTP.VERIFY_OTP_SUCCESS'));
          onSuccess?.();
        },
        onError: () => {
          setIsVerifying(false);
          setError(t('OTP.OTP_INVALID') as string);
        },
      },
    );
  }, [otp, phone, t, verifyOtpMutation, onSuccess]);

  const handleResendOtp = () => {
    if (countdown > 0) return;
    handleSendOtp(phone);
  };

  const handleBackToConfirm = () => {
    setLocalStep(LocalStep.CONFIRM_PHONE);
    setOtp('');
    setCountdown(0);
    setError('');
  };

  useEffect(() => {
    if (otp.length === 6) {
      handleVerifyOtp();
    }
  }, [otp, handleVerifyOtp]);

  return (
    <div className={`${className} w-full flex flex-col items-center justify-center`}>
      {showTitle && (
        <div className='text-center'>
          <Title level={3}>{t('OTP.TITLE')}</Title>
        </div>
      )}

      {localStep === LocalStep.CONFIRM_PHONE && (
        <Space direction='vertical' size='large' className='w-full'>
          <Alert
            message={t('OTP.DESCRIPTION')}
            description={
              <>
                <div>
                  <b>{t('USER.PHONE')}:</b> {maskPhone(phone)}
                </div>
                <div className='mt-2'>
                  <Button type='primary' onClick={handleConfirmPhone} block size='large'>
                    {t('BUTTON.CONFIRM')}
                  </Button>
                  <Button onClick={() => setLocalStep(LocalStep.UPDATE_PHONE)} block size='large'>
                    {t('BUTTON.UPDATE')}
                  </Button>
                </div>
              </>
            }
            type='info'
            showIcon
          />
        </Space>
      )}

      {localStep === LocalStep.UPDATE_PHONE && (
        <Space direction='vertical' size='large' className='w-full phone-input'>
          <div className='text-center'>
            <Title level={4}>{t('OTP.UPDATE_PHONE_TITLE')}</Title>
          </div>

          <div className='w-full items-center gap-2 phone-input flex justify-center'>
            <Select
              showSearch
              value={selectedCallingCode}
              onChange={setSelectedCallingCode}
              filterOption={(input, option) => {
                const value = String(option?.key ?? '').toLowerCase();
                return value.includes(input);
              }}
              className='phone-input'
              optionLabelProp='label'
            >
              {(
                CallingCode || [
                  { dialCode: '+84', name: 'Vietnam', flag: 'https://flagcdn.com/w320/vn.png' },
                ]
              ).map((item) => (
                <Select.Option
                  key={item.dialCode + item.name}
                  value={item.dialCode}
                  label={
                    <div className='flex items-center flex-row w-full'>
                      <img
                        style={{ marginRight: 8 }}
                        src={item.flag}
                        alt={item.name}
                        className='w-4'
                      />
                      <span>{item.name}</span>
                      <span style={{ marginLeft: 8, color: '#888' }}>({item.dialCode})</span>
                    </div>
                  }
                >
                  <div className='flex items-center flex-row w-full'>
                    <img
                      style={{ marginRight: 8 }}
                      src={item.flag}
                      alt={item.name}
                      className='w-4'
                    />
                    <span>{item.name}</span>
                    <span style={{ marginLeft: 8, color: '#888' }}>({item.dialCode})</span>
                  </div>
                </Select.Option>
              ))}
            </Select>
            <Input
              placeholder={t('OTP.PHONE_PLACEHOLDER') as string}
              value={newPhone}
              type='tel'
              onChange={(e) => setNewPhone(e.target.value)}
              disabled={isUpdating}
              size='large'
              style={{ minWidth: 0 }}
            />
          </div>
          <Button
            type='primary'
            onClick={handleUpdatePhone}
            loading={isUpdating}
            block
            size='large'
          >
            {t('BUTTON.SAVE')}
          </Button>
          <Button onClick={handleBackToConfirm} disabled={isUpdating} block size='large'>
            {t('BUTTON.BACK')}
          </Button>
        </Space>
      )}

      {localStep === LocalStep.OTP && (
        <Space direction='vertical' size='large' className='w-full'>
          <Alert
            message={t('OTP.PHONE_VERIFIED')}
            description={t('OTP.PHONE_VERIFIED_DESC', { phone: maskPhone(phone) })}
            type='info'
            showIcon
          />
          <div>
            <Text type='secondary'>{t('OTP.OTP_PLACEHOLDER')}</Text>
            <OTPInput value={otp} setValue={setOtp} />
            {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
          </div>
          <Space direction='vertical' size='small' className='w-full'>
            <Button
              type='primary'
              onClick={handleVerifyOtp}
              loading={isVerifying || isVerifyingOtp}
              block
              size='large'
            >
              {t('OTP.VERIFY_OTP')}
            </Button>
            <Button
              onClick={handleResendOtp}
              disabled={countdown > 0 || isVerifying || isVerifyingOtp}
              block
              size='large'
            >
              {countdown > 0 ? t('OTP.COUNTDOWN', { time: countdown }) : t('OTP.RESEND_OTP')}
            </Button>
            <Button
              onClick={handleBackToConfirm}
              disabled={isVerifying || isVerifyingOtp}
              type='link'
            >
              {t('OTP.BACK_TO_PHONE')}
            </Button>
          </Space>
        </Space>
      )}
      {localStep === LocalStep.VERIFIED && (
        <Space direction='vertical' size='large' className='w-full'>
          <Alert
            message={t('OTP.PHONE_VERIFIED')}
            description={t('OTP.PHONE_VERIFIED_DESC', { phone: maskPhone(phone) })}
            type='info'
            showIcon
          />
        </Space>
      )}
    </div>
  );
};
