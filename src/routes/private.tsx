import { lazy } from 'react';

import AuthLayout from '@app/components/templates/AuthLayout';
import ProfileLayout from '@app/components/templates/ProfileLayout';
import { Homepage, Profile, SignIn } from '@app/pages/index';
import PasswordChangeForm from '@app/pages/Profile/ChangePassword';

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
                path: 'change-password',
                element: <PasswordChangeForm />,
              },
            ],
          },
        ],
      },
    ],
  },
];

export default routes;
