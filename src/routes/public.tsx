import PublicLayout from '@app/components/templates/PublicLayout';

const routes = [
  {
    element: <PublicLayout />,
    children: [{ path: 'login', element: <div>Login Page</div> }],
  },
];

export default routes;
