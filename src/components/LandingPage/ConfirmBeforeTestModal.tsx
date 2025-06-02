import { CloseCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Trans, useTranslation } from 'react-i18next';

import { Modal } from '@app/components/molecules';
import { useHasTakenExamDefault } from '@app/hooks';

interface ConfirmBeforeTestModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ConfirmBeforeTestModal(confirmProps: ConfirmBeforeTestModalProps) {
  const { t } = useTranslation();
  const { data: hasTakenExam } = useHasTakenExamDefault();

  const handleStartTest = () => {
    // TODO
  };
  const handleReviewResult = () => {
    // TODO
  };

  const ModalHeader = ({ title }: { title: string }) => (
    <>
      <CloseCircleOutlined
        onClick={confirmProps.onClose}
        className='absolute right-0 top-0 text-xl sm:text-2xl text-gray-500 hover:text-gray-700 cursor-pointer'
      />

      <div className='bg-blue-100 rounded-full p-3 sm:p-4'>
        <div className='bg-blue-300 rounded-full p-4 sm:p-6'>
          <span className='text-xl sm:text-4xl font-medium text-blue-500 m-3'>?</span>
        </div>
      </div>

      <h2 className='text-xl sm:text-2xl font-bold mb-4 sm:mb-6 mt-4 sm:mt-6 text-center px-4'>
        {title}
      </h2>
    </>
  );

  const ModalContent = ({ durationKey }: { durationKey: string }) => (
    <div className='px-4 sm:px-6 space-y-4'>
      <p className='text-sm sm:text-base text-gray-900'>
        <Trans
          i18nKey={durationKey}
          values={{ duration: hasTakenExam?.examSetDuration }}
          components={{ bold: <span className='font-bold' /> }}
        />
      </p>

      <p className='text-sm sm:text-base text-gray-900'>{t('MODAL.RESULT_CONFIRM_TEST')}</p>

      <p className='text-sm sm:text-base text-gray-900'>
        <span className='text-orange-500 font-semibold'>{t('MODAL.NOTE_CONFIRM_TEST')}:</span>{' '}
        {t('MODAL.WARNING_CONFIRM_TEST')}
      </p>
    </div>
  );

  const NewTestModal = () => (
    <div className='relative flex flex-col items-center'>
      <ModalHeader title={t('MODAL.TITLE_CONFIRM_TAKE_NEW_TEST')} />
      <ModalContent durationKey='MODAL.DURATION_CONFIRM_TAKE_NEW_TEST' />

      <div className='mt-6 sm:mt-8 px-4 w-full'>
        <Button
          onClick={handleStartTest}
          className='w-full h-full border-none sm:w-auto sm:min-w-48 !bg-orange-500 hover:bg-orange-600 active:bg-orange-700 !text-white font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-sm sm:text-base transition-colors duration-200 mx-auto block'
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

      <div className='mt-6 sm:mt-8 px-4 w-full'>
        <div className='flex flex-col sm:flex-row justify-center gap-3 sm:gap-4'>
          <Button
            onClick={handleReviewResult}
            className='w-full h-full sm:w-48 bg-white border-2 !border-orange-500 font-semibold px-4 sm:px-6 py-3 sm:py-3.5 rounded-full text-sm sm:text-base !text-orange-500 hover:border-orange-600 hover:text-orange-600 active:border-orange-700 active:text-orange-700 transition-colors duration-200'
          >
            {t('MODAL.REVIEW_RESULT')}
          </Button>
          <Button
            onClick={handleStartTest}
            className='w-full h-full border-none sm:w-48 !bg-orange-500 hover:bg-orange-600 active:bg-orange-700 !text-white font-semibold px-4 sm:px-6 py-3 sm:py-3.5 rounded-full text-sm sm:text-base transition-colors duration-200'
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
    >
      {hasTakenExam?.hasTakenExam ? <ImproveTestModal /> : <NewTestModal />}
    </Modal>
  );
}
