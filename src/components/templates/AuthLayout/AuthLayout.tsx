import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import Header from '@app/components/Layout/Header/Header';
import { useGetProfile } from '@app/hooks/useProfile';

const AuthLayout = () => {
  const isAuth = useSelector((state: any) => state.auth.isAuth);
  const { isLoading } = useGetProfile();
  if (isAuth && isLoading) {
    return <Spin className='top-1/2 left-1/2 fixed -translate-x-1/2 -translate-y-1/2' />;
  }

  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
