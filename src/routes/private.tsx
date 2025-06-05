import { lazy } from 'react';

import AuthLayout from '@app/components/templates/AuthLayout';
import ProfileLayout from '@app/components/templates/ProfileLayout';
import { Homepage, Profile } from '@app/pages/index';
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
            path: '/',
            element: <Homepage />,
          },
          {
            element: <ProfileLayout />,
            children: [
              {
                path: 'profile',
                element: <Profile />,
              },
              {
                path: 'history',
                element: <ExamHistory />,
              },
            ],
          },
        ],
      },
    ],
  },
];

export default routes;
