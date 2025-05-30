import { DownCircleFilled } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import './homepage.scss';
import { TextTyping } from '@app/components/atoms/';

type Props = {
  onScrollToNext: () => void;
};

const MainScreen = ({ onScrollToNext }: Props) => {
  const { t } = useTranslation();

  return (
    <div className='flex flex-col w-full h-screen'>
      <div className='h-screen w-full bg-cover bg-no-repeat bg-center bg-[url(./assets/svgs/background.svg)]'>
        <div className='container flex flex-col items-center justify-center gap-6 h-full mx-auto md:items-start '>
          <div className='text-center text-xl md:text-2xl md:text-start lg:text-5xl leading-12 font-bold max-w-[300px] md:max-w-full !p-4'>
            {t('HOMEPAGE.PRIMARY_TITLE')}
          </div>
          <TextTyping
            text={t('HOMEPAGE.TITLE') || ''}
            speed={50}
            className='text-base text-[#FE7743] text-center sm:text-3xl lg:text-7xl md:text-5xl md:max-w-full leading-10 font-bold !p-4'
          />
          <TextTyping
            text={t('HOMEPAGE.SUB_TITLE') || ''}
            speed={10}
            className='sm:w-3/5 text-base text-center lg:text-2xl md:text-lg text-[#273F4F] font-semibold !p-4 md:text-start leading-10'
          />

          <div className='text-white text-lg md:text-xl font-bold slide-in-left !uppercase cursor-pointer !rounded-full !md:py-4 !md:px-10 !py-3 ml-4 !px-8 bg-[#FE7743] hover:bg-[#ea9c77] transition-all duration-300 ease-in-out shadow-[#FE774380] shadow-lg'>
            {t('HOMEPAGE.BUTTON')}
          </div>
        </div>
      </div>
      <DownCircleFilled
        className='!text-[#FE7743] text-5xl hover:scale-125 shadow-md absolute bottom-10 right-10 ttom-20 md:right-20 md:boborder-none !p-0 !m-0 rounded-full'
        onClick={onScrollToNext}
      />
    </div>
  );
};

export default MainScreen;
