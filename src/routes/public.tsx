import PublicLayout from '@app/components/templates/PublicLayout/index';
import { ForgotPassword, ResetPassword, } from '@app/pages/index';

const routes = [
  {
    element: <PublicLayout />,
    children: [
      {
        path: 'register',
        // element: <SignUp />,
      },
      {
        path: 'login',
        element: <div className='bg-black !p-2 font-bold text-white'>Login Page</div>,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />
      },
      {
        path: 'reset-password',
        element: <ResetPassword />,
      },
    ],
  },
];

export default routes;
