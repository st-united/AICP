import { useRef } from 'react';

import LandingLayout from '@app/components/LandingPage/LandingLayout';
import MainScreen from '@app/components/LandingPage/MainScreen';

const smoothScrollTo = (targetY: number, duration = 1200) => {
  const startY = window.scrollY;
  const distanceY = targetY - startY;
  let startTime: number | null = null;

  const animateScroll = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const easeInOut = 0.5 * (1 - Math.cos(Math.PI * progress));
    window.scrollTo(0, startY + distanceY * easeInOut);

    if (timeElapsed < duration) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
};

const Homepage = () => {
  const section2Ref = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    const target = section2Ref.current;
    if (target) {
      const y = target.offsetTop;
      smoothScrollTo(y, 1200);
    }
  };

  return (
    <div className='w-full min-h-screen scroll-smooth'>
      {/* Section 1 */}
      <div className='h-screen'>
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
