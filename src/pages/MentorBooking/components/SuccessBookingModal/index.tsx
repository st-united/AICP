import React from 'react';
import { Modal, Button, Typography, List } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import MentorBooking from '@app/interface/mentor.interface';
import { convertTimeBooking } from '@app/helpers/convertDateTime';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

interface SuccessBookingModalProps {
  open: boolean;
  onClose: () => void;
  data?: MentorBooking;
}

const SuccessBookingModal: React.FC<SuccessBookingModalProps> = ({ open, onClose, data }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    navigate('/');
  };

  const { t } = useTranslation();
  return (
    <Modal open={open} onCancel={handleClose} footer={null} centered closable={false}>
      <div className='flex flex-col items-center p-4'>
        <div className='w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4'>
          <CheckCircleOutlined className='text-green-600 text-3xl' />
        </div>

        <Title level={4} className='text-center mb-2'>
          {t('MENTOR_BOOKING.SUCCESS_TITLE')}
        </Title>

        <Paragraph className=' text-gray-700 mb-4'>{t('MENTOR_BOOKING.SUCCESS_MESSAGE')}</Paragraph>

        <List
          size='small'
          className='w-full text-sm text-gray-800 mb-4'
          dataSource={[
            <span>
              <strong>{t('MENTOR_BOOKING.MENTOR_LABEL')}</strong> {data?.mentor.fullName}
            </span>,
            <span>
              <strong>{t('MENTOR_BOOKING.TIME_LABEL')}</strong>
              {data && convertTimeBooking(data?.timeSlot, data?.scheduledAt)}
            </span>,
            <span>
              <strong>{t('MENTOR_BOOKING.BOOKING_CODE_LABEL')}</strong> {data?.codeOrder}
            </span>,
          ]}
          renderItem={(item, index) => (
            <List.Item key={index} className='pl-4 list-disc'>
              {item}
            </List.Item>
          )}
        />

        <Paragraph className='text-sm text-gray-600 mb-6'>
          {t('MENTOR_BOOKING.SUCCESS_NOTE')}
        </Paragraph>

        <Button
          type='primary'
          className='bg-orange-500 hover:bg-orange-600 border-none rounded font-medium px-6 py-2'
          onClick={handleClose}
        >
          {t('MENTOR_BOOKING.BACK_HOME')}
        </Button>
      </div>
    </Modal>
  );
};

export default SuccessBookingModal;
