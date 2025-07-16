import { DownCircleFilled } from '@ant-design/icons';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import LazyComponent from './LazyComponent';
import { CyborgHand } from '@app/assets/images';
import { TextTyping } from '@app/components/atoms/';
import './homepage.scss';

type Props = {
  onScrollToNext: () => void;
};

const MainScreen = ({ onScrollToNext }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleLoginClick = () => navigate('/login');

  return (
    <div className='flex flex-col w-full h-screen'>
      <div className='h-screen w-full bg-cover bg-no-repeat bg-center bg-[url(./assets/images/homepage-bg.png)] relative'>
        <LazyComponent className='flex flex-col items-center justify-center container w-full h-full gap-6 mx-auto xsM:w-[90%] smM:pl-2 smM:py-4 smM:items-start xl:w-[90%]'>
          <div className='text-center text-[#273F4F] font-bold mb-4 text-2xl smM:text-3xl smM:text-start xl:text-4xl'>
            {t('HOMEPAGE.PRIMARY_TITLE')}
          </div>
          <TextTyping
            text={t('HOMEPAGE.TITLE') || ''}
            speed={50}
            className='text-primary !font-extrabold text-center text-2xl xsM:text-3xl smS:mb-8 smM:text-5xl xl:text-6xl'
          />
          <TextTyping
            text={t('HOMEPAGE.SUB_TITLE') || ''}
            speed={10}
            className='!text-[#273F4F] font-normal !leading-10 text-center smS:mb-8 smM:text-start smM:w-[50%] mdL:w-[45%] mdL:!leading-relaxed text-lg xsM:text-xl mdM:text-2xl xl:text-3xl'
          />
          <Button
            className='h-12 mdL:h-14 !text-white font-bold !uppercase !rounded-full shadow-light slide-in-left bg-primary border !border-primary px-8 text-base smM:text-xl cursor-pointer hover:bg-white hover:!text-primary transition-all duration-300'
            onClick={handleLoginClick}
          >
            {t('HOMEPAGE.BUTTON')}
          </Button>
          <DownCircleFilled
            className='!text-primary text-5xl hover:scale-110 absolute bottom-10 right-10 md:right-20 md:boborder-none !p-0 !m-0 rounded-full z-10'
            onClick={onScrollToNext}
          />
          <img
            className='hidden absolute bottom-0 right-0 lg:right-20 lgL:right-40 smM:block '
            src={CyborgHand}
            alt='CyborgHand'
          />
        </LazyComponent>
      </div>
    </div>
  );
};

export default MainScreen;
