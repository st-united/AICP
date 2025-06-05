import { MenuOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from '@app/components/Layout/Sidebar/Sidebar';

const ProfileLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className='flex justify-center items-center w-full h-screen overflow-hidden'>
      <div className='lg:container grid 2xl:grid-cols-5 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-5 grid-cols-1 md:gap-6 gap-4 md:!p-8 !p-4 w-full h-full'>
        <div className='md:hidden z-50'>
          <Button type='text' onClick={() => setIsSidebarOpen(!isSidebarOpen)} className='!p-0'>
            <MenuOutlined className='text-2xl' />
          </Button>
        </div>

        {/* Sidebar */}
        <div className='hidden md:block top-0 left-0 h-full z-40 lg:col-span-1 md:col-span-2 xl:col-span-2 2xl:col-span-1'>
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className='lg:col-span-3 md:col-span-3 xl:col-span-4 2xl:col-span-4 h-full overflow-y-auto'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
