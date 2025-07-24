import { lazy } from 'react';

import PortfolioContent from '@app/components/molecules/Portfolio/PortfolioContent';
import ExamResult from '@app/components/molecules/TestResult/ExamResult';
import BaseLayout from '@app/components/templates/BaseLayout';
import ProfileLayout from '@app/components/templates/ProfileLayout';
import { NAVIGATE_URL } from '@app/constants';
import { AptitudeTest, Profile, Capacity } from '@app/pages';
import Booking from '@app/pages/MentorBooking';
import PasswordChangeForm from '@app/pages/Profile/ChangePassword';
import ExamHistory from '@app/pages/Profile/ExamHistory';

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
            path: NAVIGATE_URL.SCHEDULE,
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
            path: NAVIGATE_URL.TEST_RESULT_DETAIL,
            element: <ExamResult />,
          },
        ],
      },
      {
        element: <ProfileLayout />,
        children: [
          {
            path: NAVIGATE_URL.PROFILE,
            element: <Profile />,
          },
          {
            path: NAVIGATE_URL.CHANGE_PASSWORD,
            element: <PasswordChangeForm />,
          },
          {
            path: NAVIGATE_URL.TEST_RESULT,
            element: <ExamHistory />,
          },
        ],
      },
    ],
  },
];

export default routes;
