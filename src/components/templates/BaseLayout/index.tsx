import { Outlet } from 'react-router-dom';

import HeaderComponent from '@app/components/Layout/Header/Header';

import { Layout } from 'antd';

const { Header, Content, Sider } = Layout;

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
