import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import Header from '@app/components/Layout/Header/Header';
import { useGetProfile } from '@app/hooks/useProfile';

const AuthLayout = () => {
  const isAuth = useSelector((state: any) => state.auth.isAuth);
  const { isLoading } = useGetProfile(isAuth);
  if (isAuth && isLoading) {
    return (
      <div className='flex justify-center items-center'>
        <Spin />
      </div>
    );
  }

  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
