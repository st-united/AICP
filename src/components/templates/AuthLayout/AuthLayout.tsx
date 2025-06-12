import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import Header from '@app/components/Layout/Header/Header';
import { useGetProfile } from '@app/hooks/useProfile';
import { RootState } from '@app/redux/store';

const AuthLayout = () => {
  const { isAuth } = useSelector((state: RootState) => state.auth);
  const { data, isLoading } = useGetProfile(isAuth);

  if (isAuth && isLoading) {
    return (
      <div className='flex items-center justify-center'>
        <Spin />
      </div>
    );
  }

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
