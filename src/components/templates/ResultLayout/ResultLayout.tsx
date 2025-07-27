import { LeftOutlined } from '@ant-design/icons';
import { Col, Layout, Spin } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Outlet } from 'react-router-dom';

import HeaderComponent from '@app/components/Layout/Header/Header';
import ResultHeader from '@app/components/molecules/TestResult/ResultHeader';
import { getStorageData } from '@app/config';
import { EXAM_LATEST } from '@app/constants/testing';
import { useGetExamResult } from '@app/hooks';
import './ResultLayout.scss';

const ResultLayout = () => {
  const { data, isLoading } = useGetExamResult(getStorageData(EXAM_LATEST) ?? '');
  const { t } = useTranslation();
  if (isLoading)
    return (
      <div className='w-full h-full flex items-center justify-center text-primary text-2xl font-bold'>
        <Spin />
      </div>
    );

  return (
    <Layout className='layout-result result-layout'>
      <HeaderComponent />
      <Content className='result-content'>
        <Suspense fallback={<Spin />}>
          <Col className='outlet-content-layout'>
            <Link
              className='flex text-primary-gray items-center justify-start text-base md:text-lg !mb-3 md:!mb-5 hover:text-primary-light cursor-pointer'
              to={'/'}
            >
              <div className='flex items-center border-none !text-gray-600 gap-2'>
                <LeftOutlined size={30} />
                {t<string>('EXAM.RESULT.BACK_TO_HOME')}
              </div>
            </Link>
            <ResultHeader />
            <div className='flex flex-col gap-4 mt-6'>
              {!data && !isLoading ? (
                <div className='w-full h-full flex items-center justify-center text-primary text-2xl font-bold'>
                  {t('TEST_RESULT.NOT_FOUND')}
                </div>
              ) : (
                <Outlet />
              )}
            </div>
          </Col>
        </Suspense>
      </Content>
    </Layout>
  );
};

export default ResultLayout;
