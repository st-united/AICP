import { Outlet } from 'react-router-dom';

import PublicLayoutCarousel from './PublicLayoutCarousel';
import { DevPlus } from '@app/assets/images/index';
import {
  carousel_1,
  carousel_2,
  carousel_3,
  carousel_4,
} from '@app/assets/images/publicLayoutImages/index';

const PublicLayout: React.FC = () => {
  return (
    <div className='min-h-screen grid grid-cols-1 lg:grid-cols-2 !p-10 bg-cover bg-center bg-no-repeat bg-[url(./assets/images/background.png)]'>
      <div className='pt-6 sm:p-6 md:p-10 lg:p-14 xl:p-20'>
        <Outlet />
      </div>

      <div className='flex-1 flex justify-end max-h-screen'>
        <div className='rounded-3xl p-12 overflow-hidden lg:block hidden w-full bg-white sm:w-6/6 md:w-6/6 lg:w-6/6 xl:w-5/6 max-h-screen'>
          <div className='flex flex-col justify-between h-full'>
            <div className='h-[80px] w-[200px] flex items-start'>
              <img src={DevPlus} className='w-full h-full' alt='dev plus' />
            </div>
            <PublicLayoutCarousel images={[carousel_1, carousel_2, carousel_3, carousel_4]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicLayout;
