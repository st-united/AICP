import { useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';

import BannerScreen from '@app/components/LandingPage/BannerScreen';
import FeatureSection from '@app/components/LandingPage/FeatureSection';
import MainScreen from '@app/components/LandingPage/MainScreen';
import StepSection from '@app/components/LandingPage/StepSection';
import FaqSection from '@app/components/Layout/FaqSection/FaqSection';
import FooterSection from '@app/components/Layout/Footer/FooterSection';
import BannerUserScreen from '@app/components/UserPage/BannerUserScreen';
import StepScreen from '@app/components/UserPage/StepScreen';
import { smoothScrollTo } from '@app/utils/scroll';

const Homepage = () => {
  const isAuth = useSelector((state: any) => state.auth.isAuth);
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
      {!isAuth && (
        <div className='h-screen'>
          <BannerScreen />
        </div>
      )}
      {!isAuth ? (
        <div className='h-screen'>
          <MainScreen onScrollToNext={handleNext} />
        </div>
      ) : (
        <>
          <BannerUserScreen />
          <StepScreen
            steps={[
              {
                label: 'Bài test năng lực AI',
                desc: 'Bộ câu hỏi về khả năng ứng dụng AI được đội ngũ Devplus nghiên cứu và biên soạn',
              },
              {
                label: 'Hoàn thiện hồ Sơ',
                desc: 'Hoàn thiện hồ sơ cá nhân, cung cấp thông tin về quá trình làm việc để hệ thống có đánh giá trực quan hơn.',
              },
              {
                label: 'Phỏng vấn cùng chuyên gia',
                desc: 'Đặt lịch phỏng vấn với Interviewer chuyên nghiệp và kinh nghiệm, bước cuối cùng để đánh giá chính xác nhất về năng lực AI',
              },
            ]}
            activeStep={1}
          />
        </>
      )}

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
