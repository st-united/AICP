import { Outlet } from 'react-router-dom';

const PolicyLayout = () => {
  return (
    <div className='flex min-h-screen flex-col'>
      <Outlet />
    </div>
  );
};

export default PolicyLayout;
