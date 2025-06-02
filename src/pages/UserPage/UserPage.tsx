import { useSelector } from 'react-redux';

import FooterSection from '@app/components/Layout/Footer/FooterSection';
import DashboardSection from '@app/components/UserPage/DashboardSection';
import RecommendSection from '@app/components/UserPage/RecommentSection';
import WelcomeSection from '@app/components/UserPage/WelcomeSection';

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
