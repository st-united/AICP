import { useTranslation } from 'react-i18next';

import { LandingFeatSection1, LandingFeatSection2, LandingFeatSection3 } from '@app/assets/svgs';

const FeatureSection = () => {
  const { t } = useTranslation();
  const imageList = [LandingFeatSection1, LandingFeatSection2, LandingFeatSection3];
  const feats = t('HOMEPAGE.FEATURES_BENEFITS', { returnObjects: true }) as Array<{
    TITLE: string;
  }>;
  return (
    <div className='container mx-auto text-center md:mt-10'>
      <p className='text-[#FE7743] font-semibold mb-2 text-xl'>{t('HOMEPAGE.FEATURES_LABEL')}</p>
      <h2 className='text-3xl md:text-4xl font-bold text-[#FE7743] mb-4'>
        {t('HOMEPAGE.FEATURES_TITLE')}
      </h2>
      <p className='text-gray-700 text-base md:text-2xl mb-10 max-w-4xl font-[600] mx-auto'>
        {t('HOMEPAGE.FEATURES_SUBTITLE')}
      </p>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        {feats.map((benefit, index) => (
          <div key={index} className='flex flex-col items-center p-6 rounded-2xl mr-8'>
            <img
              src={imageList[index]}
              alt={benefit.TITLE}
              className='w-full h-full object-contain mb-4 slide-up'
            />
            <h3 className='fade-in-text text-2xl font-[800] text-gray-900'>{benefit.TITLE}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
