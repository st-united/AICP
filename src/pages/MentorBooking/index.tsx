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
    <div className='h-full flex flex-col gap-5'>
      <div>
        <Button
          icon={<LeftOutlined />}
          type='link'
          className='p-0 !text-secondary hover:!text-primary text-lg'
          onClick={() => navigate(-1)}
        >
          {t('MENTOR_BOOKING.BACK')}
        </Button>
      </div>

      <InterviewScheduler examId={examId || ''} />
    </div>
  );
};

export default Booking;
