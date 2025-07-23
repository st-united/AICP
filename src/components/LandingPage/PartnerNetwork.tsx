import { Image } from 'antd';
import { useTranslation } from 'react-i18next';

import { PartnerUnit1, PartnerUnit2, CelebUnit, DevPlus } from '@app/assets/images/Logos';
import { PartnerIcons } from '@app/assets/images/PartnerIcon';
const PartnerNetwork = () => {
  const { t } = useTranslation();
  return (
    <div id='partner-network' className='w-full h-full bg-[#FFFBF9] pt-20'>
      <div className='w-[90%] mx-auto'>
        <div className='text-center text-5xl font-extrabold text-[#FE7743] mb-4'>
          {t('HOMEPAGE.PARTNER_TITLE')}
        </div>
        <div className='text-center text-base font-medium text-[#444444] '>
          {t('HOMEPAGE.PARTNER_DESC')}
        </div>
        <div className='w-full h-full grid grid-cols-1 smXS:grid-cols-2 gap-6 sm:gap-14 px-2 sm:px-16 mt-10 '>
          <div className='flex flex-col items-center justify-between gap-6 w-full h-full'>
            <span className='text-2xl mdL:text-3xl font-extrabold text-[#FE7743]'>
              {t('HOMEPAGE.BANNER_USER.ORGANIZER')}
            </span>
            <div className='grid grid-cols-2 smXS:grid-cols-1 md:grid-cols-2 w-full h-full gap-3'>
              <div className='flex flex-col w-full h-full gap-2'>
                <div className='rounded-xl shadow-md bg-white flex items-center justify-center w-full h-full'>
                  <img
                    className='object-contain py-2 md:py-0 w-[30%] h-[80%]'
                    src={DevPlus}
                    alt='celeb unit'
                  />
                </div>
                <span className='text-base font-bold text-center'>
                  {t('HOMEPAGE.PARTNER_ORG1')}
                </span>
              </div>
              <div className='flex flex-col w-full h-full gap-2'>
                <div className='rounded-xl shadow-md bg-white flex items-center justify-center w-full h-full'>
                  <img
                    className='object-contain py-2 md:py-0 w-[30%] h-[80%]'
                    src={CelebUnit}
                    alt='dev plus'
                  />
                </div>
                <span className='text-base font-bold text-center text-nowrap text-truncate text-ellipsis'>
                  {t('HOMEPAGE.PARTNER_ORG2')}
                </span>
              </div>
            </div>
          </div>
          <div className='flex flex-col items-center justify-between gap-6 w-full h-full'>
            <span className='text-2xl mdL:text-3xl font-extrabold text-[#FE7743]'>
              {t('HOMEPAGE.BANNER_USER.PARTNER')}
            </span>
            <div className='grid grid-cols-2 smXS:grid-cols-1 md:grid-cols-2 w-full h-full gap-3'>
              <div className='flex flex-col w-full h-full gap-2'>
                <div className='rounded-xl shadow-md bg-white flex items-center justify-center w-full h-full'>
                  <img
                    className='object-contain py-2 md:py-0 w-[70%]'
                    src={PartnerUnit1}
                    alt='partner unit 1'
                  />
                </div>
                <span className='text-base font-bold text-center text-nowrap'>
                  {t('HOMEPAGE.PARTNER_PARTNER1')}
                </span>
              </div>
              <div className='flex flex-col w-full h-full gap-2'>
                <div className='rounded-xl shadow-md bg-white flex items-center justify-center  w-full h-full'>
                  <img
                    className='object-contain py-2 md:py-0 w-[50%]'
                    src={PartnerUnit2}
                    alt='partner unit 2'
                  />
                </div>
                <span className='text-base font-bold text-center'>
                  {t('HOMEPAGE.PARTNER_PARTNER2')}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='text-center text-3xl font-extrabold text-[#FE7743] mt-10 mb-6'>
          {t('HOMEPAGE.PARTNER_NETWORK_TITLE')}
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 py-6 w-[90%] mx-auto '>
          {PartnerIcons.map((partner, idx) => (
            <div key={idx} className='flex flex-col items-center justify-center gap-1 py-2'>
              <div className='flex flex-col items-center justify-center rounded-lg py-3 shadow-[#00000040] shadow-md border border-[#0000000F] w-full h-full bg-white'>
                <img src={partner.img} alt={partner.name} className='object-scale-down h-[80%]' />
              </div>
              <span className='block text-xs md:text-base font-bold text-center  w-full'>
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnerNetwork;
