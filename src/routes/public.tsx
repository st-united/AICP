import ProfileLayout from '@app/components/templates/ProfileLayout';
import PublicLayout from '@app/components/templates/PublicLayout/index';
import { Homepage, Profile } from '@app/pages/index';

const routes = [
  {
    element: <PublicLayout />,
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
  {
    // element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <div className='bg-black !p-2 font-bold text-white'>Login Page</div>,
      },
    ],
  },
];

export default routes;
