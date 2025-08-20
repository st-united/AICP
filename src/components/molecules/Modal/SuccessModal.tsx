import { Modal } from 'antd';
import { ReactNode } from 'react';

import { SuccessIcon } from '@app/assets/svgs/NotificationIcon';

interface SuccessModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  message: string;
  icon?: ReactNode;
  width?: string | number;
  maxWidth?: string;
}

const SuccessModal = ({
  visible,
  onClose,
  title,
  message,
  icon = null,
  width = '90%',
  maxWidth = 'max-w-xl',
}: SuccessModalProps) => {
  const defaultIcon = <img src={SuccessIcon} alt='success' className='w-20 h-20' />;

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      closable
      width={width}
      className={maxWidth}
      classNames={{ content: '!rounded-2xl' }}
    >
      <div className='text-center p-2 xsM:p-4'>
        <div className=' xsM:w-16 xsM:h-16 mx-auto mb-3 xsM:mb-4 rounded-full flex items-center justify-center'>
          {icon || defaultIcon}
        </div>

        <h3 className='text-lg xsM:text-xl font-semibold mb-2'>{title}</h3>
        <p className='text-gray-600 text-sm xsM:text-base sm:text-lg'>{message}</p>
      </div>
    </Modal>
  );
};

export default SuccessModal;
