import { Outlet } from 'react-router-dom';

import { SlideImages } from '../../molecules/index';

const PublicLayout: React.FC = () => {
  return (
    <div className='min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-cover bg-center bg-no-repeat bg-[url(./assets/images/SlideImages/background.png)]'>
      <div className='h-full p-6 sm:p-6 md:p-10'>
        <Outlet />
      </div>

      <div className='flex justify-center items-center lg:p-20'>
        <div className='shadow-md rounded-3xl p-12 overflow-hidden lg:block hidden w-full bg-white xl:w-5/6 max-h-screen'>
          <div className='flex flex-col justify-between'>
            <SlideImages />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicLayout;
