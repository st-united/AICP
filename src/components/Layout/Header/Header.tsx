import { Image, Layout } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { DropProfile } from '../../molecules';
import { DevPlus, DevPlusS } from '@app/assets/images';
import { ButtonHeader } from '@app/components/atoms';

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isAuth = useSelector((state: any) => state.auth.isAuth);

  const isHomePage = pathname === '/';
  const handleLoginClick = () => navigate('/login');

  return (
    <Layout.Header
      className={`${
        isHomePage ? 'absolute bg-transparent' : 'bg-white'
      } flex justify-between w-full items-center h-[6rem]`}
    >
      <div className='cursor-pointer flex items-center justify-center'>
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
      {isAuth ? (
        <div className='flex items-center gap-4 md:gap-6 smM:pr-2'>
          <DropProfile />
        </div>
      ) : (
        <div className='flex items-center gap-4 md:gap-6 smM:pr-2'>
          <a
            href='/register'
            className='text-[#FE7743] font-bold text-md md:text-lg hover:text-[#ea9c77]'
          >
            {t('HEADER.REGISTER')}
          </a>
          <ButtonHeader className='hover:!bg-primary hover:!text-white' onClick={handleLoginClick}>
            {t('HEADER.LOGIN')}
          </ButtonHeader>
        </div>
      )}
    </Layout.Header>
  );
};

export default Header;
