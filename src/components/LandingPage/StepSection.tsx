import { useTranslation } from 'react-i18next';

import LazyComponent from './LazyComponent';
import { LandingMonitor } from '@app/assets/svgs';

const StepSection = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div className='w-full h-screen bg-cover bg-center bg-no-repeat bg-[url(./assets/images/landingpage_step_bg.png)]'>
        <div className='max-w-6xl mx-auto text-center py-12 px-6 md:px-12 '>
          <p className='text-base sm:text-xl md:text-2xl text-[#FE7743] font-semibold mb-4 '>
            {t('HOMEPAGE.STEP_LABEL')}
          </p>
          <h2 className='text-xl md:text-4xl text-[#FE7743] font-bold mb-4 sm:mb-8'>
            {t('HOMEPAGE.STEP_TITLE')}
          </h2>
          <p className='text-base md:text-2xl text-gray-700 max-w-2xl mx-auto my-3 font-[800]'>
            {t('HOMEPAGE.STEP_SUBTITLE')}
          </p>
        </div>
        <div className='bg-[#FF7A00] rounded-3xl text-white px-6 md:px-12 py-20 mx-6 md:mx-16 bg-cover bg-center bg-[url(./assets/svgs/landing_step_bg.svg)]'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10'>
            <div className='flex flex-col items-center'>
              <LazyComponent>
                <div>
                  <img
                    src={LandingMonitor}
                    alt='Monitor'
                    className='!w-100 !h-100 slide-up-then-left'
                    width={400}
                    height={300}
                  />
                </div>
              </LazyComponent>
              <p className='text-white text-sm italic text-center max-w-xs'>
                {t('HOMEPAGE.STEP_MONITOR_NOTE')}
              </p>
            </div>

            <div>
              <p className='text-white text-xl md:text-4xl font-bold mb-3'>
                {' '}
                {t('HOMEPAGE.STEP1')}
              </p>
              <p className='text-white font-semibold text-lg md:text-2xl mb-2'>
                {t('HOMEPAGE.STEP1_TITLE')}
              </p>
              <p className='text-white text-sm md:text-base mb-6'>{t('HOMEPAGE.STEP1_DESC')}</p>
              <button className='bg-white text-[#FE7743] font-semibold px-6 py-3 rounded-full shadow-md hover:bg-[#FE7743] hover:text-black transition'>
                {t('HOMEPAGE.BUTTON')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepSection;
