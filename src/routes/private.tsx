import { lazy } from 'react';

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
        path: 'profile',
        element: <PasswordChangeForm />,
      },
    ],
  },
];

export default routes;
