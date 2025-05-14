import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
  return (
    <div className='h-screen w-full grid md:grid-cols-2 !p-10 bg-cover bg-center bg-no-repeat bg-[url(./assets/images/background.png)]'>
      <div className='sm:w-full md:w-6/6 lg:w-6/6 xl:w-5/6 h-full'>
        <Outlet />
      </div>

      <div className='flex justify-end'>
        <div className='bg-white rounded-4xl md:w-6/6 lg:w-6/6 xl:w-5/6 h-full'></div>
      </div>
    </div>
  );
};

export default AuthLayout;
