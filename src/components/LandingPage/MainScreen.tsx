import { DownCircleFilled } from '@ant-design/icons';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

import { CyborgHand } from '@app/assets/images';
import { TextTyping } from '@app/components/atoms/';
import './homepage.scss';

type Props = {
  onScrollToNext: () => void;
};

const MainScreen = ({ onScrollToNext }: Props) => {
  const { t } = useTranslation();

  return (
    <div className='flex flex-col w-full h-screen'>
      <div className='min-h-screen w-full bg-cover bg-no-repeat bg-center bg-[url(./assets/images/homepage-bg.png)]'>
        <img
          className='hidden absolute bottom-0 right-0 lg:right-20 md:block'
          src={CyborgHand}
          alt=''
        />
        <div className='container flex flex-col items-center justify-center gap-6 h-full mx-auto lg:mx-6 xl:mx-auto md:items-start '>
          <div className='text-center text-xl md:text-3xl md:text-start lg:text-5xl leading-12 font-bold max-w-[19rem] md:max-w-full sm:p-4 xl:p-2'>
            {t('HOMEPAGE.PRIMARY_TITLE')}
          </div>
          <TextTyping
            text={t('HOMEPAGE.TITLE') || ''}
            speed={50}
            className='text-3xl text-[#FE7743] text-center lg:text-7xl md:text-5xl md:max-w-full leading-10 font-bold sm:p-4 xl:p-2'
          />
          <TextTyping
            text={t('HOMEPAGE.SUB_TITLE') || ''}
            speed={10}
            className='sm:w-3/5 text-base text-center lg:text-2xl md:text-lg !text-[#273F4F] font-semibold !p-4 md:text-start leading-10 xl:p-2'
          />
          <Button className='!text-white h-12 border-none md:ml-4 xl:mx-2 text-lg md:text-xl font-bold slide-in-left !uppercase cursor-pointer !rounded-full px-8 bg-[#FE7743] transition-all duration-300 shadow-[#FE774380] shadow-lg'>
            {t('HOMEPAGE.BUTTON')}
          </Button>
        </div>
      </div>
      <DownCircleFilled
        className='!text-[#FE7743] text-5xl hover:scale-125 shadow-md absolute bottom-10 right-10 md:right-20 md:boborder-none !p-0 !m-0 rounded-full'
        onClick={onScrollToNext}
      />
    </div>
  );
};

export default MainScreen;
