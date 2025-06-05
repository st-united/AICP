import FooterSection from '@app/components/Layout/Footer/FooterSection';
import DashboardSection from '@app/components/UserPage/DashboardSection';
import RecommendSection from '@app/components/UserPage/RecommentSection';
import WelcomeSection from '@app/components/UserPage/WelcomeSection';

interface UserPageProps {
  name?: string;
}

const UserPage = ({ name }: UserPageProps) => {
  return (
    <>
      <WelcomeSection name={name} />
      <DashboardSection />
      <RecommendSection />
      <FooterSection />
    </>
  );
};

export default UserPage;
