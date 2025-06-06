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
    <div className='bg-[#FFFBF9] w-full h-full'>
      <div className='container w-full h-full mx-auto xsM:w-[90%] smM:px-2 text-center py-10'>
        <p className='text-primary font-bold text-base sm:text-2xl mdM::text-3xl mb-8'>
          {t('HOMEPAGE.FEATURES_LABEL')}
        </p>
        <h2 className='text-primary font-extrabold text-2xl sm:text-3xl md:text-4xl mdM:text-5xl mb-8'>
          {t('HOMEPAGE.FEATURES_TITLE')}
        </h2>
        <p className='text-[#444444] font-medium !leading-10 mb-8 text-lg smM:px-16 md:px-36 mdL:text-3xl'>
          {t('HOMEPAGE.FEATURES_SUBTITLE')}
        </p>
        <LazyComponent>
          <div className='grid grid-cols-1 justify-items-center smM:grid-cols-3 md:gap-32'>
            {feats.map((benefit, index) => (
              <div key={index} className='flex flex-col items-center w-4/5 mdM:w-full'>
                <div className='w-full relative bg-zoom-in bg-[#FE7743] aspect-square rounded-[20px] mb-4'>
                  <img
                    src={imageList[index]}
                    alt={benefit.TITLE}
                    className='absolute w-full object-cover slide-up bottom-0 right-4 mdM:right-8'
                  />
                </div>
                <h3 className='text-[#444444] font-extrabold fade-in-text w-[18rem] lg:w-full text-xl md:text-2xl mb-8'>
                  {benefit.TITLE}
                </h3>
              </div>
            ))}
          </div>
        </LazyComponent>
      </div>
    </div>
  );
};

export default FeatureSection;
