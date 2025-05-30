import { DownCircleFilled } from '@ant-design/icons';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

import './homepage.scss';
import { TextTyping } from '@app/components/atoms/';

type Props = {
  onScrollToNext: () => void;
};

const MainScreen = ({ onScrollToNext }: Props) => {
  const { t } = useTranslation();

  return (
    <div className='flex flex-col w-full h-full'>
      <div className='h-screen w-full bg-cover bg-no-repeat bg-center bg-[url(./assets/svgs/background.svg)]'>
        <div className='flex justify-center items-center md:items-start flex-col gap-6 h-full !px-4 md:mx-16'>
          <div className='text-base sm:text-3xl lg:text-6xl md:text-4xl max-w-[300px] md:max-w-full text-center leading-12 font-bold !p-4 !py-0'>
            {t('HOMEPAGE.PRIMARY_TITLE')}
          </div>
          <TextTyping
            text={t('HOMEPAGE.TITLE') || ''}
            speed={50}
            className='text-2xl sm:text-3xl lg:text-7xl md:text-5xl max-w-[300px] md:max-w-full text-center leading-12 font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#C05604] via-[#E16100] to-[#986262] !p-4'
          />
          <TextTyping
            text={t('HOMEPAGE.SUB_TITLE') || ''}
            speed={10}
            className='sm:w-3/5 text-base text-center lg:text-2xl md:text-lg text-[#273F4F] font-semibold !p-4 md:text-start leading-10'
          />

          <div className='slide-in-left !uppercase cursor-pointer !rounded-full !md:py-4 !md:px-10 !py-3 ml-4 !px-8 bg-[#FE7743] text-lg md:text-xl hover:text-black font-bold hover:bg-[#A33B1B] transition-all duration-300 ease-in-out shadow-[#FE774380] shadow-lg text-white'>
            {t('HOMEPAGE.BUTTON')}
          </div>
        </div>
      </div>
      <DownCircleFilled
        className='!text-[#FE7743] hover:scale-125 shadow-md absolute bottom-10 right-10 md:bottom-20 md:right-20 border-none !p-0 !m-0 text-5xl md:text-6xl rounded-full'
        onClick={onScrollToNext}
      />
    </div>
  );
};

export default MainScreen;
