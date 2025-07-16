import { CloseCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Modal } from '@app/components/molecules';
import { NAVIGATE_URL } from '@app/constants';
import { useHasTakenExamDefault, useSubmitExam } from '@app/hooks';

interface ConfirmBeforeTestModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ConfirmBeforeTestModal(confirmProps: ConfirmBeforeTestModalProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: hasTakenExam } = useHasTakenExamDefault();
  const { mutate: submitExam, isPending } = useSubmitExam();

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
        className='absolute right-0 top-0 text-2xl cursor-pointer text-gray-500 hover:text-gray-700 md:text-3xl'
      />

      <div className='bg-blue-100 rounded-full p-3 md:p-4'>
        <div className='bg-blue-300 rounded-full p-3 md:p-6'>
          <span className='text-2xl font-medium text-blue-500 m-2 md:text-4xl'>?</span>
        </div>
      </div>

      <h2 className='text-xl font-bold my-2 text-center px-2 md:text-3xl md:px-4 md:my-6'>
        {title}
      </h2>
    </>
  );

  const ModalContent = ({ durationKey }: { durationKey: string }) => (
    <div className='px-2 space-y-2 md:px-6 md:space-y-3'>
      <p className='text-base text-gray-900 md:text-xl'>
        <Trans
          i18nKey={durationKey}
          values={{ duration: hasTakenExam?.examSetDuration }}
          components={{ bold: <span className='font-bold' /> }}
        />
      </p>

      <p className='text-base text-gray-900 md:text-xl'>{t('MODAL.RESULT_CONFIRM_TEST')}</p>
      <p className='text-base text-gray-900 md:text-xl'>
        <span className='text-orange-500 font-semibold'>{t('MODAL.NOTE_CONFIRM_TEST')}:</span>{' '}
        {t('MODAL.WARNING_CONFIRM_TEST')}
      </p>
    </div>
  );
  const NewTestModal = () => (
    <div className='relative flex flex-col items-center justify-center'>
      <ModalHeader title={t('MODAL.TITLE_CONFIRM_TAKE_NEW_TEST')} />
      <ModalContent durationKey='MODAL.DURATION_CONFIRM_TAKE_NEW_TEST' />

      <div className='mt-4 px-3 w-full flex justify-center md:my-6'>
        <Button
          onClick={handleStartTest}
          className='w-full h-full border-none text-lg font-semibold px-4 py-2 rounded-full !bg-orange-500 hover:bg-orange-600 active:bg-orange-700 !text-white transition-colors duration-200 md:w-auto md:min-w-[12rem] md:px-8 md:py-3 md:text-xl'
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

      <div className='px-3 w-full md:my-6'>
        <div className='flex flex-col gap-2 md:flex-row md:justify-center md:gap-4'>
          {hasTakenExam?.examStatus !== 'IN_PROGRESS' ? (
            <Button
              onClick={handleReviewResult}
              className='w-full h-full text-base font-semibold px-3 py-2 rounded-full bg-white border-2 !border-orange-500 !text-orange-500 hover:border-orange-600 hover:text-orange-600 active:border-orange-700 active:text-orange-700 transition-colors duration-200 md:w-48 md:px-6 md:py-3 md:text-xl'
            >
              {t('MODAL.REVIEW_RESULT')}
            </Button>
          ) : (
            <Button
              onClick={() => submitExam(hasTakenExam?.examId || '')}
              className='w-full h-full text-base font-semibold px-3 py-2 rounded-full bg-white border-2 !border-orange-500 !text-orange-500 hover:border-orange-600 hover:text-orange-600 active:border-orange-700 active:text-orange-700 transition-colors duration-200 md:w-48 md:px-6 md:py-3 md:text-xl'
            >
              {t('BUTTON.EXIT_TEST')}
            </Button>
          )}
          <Button
            onClick={handleStartTest}
            className='w-full h-full text-base font-semibold border-none px-3 py-2 rounded-full !bg-orange-500 hover:bg-orange-600 active:bg-orange-700 !text-white transition-colors duration-200 md:w-48 md:px-6 md:py-3 md:text-xl'
          >
            {hasTakenExam?.examStatus === 'IN_PROGRESS'
              ? t('BUTTON.CONTINUE_NOW')
              : t('MODAL.START_CONFIRM_TEST')}
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
      classNames={{ content: '!rounded-3xl' }}
      width={{
        xs: '90%',
        sm: '80%',
        md: '70%',
        lg: '60%',
        xl: '50%',
        xxl: '40%',
      }}
      style={{
        maxWidth: '100%',
        margin: '10px auto',
      }}
    >
      {hasTakenExam?.hasTakenExam ? <ImproveTestModal /> : <NewTestModal />}
    </Modal>
  );
}
