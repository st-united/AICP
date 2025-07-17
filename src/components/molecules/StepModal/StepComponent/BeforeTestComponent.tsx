import { Button, Spin } from 'antd';
import { Trans, useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { NAVIGATE_URL } from '@app/constants';
import { ExamStatusEnum } from '@app/constants/enum';
import { useHasTakenExamDefault, useUpdateUserStudentInfo } from '@app/hooks';
import { StepItemComponent } from '@app/interface/stepSection.interface';
import { RootState } from '@app/redux/store';

export enum ModalState {
  INFO = 'info',
  CONFIRM = 'confirm_test',
}

export default function BeforeTestComponent({ goBack }: StepItemComponent) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate: updateUserStudentInfo } = useUpdateUserStudentInfo();
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: hasTakenExam, isLoading } = useHasTakenExamDefault();
  console.log(user);
  const handleStartTest = () => {
    navigate(NAVIGATE_URL.TEST);
  };
  const handleReviewResult = () => {
    navigate(NAVIGATE_URL.TEST_RESULT);
  };

  const handleUpdateUserStudentInfo = () => {
    updateUserStudentInfo({
      isStudent: true,
      university: user?.university,
      studentCode: user?.studentCode,
    });
  };
  const InfoModal = () => {
    return (
      <div>
        <ModalHeader title={t('MODAL.TITLE_INFO')} />
        <div></div>
      </div>
    );
  };
  const ModalHeader = ({ title }: { title: string }) => (
    <>
      <div className='bg-blue-100 rounded-full p-3 md:p-4'>
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
    <div className='relative flex flex-col items-center justify-center'>
      <ModalHeader title={t('MODAL.TITLE_CONFIRM_TAKE_NEW_TEST')} />
      <ModalContent durationKey='MODAL.DURATION_CONFIRM_TAKE_NEW_TEST' />

      <div className='mt-4 px-3 w-full flex justify-center md:my-6 gap-4'>
        <Button
          onClick={goBack}
          className='w-full h-full border-none text-lg font-semibold px-4 py-2 rounded-full !bg-orange-500 hover:bg-orange-600 active:bg-orange-700 !text-white transition-colors duration-200 md:w-auto md:min-w-[12rem] md:px-8 md:py-3 md:text-xl'
        >
          {t('MODAL.BACK')}
        </Button>
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
        <div className='flex flex-col gap-2 md:flex-row md:justify-center md:gap-4 items-center'>
          <Button
            onClick={handleReviewResult}
            className='w-full h-full text-base font-semibold px-3 py-2 rounded-full bg-white border-2 !border-orange-500 !text-orange-500 hover:border-orange-600 hover:text-orange-600 active:border-orange-700 active:text-orange-700 transition-colors duration-200 md:w-48 md:px-6 md:py-3 md:text-xl'
          >
            {t('MODAL.REVIEW_RESULT')}
          </Button>
          <Button
            onClick={goBack}
            className='w-full h-full border-none text-base font-semibold px-3 py-2 rounded-full !bg-orange-500 hover:bg-orange-600 active:bg-orange-700 !text-white transition-colors duration-200 md:w-auto md:min-w-[12rem] md:px-6 md:py-3 md:text-xl'
          >
            {t('MODAL.BACK')}
          </Button>
          {hasTakenExam?.examStatus === ExamStatusEnum.IN_PROGRESS && (
            <Button
              onClick={handleStartTest}
              className='w-full h-full text-lg font-semibold border-none px-4 py-2 rounded-full !bg-orange-500 hover:bg-orange-600 active:bg-orange-700 !text-white transition-colors duration-200 md:w-48 md:px-6 md:py-3 md:text-xl'
            >
              {t('MODAL.START_CONFIRM_TEST_AGAIN')}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
  if (isLoading) {
    return <Spin className='text-center items-center' />;
  }

  return user?.isStudent !== null ? (
    hasTakenExam?.hasTakenExam ? (
      <ImproveTestModal />
    ) : (
      <NewTestModal />
    )
  ) : (
    <InfoModal />
  );
}
