import InterviewScheduler from '@app/components/atoms/InterviewScheduler';
import MentorList from './components/MentorList';
import { useState } from 'react';
import { Button, Typography } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useBookedSlots } from '@app/hooks/useMentor';

const Booking = () => {
  const { t } = useTranslation();

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

  return (
    <div className='bg-[#FFFBF9] p-4 md:p-8 min-h-screen'>
      <Button
        icon={<LeftOutlined />}
        type='link'
        className='p-0 !text-secondary hover:!text-primary text-lg mb-6'
      >
        {t('MENTOR_BOOKING.BACK_HOME')}
      </Button>
      <Typography.Title level={3}>{t('MENTOR_BOOKING.TITLE')}</Typography.Title>
      <div className='flex flex-col lg:flex-row gap-6'>
        <div className='flex-1 flex flex-col'>
          <InterviewScheduler
            onSchedule={handleSchedule}
            userSelected={mentorSelected}
            bookedSlots={bookedList?.data}
          />
        </div>
        <div className='flex-1 flex flex-col'>
          <MentorList
            slotSelected={dateTime}
            setMentorSelected={setMentorSelected}
            mentorSelected={mentorSelected}
          />
        </div>
      </div>
    </div>
  );
};

export default Booking;
