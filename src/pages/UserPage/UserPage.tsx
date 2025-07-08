import FooterSection from '@app/components/Layout/Footer/FooterSection';
import DashboardSection from '@app/components/UserPage/DashboardSection';
import RecommendSection from '@app/components/UserPage/RecommentSection';
import WelcomeSection from '@app/components/UserPage/WelcomeSection';

const UserPage = () => {
  return (
    <>
      <WelcomeSection />
      <DashboardSection />
      <RecommendSection />
      <FooterSection />
    </>
  );
};

export default UserPage;
