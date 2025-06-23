import {
  CalendarOutlined,
  FileTextOutlined,
  ApartmentOutlined,
  ProjectOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import DashboardCard from '../atoms/Card/DashboardCard';

const DashboardSection = () => {
  const { t } = useTranslation();

  return (
    <div className='h-full bg-[#fffbf9] w-full mdM::h-screen'>
      <div className='container w-full h-full gap-6 mx-auto py-10 xsM:w-[90%] smM:pl-2 smM:items-start mdM:py-28 xl:w-[90%]'>
        <h2 className='font-bold text-center text-2xl mb-8 smM:text-start smM:text-3xl mdM:text-4xl'>
          {t('DASHBOARD.TITLE')}
        </h2>
        <p className='font-semibold text-base xl:text-xl text-center sm:text-start !text-primary-gray mb-8'>
          {t('DASHBOARD.DESCRIPTION')}
        </p>
        <div className='grid grid-cols-1 smM:grid-cols-2 mt-10 sm:mt-20 gap-10 justify-items-center'>
          <DashboardCard
            title={t('DASHBOARD.TEST_STATUS.TITLE')}
            description={t('DASHBOARD.TEST_STATUS.DESCRIPTION')}
            buttonText={t('DASHBOARD.TEST_STATUS.BUTTON')}
            icon={<FileTextOutlined />}
          />
          <DashboardCard
            title={t('DASHBOARD.INTERVIEW_SCHEDULE.TITLE')}
            description={t('DASHBOARD.INTERVIEW_SCHEDULE.DESCRIPTION')}
            buttonText={t('DASHBOARD.INTERVIEW_SCHEDULE.BUTTON')}
            icon={<CalendarOutlined />}
          />
          <DashboardCard
            title={t('DASHBOARD.LEARNING_PATH.TITLE')}
            description={t('DASHBOARD.LEARNING_PATH.DESCRIPTION')}
            buttonText={t('DASHBOARD.LEARNING_PATH.BUTTON')}
            icon={<ProjectOutlined />}
          />
          <DashboardCard
            title={t('DASHBOARD.BUSINESS_CONTENT.TITLE')}
            description={t('DASHBOARD.BUSINESS_CONTENT.DESCRIPTION')}
            buttonText={t('DASHBOARD.BUSINESS_CONTENT.BUTTON')}
            icon={<ApartmentOutlined />}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardSection;
