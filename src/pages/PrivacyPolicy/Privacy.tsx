import { Layout, Image } from 'antd';

import PrivacyLayout from './PrivacyLayout';
import logo from '../../assets/images/devplus.png';
import termBg from '../../assets/images/term-background.png';

const { Content } = Layout;

const PrivacyPolicy = () => {
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
            <PrivacyLayout />
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default PrivacyPolicy;
