import { Outlet } from 'react-router-dom';

import Header from '@app/components/Layout/Header/Header';

const AuthLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
