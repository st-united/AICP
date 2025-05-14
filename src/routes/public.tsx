import PublicLayout from '@app/components/templates/PublicLayout';
import { SignIn } from '@app/pages/index';

const routes = [
  {
    element: <PublicLayout />,
    children: [
      {
        path: 'login',
        element: <SignIn />,
      },
    ],
  },
];

export default routes;
