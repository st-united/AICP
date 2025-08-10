import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import React from 'react';

import { SlotStatus, TimeSlot } from '@app/interface/interview.interface';

interface TimeSlotCardProps {
  slot: TimeSlot;
  isSelected: boolean;
  onSelect: (slotId: string) => void;
}

const TimeSlotCard: React.FC<TimeSlotCardProps> = ({ slot, isSelected, onSelect }) => {
  const handleSlotKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(slot.id);
    }
  };

  const getSlotIcon = (type: 'morning' | 'afternoon') => {
    return type === 'morning' ? <SunOutlined /> : <MoonOutlined />;
  };

  const getSlotLabel = (type: 'morning' | 'afternoon') => {
    return type === 'morning' ? 'Buổi Sáng' : 'Buổi Chiều';
  };

  const getSlotStatus = (status: SlotStatus) => {
    switch (status) {
      case SlotStatus.FULL:
        return 'Đã đầy';
      case SlotStatus.ALMOST_FULL:
        return 'Sắp đầy';
      case SlotStatus.AVAILABLE:
        return 'Còn chỗ';
      default:
        return '';
    }
  };

  const getCardStyle = (type: 'morning' | 'afternoon') => {
    if (type === 'morning') {
      return {
        background: '#A7C0FF14',
        border: '1px solid #096DD933',
        iconColor: '#FF6B35',
        titleColor: '#1E40AF',
        timeColor: '#64748B',
        badgeStyle: 'bg-green-100 text-green-700',
      };
    } else {
      return {
        background: '#FEF7F0',
        border: '1px solid #FE774333',
        iconColor: '#3B82F6',
        titleColor: '#EA580C',
        timeColor: '#92400E',
        badgeStyle: 'bg-orange-100 text-orange-700',
      };
    }
  };

  const cardStyle = getCardStyle(slot.type);

  return (
    <div
      role='button'
      tabIndex={slot.status === SlotStatus.FULL ? -1 : 0}
      onClick={() => {
        if (slot.status !== SlotStatus.FULL) {
          onSelect(slot.id);
        }
      }}
      onKeyDown={handleSlotKeyDown}
      className={`
        relative p-4 rounded-2xl transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
        ${
          slot.selected && isSelected
            ? 'ring-2 ring-blue-500 shadow-lg'
            : slot.status === SlotStatus.FULL
            ? 'cursor-not-allowed opacity-50 bg-gray-500'
            : 'hover:shadow-md'
        }
      `}
      style={{
        background: cardStyle.background,
        border: cardStyle.border,
      }}
    >
      <div className='flex items-center gap-3'>
        <div className='flex-shrink-0'>
          <span className='text-xl' style={{ color: cardStyle.iconColor }}>
            {getSlotIcon(slot.type)}
          </span>
        </div>

        <div className='flex-1'>
          <div className='font-semibold text-base mb-1' style={{ color: cardStyle.titleColor }}>
            {getSlotLabel(slot.type)}
          </div>
          <div className='text-sm' style={{ color: cardStyle.timeColor }}>
            {slot.time}
          </div>
        </div>

        <div className='flex-shrink-0'>
          <span className={`text-xs px-3 py-1 rounded-full font-medium ${cardStyle.badgeStyle}`}>
            {getSlotStatus(slot.status)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TimeSlotCard;
