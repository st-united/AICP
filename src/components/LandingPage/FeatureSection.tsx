import { useTranslation } from 'react-i18next';

import LazyComponent from './LazyComponent';
import { LandingFeatSection1, LandingFeatSection2, LandingFeatSection3 } from '@app/assets/svgs';

const imageList = [LandingFeatSection1, LandingFeatSection2, LandingFeatSection3];

const FeatureSection = () => {
  const { t } = useTranslation();
  const feats = t('HOMEPAGE.FEATURES_BENEFITS', { returnObjects: true }) as Array<{
    TITLE: string;
  }>;

  return (
    <div className='bg-[#FFFBF9] w-full px-20 sm:px-20 md:px-16 md:py-12 text-center'>
      <p className='text-[#FE7743] font-semibold mb-2 text-xl'>{t('HOMEPAGE.FEATURES_LABEL')}</p>
      <h2 className='text-3xl md:text-4xl font-bold text-[#FE7743] mb-4'>
        {t('HOMEPAGE.FEATURES_TITLE')}
      </h2>
      <p className='text-gray-700 text-base md:text-2xl mb-10 max-w-4xl font-[600] mx-auto'>
        {t('HOMEPAGE.FEATURES_SUBTITLE')}
      </p>
      <LazyComponent>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-32'>
          {feats.map((benefit, index) => (
            <div key={index} className='flex flex-col items-center'>
              <div className='w-full h-full relative'>
                <div className='bg-zoom-in w-full bg-[#FE7743] aspect-square rounded-2xl'></div>
                <img
                  src={imageList[index]}
                  alt={benefit.TITLE}
                  className='w-full object-cover slide-up absolute left-[-50px] bottom-0'
                />
              </div>
              <h3 className='fade-in-text text-2xl font-[800] text-gray-900'>{benefit.TITLE}</h3>
            </div>
          ))}
        </div>
      </LazyComponent>
    </div>
  );
};

export default FeatureSection;
