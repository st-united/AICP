import { Outlet } from 'react-router-dom';

import { SlideImages } from '../../molecules/index';

const PublicLayout: React.FC = () => {
  return (
    <div className='min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-cover bg-center bg-no-repeat bg-[url(./assets/images/SlideImages/background.png)]'>
      <div className='h-full pt-6 sm:px-6 md:px-10'>
        <Outlet />
      </div>

      <div className='flex justify-center items-center lg:px-20 lg:py-6'>
        <div className='shadow-md rounded-3xl lg:p-8 p-12 overflow-hidden lg:block hidden w-full bg-white xl:w-5/6 max-h-screen lg:max-h-[95%]'>
          <div className='flex flex-col justify-between'>
            <SlideImages />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicLayout;
