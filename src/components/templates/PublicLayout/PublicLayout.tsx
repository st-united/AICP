import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { SlideImages } from '../../molecules/index';
import { NAVIGATE_URL } from '@app/constants';

const PublicLayout: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Reset class trước mỗi lần pathname thay đổi
    document.body.className = '';

    const routeClassMap: Record<string, string> = {
      [NAVIGATE_URL.SIGN_UP]: 'sm:overflow-hidden',
      [NAVIGATE_URL.SIGN_IN]: 'overflow-hidden',
      [NAVIGATE_URL.FORGOT_PASSWORD]: 'overflow-hidden',
      [NAVIGATE_URL.RESET_PASSWORD]: 'overflow-hidden',
    };

    const className = routeClassMap[pathname];
    if (className) {
      document.body.classList.add(className);
    }

    return () => {
      document.body.className = '';
    };
  }, [pathname]);

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 bg-cover bg-center bg-no-repeat bg-[url(./assets/images/SlideImages/background.png)]'>
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
