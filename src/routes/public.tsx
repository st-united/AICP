import { PublicLayout, AuthLayout } from '@app/components/templates/PublicLayout/index';
import { ForgotPassword, SignUp } from '@app/pages/index';

const routes = [
  {
    element: <PublicLayout />,
    children: [],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: 'sign-up',
        element: <SignUp />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'login',
        element: <div className='bg-black !p-2 font-bold text-white'>Login Page</div>,
      },
    ],
  },
];

export default routes;
