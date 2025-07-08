import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

import HeaderComponent from '@app/components/Layout/Header/Header';

const { Content } = Layout;

const BaseLayout = () => {
  return (
    <Layout className='min-h-screen'>
      <HeaderComponent />
      <Content className='p-6 overflow-auto mb-10'>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default BaseLayout;
