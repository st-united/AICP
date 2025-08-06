import { Button, Image, Layout } from 'antd';
import clsx from 'clsx';
import { useEffect, useState, useCallback } from 'react';
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
      const yOffset = -10;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      smoothScrollTo(y);
    }
  };
  return (
    <Layout.Header
      className={clsx(
        'bg-white sticky top-0 flex justify-between w-full items-center h-[5rem] z-50  transition-all duration-300 ease-in-out px-6 mdL:px-16 xl:px-24',
        {
          'bg-gradient-to-r from-[#FFFBF9] to-[#FFF5F0]': isHomePage && !isScrolled,
          'shadow-md': !isHomePage || isScrolled,
          'mt-2': !isHomePage,
        },
      )}
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
