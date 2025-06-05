import { lazy } from 'react';

import { NAVIGATE_URL } from '@app/constants';

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
    ],
  },
];

export default routes;
