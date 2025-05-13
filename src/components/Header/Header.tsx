import { Image } from 'antd';

import ProfileAvartar from './ProfileAvartar';
import { DevPlus, DevPlusS } from '@app/assets/images';

const Header = () => {
  return (
    <div className='flex justify-center !pt-4 w-full z-9999'>
      <div className='container !md:px-0 !px-4'>
        <div className='flex items-center justify-between'>
          <div>
            <Image src={DevPlus} className='hidden md:block' />
            <Image src={DevPlusS} className='block md:hidden' />
          </div>
          <div className='flex items-center gap-4 md:gap-6'>
            <div className='flex item-center border !py-2 !px-7 md:!py-3 md:!px-9 text-white font-bold rounded-full text-md md:text-lg hover:bg-[#096DD9] hover:text-white transition-all duration-300 ease-in-out'>
              Bắt đầu
            </div>
            <ProfileAvartar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
