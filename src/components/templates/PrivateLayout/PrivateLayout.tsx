import { Layout, Col, Spin } from 'antd';
import { FC, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import ProtectedRoute from '../ProtectedRoute';
import { useGetProfile } from '@app/hooks/useProfile';
import './PrivateLayout.scss';

const { Content } = Layout;

const PrivateLayout: FC = () => {
  const { isLoading } = useGetProfile();
  if (isLoading) {
    return <Spin />;
  }

  return (
    <Layout className='bg-[#efeff5]'>
      <Content className='flex justify-center items-center mb-4'>
        <Suspense fallback={<Spin />}>
          <ProtectedRoute>
            <Col className='outlet-layout'>
              <Outlet />
            </Col>
          </ProtectedRoute>
        </Suspense>
      </Content>
    </Layout>
  );
};

export default PrivateLayout;
