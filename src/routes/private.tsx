import { lazy } from 'react';

import AuthLayout from '@app/components/templates/AuthLayout';
import ProfileLayout from '@app/components/templates/ProfileLayout';
import { AptitudeTest, Profile } from '@app/pages';
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
        path: '404',
        element: <NotFound />,
      },
      {
        path: '403',
        element: <Forbidden />,
      },
      {
        element: <AuthLayout />,
        children: [
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
                path: 'history',
                element: <ExamHistory />,
              },
            ],
          },
        ],
      },
      {
        path: 'aptitude-test',
        element: <AptitudeTest />,
      },
    ],
  },
];

export default routes;
