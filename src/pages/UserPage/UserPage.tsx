import WelcomeSection from '@app/components/UserPage/WelcomeSection';
import DashboardSection from '@app/components/UserPage/DashboardSection';
import RecommendSection from '@app/components/UserPage/RecommentSection';
import FooterSection from '@app/components/Layout/Footer/FooterSection';
import { useSelector } from 'react-redux';

interface UserPageProps {
  name?: string;
}

const UserPage = ({ name }: UserPageProps) => {
  const auth = useSelector((state: any) => state.auth);
  console.log(auth);
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
