import AuthLayout from '@app/components/templates/AuthLayout';
import ProfileLayout from '@app/components/templates/ProfileLayout';
import PublicLayout from '@app/components/templates/PublicLayout/index';
import { Homepage, Profile } from '@app/pages/index';

const routes = [
  {
    element: <PublicLayout />,
    children: [],
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
        ],
      },
    ],
  },
];

export default routes;
