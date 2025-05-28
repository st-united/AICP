import { useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import LandingLayout from '@app/components/LandingPage/LandingLayout';
import MainScreen from '@app/components/LandingPage/MainScreen';
import { smoothScrollTo } from '@app/utils/scroll';
import UserPage from '../UserPage/UserPage';

const Homepage = () => {
  const isAuth = useSelector((state: any) => state.auth.isAuth);
  const user = useSelector((state: any) => state.auth.user);
  const section2Ref = useRef<HTMLDivElement>(null);
  const handleNext = useCallback(() => {
    const target = section2Ref.current;
    if (target) {
      const y = target.offsetTop;
      smoothScrollTo(y, 1200);
    }
  }, []);

  if (isAuth) return <UserPage name={user?.name} />;

  return (
    <div className='w-full min-h-screen scroll-smooth'>
      <div className='h-screen'>
        <MainScreen onScrollToNext={handleNext} />
      </div>
      <div ref={section2Ref}>
        <LandingLayout />
      </div>
    </div>
  );
};

export default Homepage;
