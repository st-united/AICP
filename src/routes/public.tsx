import { PublicLayout, AuthLayout } from '@app/components/templates/PublicLayout';
import { SignIn } from '@app/pages/index';

const routes = [
  {
    element: <PublicLayout />,
    children: [],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <SignIn />,
      },
    ],
  },
];

export default routes;
