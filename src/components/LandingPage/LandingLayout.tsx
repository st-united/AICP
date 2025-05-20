import FaqSection from './FaqSection';
import FeatureSection from './FeatureSection';
import FooterSection from './FooterSection';
import LazySection from './LazySection';
import StepSection from './StepSection';

const LandingLayout = () => {
  return (
    <div className='w-full min-h-screen overflow-hidden bg-white'>
      <div className='px-4 md:px-30 lg:px-60 mx-auto'>
        <LazySection className='py-10'>
          <FeatureSection />
        </LazySection>
        <LazySection className='py-10'>
          <StepSection />
        </LazySection>
        <LazySection className='py-10'>
          <FaqSection />
        </LazySection>
      </div>
      <LazySection>
        <FooterSection />
      </LazySection>
    </div>
  );
};

export default LandingLayout;
