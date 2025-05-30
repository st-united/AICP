import { MailOutlined, EnvironmentOutlined, UpCircleFilled } from '@ant-design/icons';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { DevplusLogo } from '@app/assets/svgs';

const FooterSection = () => {
  const { t } = useTranslation();
  const activities = t('HOMEPAGE.FOOTER_ACTIVITIES_LIST', { returnObjects: true }) as Array<string>;
  return (
    <div className='text-white px-6 md:px-20 py-5 sm:py-20 relative flex md:justify-start justify-center md:items-start items-center md:text-start text-center bg-cover bg-no-repeat bg-center bg-[url(./assets/svgs/footer_background.svg)]'>
      <Row className='container mx-auto mt-16 !md:mt-0'>
        <Col
          xs={{ order: 1, span: 24 }}
          sm={{ order: 1, span: 24 }}
          md={{ order: 1, span: 8 }}
          className='flex md:justify-start justify-center'
        >
          <img alt='devpluslogo' src={DevplusLogo} className='h-20' />
        </Col>
        <Col
          xs={{ order: 3, span: 24 }}
          sm={{ order: 3, span: 24 }}
          md={{ order: 2, span: 8 }}
          className='flex justify-center !mb-8 !md:mb-0'
        >
          <div className='flex flex-col md:flex-row items-center md:items-start gap-3 md:text-sm lg:text-lg mb-4'>
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
          className='flex justify-center !mb-8 !md:mb-0'
        >
          <div className='flex flex-col md:flex-row items-center md:items-start gap-3 md:text-sm lg:text-lg'>
            <div className='bg-[#2F5371] rounded-xl flex items-center justify-center text-center'>
              <EnvironmentOutlined className='text-4xl [&>svg]:scale-75 p-2 flex items-center justify-center text-center' />
            </div>
            <p> {t('HOMEPAGE.FOOTER_ADDRESS')}</p>
          </div>
        </Col>
        <Col
          xs={{ order: 2, span: 24 }}
          sm={{ order: 2, span: 24 }}
          md={{ order: 4, span: 10 }}
          className='mb-8 md:mb-0'
        >
          <h3 className='md:text-sm lg:text-lg font-semibold !mb-2 !md:mb-0 text-white'>
            {t('HOMEPAGE.FOOTER_ABOUT')}
          </h3>
          <p className='md:text-sm lg:text-lg'>{t('HOMEPAGE.FOOTER_ABOUT_DESC')}</p>
        </Col>
        <Col
          xs={{ order: 5, span: 24 }}
          sm={{ order: 5, span: 24 }}
          md={{ order: 5, span: 8, offset: 6 }}
        >
          <h3 className='md:text-sm lg:text-lg font-semibold mb-2 text-white'>
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
        className='!text-[#FE7743] text-5xl [&>svg]:scale-100 hover:scale-125 shadow-md absolute bottom-10 right-10 md:bottom-20 md:right-20 border-none rounded-full'
      />
    </div>
  );
};

export default FooterSection;
