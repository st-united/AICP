import { Spin } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

import ProfileForm from './ProfileForm';
import PortfolioContent from '@app/components/molecules/Portfolio/PortfolioContent';
import { useGetProfile } from '@app/hooks';

const ProfilePage = () => {
  const { t } = useTranslation();
  const { data: userData, isLoading } = useGetProfile();

  if (isLoading || !userData)
    return (
      <div className='h-full w-full flex items-center justify-center text-lg'>
        <Spin />
      </div>
    );

  return (
    <div className='relative rounded-2xl bg-white h-full shadow overflow-y-auto'>
      <ProfileForm userData={userData} />
      <div className='flex justify-center px-4'>
        <div className='w-[900px] border-t border-solid'></div>
      </div>
      <div className='py-6 px-4'>
        <h1 className='text-[1.813rem] font-bold text-center my-2'>
          {t('PROFILE.PORTFOLIO_HEADER')}
        </h1>
        <PortfolioContent />
      </div>
    </div>
  );
};

export default ProfilePage;
