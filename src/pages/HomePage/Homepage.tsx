import { useCallback, useRef } from 'react';

import LandingLayout from '@app/components/LandingPage/LandingLayout';
import MainScreen from '@app/components/LandingPage/MainScreen';
import { smoothScrollTo } from '@app/utils/scroll';
import Header from '@app/components/Layout/Header/Header';

const Homepage = () => {
  const section2Ref = useRef<HTMLDivElement>(null);

  const handleNext = useCallback(() => {
    const target = section2Ref.current;
    if (target) {
      const y = target.offsetTop;
      smoothScrollTo(y, 1200);
    }
  }, []);

  return (
    <div className='w-full min-h-screen scroll-smooth'>
      {/* Section 1 */}
      <div className='h-screen'>
        <Header />
        <MainScreen onScrollToNext={handleNext} />
      </div>

      {/* Section 2 */}
      <div ref={section2Ref}>
        <LandingLayout />
      </div>
    </div>
  );
};

export default Homepage;
