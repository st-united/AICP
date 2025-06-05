import React, { useEffect, useState } from 'react';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Calendar, message, Button, Typography, Space, Divider, Card } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import viVN from 'antd/es/calendar/locale/vi_VN';
import 'dayjs/locale/vi';
import { useTranslation } from 'react-i18next';
import { useCreateSchedule } from '@app/hooks/useMentor';
import { useSelector } from 'react-redux';
import { RootState } from '@app/redux/store';
import SuccessBookingModal from '@app/pages/MentorBooking/components/SuccessBookingModal';
import MentorBooking from '@app/interface/mentor.interface';

dayjs.locale('vi');

const timeSlots = [
  { key: 'AM_08_09', label: '08 - 09 SA' },
  { key: 'AM_09_10', label: '09 - 10 SA' },
  { key: 'AM_10_11', label: '10 - 11 SA' },
  { key: 'AM_11_12', label: '11 - 12 SA' },
  { key: 'PM_02_03', label: '02 - 03 CH' },
  { key: 'PM_03_04', label: '03 - 04 CH' },
  { key: 'PM_04_05', label: '04 - 05 CH' },
  { key: 'PM_05_06', label: '05 - 06 CH' },
];

interface InterviewSchedulerProps {
  onSchedule?: (data: { date: string; time: string }) => void;
  userSelected: string;
  bookedSlots?: Record<string, string[]>;
}

const InterviewScheduler: React.FC<InterviewSchedulerProps> = ({
  onSchedule,
  userSelected,
  bookedSlots,
}) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [dataModal, setDataModal] = useState<MentorBooking>();

  const [showModal, setShowModal] = useState(false);

  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [viewDate, setViewDate] = useState<Dayjs>(dayjs());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const { mutate: createSchedule } = useCreateSchedule();

  const handleSelect = (date: Dayjs) => {
    if (date.isBefore(dayjs(), 'day')) {
      message.warning(t('INTERVIEW_SCHEDULER.PAST_DATE_WARNING'));
      return;
    }
    setSelectedDate(date);
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      message.warning(t('INTERVIEW_SCHEDULER.SELECT_DATE_TIME_WARNING'));
      return;
    }
    if (user) {
      const payload = {
        userId: user?.id,
        mentorId: userSelected,
        scheduledAt: selectedDate.format('YYYY-MM-DD'),
        timeSlot: selectedTime,
      };

      createSchedule(payload, {
        onSuccess: (response) => {
          setDataModal(response.data?.data);
          setShowModal(true);
          setSelectedTime(null);
        },
        onError: () => {
          message.error(t('INTERVIEW_SCHEDULER.BOOK_FAILED'));
        },
      });
    }
  };

  useEffect(() => {
    if (onSchedule && selectedTime) {
      const result = {
        date: selectedDate.format('YYYY-MM-DD'),
        time: selectedTime,
      };
      onSchedule(result);
    }
  }, [selectedDate, selectedTime]);

  const renderHeader = ({ onChange }: any) => {
    const prevMonth = () => {
      const newDate = viewDate.clone().subtract(1, 'month');
      setViewDate(newDate);
      onChange(newDate);
    };

    const nextMonth = () => {
      const newDate = viewDate.clone().add(1, 'month');
      setViewDate(newDate);
      onChange(newDate);
    };

    return (
      <div className='flex justify-between items-center px-4 py-2 border-b'>
        <Button size='small' onClick={prevMonth}>
          ←
        </Button>
        <div className='text-base font-semibold'>
          {t('INTERVIEW_SCHEDULER.MONTH_LABEL', {
            month: viewDate.format('M'),
            year: viewDate.format('YYYY'),
          })}
        </div>
        <Button size='small' onClick={nextMonth}>
          →
        </Button>
      </div>
    );
  };
  const bookedForSelectedDay = bookedSlots?.[selectedDate.format('YYYY-MM-DD')] ?? [];

  return (
    <>
      <div className='flex-1 flex flex-col gap-2'>
        <Card
          className='flex-1 !h-fit'
          title={
            userSelected ? (
              <Typography className='!text-gray-700 text-sm font-normal'>
                Bạn đang xem danh sách khung thời gian trống của cố vấn bạn đã chọn
              </Typography>
            ) : (
              ''
            )
          }
        >
          <Typography className='mb-4 text-gray-700 text-base'>
            {t('INTERVIEW_SCHEDULER.INSTRUCTION')}
          </Typography>
          <div className='mb-6'>
            <div className='mb-2 font-semibold'>{t('INTERVIEW_SCHEDULER.SELECT_DATE')}</div>
            <Calendar
              locale={viVN}
              fullscreen={false}
              value={selectedDate}
              onSelect={handleSelect}
              disabledDate={(date) => {
                const today = dayjs().startOf('day');
                if (date.isBefore(today)) return true;

                const dateStr = date.format('YYYY-MM-DD');
                const bookedForDay = bookedSlots?.[dateStr] ?? [];
                const allSlotsBooked = timeSlots.every((slot) => bookedForDay.includes(slot.key));

                return allSlotsBooked;
              }}
              headerRender={renderHeader}
              mode='month'
            />
          </div>

          <div className='mb-6'>
            <div className='mb-2 font-semibold'>{t('INTERVIEW_SCHEDULER.SELECT_TIME')}</div>
            <div className='flex flex-wrap gap-2'>
              {timeSlots.map((slot) => {
                const isBooked = bookedForSelectedDay.includes(slot.key);

                return (
                  <Button
                    key={slot.key}
                    type={selectedTime === slot.key ? 'primary' : 'default'}
                    onClick={() => setSelectedTime(slot.key)}
                    disabled={isBooked}
                  >
                    {t(`INTERVIEW_SCHEDULER.TIME_SLOT.${slot.key}`, slot.label)}
                  </Button>
                );
              })}
            </div>
          </div>
          <Divider />
          <div className='flex w-full justify-center'>
            <Button
              type='primary'
              block
              className='bg-orange-200 text-orange-900 hover:bg-orange-300 !w-fit p-4 rounded-2xl'
              onClick={handleConfirm}
            >
              {t('INTERVIEW_SCHEDULER.CONFIRM')}
            </Button>
          </div>
        </Card>
        <Card>
          <Space direction='vertical' size='small' className='w-full'>
            <div className='flex gap-2'>
              <Typography.Text strong>{t('INTERVIEW_SCHEDULER.DURATION_LABEL')}</Typography.Text>
              <Typography.Text>{t('INTERVIEW_SCHEDULER.DURATION')}</Typography.Text>
            </div>
            <div className='flex gap-2'>
              <Typography.Text strong>{t('INTERVIEW_SCHEDULER.LANGUAGE_LABEL')}</Typography.Text>
              <Typography.Text>{t('INTERVIEW_SCHEDULER.LANGUAGE')}</Typography.Text>
            </div>
          </Space>

          <Typography.Paragraph className='text-gray-700 mb-0'>
            {t('INTERVIEW_SCHEDULER.CONTACT_NOTE')}
          </Typography.Paragraph>

          <Space direction='vertical' size='small' className='text-gray-600'>
            <div className='flex items-center gap-2'>
              <MailOutlined />
              <Typography.Text>hello@devplus.edu.vn</Typography.Text>
            </div>
            <div className='flex items-center gap-2'>
              <PhoneOutlined />
              <Typography.Text>(+84) 368492885</Typography.Text>
            </div>
          </Space>
        </Card>
      </div>
      {showModal && (
        <SuccessBookingModal
          open={showModal}
          onClose={() => setShowModal(false)}
          data={dataModal}
        />
      )}
    </>
  );
};

export default InterviewScheduler;
