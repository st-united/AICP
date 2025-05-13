<<<<<<< HEAD
import ProfileLayout from '@app/components/templates/ProfileLayout';
=======
>>>>>>> 5c46566 (feat: [AICP-24] Implement Homepage)
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
<<<<<<< HEAD
        element: <ProfileLayout />,
        children: [
          {
            path: 'profile',
            element: <Profile />,
          },
        ],
=======
        path: '/profile',
        element: <Profile />,
>>>>>>> 5c46566 (feat: [AICP-24] Implement Homepage)
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
