import { MailOutlined, EnvironmentOutlined, UpCircleFilled } from '@ant-design/icons';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import { DevplusLogo } from '@app/assets/svgs';

const FooterSection = () => {
  const { t } = useTranslation();
  const activities = t('HOMEPAGE.FOOTER_ACTIVITIES_LIST', { returnObjects: true }) as Array<string>;
  return (
    <div className='relative flex text-center smM:text-start py-20 smM:py-32 bg-cover bg-no-repeat bg-center bg-[url(./assets/images/footer-new-bg.png)]'>
      <Row className='container w-full mx-auto xsM:w-[90%] smM:py-4 xl:w-[90%] text-white'>
        <Col
          xs={{ order: 1, span: 24 }}
          sm={{ order: 1, span: 24 }}
          md={{ order: 1, span: 8 }}
          className='flex justify-center smM:justify-start'
        >
          <img alt='devpluslogo' src={DevplusLogo} className='h-16 mdM:h-20 mb-8 smM:mb-3' />
        </Col>
        <Col
          xs={{ order: 3, span: 24 }}
          sm={{ order: 3, span: 24 }}
          md={{ order: 2, span: 8 }}
          className='flex justify-center smM:justify-start !mb-8 !md:mb-0'
        >
          <div className='flex flex-col smM:flex-row items-center md:items-start gap-3 smM:text-sm mdM:text-xl mb-4'>
            <div className='bg-[#2F5371] rounded-xl flex items-center justify-center text-center'>
              <MailOutlined className='text-4xl [&>svg]:scale-75 p-2 flex items-center justify-center text-center' />
            </div>
            <div>
              <p> {t('HOMEPAGE.FOOTER_EMAIL')}</p>
              <p> {t('HOMEPAGE.FOOTER_PHONE')}</p>
            </div>
          </div>
        </Col>
        <Col
          xs={{ order: 4, span: 24 }}
          sm={{ order: 4, span: 24 }}
          md={{ order: 3, span: 8 }}
          className='flex justify-center smM:justify-start !mb-8 smM:mb-0'
        >
          <div className='flex flex-col smM:flex-row items-center md:items-start gap-3 smM:text-sm mdM:text-xl mdM:w-[80%] mb-4'>
            <div className='bg-[#2F5371] rounded-xl flex items-center justify-center text-center'>
              <EnvironmentOutlined className='text-4xl [&>svg]:scale-75 p-2 flex items-center justify-center text-center' />
            </div>
            <p> {t('HOMEPAGE.FOOTER_ADDRESS')} </p>
          </div>
        </Col>
        <Col
          xs={{ order: 2, span: 24 }}
          sm={{ order: 2, span: 24 }}
          md={{ order: 4, span: 12 }}
          className='mb-8 smM:mb-0'
        >
          <h3 className='text-base smM:text-lg mdM:text-2xl font-extrabold !mb-2 mdM:!mb-8 text-white'>
            {t('HOMEPAGE.FOOTER_ABOUT')}
          </h3>
          <p className='leading-6 smM:leading-8 mdM:text-xl mdM:leading-10 font-light'>
            {t('HOMEPAGE.FOOTER_ABOUT_DESC')}
          </p>
        </Col>
        <Col
          xs={{ order: 5, span: 24 }}
          sm={{ order: 5, span: 24 }}
          md={{ order: 5, span: 8, offset: 4 }}
        >
          <h3 className='text-base smM:text-lg mdM:text-2xl font-extrabold mb-2 smM:mb-6 text-white'>
            {t('HOMEPAGE.FOOTER_ACTIVITIES')}
          </h3>
          <ul className='space-y-2 md:text-sm lg:text-lg'>
            {activities.map((activity, index) => (
              <li key={index}>
                <a
                  href='https://devplus.edu.vn/#devplus-activities'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {activity}
                </a>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
      <UpCircleFilled
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className='!text-primary text-4xl smM:text-5xl [&>svg]:scale-110 hover:scale-125 shadow-md absolute bottom-10 right-10 md:bottom-20 md:right-20 border-none rounded-full'
      />
    </div>
  );
};

export default FooterSection;
