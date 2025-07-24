import { Image } from 'antd';
import { useTranslation } from 'react-i18next';

import PartnerCard from './PartnerCard';
import { PartnerUnit1, PartnerUnit2, CelebUnit2, DevPlus } from '@app/assets/images/Logos';
import { PartnerIcons } from '@app/assets/images/PartnerIcon';
const PartnerNetwork = () => {
  const { t } = useTranslation();
  return (
    <div id='partner-network' className='w-full h-full bg-[#FFFBF9] pt-20'>
      <div className='w-[90%] mx-auto'>
        <div className='text-center mb-4 font-extrabold text-2xl xsM:text-3xl smM:text-4xl md:text-5xl text-[#FE7743]'>
          {t('HOMEPAGE.PARTNER_TITLE')}
        </div>
        <div className='text-center text-base font-medium text-[#444444] '>
          {t('HOMEPAGE.PARTNER_DESC')}
        </div>
        <div className='w-full h-full grid grid-cols-1 smXS:grid-cols-2 gap-6 sm:gap-14 px-2 sm:px-32 md:px-6 lg:px-28 mt-10 '>
          <div className='flex flex-col items-center justify-between gap-6 w-full h-full'>
            <span className='text-2xl mdL:text-3xl font-extrabold text-[#02185B] text-nowrap'>
              {t('HOMEPAGE.BANNER_USER.ORGANIZER')}
            </span>
            <div className='grid grid-cols-2 smXS:grid-cols-1 md:grid-cols-2 w-full h-full gap-3 flex-1'>
              <PartnerCard idx={0} img={DevPlus} name={t('HOMEPAGE.PARTNER_ORG1')} hScale='90%' />
              <PartnerCard
                idx={1}
                img={CelebUnit2}
                name={t('HOMEPAGE.PARTNER_ORG2')}
                hScale='h-[100%]'
              />
            </div>
          </div>
          <div className='flex flex-col items-center justify-between gap-6 w-full h-full'>
            <span className='text-2xl mdL:text-3xl font-extrabold text-[#02185B] text-nowrap'>
              {t('HOMEPAGE.BANNER_USER.PARTNER')}
            </span>
            <div className='grid grid-cols-2 smXS:grid-cols-1 md:grid-cols-2 w-full h-full gap-3 flex-1'>
              <PartnerCard
                idx={2}
                img={PartnerUnit1}
                name={t('HOMEPAGE.PARTNER_PARTNER1')}
                hScale='h-[60%]'
              />
              <PartnerCard
                idx={3}
                img={PartnerUnit2}
                name={t('HOMEPAGE.PARTNER_PARTNER2')}
                hScale='h-[60%]'
              />
            </div>
          </div>
        </div>
        <div className='text-center text-2xl mdL:text-3xl font-extrabold text-[#02185B] mt-10 mb-6'>
          {t('HOMEPAGE.PARTNER_NETWORK_TITLE')}
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 py-6 w-[90%] mx-auto '>
          {PartnerIcons.map((partner, idx) => (
            <PartnerCard key={idx} idx={idx} img={partner.img} name={partner.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnerNetwork;
