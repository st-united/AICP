import { lazy } from 'react';

import BaseLayout from '@app/components/templates/BaseLayout';
import ProfileLayout from '@app/components/templates/ProfileLayout';
import { NAVIGATE_URL } from '@app/constants';
import { AptitudeTest, Profile, Homepage } from '@app/pages';
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
            path: 'scheduler',
            element: <Booking />,
          },
          {
            path: 'aptitude-test',
            element: <AptitudeTest />,
          },
        ],
      },
      {
        element: <ProfileLayout />,
        children: [
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'change-password',
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
