import FeatureSection from './FeatureSection';
import StepSection from './StepSection';
import FaqSection from '../Layout/FaqSection/FaqSection';
import FooterSection from '../Layout/Footer/FooterSection';

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
