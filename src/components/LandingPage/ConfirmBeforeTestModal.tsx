import { CloseCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Modal } from '@app/components/molecules';
import { NAVIGATE_URL } from '@app/constants';
import { useHasTakenExamDefault } from '@app/hooks';

interface ConfirmBeforeTestModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ConfirmBeforeTestModal(confirmProps: ConfirmBeforeTestModalProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: hasTakenExam } = useHasTakenExamDefault();

  const handleStartTest = () => {
    navigate(NAVIGATE_URL.TEST);
  };
  const handleReviewResult = () => {
    navigate(NAVIGATE_URL.TEST_RESULT);
  };

  const ModalHeader = ({ title }: { title: string }) => (
    <>
      <CloseCircleOutlined
        onClick={confirmProps.onClose}
        className='absolute right-0 top-0 text-2xl text-gray-500 hover:text-gray-700 cursor-pointer sm:text-3xl'
      />

      <div className='bg-blue-100 rounded-full p-4 sm:p-4'>
        <div className='bg-blue-300 rounded-full p-3 sm:p-6'>
          <span className='text-3xl font-medium text-blue-500 m-3 sm:text-4xl'>?</span>
        </div>
      </div>

      <h2 className='text-2xl font-bold my-2 text-center sm:px-4 sm:text-3xl sm:mb-6 sm:mt-6'>
        {title}
      </h2>
    </>
  );

  const ModalContent = ({ durationKey }: { durationKey: string }) => (
    <div className='px-0 space-y-1 sm:space-y-2 sm:px-6'>
      <p className='text-lg text-gray-900 sm:text-xl'>
        <Trans
          i18nKey={durationKey}
          values={{ duration: hasTakenExam?.examSetDuration }}
          components={{ bold: <span className='font-bold' /> }}
        />
      </p>
      <p className='text-lg text-gray-900 sm:text-xl'>{t('MODAL.RESULT_CONFIRM_TEST')}</p>
      <p className='text-lg text-gray-900 sm:text-xl'>
        <span className='text-orange-500 font-semibold'>{t('MODAL.NOTE_CONFIRM_TEST')}:</span>{' '}
        {t('MODAL.WARNING_CONFIRM_TEST')}
      </p>
    </div>
  );

  const NewTestModal = () => (
    <div className='relative flex flex-col items-center'>
      <ModalHeader title={t('MODAL.TITLE_CONFIRM_TAKE_NEW_TEST')} />
      <ModalContent durationKey='MODAL.DURATION_CONFIRM_TAKE_NEW_TEST' />

      <div className='mt-6 px-4 w-full sm:mt-8'>
        <Button
          onClick={handleStartTest}
          className='w-full h-full border-none text-xl font-semibold px-6 py-3 rounded-full !bg-orange-500 hover:bg-orange-600 active:bg-orange-700 !text-white transition-colors duration-200 mx-auto block sm:w-auto sm:min-w-48 sm:px-8 sm:py-3.5 sm:text-xl'
        >
          {t('MODAL.START_CONFIRM_TEST')}
        </Button>
      </div>
    </div>
  );

  const ImproveTestModal = () => (
    <div className='relative flex flex-col items-center'>
      <ModalHeader title={t('MODAL.TITLE_CONFIRM_IMPROVE_TEST')} />
      <ModalContent durationKey='MODAL.DURATION_CONFIRM_IMPROVE_TEST' />

      <div className='mt-6 px-4 w-full sm:mt-8'>
        <div className='flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4'>
          <Button
            onClick={handleReviewResult}
            className='w-full h-full text-lg font-semibold px-4 py-3 rounded-full bg-white border-2 !border-orange-500 !text-orange-500 hover:border-orange-600 hover:text-orange-600 active:border-orange-700 active:text-orange-700 transition-colors duration-200 sm:w-48 sm:px-6 sm:py-3.5 sm:text-xl'
          >
            {t('MODAL.REVIEW_RESULT')}
          </Button>
          <Button
            onClick={handleStartTest}
            className='w-full h-full text-lg font-semibold border-none px-4 py-3 rounded-full !bg-orange-500 hover:bg-orange-600 active:bg-orange-700 !text-white transition-colors duration-200 sm:w-48 sm:px-6 sm:py-3.5 sm:text-xl'
          >
            {t('MODAL.START_CONFIRM_TEST')}
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      open={confirmProps.open}
      onCancel={confirmProps.onClose}
      footer={null}
      destroyOnHidden={true}
      closable={false}
      className='p-3 sm:p-5'
    >
      {hasTakenExam?.hasTakenExam ? <ImproveTestModal /> : <NewTestModal />}
    </Modal>
  );
}
