import { PublicLayout } from '@app/components/templates/PublicLayout/index';
import { SignUp, SignIn } from '@app/pages/index';

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
];

export default routes;
