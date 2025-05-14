import { Outlet } from 'react-router-dom';

import Sidebar from '@app/components/Sidebar/Sidebar';

const ProfileLayout = () => {
  return (
    <div className='flex justify-center item-center w-full'>
      <div className='lg:container grid 2xl:grid-cols-5 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-5 grid-cols-1 gap-6 !p-4 w-full min-h-screen'>
        <div className='lg:col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2 2xl:col-span-1'>
          <Sidebar />
        </div>
        <div className='lg:col-span-3 md:col-span-3 lg:col-span-3 xl:col-span-4 2xl:col-span-4'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
