import { Modal } from 'antd';
import React from 'react';

interface SuccessModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  message: string;
  icon?: React.ReactNode;
  width?: string | number;
  maxWidth?: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  visible,
  onClose,
  title,
  message,
  icon = null,
  width = '90%',
  maxWidth = 'max-w-md',
}) => {
  const defaultIcon = (
    <svg
      className='w-6 h-6 xsM:w-8 xsM:h-8 text-green-500'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      viewBox='0 0 24 24'
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
    </svg>
  );

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      closable
      width={width}
      className={maxWidth}
      classNames={{ content: '!rounded-3xl' }}
    >
      <div className='text-center p-2 xsM:p-4'>
        <div className='w-12 h-12 xsM:w-16 xsM:h-16 mx-auto mb-3 xsM:mb-4 rounded-full bg-green-100 flex items-center justify-center'>
          {icon || defaultIcon}
        </div>

        <h3 className='text-lg xsM:text-xl font-semibold mb-2'>{title}</h3>
        <p className='text-gray-600 text-sm xsM:text-base sm:text-lg'>{message}</p>
      </div>
    </Modal>
  );
};

export default SuccessModal;
