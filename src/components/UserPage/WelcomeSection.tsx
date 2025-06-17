import { Button } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import ConfirmBeforeTestModal from '../LandingPage/ConfirmBeforeTestModal';
import StepModal from '../molecules/StepModal/StepModal';
import { InnovationPana } from '@app/assets/images';
import { TextTyping } from '@app/components/atoms/';
import { RootState } from '@app/redux/store';

const WelcomeSection = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { t } = useTranslation();
  const [open, setIsOpen] = useState(false);
  return (
    <section className='w-full h-full bg-white items-center'>
      <div className='flex flex-row container w-full h-full gap-6 mx-auto py-28 xsM:w-[90%] smM:pl-2 smM:py-36 smM:items-center mdM:h-screen xl:w-[90%]'>
        <div className='flex flex-col items-center h-full ssM:text-start smM:justify-center smM:items-start mdM:justify-center mdM:w-full gap-6'>
          <div className='text-center text-[#273F4F] font-bold mb-4 text-2xl smM:text-3xl smM:text-start xl:text-4xl'>
            {t('HOMEPAGE_LOGIN.TITLE', { name: user?.fullName })}
          </div>
          <TextTyping
            text={t('HOMEPAGE_LOGIN.TEXT_READY') ?? ''}
            speed={30}
            className='text-primary !font-extrabold text-center text-2xl xsM:text-3xl smS:mb-8 smM:text-start smM:text-4xl mdM:leading-10 xl:text-6xl'
          />
          <TextTyping
            text={t('HOMEPAGE_LOGIN.DESCRIPTION') ?? ''}
            speed={30}
            className='!text-[#273F4F] font-normal leading-6 text-center smS:mb-8 smM:text-start mdL:w-[45%] mdL:!leading-relaxed text-lg xsM:text-xl mdM:text-2xl xl:text-3xl'
          />
          <img src={InnovationPana} alt='innovation' className='h-[10rem] w-[12rem] smM:hidden' />
          <Button
            onClick={() => {
              setIsOpen(true);
            }}
            className='!h-12 mdL:min-h-14 !text-white font-bold !uppercase !rounded-full shadow-light slide-in-left bg-primary border !border-primary px-8 text-base smM:text-xl cursor-pointer hover:bg-white hover:!text-primary transition-all duration-300'
          >
            {t('HOMEPAGE_LOGIN.START')}
          </Button>
          <p className='text-base text-center smM:text-start text-[#686868] smM:leading-6'>
            {t('HOMEPAGE_LOGIN.TEXT_PEOPLE')}
          </p>
        </div>
        <div className='hidden smM:block smM:w-[30rem] mdM:w-[40rem]'>
          <img src={InnovationPana} alt='innovation' className='w-[25rem] h-[25rem]' />
        </div>
      </div>
      {open && <StepModal current={0} open={open} onClose={() => setIsOpen(false)} />}
    </section>
  );
};

export default WelcomeSection;
