import { Outlet } from 'react-router-dom';

const TermLayout = () => {
  return (
    <div className='flex min-h-screen flex-col'>
      <Outlet />
    </div>
  );
};

export default TermLayout;
