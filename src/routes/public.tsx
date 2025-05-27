import { PublicLayout } from '@app/components/templates/PublicLayout/index';
import { SignUp, SignIn, AptitudeTest } from '@app/pages/index';

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
  {
    path: 'aptitude-test',
    element: <AptitudeTest />,
  },
];

export default routes;
