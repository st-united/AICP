import { Image, Card, Button } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ConfirmBeforeTestModal from '../LandingPage/ConfirmBeforeTestModal';
import { RobotHand } from '@app/assets/images';
import { PartnerUnit1, PartnerUnit2, CelebUnit, DevPlus } from '@app/assets/images/Logos';
import { RootState } from '@app/redux/store';

import '../LandingPage/homepage.scss';

const BannerUserScreen = () => {
  const { t } = useTranslation();
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className='min-h-screen bg-gradient-to-br from-[#FFFBF9] to-[#FFF5F0] flex items-center justify-center px-6 md:px-8 lg:px-12'>
      <div className='max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center w-full my-0 sm:my-20 '>
        {/* Left Side - Robot Image */}
        <div className='relative order-2 md:order-1 px-4 md:px-6 lg:px-8'>
          <div className='relative'>
            {/* Floating Animation Container */}
            <div className='animate-float'>
              <img
                className='w-full h-auto max-w-sm mx-auto md:max-w-md lg:max-w-lg scale-x-[-1]'
                src={RobotHand}
                alt='Robot hand'
              />
            </div>

            {/* Glowing Circles
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-96 md:h-96 opacity-20'>
              <div className='absolute inset-0 rounded-full border-2 border-[#FE7743] animate-pulse'></div>
              <div
                className='absolute inset-4 rounded-full border border-[#FE7743]/50 animate-pulse'
                style={{ animationDelay: '0.5s' }}
              ></div>
              <div
                className='absolute inset-8 rounded-full border border-[#FE7743]/30 animate-pulse'
                style={{ animationDelay: '1s' }}
              ></div>
            </div> */}
          </div>
        </div>

        {/* Right Side - Content */}
        <div className='order-1 md:order-2 text-center md:text-left space-y-6 md:space-y-8 px-4 md:px-6 lg:px-8'>
          {/* Sponsors Section - Tablet & Desktop */}
          <div className='hidden sm:block space-y-4 md:space-y-6 animate-slide-in mb-6 md:mb-8'>
            <div className='flex flex-col md:flex-row items-center gap-6 md:gap-8 lg:gap-12'>
              <div className='flex flex-col items-center gap-2'>
                <span className='text-sm font-medium text-gray-600'>
                  {t('HOMEPAGE.BANNER_USER.ORGANIZER')}
                </span>
                <div className='flex items-center gap-3'>
                  <Image
                    preview={false}
                    height={44}
                    className='object-contain transition-transform hover:scale-110'
                    src={CelebUnit}
                    alt='celeb unit'
                  />
                  <Image
                    preview={false}
                    height={48}
                    className='object-contain transition-transform hover:scale-110'
                    src={DevPlus}
                    alt='dev plus'
                  />
                </div>
              </div>

              <div className='flex flex-col items-center gap-2'>
                <span className='text-sm font-medium text-gray-600'>
                  {t('HOMEPAGE.BANNER_USER.PARTNER')}
                </span>
                <div className='flex items-center gap-3'>
                  <Image
                    preview={false}
                    height={44}
                    className='object-contain transition-transform hover:scale-110'
                    src={PartnerUnit1}
                    alt='partner unit 1'
                  />
                  <Image
                    preview={false}
                    height={44}
                    className='object-contain transition-transform hover:scale-110'
                    src={PartnerUnit2}
                    alt='partner unit 2'
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <div
            className='space-y-3 md:space-y-4 animate-slide-in mb-6 md:mb-8'
            style={{ animationDelay: '0.2s' }}
          >
            <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[1000] text-[#FE7743] tracking-wide'>
              {t('HOMEPAGE.BANNER_USER.TITLE')}
            </h1>
            <div className='w-16 md:w-20 h-1 bg-gradient-to-r from-[#FE7743] to-[#FF8242] mx-auto md:mx-0 rounded-full'></div>
          </div>

          {/* Subtitle */}
          <p
            className='text-base sm:text-lg md:text-xl font-[700] text-gray-800 leading-relaxed animate-slide-in mb-6 md:mb-8'
            style={{ animationDelay: '0.4s' }}
          >
            {t('HOMEPAGE.BANNER_USER.SUBTITLE')}
          </p>

          {/* Stats Card */}
          <Card
            className='inline-block p-4 md:p-6 lg:p-8 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-[#FE7743]/20 hover:shadow-2xl transition-all duration-300 animate-slide-in border-0 rounded-2xl mb-6 md:mb-8'
            style={{ animationDelay: '0.6s' }}
          >
            <div className='flex items-center space-x-3 md:space-x-4 lg:space-x-6'>
              <div className='text-3xl sm:text-4xl md:text-5xl font-[900] text-[#FF8242]'>
                {t('HOMEPAGE.BANNER_USER.STUDENT_COUNT')}
              </div>
              <div className='text-left'>
                <div className='text-base md:text-lg font-semibold text-gray-800'>
                  {t('HOMEPAGE.BANNER_USER.STUDENT_TEXT')}
                </div>
              </div>
            </div>
          </Card>
          <div>
            <Button
              onClick={() => {
                isAuth ? setIsOpen(true) : navigate('/login');
              }}
              className='!h-12 mdL:min-h-14 !text-white font-bold !uppercase !rounded-full shadow-light slide-in-left bg-primary border !border-primary px-8 text-base smM:text-xl cursor-pointer hover:bg-white hover:!text-primary transition-all duration-300'
            >
              {isAuth ? t('HOMEPAGE_LOGIN.START') : t('HOMEPAGE.BUTTON')}
            </Button>
          </div>
          {isOpen && <ConfirmBeforeTestModal open={isOpen} onClose={() => setIsOpen(false)} />}
          {/* Mobile Sponsors */}
          <div
            className='sm:hidden space-y-4 animate-slide-in px-2'
            style={{ animationDelay: '0.8s' }}
          >
            <div className='space-y-3'>
              <p className='text-sm text-gray-600 font-medium'>
                {t('HOMEPAGE.BANNER_USER.ORGANIZER')}
              </p>
              <div className='flex justify-center space-x-4'>
                <Image
                  preview={false}
                  height={36}
                  className='object-contain transition-transform hover:scale-110'
                  src={CelebUnit}
                  alt='celeb unit'
                />
                <Image
                  preview={false}
                  height={40}
                  className='object-contain transition-transform hover:scale-110'
                  src={DevPlus}
                  alt='dev plus'
                />
              </div>
            </div>

            <div className='space-y-3'>
              <p className='text-sm text-gray-600 font-medium'>
                {t('HOMEPAGE.BANNER_USER.PARTNER')}
              </p>
              <div className='flex justify-center space-x-3'>
                <Image
                  preview={false}
                  height={36}
                  className='object-contain transition-transform hover:scale-110'
                  src={PartnerUnit1}
                  alt='partner unit 1'
                />
                <Image
                  preview={false}
                  height={36}
                  className='object-contain transition-transform hover:scale-110'
                  src={PartnerUnit2}
                  alt='partner unit 2'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerUserScreen;
