import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import FaqSection from '@app/components/Layout/FaqSection/FaqSection';
import FooterSection from '@app/components/Layout/Footer/FooterSection';
import BannerUserScreen from '@app/components/UserPage/BannerUserScreen';
import StepScreen from '@app/components/UserPage/StepScreen';
import Experts from '@app/pages/LandingPage/Experts';
import FeatureSection from '@app/pages/LandingPage/FeatureSection';
import PartnerNetwork from '@app/pages/LandingPage/PartnerNetwork';

const Homepage = () => {
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
            <PartnerNetwork />
            <Experts />
            <FaqSection />
          </div>
          <FooterSection />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
