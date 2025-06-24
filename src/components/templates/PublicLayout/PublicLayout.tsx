import { Outlet } from 'react-router-dom';

import { SlideImages } from '../../molecules/index';

const PublicLayout: React.FC = () => {
  return (
    <div className='min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-cover bg-center bg-no-repeat bg-[url(./assets/images/SlideImages/background.png)]'>
      <div className='h-full pt-12 p-6 sm:p-6 sm:pt-12 md:p-10 lg:p-14 xl:p-20'>
        <Outlet />
      </div>

      <div className='flex justify-end max-h-screen p-10'>
        <div className='shadow-md rounded-3xl p-12 overflow-hidden lg:block hidden w-full bg-white sm:w-6/6 md:w-6/6 lg:w-6/6 xl:w-5/6 max-h-screen'>
          <div className='flex flex-col justify-between h-full'>
            <SlideImages />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicLayout;
