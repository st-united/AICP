import { Button } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import ConfirmBeforeTestModal from '../LandingPage/ConfirmBeforeTestModal';
import { InovationPana } from '@app/assets/images';
import { TextTyping } from '@app/components/atoms/';

interface WelcomeSectionProps {
  name?: string;
}
const WelcomeSection = ({ name }: WelcomeSectionProps) => {
  const { t } = useTranslation();
  const [open, setIsOpen] = useState(false);
  return (
    <section className='w-full bg-white h-screen flex items-center'>
      <div className='container mx-auto flex flex-row sm:h-full items-center"'>
        <div className='flex flex-col w-full h-full'>
          <div className='h-full w-full'>
            <div className='flex items-center md:justify-center md:items-start flex-col gap-6 h-full'>
              <div className='text-[#02185B] text-center text-xl md:text-2xl md:text-start lg:text-5xl max-w-full leading-12 font-bold !p-4'>
                {t('HOMEPAGE_LOGIN.TITLE', { name })}
              </div>
              <TextTyping
                text={t('HOMEPAGE_LOGIN.TEXT_READY') ?? ''}
                speed={30}
                className='text-base md:text-xl lg:text-5xl text-[#FE7743] sm:text-2xl md:max-w-full text-center md:text-start leading-12 font-bold !p-4'
              />
              <TextTyping
                text={t('HOMEPAGE_LOGIN.DESCRIPTION') ?? ''}
                speed={30}
                className='text-base leading-5 text-center lg:text-2xl md:text-lg text-[#686868] font-semibold !p-4 md:text-start md:leading-10'
              />

              <Button
                onClick={() => {
                  setIsOpen(true);
                }}
                className='slide-in-left !uppercase cursor-pointer !rounded-full !md:py-4 !md:px-10 !py-3 ml-4 !px-8 bg-[#FE7743] text-lg md:text-xl font-bold hover:bg-[#ea9c77] transition-all duration-300 ease-in-out shadow-[#FE774380] shadow-lg text-white'
              >
                {t('HOMEPAGE_LOGIN.START')}
              </Button>
              <p className='text-base text-center md:text-start text-[#686868] p-4'>
                {t('HOMEPAGE_LOGIN.TEXT_PEOPLE')}
              </p>
            </div>
          </div>
        </div>
        <div className='hidden lg:flex md:items-center w-[40rem] p-4 mt-16'>
          <img src={InovationPana} alt='Innovation illustration' className='w-[25rem] h-[25rem]' />
        </div>
      </div>
      <ConfirmBeforeTestModal open={open} onClose={() => setIsOpen(false)} />
    </section>
  );
};

export default WelcomeSection;
