import { Outlet } from 'react-router-dom';

import Sidebar from '@app/components/Sidebar/Sidebar';

const ProfileLayout = () => {
  return (
    <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-6 !p-4 w-full md:w-auto'>
      <div className='lg:col-span-1 md:col-span-1'>
        <Sidebar />
      </div>
      <div className='lg:col-span-3 md:col-span-2'>
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;
