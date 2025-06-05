import { Outlet } from 'react-router-dom';

import Header from '@app/components/Layout/Header/Header';

const AuthLayout = () => {
  return (
    <div className='flex h-screen flex-col'>
      <Header />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
