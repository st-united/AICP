import { Button, Image, Layout } from 'antd';
import { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { DropProfile } from '../../molecules';
import { DevPlus, DevPlusS } from '@app/assets/images';
import { ButtonHeader } from '@app/components/atoms';
import { HomePageEnum } from '@app/constants/homePageEnum';
import { smoothScrollTo } from '@app/utils/scroll';
import { NAVIGATE_URL } from '@app/constants';

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isAuth = useSelector((state: any) => state.auth.isAuth);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSection, setCurrentSection] = useState<HomePageEnum | null>(null);
  const isHomePage = pathname === '/';
  const handleLoginClick = () => navigate('/login');

  const debouncedScrollHandler = useCallback(() => {
    let timeoutId: NodeJS.Timeout;

    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        setIsScrolled(scrollTop > 0);

        if (isHomePage) {
          const sections = [{ id: HomePageEnum.PARTNER_NETWORK }, { id: HomePageEnum.EXPERTS }];

          const headerHeight = 80;
          const scrollPosition = scrollTop + headerHeight + 50;

          for (const section of sections) {
            const element = document.getElementById(section.id);
            if (element) {
              const elementTop = element.offsetTop;
              const elementBottom = elementTop + element.offsetHeight;

              if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
                setCurrentSection(section.id);
                break;
              } else {
                setCurrentSection(null);
              }
            }
          }
        }
      }, 2);
    };
  }, [isHomePage]);

  useEffect(() => {
    const handleScroll = debouncedScrollHandler();
    window.addEventListener('scroll', handleScroll);
  }, [debouncedScrollHandler, isHomePage]);

  const handleSmoothScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = isHomePage && !isScrolled ? 70 : -10;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      smoothScrollTo(y);
    }
  };

  const handleBackToTop = () => {
    if (pathname == NAVIGATE_URL.LANDING_PAGE) {
      smoothScrollTo(0);
    } else {
      navigate(NAVIGATE_URL.LANDING_PAGE);
    }
  };

  return (
    <Layout.Header
      className={`${
        isHomePage && !isScrolled ? 'fixed top-0 bg-transparent' : 'sticky top-0 bg-white shadow-md'
      } flex justify-between w-full items-center h-[5rem] z-50 transition-all duration-300 ease-in-out mdL:px-16 xl:px-24`}
    >
      <div className='flex items-center justify-center'>
        <div onClick={handleBackToTop} className='cursor-pointer'>
          <Image src={DevPlus} className='hidden md:block !h-20' preview={false} />
        </div>
        <div onClick={handleBackToTop} className='cursor-pointer'>
          <Image
            onClick={handleBackToTop}
            src={DevPlusS}
            className='block md:hidden !h-20'
            preview={false}
          />
        </div>
      </div>
      {isHomePage && (
        <div className='hidden md:flex gap-8 items-center'>
          <Button
            onClick={() => handleSmoothScroll('partner-network')}
            type='text'
            className={`!font-semibold !text-base !text-[#444] hover:!text-[#FE7743] hover:!bg-transparent transition-colors duration-200 ${
              currentSection === HomePageEnum.PARTNER_NETWORK ? '!text-[#FE7743]' : ''
            }`}
          >
            {t('HOMEPAGE.PARTNER_TITLE')}
          </Button>
          <Button
            onClick={() => handleSmoothScroll('experts')}
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
