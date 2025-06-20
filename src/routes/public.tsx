import AuthLayout from '@app/components/templates/AuthLayout';
import PublicLayout from '@app/components/templates/PublicLayout';
import { NAVIGATE_URL } from '@app/constants';
import AccountActivation from '@app/pages/AccountActivation/AccountActivation';
import { Homepage, SignIn, ForgotPassword, ResetPassword } from '@app/pages/index';
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
      {
        path: NAVIGATE_URL.MENTOR_ACTIVATION,
        element: <AccountActivation />,
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
];

export default routes;
