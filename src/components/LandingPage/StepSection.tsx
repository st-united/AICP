import { useTranslation } from 'react-i18next';

import { LandingStepBg, LandingMonitor } from '@app/assets/svgs';

const StepSection = () => {
  const { t } = useTranslation();
  return (
    <section className='bg-white'>
      <div className='max-w-6xl mx-auto text-center mb-12'>
        <p className='text-[#FE7743] font-semibold mb-2 text-xl'> {t('HOMEPAGE.STEP_LABEL')}</p>
        <h2 className='text-[#FE7743] text-3xl md:text-4xl font-bold mb-4'>
          {t('HOMEPAGE.STEP_TITLE')}
        </h2>
        <p className='text-gray-700 text-base md:text-2xl max-w-2xl mx-auto font-[800]'>
          {t('HOMEPAGE.STEP_SUBTITLE')}
        </p>
      </div>

      <div
        className='bg-[#FF7A00] rounded-3xl text-white px-6 md:px-12 py-20'
        style={{ backgroundImage: `url(${LandingStepBg})` }}
      >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10'>
          <div className='flex flex-col items-center'>
            <div>
              <img
                src={LandingMonitor}
                alt='Monitor'
                className='!w-100 !h-100 slide-up-then-left'
              />
            </div>
            <p className='text-white text-sm italic text-center max-w-xs'>
              {t('HOMEPAGE.STEP_MONITOR_NOTE')}
            </p>
          </div>

          <div>
            <p className='text-white text-xl md:text-4xl font-bold mb-3'> {t('HOMEPAGE.STEP1')}</p>
            <p className='text-white font-semibold text-lg md:text-2xl mb-2'>
              {t('HOMEPAGE.STEP1_TITLE')}
            </p>
            <p className='text-white text-sm md:text-base mb-6'>{t('HOMEPAGE.STEP1_DESC')}</p>
            <button className='bg-white text-[#FE7743] font-semibold px-6 py-3 rounded-full shadow-md hover:bg-orange-100 transition'>
              {t('HOMEPAGE.BUTTON')}
            </button>
          </div>
        </div>

        {/* Shape nền sao hoặc sóng (decor) */}
        <div className='absolute right-0 bottom-0 z-0 opacity-20'>
          <img src='/images/ai-background-shape.png' alt='decor' className='w-64' />
        </div>
      </div>
    </section>
  );
};

export default StepSection;
