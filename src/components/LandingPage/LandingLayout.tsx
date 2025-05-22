import FaqSection from '../Layout/FaqSection/FaqSection';
import FeatureSection from './FeatureSection';
import FooterSection from './FooterSection';
import StepSection from './StepSection';

const LandingLayout = () => {
  return (
    <div className='w-full min-h-screen overflow-hidden bg-white'>
      <div className='flex flex-col justify-center items-center mx-auto '>
        <FeatureSection />
        <StepSection />
        <FaqSection />
      </div>
      <FooterSection />
    </div>
  );
};

export default LandingLayout;
