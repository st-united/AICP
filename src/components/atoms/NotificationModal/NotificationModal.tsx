import { Modal } from 'antd';
import React from 'react';

interface NotificationModalProps {
  open: boolean;
  onCancel: () => void;
  icon: React.ReactNode;
  title: string;
  description: string | React.ReactNode;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  open,
  onCancel,
  icon,
  title,
  description,
}: NotificationModalProps) => {
  return (
    <Modal open={open} onCancel={onCancel} footer={null} closable centered width={600}>
      <div className='flex flex-col items-center justify-center py-8 px-4'>
        <div className='mb-4'>{icon}</div>
        <h2 className='text-2xl font-bold mb-3 text-center'>{title}</h2>
        {typeof description === 'string' ? (
          <p className='text-lg text-center m-0'>{description}</p>
        ) : (
          description
        )}
      </div>
    </Modal>
  );
};

export default NotificationModal;
