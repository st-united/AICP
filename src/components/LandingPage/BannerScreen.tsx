import { Image } from 'antd';
import { useTranslation } from 'react-i18next';

import { BannerRobot } from '@app/assets/images';
import { PartnerUnit1, PartnerUnit2, CelebUnit, DevPlus } from '@app/assets/images/Logos';

import './homepage.scss';

type Props = {
  onScrollToNext: () => void;
};

const BannerScreen = () => {
  const { t } = useTranslation();

  return (
    <div className='w-full h-screen bg-[#FFFBF9] pt-16 px-2 sm:px-12'>
      <div className='flex flex-row justify-center w-full h-full gap-28'>
        <div className='w-1/3 items-center justify-center hidden mdM:flex'>
          <Image
            preview={false}
            className='flex !w-full aspect-square object-cover object-center'
            src={BannerRobot}
            alt='robot banner'
          />
        </div>

        <div className='flex flex-col justify-center items-start flex-1 text-center sm:text-left'>
          <div className='flex flex-row gap-8 md:gap-32 w-full'>
            <div className='flex h-full flex-col w-[40%] md:w-[24%] lgS:w-[24%] xl:w-[19%]'>
              <div className='w-full text-xl sm:text-2xl font-bold'>
                {' '}
                {t('HOMEPAGE.BANNER_SCREEN.ORGANIZER')}
              </div>
              <div className='flex h-full w-full flex-row gap-4 items-end mt-1'>
                <Image
                  preview={false}
                  className='!h-full !aspect-square object-contain object-bottom'
                  src={CelebUnit}
                  alt='celeb unit'
                />
                <Image
                  preview={false}
                  className='!h-full !aspect-square object-contain object-bottom'
                  src={DevPlus}
                  alt='dev plus'
                />
              </div>
            </div>
            <div className='flex h-full flex-col w-[55%]'>
              <div className='w-full text-xl sm:text-2xl font-bold'>
                {t('HOMEPAGE.BANNER_SCREEN.PARTNER')}
              </div>
              <div className='flex h-full w-full flex-row gap-8 align-bottom items-end justify-start custom-banner pb-2 mt-3'>
                <Image
                  preview={false}
                  className='!object-contain '
                  src={PartnerUnit1}
                  alt='partner unit 1'
                />
                <Image
                  preview={false}
                  className='!object-contain '
                  src={PartnerUnit2}
                  alt='partner unit 2'
                />
              </div>
            </div>
          </div>
          <div className='rounded-xl py-8 w-full'>
            <span className='w-full text-center sm:text-left text-[48px] md:text-[72px] font-[1000] tracking-wide mb-6 text-[#FE7743] bg-clip-text'>
              {t('HOMEPAGE.BANNER_SCREEN.TITLE')}
            </span>
          </div>
          <span className='text-xl font-[700]'>{t('HOMEPAGE.BANNER_SCREEN.SUBTITLE')}</span>

          <div className='flex flex-row gap-2 mt-8'>
            <span className='text-xl font-semibold'>
              <span className='text-3xl font-[900] text-[#FF8242]'>
                {t('HOMEPAGE.BANNER_SCREEN.STUDENT_COUNT')}
              </span>{' '}
              {t('HOMEPAGE.BANNER_SCREEN.STUDENT_TEXT')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerScreen;
