import { Button, Image } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RobotHand } from '@app/assets/images';
import { PartnerUnit1, PartnerUnit2, CelebUnit2, DevPlus } from '@app/assets/images/Logos';
import { RootState } from '@app/redux/store';

import '../LandingPage/homepage.scss';

const BannerUserScreen = () => {
  const { t } = useTranslation();
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='w-full min-h-screen md:h-screen bg-[#FFFBF9] flex flex-col '>
      <div className='w-full flex flex-col smL:flex-row items-center gap-4 sm:gap-20 px-2 sm:px-10 mt-24'>
        <div className='flex md:flex-row flex-col items-center gap-2 w-3/5 sm:w-2/5 justify-end'>
          <span className='text-base mdL:text-2xl font-bold'>
            {t('HOMEPAGE.BANNER_USER.ORGANIZER')}
          </span>
          <div className='flex flex-row items-center gap-2'>
            <Image
              preview={false}
              height={66}
              className='object-contain mt-2'
              src={CelebUnit2}
              alt='celeb unit'
            />
            <Image
              preview={false}
              height={60}
              className='object-contain !mb-1'
              src={DevPlus}
              alt='dev plus'
            />
          </div>
        </div>
        <div className='flex md:flex-row flex-col items-center gap-2'>
          <span className='text-base mdL:text-2xl font-bold'>
            {t('HOMEPAGE.BANNER_USER.PARTNER')}
          </span>
          <div className='flex flex-row items-center gap-2'>
            <Image
              preview={false}
              height={60}
              className='object-contain py-1'
              src={PartnerUnit1}
              alt='partner unit 1'
            />
            <Image
              preview={false}
              height={60}
              className='object-contain py-1'
              src={PartnerUnit2}
              alt='partner unit 2'
            />
          </div>
        </div>
      </div>

      <div className='flex flex-row w-full flex-1 mt-8 gap-20 justify-center'>
        <div className='relative w-2/5 h-full items-center justify-center  hidden mdL:flex'>
          <div className='absolute left-0 bottom-0 w-full h-[90%] items-end justify-center flex'>
            <img
              className='!object-cover scale-x-[-1] max-h-full'
              src={RobotHand}
              alt='Robot hand'
            />
          </div>
        </div>
        <div className='flex-1 flex flex-col text-center md:text-start mdL:align-middle justify-start sm:justify-center sm:pb-32 mdL:pb-48 px-6 mdL:px-0 mdL:pr-20'>
          <span className='text-[32px] sm:text-[48px] mdL:text-[72px] font-[1000] tracking-wide mb-6 text-[#FE7743]'>
            {t('HOMEPAGE.BANNER_USER.TITLE')}
          </span>
          <span className='text-base md:text-xl font-[700] mb-2 block'>
            {t('HOMEPAGE.BANNER_USER.SUBTITLE')}
          </span>
          <span className='text-xl font-semibold mt-4'>
            <span className='text-3xl font-[900] text-[#FF8242]'>
              {t('HOMEPAGE.BANNER_USER.STUDENT_COUNT')}
            </span>{' '}
            {t('HOMEPAGE.BANNER_USER.STUDENT_TEXT')}
          </span>
          <div className='flex items-center justify-center md:justify-start mt-6'>
            <Button
              onClick={() => {
                isAuth ? setIsOpen(true) : navigate('/login');
              }}
              className='!h-12 mdL:min-h-14 !text-white font-bold !uppercase !rounded-full shadow-light slide-in-left bg-primary border !border-primary px-8 text-base smM:text-xl cursor-pointer hover:bg-white hover:!text-primary transition-all duration-300'
            >
              {isAuth ? t('HOMEPAGE_LOGIN.START') : t('HOMEPAGE.BUTTON')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerUserScreen;
