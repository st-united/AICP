import { Outlet } from 'react-router-dom';

const PublicLayout: React.FC = () => {
  return (
    <div className='min-h-screen grid grid-cols-1 lg:grid-cols-2 !p-10 bg-cover bg-center bg-no-repeat bg-[url(./assets/images/logo-background.png)]'>
      <div className='pt-6 sm:p-6 md:p-10 lg:p-14 xl:p-20'>
        <Outlet />
      </div>

      <div className='flex justify-end'>
        <div className='lg:block hidden w-full bg-white rounded-4xl sm:w-6/6 md:w-6/6 lg:w-6/6 xl:w-5/6 h-full'></div>
      </div>
    </div>
  );
};

export default PublicLayout;
