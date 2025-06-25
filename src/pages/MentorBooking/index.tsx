import { LeftOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import MentorList from './components/MentorList';
import InterviewScheduler from '@app/components/atoms/InterviewScheduler';
import { getStorageData } from '@app/config';
import { NAVIGATE_URL } from '@app/constants';
import { EXAM_LATEST } from '@app/constants/testing';
import { useBookedSlots } from '@app/hooks/useMentor';

const Booking = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [dateTime, setDateTime] = useState<{ date: string | null; timeSlot: string | null }>({
    date: null,
    timeSlot: null,
  });
  const [mentorSelected, setMentorSelected] = useState('');

  const { data: bookedList } = useBookedSlots(mentorSelected);

  const handleSchedule = (data: { date: string; time: string }) => {
    setDateTime({
      date: data.date,
      timeSlot: data.time,
    });
  };

  const handleBooking = () => {
    const examId = getStorageData(EXAM_LATEST);
    navigate(NAVIGATE_URL.CAPACITY_DYNAMIC(examId));
  };

  return (
    // <div className='h-full'>
    //   <Button
    //     icon={<LeftOutlined />}
    //     type='link'
    //     className='p-0 !text-secondary hover:!text-primary text-lg mb-6'
    //     onClick={() => navigate('/')}
    //   >
    //     {t('MENTOR_BOOKING.BACK_HOME')}
    //   </Button>
    //   <Typography.Title level={3}>{t('MENTOR_BOOKING.TITLE')}</Typography.Title>
    //   <div className='flex flex-col lg:flex-row gap-6'>
    //     <div className='flex-1 flex flex-col'>
    //       <InterviewScheduler
    //         onSchedule={handleSchedule}
    //         userSelected={mentorSelected}
    //         bookedSlots={bookedList?.data}
    //       />
    //     </div>
    //     <div className='flex-1 flex flex-col'>
    //       <MentorList
    //         slotSelected={dateTime}
    //         setMentorSelected={setMentorSelected}
    //         mentorSelected={mentorSelected}
    //       />
    //     </div>
    //   </div>
    // </div>

    <div className='h-full flex items-center justify-center'>
      <Button
        type='primary'
        size='large'
        className='px-8 py-4 text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300'
        onClick={() => handleBooking()}
      >
        {t('MENTOR_BOOKING.BOOKING_NOW')}
      </Button>
    </div>
  );
};

export default Booking;
