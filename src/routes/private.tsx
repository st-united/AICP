import { lazy } from 'react';

import PortfolioContent from '@app/components/molecules/Portfolio/PortfolioContent';
import BaseLayout from '@app/components/templates/BaseLayout';
import ProfileLayout from '@app/components/templates/ProfileLayout';
import ResultLayout from '@app/components/templates/ResultLayout/ResultLayout';
import { NAVIGATE_URL } from '@app/constants';
import { AptitudeTest, Capacity } from '@app/pages';
import ExamOverview from '@app/pages/ExamResult/ExamOverview';
import PortfolioForResult from '@app/pages/ExamResult/PortfolioForResult';
import Booking from '@app/pages/MentorBooking';
import PasswordChangeForm from '@app/pages/Profile/ChangePassword';
import ExamDetailPage from '@app/pages/Profile/ExamDetailPage';
import ExamHistory from '@app/pages/Profile/ExamHistory';
import ProfilePage from '@app/pages/Profile/ProfilePage';
import ViewCourseDetail from '@app/pages/ViewCourseDetail/ViewCourseDetail';

const PrivateLayout = lazy(() => import('@app/components/templates/PrivateLayout'));
const NotFound = lazy(() => import('@app/pages/NotFound/NotFound'));
const Forbidden = lazy(() => import('@app/pages/Forbidden/Forbidden'));

const routes = [
  {
    element: <PrivateLayout />,
    children: [
      {
        path: NAVIGATE_URL.NOTFOUND,
        element: <NotFound />,
      },
      {
        path: NAVIGATE_URL.FORBIDDEN,
        element: <Forbidden />,
      },
      {
        element: <BaseLayout />,
        children: [
          {
            path: NAVIGATE_URL.INTERVIEW,
            element: <Booking />,
          },
          {
            path: NAVIGATE_URL.TEST,
            element: <AptitudeTest />,
          },
          {
            path: NAVIGATE_URL.CAPACITY,
            element: <Capacity />,
          },
          {
            path: NAVIGATE_URL.DETAIL_COURSE,
            element: <ViewCourseDetail />,
          },
        ],
      },
      {
        element: <ProfileLayout />,
        children: [
          {
            path: NAVIGATE_URL.PROFILE,
            element: <ProfilePage />,
          },
          {
            path: NAVIGATE_URL.CHANGE_PASSWORD,
            element: <PasswordChangeForm />,
          },
          {
            path: NAVIGATE_URL.TEST_RESULT,
            element: <ExamHistory />,
          },
          {
            path: NAVIGATE_URL.TEST_RESULT_DETAIL_EXAM,
            element: <ExamDetailPage />,
          },
        ],
      },
      {
        path: NAVIGATE_URL.RESULT,
        element: <ResultLayout />,
        children: [
          {
            path: NAVIGATE_URL.RESULT,
            element: <ExamOverview />,
          },
          {
            path: NAVIGATE_URL.RESULT_PORTFOLIO,
            element: <PortfolioForResult />,
          },
        ],
      },
    ],
  },
];

export default routes;
