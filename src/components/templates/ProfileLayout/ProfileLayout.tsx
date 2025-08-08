import { MenuOutlined, LeftOutlined } from '@ant-design/icons';
import { Button, Drawer, Layout, Grid } from 'antd';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Breadcrumbs from '@app/components/common/Breadcrumbs';
import HeaderComponent from '@app/components/Layout/Header/Header';
import SidebarContent from '@app/components/Layout/Sidebar/Sidebar';

const { Sider, Content } = Layout;
const { useBreakpoint } = Grid;

const ProfileLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const screens = useBreakpoint();

  const isMobile = !screens.md;
  const isTablet = screens.md && !screens.lg; // Detect tablet

  return (
    <Layout className='min-h-screen'>
      <HeaderComponent />
      <div className='pt-6 pb-2 w-full flex justify-center sm:justify-start sm:ml-4'>
        <div className='w-[90%] sm:w-full'>
          <Breadcrumbs />
        </div>
      </div>

      <Layout className='pt-0 px-4 pb-4'>
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
              <SidebarContent onClose={() => setDrawerVisible(false)} />
            </Drawer>
          </>
        ) : (
          <Sider
            width={isTablet ? 200 : 300} // Giảm width cho tablet
            collapsible={false}
            collapsed={collapsed}
            onCollapse={setCollapsed}
            breakpoint='md'
            className='bg-white shadow-md rounded-2xl'
          >
            <SidebarContent />
          </Sider>
        )}

        <Content className='ml-0 smML:ml-4 w-full'>
          <div className='h-full'>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ProfileLayout;
