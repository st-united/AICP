import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import FeatureSection from '@app/components/LandingPage/FeatureSection';
import StepSection from '@app/components/LandingPage/StepSection';
import FaqSection from '@app/components/Layout/FaqSection/FaqSection';
import FooterSection from '@app/components/Layout/Footer/FooterSection';
import BannerUserScreen from '@app/components/UserPage/BannerUserScreen';
import StepScreen from '@app/components/UserPage/StepScreen';

const Homepage = () => {
  const isAuth = useSelector((state: any) => state.auth.isAuth);
  const { t } = useTranslation();
  const section2Ref = useRef<HTMLDivElement>(null);

  return (
    <div className='w-full min-h-screen scroll-smooth'>
      <BannerUserScreen />
      <StepScreen
        steps={[
          {
            label: t('HOMEPAGE.STEP_SCREEN.STEP_1.LABEL'),
            desc: t('HOMEPAGE.STEP_SCREEN.STEP_1.DESC'),
          },
          {
            label: t('HOMEPAGE.STEP_SCREEN.STEP_2.LABEL'),
            desc: t('HOMEPAGE.STEP_SCREEN.STEP_2.DESC'),
          },
          {
            label: t('HOMEPAGE.STEP_SCREEN.STEP_3.LABEL'),
            desc: t('HOMEPAGE.STEP_SCREEN.STEP_3.DESC'),
          },
        ]}
        activeStep={1}
      />
      <div ref={section2Ref}>
        <div className='w-full min-h-screen overflow-hidden bg-white'>
          <div className='flex flex-col justify-center items-center mx-auto'>
            <FeatureSection />
            {!isAuth && <StepSection />}
            <FaqSection />
          </div>
          <FooterSection />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
