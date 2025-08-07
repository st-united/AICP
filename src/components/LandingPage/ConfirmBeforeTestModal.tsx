import { CloseCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Modal } from '@app/components/molecules';
import { NAVIGATE_URL } from '@app/constants';
import { useHasTakenExamDefault, useSubmitExam, useGetHistory } from '@app/hooks';
import { RootState } from '@app/redux/store';

interface ConfirmBeforeTestModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ConfirmBeforeTestModal(confirmProps: ConfirmBeforeTestModalProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate: submitExam, isPending } = useSubmitExam();
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: hasTakenExam } = useHasTakenExamDefault();
  const { data: historyData } = useGetHistory();

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

      <div className='cursor-pointer bg-blue-100 rounded-full w-1/5 aspect-square flex items-center justify-center'>
        <div className='bg-blue-300 rounded-full w-[85%] aspect-square flex items-center justify-center'>
          <div className='bg-[#0069E2] rounded-full w-[70%] md:w-[50%] aspect-square flex items-center justify-center'>
            <div className='bg-blue-300 rounded-full w-[95%] md:w-[90%] aspect-square flex items-center justify-center'>
              <span className='text-xl text-[#0069E2] md:text-3xl font-extrabold'></span>
            </div>
          </div>
        </div>
      </div>

      <span className='text-xl font-bold my-2 text-center px-2 md:text-2xl md:px-4 md:my-6'>
        {title}
      </span>
    </>
  );

  const ModalContent = ({
    durationKey,
    examStatus,
  }: {
    durationKey?: string;
    examStatus?: string;
  }) => (
    <div className='px-2 space-y-2 md:px-6 md:space-y-3'>
      {examStatus !== 'IN_PROGRESS' && durationKey && (
        <p className='text-base text-gray-900 md:text-xl'>
          <Trans
            i18nKey={durationKey}
            values={{ duration: hasTakenExam?.examSetDuration }}
            components={{ bold: <span className='font-bold text-[#fe7743]' /> }}
          />
        </p>
      )}
      {examStatus !== 'IN_PROGRESS' && (
        <p className='text-base text-gray-900 md:text-xl'>{t('MODAL.RESULT_CONFIRM_TEST')}</p>
      )}
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

      <div className='mt-4 px-3 w-full flex justify-center items-center md:my-6'>
        <Button
          onClick={handleStartTest}
          className='w-[230px] h-full text-lg font-semibold px-4 py-2 rounded-full border !border-primary !bg-orange-500 hover:!bg-white hover:!text-primary active:bg-orange-700 !text-white transition-colors duration-200 md:w-auto md:min-w-[12rem] md:px-8 md:py-3 md:text-xl'
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

      <div className='mt-4 px-3 w-full md:my-6'>
        <div className='flex flex-col gap-2 md:flex-row md:justify-center md:gap-4'>
          <Button
            onClick={handleReviewResult}
            className='w-full h-full text-base font-semibold px-3 py-2 rounded-full bg-white border !border-primary !text-orange-500 hover:border-none hover:!text-white hover:!bg-primary active:border-orange-700 active:text-orange-700 transition-colors duration-200 md:w-48 md:px-6 md:py-3 md:text-xl'
          >
            {t('MODAL.REVIEW_RESULT')}
          </Button>

          <Button
            onClick={handleStartTest}
            className='w-full h-full text-base font-semibold border !border-primary px-3 py-2 rounded-full !bg-orange-500 hover:!bg-white hover:!text-primary !text-white transition-colors duration-200 md:w-48 md:px-6 md:py-3 md:text-xl'
          >
            {t('MODAL.START_CONFIRM_TEST')}
          </Button>
        </div>
      </div>
    </div>
  );

  const ContinueTestModal = ({ examId }: { examId: string }) => (
    <div className='relative flex flex-col items-center justify-center'>
      <ModalHeader title={t('MODAL.TITLE_CONFIRM_CONTINUE_TEST')} />

      <div className='px-6 w-full flex flex-col items-start md:my-6 !mt-0 !mb-6 gap-2.5'>
        <p className='text-base text-gray-900 md:text-xl'>
          <Trans i18nKey='MODAL.CONTINUE_TEST_DESCRIPTION_1' components={{ br: <br /> }} />
        </p>
        <p className='text-base text-gray-900 md:text-xl'>
          <Trans i18nKey='MODAL.CONTINUE_TEST_DESCRIPTION_2' components={{ br: <br /> }} />
        </p>
        <ul className='text-base text-gray-900 md:text-xl text-left list-disc list-inside pl-4 flex flex-col gap-1.5'>
          <li>
            <Trans i18nKey='MODAL.CONTINUE_TEST_OPTION_CONTINUE' components={{ b: <b /> }} />
          </li>
          <li className='text-align-left'>
            <Trans i18nKey='MODAL.CONTINUE_TEST_OPTION_EXIT' components={{ b: <b /> }} />
          </li>
        </ul>
      </div>

      <ModalContent examStatus='IN_PROGRESS' />

      <div className='mt-4 px-3 w-full md:my-6'>
        <div className='flex flex-col gap-2 md:flex-row md:justify-center md:gap-4'>
          <Button
            onClick={() => submitExam(examId)}
            className='w-full h-full text-base font-semibold px-3 py-2 rounded-full bg-white border-2 !border-orange-500 !text-orange-500 hover:border-orange-600 hover:text-orange-600 active:border-orange-700 active:text-orange-700 transition-colors duration-200 md:w-48 md:px-6 md:py-3 md:text-xl'
          >
            {t('BUTTON.EXIT_TEST')}
          </Button>

          <Button
            onClick={handleStartTest}
            className='w-full h-full text-base font-semibold border !border-primary px-3 py-2 rounded-full !bg-orange-500 hover:!bg-white hover:!text-primary !text-white transition-colors duration-200 md:w-48 md:px-6 md:py-3 md:text-xl'
          >
            {t('BUTTON.CONTINUE_NOW')}
          </Button>
        </div>
      </div>
    </div>
  );

  let modalToShow = null;
  let inProgressExamId = '';
  if (historyData) {
    const inProgressExam = historyData.find((item) => item.examStatus === 'IN_PROGRESS');
    const submittedExam = historyData.find((item) => item.examStatus === 'SUBMITTED');
    if (inProgressExam) {
      modalToShow = 'continue';
      inProgressExamId = inProgressExam.id;
    } else if (submittedExam) {
      modalToShow = 'improve';
    } else {
      modalToShow = 'new';
    }
  }

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
    >
      {modalToShow === 'continue' ? (
        <ContinueTestModal examId={inProgressExamId} />
      ) : modalToShow === 'improve' ? (
        <ImproveTestModal />
      ) : (
        <NewTestModal />
      )}
    </Modal>
  );
}
