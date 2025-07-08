import { Button, Spin } from 'antd';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { NAVIGATE_URL } from '@app/constants';
import { ExamStatusEnum } from '@app/constants/enum';
import { useHasTakenExamDefault } from '@app/hooks';
import { StepItemComponent } from '@app/interface/stepSection.interface';

export default function BeforeTestComponent({ goBack }: StepItemComponent) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: hasTakenExam, isLoading } = useHasTakenExamDefault();

  const handleStartTest = () => {
    navigate(NAVIGATE_URL.TEST);
  };
  const handleReviewResult = () => {
    navigate(NAVIGATE_URL.TEST_RESULT);
  };

  const ModalHeader = ({ title }: { title: string }) => (
    <>
      <div className='bg-blue-100 rounded-full p-3 md:p-4 aspect-square'>
        <div className='bg-blue-300 rounded-full p-3 md:p-6'>
          <span className='text-2xl font-medium text-blue-500 m-3 md:text-4xl'>?</span>
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
    <div className='relative flex flex-col items-center justify-center h-full'>
      <ModalHeader title={t('MODAL.TITLE_CONFIRM_TAKE_NEW_TEST')} />
      <ModalContent durationKey='MODAL.DURATION_CONFIRM_TAKE_NEW_TEST' />

      <div className='mt-4 w-full flex justify-center '>
        <Button
          type='primary'
          onClick={handleStartTest}
          className='text-base font-semibold border-none px-6 md:px-14 py-2 rounded-full md:py-6 md:text-xl'
        >
          {t('MODAL.START_CONFIRM_TEST')}
        </Button>
      </div>
    </div>
  );

  const ImproveTestModal = () => (
    <div className='relative flex flex-col items-center h-full justify-center'>
      <ModalHeader title={t('MODAL.TITLE_CONFIRM_IMPROVE_TEST')} />
      <ModalContent durationKey='MODAL.DURATION_CONFIRM_IMPROVE_TEST' />

      <div className='w-full mt-4'>
        <div className='flex gap-2 justify-center md:gap-4'>
          <Button
            onClick={handleReviewResult}
            className='text-base font-semibold px-3 md:px-11 py-2 rounded-full md:py-6 md:text-xl bg-white border-2 !border-orange-500 !text-orange-500 hover:!border-orange-800 hover:!text-orange-800 active:border-orange-700 active:text-orange-700 transition-colors duration-200'
          >
            {t('MODAL.REVIEW_RESULT')}
          </Button>

          <Button
            type='primary'
            onClick={handleStartTest}
            className='text-base font-semibold border-none px-6 md:px-14 py-2 rounded-full md:py-6 md:text-xl'
          >
            {t('MODAL.START_CONFIRM_TEST')}
          </Button>
        </div>
      </div>
    </div>
  );
  if (isLoading) {
    return <Spin className='text-center items-center' />;
  }
  return <NewTestModal />;
}
