import { Button, Result, Spin } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { useActivateMentorByLink } from '@app/hooks';

enum ActivationStatus {
  Idle = 'idle',
  Success = 'success',
  Error = 'error',
}

const AccountActivation = () => {
  const { t } = useTranslation();
  const { mutate: activeMentor, isLoading } = useActivateMentorByLink();
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<ActivationStatus>(ActivationStatus.Idle);

  const handleActivateMentor = () => {
    if (token) {
      activeMentor(token, {
        onSuccess: () => {
          setStatus(ActivationStatus.Success);
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        },
        onError: () => {
          setStatus(ActivationStatus.Error);
          setTimeout(() => {
            navigate('/');
          }, 2000);
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <Spin size='large' tip={t('MENTOR_ACTIVATION.LOADING')} />
      </div>
    );
  }

  if (status === ActivationStatus.Success) {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <Result
          status='success'
          title={t('MENTOR_ACTIVATION.SUCCESS_TITLE')}
          subTitle={t('MENTOR_ACTIVATION.SUCCESS_SUBTITLE')}
        />
      </div>
    );
  }

  if (status === ActivationStatus.Error) {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <Result
          status='error'
          title={t('MENTOR_ACTIVATION.ERROR_TITLE')}
          subTitle={t('MENTOR_ACTIVATION.ERROR_SUBTITLE')}
        />
      </div>
    );
  }

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full'>
        <h1 className='text-2xl font-bold text-gray-800 mb-4'>
          {t('MENTOR_ACTIVATION.WELCOME')}{' '}
          <span className='text-3xl font-bold text-[#f89436]'>
            {t('MENTOR_ACTIVATION.DEVPLUS')}
          </span>
        </h1>
        <p className='text-gray-600 mb-6'>{t('MENTOR_ACTIVATION.DESCRIPTION')}</p>
        <Button
          type='primary'
          size='large'
          onClick={handleActivateMentor}
          className='w-full h-12 text-lg'
        >
          {t('MENTOR_ACTIVATION.ACTIVATE_BUTTON')}
        </Button>
      </div>
    </div>
  );
};

export default AccountActivation;
