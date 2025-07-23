import { Image, Layout } from 'antd';
import { useEffect, useState } from 'react';
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
  const [isScrolled, setIsScrolled] = useState(false);

  const isHomePage = pathname === '/';
  const handleLoginClick = () => navigate('/login');

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Layout.Header
      className={`${
        isHomePage && !isScrolled ? 'fixed top-0 bg-transparent' : 'sticky top-0 bg-white shadow-md'
      } flex justify-between w-full items-center h-[5rem] z-50 transition-all duration-300 ease-in-out mdL:px-16 xl:px-24`}
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
      <div className='hidden md:flex gap-8 items-center'>
        <button
          onClick={() => handleSmoothScroll('partner-network')}
          className='font-semibold text-md text-[#444] hover:text-[#FE7743] transition-colors duration-200 cursor-pointer'
        >
          {t('HOMEPAGE.PARTNER_TITLE')}
        </button>
        <button
          onClick={() => handleSmoothScroll('experts')}
          className='font-semibold text-md text-[#444] hover:text-[#FE7743] transition-colors duration-200 cursor-pointer'
        >
          {t('HOMEPAGE.EXPERTS_TITLE')}
        </button>
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
