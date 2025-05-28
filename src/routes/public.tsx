import AuthLayout from '@app/components/templates/AuthLayout';
import ProfileLayout from '@app/components/templates/ProfileLayout';
import PublicLayout from '@app/components/templates/PublicLayout';
import { Homepage, Profile, SignIn, ForgotPassword, ResetPassword } from '@app/pages/index';
import SignUp from '@app/pages/SignUp/SignUp';

const routes = [
  {
    element: <PublicLayout />,
    children: [
      {
        path: 'register',
        element: <SignUp />,
      },
      {
        path: 'login',
        element: <SignIn />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'reset-password',
        element: <ResetPassword />,
      },
    ],
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
