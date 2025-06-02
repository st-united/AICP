import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

import { InnovationPana } from '@app/assets/images';
import { TextTyping } from '@app/components/atoms/';

interface WelcomeSectionProps {
  name?: string;
}
const WelcomeSection = ({ name }: WelcomeSectionProps) => {
  const { t } = useTranslation();
  return (
    <section className='w-full bg-white h-screen flex items-center pt-8 sm:pt-0'>
      <div className='container mx-auto flex flex-row sm:h-full items-center"'>
        <div className='flex flex-col w-full h-full'>
          <div className='h-full w-full'>
            <div className='flex items-center md:w-4/5 lg:w-full h-full md:justify-center md:items-start flex-col gap-6 md:px-5 xl:px-0'>
              <div className='text-[#273F4F] text-center text-2xl sm:text-3xl md:text-start lg:text-5xl max-w-full leading-12 font-bold md:!py-4 px-2'>
                {t('HOMEPAGE_LOGIN.TITLE', { name })}
              </div>
              <TextTyping
                text={t('HOMEPAGE_LOGIN.TEXT_READY') ?? ''}
                speed={30}
                className='leading-10 text-2xl sm:text-3xl lg:text-5xl text-[#FE7743] md:max-w-full text-center md:text-start font-bold md:!py-4 px-2'
              />
              <TextTyping
                text={t('HOMEPAGE_LOGIN.DESCRIPTION') ?? ''}
                speed={30}
                className='text-base leading-8 xl:leading-5 text-center lg:text-2xl md:text-lg !text-[#686868] font-semibold !py-4 px-6 md:px-3 xl:px-2 md:text-start md:leading-10'
              />
              <img src={InnovationPana} alt='innovation' className='h-[8rem] w-[10rem] sm:hidden' />
              <Button className='h-12 slide-in-left !uppercase cursor-pointer !rounded-full !md:py-4 !md:px-10 !py-3 ml-4 !px-8 bg-[#FE7743] text-lg md:text-xl font-bold hover:bg-[#ea9c77] transition-all duration-300 ease-in-out shadow-[#FE774380] shadow-lg text-white'>
                {t('HOMEPAGE_LOGIN.START')}
              </Button>
              <p className='text-base text-center leading-8 md:text-lg md:text-start !text-[#686868] py-4 px-4 xl:px-2'>
                {t('HOMEPAGE_LOGIN.TEXT_PEOPLE')}
              </p>
            </div>
          </div>
        </div>
        <div className='hidden lg:flex md:items-center w-[40rem] p-4 mt-16'>
          <img src={InnovationPana} alt='innovation' className='w-[25rem] h-[25rem]' />
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
