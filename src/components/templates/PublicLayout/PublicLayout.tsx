import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import Header from '@app/components/Header/Header';
import { getStorageData } from '@app/config';
import { ACCESS_TOKEN } from '@app/constants';
import { RootState } from '@app/redux/store';

const PublicLayout: React.FC = () => {
  const navigate = useNavigate();
  const { isAuth } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (getStorageData(ACCESS_TOKEN) && isAuth) {
      navigate('/');
    }
  }, [isAuth, getStorageData(ACCESS_TOKEN)]);

  return (
    <div className='relative min-h-screen'>
      <Header />
      <div className='flex-1 flex justify-center items-center'>
        <Outlet />
      </div>
    </div>
  );
};

export default PublicLayout;
