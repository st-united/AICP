import { Card } from 'antd';
import React from 'react';

import TimeSlotCard from './TimeSlotCard';
import { DaySchedule } from '@app/interface/interview.interface';

interface DayCardProps {
  day: DaySchedule;
  selectedSlot: string;
  onSlotSelect: (slotId: string) => void;
}

const DayCard: React.FC<DayCardProps> = ({ day, selectedSlot, onSlotSelect }) => {
  return (
    <Card
      key={day.date}
      className='overflow-hidden shadow-xl border-0 rounded-2xl'
      bodyStyle={{ padding: 0 }}
    >
      {/* Date Header */}
      <div className='bg-orange-500 text-white text-center py-4'>
        <div className='text-3xl font-extrabold'>{day.date}</div>
        <div className='text-base'>Tháng {day.month}</div>
        <div className='text-3xl font-bold'>{day.day}</div>
      </div>

      {/* Time Slots */}
      <div className='px-4 pt-4 pb-6 space-y-3'>
        {day.slots.map((slot) => (
          <TimeSlotCard
            key={slot.id}
            slot={slot}
            isSelected={selectedSlot === slot.id}
            onSelect={onSlotSelect}
          />
        ))}
      </div>
    </Card>
  );
};

export default DayCard;
