import { Col, Layout, Spin } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import HeaderComponent from '@app/components/Layout/Header/Header';
import ResultHeader from '@app/components/molecules/TestResult/ResultHeader';

import './ResultLayout.scss';

const ResultLayout = () => {
  return (
    <Layout className='layout-result'>
      <HeaderComponent />
      <Content className='result-content'>
        <Suspense fallback={<Spin />}>
          <Col className='outlet-content-layout'>
            <ResultHeader />
            <Outlet />
          </Col>
        </Suspense>
      </Content>
    </Layout>
  );
};

export default ResultLayout;
