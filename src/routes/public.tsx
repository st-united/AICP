import AuthLayout from '@app/components/templates/AuthLayout';
import PolicyLayout from '@app/components/templates/PolicyLayout';
import PublicLayout from '@app/components/templates/PublicLayout';
import { NAVIGATE_URL } from '@app/constants';
import {
  Homepage,
  SignIn,
  ForgotPassword,
  ResetPassword,
  Profile,
  Terms,
  Privacy,
} from '@app/pages/index';
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
      {
        path: NAVIGATE_URL.FORGOT_PASSWORD,
        element: <ForgotPassword />,
      },
      {
        path: NAVIGATE_URL.RESET_PASSWORD,
        element: <ResetPassword />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
    ],
  },

  {
    element: <PolicyLayout />,
    children: [
      {
        path: 'terms-and-conditions',
        element: <Terms />,
      },
      {
        path: 'privacy-policy',
        element: <Privacy />,
      },
    ],
  },
];

export default routes;
