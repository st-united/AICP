import { Button } from 'antd';
import React, { useState } from 'react';

import DayCard from './DayCard';
import { useSocket } from '@app/hooks/useSocket';
import { DaySchedule, SlotStatus } from '@app/interface/interview.interface';

interface InterviewScheduleProps {
  examId: string;
}

const InterviewSchedule: React.FC<InterviewScheduleProps> = ({ examId }) => {
  const { availableSlots, joinDay } = useSocket(examId);
  console.log('🚀 ~ InterviewSchedule ~ availableSlots:', availableSlots);

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

      // Join the room for real-time updates
      joinDay(item.date);

      return {
        date,
        day,
        month,
        slots: [
          {
            id: `${dateStr}-morning`,
            time: '8:00 - 12:00',
            type: 'morning',
            slotsAvailable: item.morning.slot,
            status: item.morning.status,
          },
          {
            id: `${dateStr}-afternoon`,
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

  const handleSlotSelect = (slotId: string) => {
    setSelectedSlot(slotId);
  };

  const handleSkip = () => {
    console.log('Skip clicked');
  };

  return (
    <div className='bg-white'>
      <div className='max-w-4xl md:max-w-6xl mx-auto p-6'>
        <div className='text-center mb-8'>
          <h1
            className='text-2xl font-bold text-[#FE7743] mb-2
            md:text-4xl md:mb-5'
          >
            Đăng ký lịch phỏng vấn
          </h1>
          <p
            className='text-black text-base
            md:text-2xl'
          >
            Vui lòng chọn thời gian tham gia phỏng vấn phù hợp để được đánh giá năng lực chính xác
            hơn!
          </p>
        </div>

        {/* Schedule Cards */}
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
            <div>Loading available slots...</div>
          )}
        </div>

        <div className='text-center'>
          <Button
            size='large'
            className='px-8 py-2 h-auto border-orange-400 text-orange-500 hover:border-orange-500 hover:text-orange-600'
            onClick={handleSkip}
          >
            Bỏ qua
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewSchedule;
