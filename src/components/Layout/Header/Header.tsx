import { Button, Image, Layout } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { DropProfile } from '../../molecules';
import { DevPlus, DevPlusS } from '@app/assets/images';
import { ButtonHeader } from '@app/components/atoms';
import { HomePageEnum } from '@app/constants/homePageEnum';
import { smoothScrollTo } from '@app/utils/scroll';
const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isAuth = useSelector((state: any) => state.auth.isAuth);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSection, setCurrentSection] = useState<HomePageEnum | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const isHomePage = pathname === '/';
  const handleLoginClick = () => navigate('/login');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleMediaChange);

    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (id: string, section: HomePageEnum) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -10;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      smoothScrollTo(y);
      setCurrentSection(section);
    }
  };
  useEffect(() => {
    if (isHomePage && !isScrolled && isMobile) {
      document.body.style.paddingTop = '4rem';
    } else {
      document.body.style.paddingTop = '0';
    }

    return () => {
      document.body.style.paddingTop = '0';
    };
  }, [isHomePage, isScrolled, isMobile]);

  return (
    <Layout.Header
      className={`${
        isHomePage && !isScrolled ? 'fixed top-0 bg-[#FFFBF9]' : 'sticky top-0 bg-white shadow-md'
      } flex justify-between w-full items-center h-[5rem] z-50  transition-all duration-300 ease-in-out px-6 mdL:px-16 xl:px-24`}
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
      {isHomePage && (
        <div className='hidden md:flex gap-8 items-center'>
          <Button
            onClick={() => handleSmoothScroll('partner-network', HomePageEnum.PARTNER_NETWORK)}
            type='text'
            className={`!font-semibold !text-base !text-[#444] hover:!text-[#FE7743] hover:!bg-transparent transition-colors duration-200 ${
              currentSection === HomePageEnum.PARTNER_NETWORK ? '!text-[#FE7743]' : ''
            }`}
          >
            {t('HOMEPAGE.PARTNER_TITLE')}
          </Button>
          <Button
            onClick={() => handleSmoothScroll('experts', HomePageEnum.EXPERTS)}
            type='text'
            className={`!font-semibold !text-base !text-[#444] hover:!text-[#FE7743] hover:!bg-transparent transition-colors duration-200 ${
              currentSection === HomePageEnum.EXPERTS ? '!text-[#FE7743]' : ''
            }`}
          >
            {t('HOMEPAGE.EXPERTS_TITLE')}
          </Button>
        </div>
      )}
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
