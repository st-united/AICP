import { Layout, Col, Spin } from 'antd';
import { FC, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import ProtectedRoute from '../ProtectedRoute';
import './PrivateLayout.scss';

const { Content } = Layout;

const PrivateLayout: FC = () => {
  return (
    <Layout>
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
