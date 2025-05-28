import { CloseCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { Modal } from '@app/components/molecules';
import { useHasTakenExam } from '@app/hooks';

export default function ConfirmTestModal() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { data: hasTakenExam, isLoading: isLoadingHasTakenExam } = useHasTakenExam(
    'f3030786-b313-428b-b9ae-b332320e37b4',
  );

  return (
    <div className='p-4'>
      <Button onClick={() => setOpen(true)}>Mở modal</Button>

      <Modal open={open} onCancel={() => setOpen(false)} footer={null} width={600} closable>
        <div className='relative flex flex-col items-center px-2 sm:px-4 pb-4'>
          <CloseCircleOutlined
            onClick={() => setOpen(false)}
            className='absolute right-0 top-0 text-2xl text-gray-500 hover:text-gray-700 cursor-pointer'
          />

          <div className='bg-blue-100 rounded-full p-1.5 sm:p-2'>
            <div className='bg-blue-300 rounded-full p-3 sm:p-4'>
              <span className='text-2xl sm:text-4xl font-medium text-blue-500 m-2 sm:m-3'>?</span>
            </div>
          </div>

          <h2 className='text-lg sm:text-xl font-bold mb-3 sm:mb-4 mt-4'>
            {t('MODAL.TITLE_CONFIRM_TEST')}
          </h2>

          <p className='text-sm sm:text-base text-gray-900 mb-3 sm:mb-4'>
            <Trans
              i18nKey='MODAL.DURATION_CONFIRM_TEST'
              values={{ duration: hasTakenExam?.examSetDuration || 40 }}
              components={{ bold: <span className='font-bold' /> }}
            />
          </p>

          <p className='text-sm sm:text-base text-gray-900 mb-3 sm:mb-4'>
            {t('MODAL.RESULT_CONFIRM_TEST')}
          </p>

          <p className='text-sm sm:text-base text-gray-900 mb-4 sm:mb-6'>
            <span className='text-red-500 font-semibold'>{t('MODAL.NOTE_CONFIRM_TEST')}:</span>{' '}
            {t('MODAL.WARNING_CONFIRM_TEST')}
          </p>

          <button
            onClick={() => {
              setOpen(false);
              // TODO: điều hướng đến trang test
            }}
            className='bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-sm sm:text-base'
          >
            {t('MODAL.START_CONFIRM_TEST')}
          </button>
        </div>
      </Modal>
    </div>
  );
}
