import { Button, Modal } from 'antd';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

interface SuccessBookingModalProps {
  open: boolean;
  onClose: () => void;
  onChooseAgain: () => void;
  onConfirm: () => void;
  data?: {
    date: string;
    time: string;
    status: string;
  };
  isLoading?: boolean;
}

const SuccessBookingModal: React.FC<SuccessBookingModalProps> = ({
  open,
  onClose,
  onChooseAgain,
  onConfirm,
  data,
  isLoading,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      destroyOnHidden={true}
      className='overflow-hidden'
      classNames={{ content: '!rounded-2xl', wrapper: '!md:overflow-hidden' }}
      width={{
        xs: '90%',
        sm: '80%',
        md: '70%',
        lg: '60%',
        xl: '50%',
        xxl: '40%',
      }}
    >
      <div className='text-center p-6'>
        <h2 className='text-xl font-bold text-gray-800 mb-4'>{t('MENTOR_BOOKING.TITLE')}</h2>
        <p className='text-gray-600 mb-6'>{t('MENTOR_BOOKING.DESCRIPTION')}</p>

        <div className='bg-[#FFE9E1] p-8 rounded-2xl mb-6 text-start'>
          <h3 className='text-lg font-bold text-gray-800 mb-2'>{t('MENTOR_BOOKING.INFO_TITLE')}</h3>
          <ul className='text-gray-700 list-disc list-inside'>
            <li>
              <Trans
                i18nKey={'MENTOR_BOOKING.DATE'}
                values={{ date: data?.date }}
                components={{ bold: <span className='font-bold' /> }}
              />
            </li>
            <li>
              <Trans
                i18nKey={'MENTOR_BOOKING.TIME'}
                values={{ time: data?.time }}
                components={{ bold: <span className='font-bold' /> }}
              />
            </li>
            <li>
              <Trans
                i18nKey={'MENTOR_BOOKING.STATUS'}
                values={{ status: data?.status }}
                components={{
                  span: <span className='text-green-700 font-medium' />,
                }}
              />
            </li>
          </ul>
        </div>

        <div className='mb-6 text-start text-[#A22D00]'>
          <p className='font-extrabold'>{t('MENTOR_BOOKING.NOTE_TITLE')}</p>
          <ul className='list-disc list-inside text-sm'>
            <li>{t('MENTOR_BOOKING.NOTE_1')}</li>
            <li>{t('MENTOR_BOOKING.NOTE_2')}</li>
          </ul>
        </div>

        <div className='flex justify-end gap-4'>
          <Button
            size='large'
            className='px-6 py-2 font-bold bg-white text-gray-800 hover:bg-gray-300 rounded-3xl'
            onClick={onChooseAgain}
          >
            {t('MENTOR_BOOKING.CHOOSE_AGAIN')}
          </Button>
          <Button
            size='large'
            className='px-6 py-2 font-bold !bg-[#FE7743] !text-white hover:ring-2 rounded-3xl'
            onClick={onConfirm}
            loading={isLoading}
          >
            {t('MENTOR_BOOKING.CONFIRM')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SuccessBookingModal;
