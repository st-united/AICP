import { PublicLayout } from '@app/components/templates/PublicLayout/index';
import { SignUp } from '@app/pages/index';

const routes = [
  {
    element: <PublicLayout />,
    children: [
      {
        path: 'sign-up',
        element: <SignUp />,
      },
      {
        path: 'login',
        element: <div className='bg-black !p-2 font-bold text-white'>Login Page</div>,
      },
    ],
  },
];

export default routes;
