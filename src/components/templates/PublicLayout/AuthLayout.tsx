import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import Background from '../../../assets/images/background.png';
import { getStorageData } from '@app/config';
import { ACCESS_TOKEN } from '@app/constants';
import { RootState } from '@app/redux/store';

const AuthLayout: React.FC = () => {
  const navigate = useNavigate();
  const { isAuth } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (getStorageData(ACCESS_TOKEN) && isAuth) {
      navigate('/');
    }
  }, [isAuth, getStorageData(ACCESS_TOKEN)]);

  return (
    <div
      className='h-screen w-full grid grid-cols-2 !p-10'
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Outlet />
      <div className='flex justify-end'>
        <div className='bg-white rounded-4xl w-4/5 h-full'></div>
      </div>
    </div>
  );
};

export default AuthLayout;
