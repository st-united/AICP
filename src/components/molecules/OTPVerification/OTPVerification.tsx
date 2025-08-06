import { Button, Typography, Alert, Space } from 'antd';
import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import OTPInput from '@app/components/atoms/OTPInput/OTPInput';
import PhoneInput from '@app/components/atoms/PhoneInput/PhoneInput';
import { PHONE_REGEX_PATTERN } from '@app/constants/regex';
import { useUpdateProfile } from '@app/hooks/useProfile';
import { useSendOtp, useVerifyOtp, useCheckOtpStatus, useCanSendOtp } from '@app/hooks/useZaloOtp';
import { RootState } from '@app/redux/store';
import { NotificationTypeEnum, openNotificationWithIcon } from '@app/components/atoms/notification';
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
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [error, setError] = useState('');

  const { mutate: sendOtpMutation } = useSendOtp();
  const { mutate: verifyOtpMutation, isPending: isVerifyingOtp } = useVerifyOtp();
  const { mutate: updateProfileMutation, isPending: isUpdatingProfile } = useUpdateProfile();
  const { data: checkOtpStatus } = useCheckOtpStatus();
  const { data: canSendOtpData } = useCanSendOtp();
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  useEffect(() => {
    if (canSendOtpData && !canSendOtpData.canSend && canSendOtpData.remainingSeconds) {
      setRemainingTime(canSendOtpData.remainingSeconds);
    }
  }, [canSendOtpData]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (remainingTime > 0) {
      timer = setTimeout(() => setRemainingTime(remainingTime - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [remainingTime]);
  useEffect(() => {
    if (checkOtpStatus?.zaloVerified === true) {
      setLocalStep(LocalStep.VERIFIED);
    }
  }, [checkOtpStatus]);
  const maskPhone = (phone: string) => {
    if (!phone) return '';
    return phone.slice(0, -4) + '****';
  };

  const handleUpdatePhone = () => {
    if (!phone) {
      openNotificationWithIcon(NotificationTypeEnum.ERROR, t('OTP.PHONE_REQUIRED'));
      return;
    }
    if (!PHONE_REGEX_PATTERN.test(phone)) {
      openNotificationWithIcon(NotificationTypeEnum.ERROR, t('OTP.PHONE_INVALID'));
      return;
    }
    const updatedPhone = phone.replace('(', '').replace(')', '');
    updateProfileMutation(
      {
        phoneNumber: updatedPhone,
      },
      {
        onSuccess: () => {
          setPhone(phone);
          setLocalStep(LocalStep.CONFIRM_PHONE);
        },
      },
    );
  };

  const handleSendOtp = () => {
    if (!phone) {
      openNotificationWithIcon(NotificationTypeEnum.ERROR, t('OTP.PHONE_REQUIRED'));
      return;
    }

    if (remainingTime > 0) {
      openNotificationWithIcon(
        NotificationTypeEnum.ERROR,
        t('OTP.CANNOT_SEND_OTP', { time: remainingTime }),
      );
      return;
    }

    sendOtpMutation(undefined, {
      onSuccess: () => {
        setCountdown(60);
        setOtp('');
        setLocalStep(LocalStep.OTP);
      },
    });
  };

  const handleVerifyOtp = useCallback(() => {
    if (!otp) {
      return;
    }
    verifyOtpMutation(otp, {
      onSuccess: () => {
        onSuccess?.();
      },
    });
  }, [otp, verifyOtpMutation, onSuccess]);

  const handleResendOtp = () => {
    if (countdown > 0 || remainingTime > 0) return;
    handleSendOtp();
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
    <div
      className={`${className} w-full h-full flex flex-col items-center align-middle justify-center`}
    >
      {showTitle && (
        <div className='text-center'>
          <Title level={3}>{t('OTP.TITLE')}</Title>
        </div>
      )}
      {}
      {localStep === LocalStep.CONFIRM_PHONE && (
        <Space direction='vertical' size='large' className='w-full'>
          <div className='text-center'>
            <Title level={4}>{t('OTP.DESCRIPTION')}</Title>
          </div>
          <div className='text-center text-xl p-1.5'>
            {phone ? (
              <>
                <b>{t('USER.PHONE')}:</b> {maskPhone(phone)}
              </>
            ) : (
              <>{t('OTP.PHONE_NULL')}</>
            )}
          </div>
          <div className='mt-2 flex-row gap-2 flex justify-center w-full'>
            <Button
              type='primary'
              className='w-full md:w-1/5 text-lg !p-6'
              onClick={() => handleSendOtp()}
              disabled={remainingTime > 0}
              loading={isUpdatingProfile}
            >
              {remainingTime > 0
                ? t('OTP.WAIT_TIME', { time: remainingTime })
                : t('OTP.CONFIRM_PHONE')}
            </Button>
            <Button
              className='w-full md:w-1/5 text-lg !p-6'
              onClick={() => setLocalStep(LocalStep.UPDATE_PHONE)}
            >
              {t('BUTTON.UPDATE')}
            </Button>
          </div>
        </Space>
      )}

      {localStep === LocalStep.UPDATE_PHONE && (
        <Space direction='vertical' size='large' className='w-full'>
          <div className='text-center'>
            <Title level={4}>{t('OTP.UPDATE_PHONE_TITLE')}</Title>
          </div>
          <div className='w-full sm:w-2/3 md:w-1/3 mx-auto'>
            <PhoneInput value={phone} onChange={setPhone} className='h-[50px]' />
          </div>
          <div className='mt-2 flex-row gap-2 flex justify-center'>
            <Button
              type='primary'
              className='w-full md:w-1/5 !p-6 text-lg'
              onClick={handleUpdatePhone}
              loading={isUpdatingProfile || isVerifyingOtp}
              disabled={isUpdatingProfile}
            >
              {t('BUTTON.SAVE')}
            </Button>
            <Button
              className='w-full md:w-1/5 !p-6 text-lg'
              onClick={handleBackToConfirm}
              disabled={isUpdatingProfile}
            >
              {t('BUTTON.BACK')}
            </Button>
          </div>
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
          <div className='flex flex-col items-center justify-center'>
            <Text type='secondary'>{t('OTP.OTP_PLACEHOLDER')}</Text>
            <OTPInput value={otp} setValue={setOtp} />
            {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
          </div>
          <Space direction='vertical' size='small' className='w-full'>
            <div className='flex-row gap-2 flex justify-center'>
              <Button
                onClick={handleResendOtp}
                disabled={countdown > 0 || remainingTime > 0 || isVerifyingOtp}
                className='w-full md:w-1/5 !p-6 text-lg'
              >
                {countdown > 0
                  ? t('OTP.COUNTDOWN', { time: countdown })
                  : remainingTime > 0
                  ? t('OTP.WAIT_TIME', { time: remainingTime })
                  : t('OTP.RESEND_OTP')}
              </Button>
            </div>
            <Button onClick={handleBackToConfirm} disabled={isVerifyingOtp} type='link'>
              {t('OTP.BACK_TO_PHONE')}
            </Button>
          </Space>
        </Space>
      )}
      {localStep === LocalStep.VERIFIED && (
        <div className='w-full flex flex-col items-center justify-center'>
          <div className='mb-8 transform animate-bounce'>
            <div className='w-20 h-20 mt-4 bg-gradient-to-br from-orange-200 to-orange-600 rounded-full flex items-center justify-center shadow-lg'>
              <svg
                className='w-14 h-14 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={5}
                  d='M5 13l4 4L19 7'
                />
              </svg>
            </div>
          </div>

          <div className='text-center mb-8'>
            <h3 className='text-3xl font-bold text-gray-800 mb-4 leading-tight'>
              {t('OTP.PHONE_ALREADY_VERIFIED')}
            </h3>
            <p className='text-gray-600 text-lg leading-relaxed'>
              {t('OTP.PHONE_ALREADY_VERIFIED_DESC', { phone: maskPhone(phone) })}
            </p>
          </div>

          <div className='bg-gradient-to-r from-orange-50 to-white border border-orange-200 rounded-xl p-6 mb-8 w-full max-w-md shadow-sm'>
            <div className='flex items-center justify-center space-x-3'>
              <div className='w-15 h-15 bg-orange-100 rounded-full flex items-center justify-center'>
                <svg
                  className='w-10 h-10 text-orange-500'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                  />
                </svg>
              </div>
              <span className='text-xl font-semibold text-gray-800'>{maskPhone(phone)}</span>
            </div>
          </div>
          {onSuccess && (
            <div className='w-full flex justify-center'>
              <Button
                type='primary'
                size='large'
                className='px-10 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105'
                onClick={onSuccess}
              >
                <span className='flex items-center space-x-2'>
                  <span>{t('BUTTON.CONTINUE')}</span>
                  <svg
                    className='w-5 h-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M13 7l5 5m0 0l-5 5m5-5H6'
                    />
                  </svg>
                </span>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
