import { PublicLayout } from '@app/components/templates/PublicLayout/index';
import { SignUp, SignIn } from '@app/pages/index';
import ModalTestPlayground from '@app/pages/test/TestModal';

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
        path: 'test',
        element: <ModalTestPlayground />,
      },
    ],
  },
];

export default routes;
