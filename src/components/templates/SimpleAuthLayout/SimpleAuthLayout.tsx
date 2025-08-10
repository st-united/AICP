import { Image } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';

import { DevPlus, DevPlusS } from '@app/assets/images';

const SimpleAuthLayout: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className='min-h-screen bg-cover bg-center bg-no-repeat bg-[url(./assets/images/SlideImages/background.png)]'>
      <div className='cursor-pointer p-6 sm:p-6 md:px-10 lg:px-14 xl:px-20'>
        <div className='cursor-pointer'>
          <Image
            onClick={() => navigate('/')}
            src={DevPlus}
            className='hidden md:block !h-20'
            preview={false}
          />
          <Image
            onClick={() => navigate('/')}
            src={DevPlusS}
            className='block md:hidden !h-20'
            preview={false}
          />
        </div>
        <div className='max-w-2xl mx-auto text-center'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SimpleAuthLayout;
