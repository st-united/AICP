import { Button } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface ActionButtonsProps {
  onInterviewClick: () => void;
  onOtherClick: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onInterviewClick, onOtherClick }) => {
  const { t } = useTranslation();
  return (
    <div className='flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-2 sm:px-0'>
      <Button
        size='large'
        onClick={onOtherClick}
        className='w-full sm:w-auto px-6 sm:px-8 py-3 h-auto border border-gray-300 
                   shadow-[0_0_10px_2px_rgba(99,102,241,0.4)] 
                   text-[#686868] hover:bg-gray-50 
                   rounded-full transition-all duration-300 font-bold text-sm sm:text-base
                   flex items-center justify-center'
        style={{ borderRadius: '25px' }}
      >
        {t<string>('BUTTON.OTHER_TIMES')}
      </Button>

      <Button
        type='primary'
        size='large'
        onClick={onInterviewClick}
        className='w-full sm:w-auto px-6 sm:px-8 py-3 h-auto 
                   border-none rounded-full shadow-lg 
                   hover:shadow-xl transition-all duration-300 
                   transform hover:scale-105 font-bold text-white text-sm sm:text-base
                   flex items-center justify-center'
        style={{
          backgroundColor: '#FE7743',
          borderRadius: '25px',
          borderColor: '#FE7743',
        }}
        disabled={true}
      >
        {t<string>('BUTTON.BUTTON_SCHEDULE')}
      </Button>
    </div>
  );
};

export default ActionButtons;
