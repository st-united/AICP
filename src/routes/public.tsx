import AuthLayout from '@app/components/templates/AuthLayout';
import PublicLayout from '@app/components/templates/PublicLayout';
import { Homepage, SignIn, ForgotPassword, ResetPassword } from '@app/pages/index';
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
        index: true,
        element: <Homepage />,
      },
    ],
  },
];

export default routes;
