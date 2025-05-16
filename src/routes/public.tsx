import AuthLayout from '@app/components/templates/AuthLayout';
import ProfileLayout from '@app/components/templates/ProfileLayout';
import { PublicLayout } from '@app/components/templates/PublicLayout';
import { Homepage, Profile, SignIn } from '@app/pages/index';
import PasswordChangeForm from '@app/pages/Profile/ChangePassword';
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
          {
            path: 'change-password',
            element: <PasswordChangeForm />,
          },
        ],
      },
    ],
  },
];

export default routes;
