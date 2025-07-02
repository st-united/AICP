import { LeftOutlined } from '@ant-design/icons';
import { Layout, Typography, Button, Image } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import TermsLayout from './TermsLayout';
import logo from '../../assets/images/devplus.png';
import termBg from '../../assets/images/term-background.png';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const TermsAndConditions = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div
      className='min-h-screen flex items-center justify-center bg-cover bg-center'
      style={{
        backgroundImage: `url(${termBg})`,
      }}
    >
      <Layout className='bg-transparent min-h-screen w-full'>
        <Content className='flex-1 py-6 px-4 md:px-8'>
          <div className='w-full max-w-6xl mx-auto'>
            <Image
              src={logo}
              alt='DevPlus Logo'
              className='w-[180px] h-auto mb-4'
              preview={false}
            />

            <Button
              type='text'
              icon={<LeftOutlined />}
              className='flex items-center text-[14px] md:text-[18px] !text-[#686868] hover:text-orange-600 p-0 mb-6'
              onClick={() => navigate('/login')}
            >
              {t('TERMS.BACK')}
            </Button>

            <TermsLayout />
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default TermsAndConditions;
