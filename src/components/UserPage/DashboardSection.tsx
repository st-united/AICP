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
    <div className='h-full bg-[#fffbf9] w-full xl:h-screen'>
      <div className='container mx-auto py-12 md:px-3 lg:px-4 xl:px-0'>
        <h2 className='text-xl xl:text-3xl text-center sm:text-4xl sm:text-start font-semibold py-4 px-2'>
          {t('DASHBOARD.TITLE')}
        </h2>
        <p className='text-base xl:text-xl text-center sm:text-start !text-[#686868] mb-8 p-4 px-2'>
          {t('DASHBOARD.DESCRIPTION')}
        </p>
        <div className='grid grid-cols-1 md:grid-cols-2 mt-10 sm:mt-20 md:gap-16 xl:gap-10 justify-items-center px-[10%]'>
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
