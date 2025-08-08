import FeatureSection from './FeatureSection';
import StepSection from './StepSection';
import FaqSection from '../../../components/Layout/FaqSection/FaqSection';
import FooterSection from '../../../components/Layout/Footer/FooterSection';

const LandingLayout = () => {
  return (
    <div className='w-full min-h-screen overflow-hidden bg-white'>
      <div className='flex flex-col justify-center items-center mx-auto'>
        <FeatureSection />
        <StepSection />
        <FaqSection />
      </div>
      <FooterSection />
    </div>
  );
};

export default LandingLayout;
