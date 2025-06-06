import { Outlet } from 'react-router-dom';

import Header from '@app/components/Layout/Header/Header';
import { useGetProfile } from '@app/hooks/useProfile';
import { Spin } from 'antd';

const AuthLayout = () => {
  const { data, isLoading } = useGetProfile();

  if (isLoading) {
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
