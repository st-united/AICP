import {
  CalendarOutlined,
  FileTextOutlined,
  ApartmentOutlined,
  ProjectOutlined,
} from '@ant-design/icons';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import DashboardCard from '../atoms/Card/DashboardCard';
import { NAVIGATE_URL } from '@app/constants';
import { ExamStatusEnum } from '@app/constants/enum';
import { useHasTakenExamDefault } from '@app/hooks';
import { getStatusText } from '@app/pages/Profile/QuizManagement/QuizCard';

const getStatusDescription = (status: ExamStatusEnum) => {
  switch (status) {
    case ExamStatusEnum.IN_PROGRESS:
      return t('DASHBOARD.TEST_STATUS.DESCRIPTION.IN_PROGRESS');
    case ExamStatusEnum.SUBMITTED:
      return t('DASHBOARD.TEST_STATUS.DESCRIPTION.SUBMITTED');
    case ExamStatusEnum.WAITING_FOR_REVIEW:
      return t('DASHBOARD.TEST_STATUS.DESCRIPTION.WAITING_FOR_REVIEW');
    case ExamStatusEnum.GRADED:
      return t('DASHBOARD.TEST_STATUS.DESCRIPTION.GRADED');
    default:
      return status;
  }
};

const getStatusButton = (status: ExamStatusEnum) => {
  switch (status) {
    case ExamStatusEnum.IN_PROGRESS:
      return t('DASHBOARD.TEST_STATUS.BUTTON.RESUME');
    case ExamStatusEnum.SUBMITTED:
      return t('DASHBOARD.TEST_STATUS.BUTTON.VIEW');
    case ExamStatusEnum.WAITING_FOR_REVIEW:
      return t('DASHBOARD.TEST_STATUS.BUTTON.VIEW');
    case ExamStatusEnum.GRADED:
      return t('DASHBOARD.TEST_STATUS.BUTTON.VIEW');
    default:
      return status;
  }
};

const DashboardSection = () => {
  const { t } = useTranslation();
  const { data: hasTakenExam, isLoading } = useHasTakenExamDefault();
  const navigate = useNavigate();

  const getStatusRedirect = (status: ExamStatusEnum) => {
    switch (status) {
      case ExamStatusEnum.IN_PROGRESS:
        return navigate(NAVIGATE_URL.TEST);
      case ExamStatusEnum.SUBMITTED:
        return navigate(NAVIGATE_URL.TEST_RESULT);
      case ExamStatusEnum.WAITING_FOR_REVIEW:
        return navigate(NAVIGATE_URL.TEST_RESULT);
      case ExamStatusEnum.GRADED:
        return navigate(NAVIGATE_URL.TEST_RESULT);
      default:
        return status;
    }
  };

  return (
    <div className='h-full bg-[#fffbf9] w-full mdM::h-screen'>
      <div className='container w-full h-full gap-6 mx-auto py-10 xsM:w-[89%] smM:items-start mdM:py-28 xl:w-[89%]'>
        <h2 className='font-bold text-center text-2xl mb-8 smM:text-start smM:text-3xl mdM:text-4xl'>
          {t('DASHBOARD.TITLE')}
        </h2>
        <p className='font-semibold text-base sm:text-[20px] md:text-[22px] text-center sm:text-start !text-primary-gray mb-8'>
          {t('DASHBOARD.DESCRIPTION')}
        </p>
        <div className='grid grid-cols-1 smM:grid-cols-2 mt-10 sm:mt-20 gap-10 w-full'>
          <DashboardCard
            title={
              !hasTakenExam?.hasTakenExam
                ? t('DASHBOARD.TEST_STATUS.TITLE')
                : hasTakenExam?.examStatus
                ? getStatusText(hasTakenExam.examStatus)
                : t('DASHBOARD.TEST_STATUS.TITLE')
            }
            description={
              hasTakenExam?.hasTakenExam && hasTakenExam.examStatus
                ? getStatusDescription(hasTakenExam.examStatus)
                : t('DASHBOARD.TEST_STATUS.DESCRIPTION.DEFAULT')
            }
            buttonText={
              hasTakenExam?.hasTakenExam && hasTakenExam.examStatus
                ? getStatusButton(hasTakenExam.examStatus)
                : t('DASHBOARD.TEST_STATUS.BUTTON.START')
            }
            onClick={() =>
              hasTakenExam?.hasTakenExam && hasTakenExam.examStatus
                ? getStatusRedirect(hasTakenExam.examStatus)
                : navigate(NAVIGATE_URL.TEST)
            }
            icon={<FileTextOutlined />}
            isLoading={isLoading}
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
