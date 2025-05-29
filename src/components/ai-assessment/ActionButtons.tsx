import { Button } from 'antd';
import { t } from 'i18next';
import React from 'react';

interface ActionButtonsProps {
  onInterviewClick: () => void;
  onOtherClick: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onInterviewClick, onOtherClick }) => {
  return (
    <div className='flex justify-center gap-4 mt-12'>
      <Button
        size='large'
        onClick={onOtherClick}
        className='px-8 py-3 h-auto border-gray-300 text-gray-600 hover:bg-gray-50 rounded-xl transition-all duration-300'
      >
        {t<string>('DRAFT.BUTTON_PAST')}
      </Button>
      <Button
        type='primary'
        size='large'
        onClick={onInterviewClick}
        className='px-8 py-3 h-auto bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 border-none rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105'
      >
        {t<string>('DRAFT.BUTTON_SCHEDULE')}
      </Button>
    </div>
  );
};

export default ActionButtons;
