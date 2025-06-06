import { MenuOutlined } from '@ant-design/icons';
import { Button, Drawer, Layout, Grid } from 'antd';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import SidebarContent from '@app/components/Layout/Sidebar/Sidebar';
import HeaderComponent from '@app/components/Layout/Header/Header';

const { Sider, Content } = Layout;
const { useBreakpoint } = Grid;

const ProfileLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const screens = useBreakpoint();

  const isMobile = !screens.md;

  return (
    <Layout className='min-h-screen'>
      <HeaderComponent />

      <Layout className='p-4'>
        {/* Mobile Sidebar with Drawer */}
        {isMobile ? (
          <>
            <Button
              type='text'
              icon={<MenuOutlined />}
              className='mb-4'
              onClick={() => setDrawerVisible(true)}
            />
            <Drawer
              title=''
              placement='left'
              onClose={() => setDrawerVisible(false)}
              open={drawerVisible}
              className='p-0'
            >
              <SidebarContent />
            </Drawer>
          </>
        ) : (
          <Sider
            width={300}
            collapsible={false}
            collapsed={collapsed}
            onCollapse={setCollapsed}
            breakpoint='md'
            className='bg-white shadow-md rounded-2xl'
          >
            <SidebarContent />
          </Sider>
        )}

        <Content className='ml-0 sm:ml-4 w-full'>
          <div className='h-full'>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ProfileLayout;
