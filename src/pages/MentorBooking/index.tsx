import { LeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import InterviewScheduler from '@app/components/atoms/InterviewScheduler';

const Booking = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { examId } = useParams<{ examId: string }>();

  return (
    <div className='h-full'>
      <Button
        icon={<LeftOutlined />}
        type='link'
        className='p-0 !text-secondary hover:!text-primary text-lg mb-6'
        onClick={() => navigate('/')}
      >
        {t('MENTOR_BOOKING.BACK_HOME')}
      </Button>
      <div className='flex flex-col lg:flex-row gap-6'>
        <div className='flex-1 flex flex-col'>
          <InterviewScheduler examId={examId || ''} />
        </div>
      </div>
    </div>
  );
};

export default Booking;
