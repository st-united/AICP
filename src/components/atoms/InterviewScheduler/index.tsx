import { Button, Spin } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import DayCard from './DayCard';
import showSkipInterviewConfirmation from './showSkipInterviewConfirmation';
import { NotificationTypeEnum, openNotificationWithIcon } from '../notification';
import { InterviewShift } from '@app/constants/enum';
import { useAvailableInterview, useCheckInterview, useCreateSchedule } from '@app/hooks/useMentor';
import { DaySchedule, SlotStatus } from '@app/interface/interview.interface';
import { CreateScheduleParams } from '@app/interface/mentor.interface';
import SuccessBooking from '@app/pages/MentorBooking/components/MentorDetailModal';
import SuccessBookingModal from '@app/pages/MentorBooking/components/SuccessBookingModal';

interface InterviewScheduleProps {
  examId: string;
}

const InterviewSchedule: React.FC<InterviewScheduleProps> = ({ examId }) => {
  const { t } = useTranslation();
  const { data, isLoading } = useCheckInterview(examId);
  const { data: availableSlots, isLoading: slotLoading } = useAvailableInterview(examId);
  const { mutate: bookSchedule, isPending } = useCreateSchedule();
  const navigate = useNavigate();

  const convertToDaySchedule = (backendData: {
    days: Array<{
      date: string;
      morning: { slot: number; status: SlotStatus };
      afternoon: { slot: number; status: SlotStatus };
    }>;
  }): DaySchedule[] => {
    const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    return backendData.days.map((item) => {
      const dateObj = new Date(item.date);
      const date = dateObj.getDate();
      const month = dateObj.getMonth() + 1;
      const day = daysOfWeek[dateObj.getDay()];
      const dateStr = item.date.split('T')[0];

      return {
        date,
        day,
        month,
        slots: [
          {
            id: `${dateStr}_morning`,
            time: '8:00 - 12:00',
            type: 'morning',
            slotsAvailable: item.morning.slot,
            status: item.morning.status,
          },
          {
            id: `${dateStr}_afternoon`,
            time: '14:00 - 18:00',
            type: 'afternoon',
            slotsAvailable: item.afternoon.slot,
            status: item.afternoon.status,
          },
        ],
      };
    });
  };

  const scheduleData: DaySchedule[] = availableSlots ? convertToDaySchedule(availableSlots) : [];

  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedBooking, setSelectedBooking] = useState<
    | {
        date: string;
        time: string;
        status: string;
      }
    | undefined
  >(undefined);

  const handleSlotSelect = (slotId: string) => {
    setSelectedSlot(slotId);

    const selectedDay = scheduleData.find((day) => day.slots.some((slot) => slot.id === slotId));
    const selectedTimeSlot = selectedDay?.slots.find((slot) => slot.id === slotId);

    if (selectedTimeSlot && selectedDay) {
      const dateObj = new Date(
        availableSlots?.days.find((d) => d.date.includes(`${selectedDay.date}`))?.date || '',
      );
      const year = dateObj.getFullYear();

      const bookingData = {
        date: t('MENTOR_BOOKING.BOOKING_DATE_FORMAT', {
          day: selectedDay.day,
          date: selectedDay.date,
          month: selectedDay.month,
          year,
        }),
        time: selectedTimeSlot.time,
        status:
          selectedTimeSlot.status === SlotStatus.AVAILABLE
            ? t('MENTOR_BOOKING.STATUS_AVAILABLE')
            : selectedTimeSlot.status === SlotStatus.ALMOST_FULL
            ? t('MENTOR_BOOKING.STATUS_ALMOST_FULL')
            : t('MENTOR_BOOKING.STATUS_FULL'),
      };

      setSelectedBooking(bookingData);
      setIsModalOpen(true);
    }
  };

  const handleSkip = () => {
    showSkipInterviewConfirmation(() => {
      navigate('/');
    });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedSlot('');
    setSelectedBooking(undefined);
  };

  const handleChooseAgain = () => {
    setIsModalOpen(false);
    setSelectedSlot('');
    setSelectedBooking(undefined);
  };

  const handleConfirmBooking = () => {
    if (selectedSlot) {
      const [date, shift] = selectedSlot.split('_');
      const payload: CreateScheduleParams = {
        examId,
        interviewDate: date,
        interviewShift: shift === 'morning' ? InterviewShift.MORNING : InterviewShift.AFTERNOON,
      };

      bookSchedule(payload, {
        onSuccess: (data) => {
          setIsModalOpen(false);
          setSelectedSlot('');
          setSelectedBooking(undefined);
          openNotificationWithIcon(NotificationTypeEnum.SUCCESS, data.data.message);
          navigate(`/history/${examId}`);
        },
        onError: () => {
          openNotificationWithIcon(NotificationTypeEnum.ERROR, t('MENTOR_BOOKING.BOOKING_ERROR'));
        },
      });
    }
  };

  return (
    <div className='bg-white rounded-2xl shadow-xl md:min-h-[80vh] flex items-center justify-center'>
      {isLoading || slotLoading ? (
        <Spin className='top-1/2 left-1/2 fixed -translate-x-1/2 -translate-y-1/2' />
      ) : data?.hasInterviewRequest ? (
        <div className='flex items-center justify-center min-h-[80vh]'>
          <SuccessBooking data={data.interviewRequest!} />
        </div>
      ) : (
        <div className='max-w-4xl md:max-w-6xl mx-auto p-6'>
          <div className='text-center mb-8'>
            <h1 className='text-2xl font-extrabold text-[#FE7743] mb-2 md:text-4xl md:mb-5'>
              {t('MENTOR_BOOKING.REGISTER_TITLE')}
            </h1>
            <p className='text-black text-base md:text-2xl'>
              {t('MENTOR_BOOKING.REGISTER_DESCRIPTION')}
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
            {scheduleData.length > 0 ? (
              scheduleData.map((day) => (
                <DayCard
                  key={day.date}
                  day={day}
                  selectedSlot={selectedSlot}
                  onSlotSelect={handleSlotSelect}
                />
              ))
            ) : (
              <Spin className='top-1/2 left-1/2 fixed -translate-x-1/2 -translate-y-1/2' />
            )}
          </div>

          <div className='text-center'>
            <Button
              size='large'
              className='px-8 py-2 h-auto border-orange-400 text-orange-500 hover:border-orange-500 hover:text-orange-600'
              onClick={handleSkip}
            >
              {t('MENTOR_BOOKING.SKIP')}
            </Button>
          </div>

          <SuccessBookingModal
            open={isModalOpen}
            onClose={handleModalClose}
            onChooseAgain={handleChooseAgain}
            onConfirm={handleConfirmBooking}
            data={selectedBooking}
            isLoading={isPending}
          />
        </div>
      )}
    </div>
  );
};

export default InterviewSchedule;
