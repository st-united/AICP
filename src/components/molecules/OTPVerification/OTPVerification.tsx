import { Button, Input, message, Typography, Alert, Space } from 'antd';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { OTPVerificationStep } from './constant';
import { OTPInput } from '@app/components/atoms/OTPInput';
import { PHONE_REGEX_PATTERN } from '@app/constants/regex';
import { useSendOtp, useVerifyOtp, useCheckOtpStatus } from '@app/hooks/useZaloOtp';

const { Title, Text } = Typography;

interface OTPVerificationProps {
  onSuccess?: () => void;
  onBack?: () => void;
  showTitle?: boolean;
  showBackButton?: boolean;
  className?: string;
}

export const OTPVerification = ({
  onSuccess,
  onBack,
  showTitle = true,
  showBackButton = true,
  className,
}: OTPVerificationProps) => {
  const { t } = useTranslation();
  const [step, setStep] = useState<OTPVerificationStep>(OTPVerificationStep.PHONE);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(0);

  const { mutate: sendOtpMutation, isPending: isSendingOtp } = useSendOtp();
  const { mutate: verifyOtpMutation, isPending: isVerifyingOtp } = useVerifyOtp();
  const { data: otpStatus, isLoading: isCheckingStatus } = useCheckOtpStatus(phone);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  useEffect(() => {
    if (phone && otpStatus?.data?.isVerified) {
      setStep(OTPVerificationStep.VERIFIED);
    }
  }, [phone, otpStatus]);

  const handleSendOtp = async () => {
    if (!phone) {
      message.error(t('OTP.PHONE_REQUIRED'));
      return;
    }

    if (!PHONE_REGEX_PATTERN.test(phone)) {
      message.error(t('OTP.PHONE_INVALID'));
      return;
    }

    sendOtpMutation(phone, {
      onSuccess: () => {
        setStep(OTPVerificationStep.OTP);
        setCountdown(60);
        message.success(t('OTP.SEND_OTP_SUCCESS'));
      },
      onError: () => {
        message.error(t('OTP.SEND_OTP_ERROR'));
      },
    });
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      message.error(t('OTP.OTP_REQUIRED'));
      return;
    }

    verifyOtpMutation(
      { phone, otp },
      {
        onSuccess: () => {
          message.success(t('OTP.VERIFY_OTP_SUCCESS'));
          onSuccess?.();
        },
        onError: () => {
          message.error(t('OTP.VERIFY_OTP_ERROR'));
        },
      },
    );
  };

  const handleResendOtp = () => {
    if (countdown > 0) return;
    handleSendOtp();
  };

  const handleBackToPhone = () => {
    setStep(OTPVerificationStep.PHONE);
    setOtp('');
    setCountdown(0);
  };

  const handleContinueWithVerifiedPhone = () => {
    onSuccess?.();
  };

  const loading = false;

  return (
    <div className={`${className} w-full flex flex-col items-center justify-center`}>
      {showTitle && (
        <div className='text-center'>
          <Title level={3}>{t('OTP.TITLE')}</Title>
          <Text type='secondary'>
            {step === OTPVerificationStep.PHONE && t('OTP.DESCRIPTION')}
            {step === OTPVerificationStep.OTP && t('OTP.PHONE_VERIFIED_DESC', { phone })}
            {step === OTPVerificationStep.VERIFIED && t('OTP.PHONE_ALREADY_VERIFIED_DESC')}
          </Text>
        </div>
      )}

      {step === OTPVerificationStep.PHONE && (
        <Space direction='vertical' size='large'>
          <Input
            placeholder={t('OTP.PHONE_PLACEHOLDER') as string}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={loading}
            size='large'
          />
          <Button type='primary' onClick={handleSendOtp} loading={loading} block size='large'>
            {t('OTP.SEND_OTP')}
          </Button>
        </Space>
      )}

      {step === OTPVerificationStep.OTP && (
        <Space direction='vertical' size='large'>
          <Alert
            message={t('OTP.PHONE_VERIFIED')}
            description={t('OTP.PHONE_VERIFIED_DESC', { phone })}
            type='info'
            showIcon
          />
          <div>
            <Text type='secondary'>{t('OTP.OTP_PLACEHOLDER')}</Text>
            <OTPInput
              value={otp}
              onChange={setOtp}
              disabled={loading}
              length={6}
              className='otp-input'
            />
          </div>
          <Space direction='vertical' size='small'>
            <Button type='primary' onClick={handleVerifyOtp} loading={loading} block size='large'>
              {t('OTP.VERIFY_OTP')}
            </Button>
            <Button
              onClick={handleResendOtp}
              disabled={countdown > 0 || loading}
              block
              size='large'
            >
              {countdown > 0 ? t('OTP.COUNTDOWN', { time: countdown }) : t('OTP.RESEND_OTP')}
            </Button>
          </Space>
        </Space>
      )}

      {step === OTPVerificationStep.VERIFIED && (
        <Space direction='vertical' size='large'>
          <Alert
            message={t('OTP.PHONE_ALREADY_VERIFIED')}
            description={t('OTP.PHONE_ALREADY_VERIFIED_DESC')}
            type='success'
            showIcon
          />
          <Button type='primary' onClick={handleContinueWithVerifiedPhone} block size='large'>
            {t('BUTTON.CONTINUE')}
          </Button>
        </Space>
      )}

      {showBackButton && (
        <div>
          {step === OTPVerificationStep.OTP && (
            <Button onClick={handleBackToPhone} disabled={loading} type='link'>
              {t('OTP.BACK_TO_PHONE')}
            </Button>
          )}
          {onBack && (
            <Button onClick={onBack} disabled={loading}>
              {t('BUTTON.BACK')}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
