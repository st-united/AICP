import AuthLayout from '@app/components/templates/AuthLayout';
import ProfileLayout from '@app/components/templates/ProfileLayout';
import { PublicLayout } from '@app/components/templates/PublicLayout';
import { NAVIGATE_URL } from '@app/constants';
import { Homepage, Profile, SignIn } from '@app/pages/index';
import SignUp from '@app/pages/SignUp/SignUp';

const routes = [
  {
    element: <PublicLayout />,
    children: [
      {
        path: NAVIGATE_URL.SIGN_UP,
        element: <SignUp />,
      },
      {
        path: NAVIGATE_URL.SIGN_IN,
        element: <SignIn />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: NAVIGATE_URL.LANDING_PAGE,
        element: <Homepage />,
      },
      {
        element: <ProfileLayout />,
        children: [
          {
            path: NAVIGATE_URL.PROFILE,
            element: <Profile />,
          },
        ],
      },
    ],
  },
];

export default routes;
