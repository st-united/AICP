import { Button, Carousel } from 'antd';
import { useTranslation } from 'react-i18next';

import LazyComponent from './LazyComponent';
import { LandingMonitor } from '@app/assets/svgs';

const StepSection = () => {
  const { t } = useTranslation();

  const steps = [
    {
      image: LandingMonitor,
      label: t('HOMEPAGE.STEP1'),
      title: t('HOMEPAGE.STEP1_TITLE'),
      desc: t('HOMEPAGE.STEP1_DESC'),
      note: t('HOMEPAGE.STEP1_MONITOR_NOTE'),
    },
    {
      image: LandingMonitor,
      label: t('HOMEPAGE.STEP2'),
      title: t('HOMEPAGE.STEP2_TITLE'),
      desc: t('HOMEPAGE.STEP2_DESC'),
      note: t('HOMEPAGE.STEP2_MONITOR_NOTE'),
    },
    {
      image: LandingMonitor,
      label: t('HOMEPAGE.STEP3'),
      title: t('HOMEPAGE.STEP3_TITLE'),
      desc: t('HOMEPAGE.STEP3_DESC'),
      note: t('HOMEPAGE.STEP3_MONITOR_NOTE'),
    },
    {
      image: LandingMonitor,
      label: t('HOMEPAGE.STEP4'),
      title: t('HOMEPAGE.STEP4_TITLE'),
      desc: t('HOMEPAGE.STEP4_DESC'),
      note: t('HOMEPAGE.STEP4_MONITOR_NOTE'),
    },
  ];

  return (
    <div className='w-full h-full xl:min-h-screen mb-20 bg-cover bg-center bg-no-repeat bg-[url(./assets/images/landingpage_step_bg.png)]'>
      <div className='max-w-6xl mx-auto text-center py-12 px-6 md:px-12'>
        <p className='text-base sm:text-xl md:text-2xl text-[#FE7743] font-semibold mb-4'>
          {t('HOMEPAGE.STEP_LABEL')}
        </p>
        <h2 className='text-xl md:text-4xl text-[#FE7743] font-bold mb-4 sm:mb-8'>
          {t('HOMEPAGE.STEP_TITLE')}
        </h2>
        <p className='text-base md:text-2xl text-gray-700 max-w-2xl mx-auto my-3 font-[800]'>
          {t('HOMEPAGE.STEP_SUBTITLE')}
        </p>
      </div>
      <div className='md:container w-4/5 md:w-5/6 xl:w-full bg-[#FF7A00] rounded-3xl text-white mx-10 px-10 md:px-12 md:mx-auto bg-cover bg-center bg-[url(./assets/images/step-bg.png)]'>
        <div className='relative min-h-[26rem] md:min-h-[30rem] flex items-center'>
          <Carousel dots vertical className='w-full h-full'>
            {steps.map((step, idx) => (
              <div key={idx} className='h-[26rem] md:h-[30rem] flex items-center'>
                <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full'>
                  <div className='hidden md:flex flex-col items-center justify-center h-full'>
                    <LazyComponent>
                      <img
                        src={step.image}
                        alt={`Monitor step ${idx + 1}`}
                        className='slide-up-then-left mb-4 max-w-[21rem] max-h-[16rem]'
                        width={340}
                        height={260}
                      />
                    </LazyComponent>
                    <p className='text-white text-xl text-center max-w-sm'>{step.note}</p>
                  </div>
                  <div className='flex flex-col justify-center h-full'>
                    <p className='text-white text-3xl md:text-4xl font-bold mb-10 xl:mb-16'>
                      {step.label}
                    </p>
                    <p className='text-white font-semibold text-xl md:text-2xl mb-4'>
                      {step.title}
                    </p>
                    <p className='!text-white text-sm md:text-base mb-6'>{step.desc}</p>
                    <Button className='bg-white h-12 w-44 text-lg text-[#FE7743] font-bold rounded-full border-none shadow-md hover:bg-[#FE7743] hover:text-white transition'>
                      {t('HOMEPAGE.STEP_BUTTON')}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default StepSection;
