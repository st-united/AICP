import { CloseCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Modal } from '@app/components/molecules';
import { NAVIGATE_URL } from '@app/constants';
import { UserType } from '@app/constants/resultEnum';
import {
  useHasTakenExamDefault,
  useSubmitExam,
  useUpdateUserStudentInfo,
  useGetHistory,
} from '@app/hooks';
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
  const { mutate: updateUserStudentInfo } = useUpdateUserStudentInfo();
  const [showInfoModal, setShowInfoModal] = React.useState(false);
  const { data: historyData } = useGetHistory();

  const InfoModal = () => {
    const [selectedType, setSelectedType] = React.useState<UserType | null>(null);
    const [university, setUniversity] = React.useState('');
    const [studentCode, setStudentCode] = React.useState('');

    const handleContinue = () => {
      if (selectedType === UserType.STUDENT) {
        updateUserStudentInfo({
          isStudent: true,
          university,
          studentCode,
        });
        setShowInfoModal(false);
      } else if (selectedType === UserType.WORKER) {
        updateUserStudentInfo({
          isStudent: false,
          university: '',
          studentCode: '',
        });
        setShowInfoModal(false);
      }
    };

    const isStudentSelected = selectedType === 'student';
    const isContinueDisabled =
      selectedType === null || (isStudentSelected && (!university.trim() || !studentCode.trim()));

    return (
      <div className='relative flex flex-col items-center w-full px-2 sm:px-6 max-w-xl mx-auto'>
        <ModalHeader title={t('CONFIRM_BEFORE_TEST_MODAL.TITLE_INFO')} />
        <div className='w-full mb-2 text-base font-semibold text-start'>
          {t('CONFIRM_BEFORE_TEST_MODAL.INFO_TEXT')}
        </div>
        <div className='flex flex-row gap-4 w-full mb-4 pb-2'>
          <div
            className={`flex-1  border rounded-xl px-8 py-4 flex items-center justify-center cursor-pointer transition-all duration-150 whitespace-nowrap ${
              selectedType === UserType.STUDENT
                ? 'border-orange-500 bg-orange-50'
                : 'border-gray-300 bg-white'
            }`}
            onClick={() => setSelectedType(UserType.STUDENT)}
            role='button'
            tabIndex={0}
            onKeyDown={(e) =>
              (e.key === 'Enter' || e.key === ' ') && setSelectedType(UserType.STUDENT)
            }
          >
            <span
              className={`w-5 h-5 mr-3 flex items-center justify-center border-2 rounded-full ${
                selectedType === 'student' ? 'border-orange-500' : 'border-gray-300'
              }`}
            >
              {selectedType === UserType.STUDENT && (
                <span className='w-3 h-3 bg-orange-500 rounded-full block'></span>
              )}
            </span>
            <span className='text-lg font-medium whitespace-nowrap'>{t('USER.STUDENT')}</span>
          </div>
          <div
            className={`flex-1 border rounded-xl px-8 py-4 flex items-center justify-center cursor-pointer transition-all duration-150 whitespace-nowrap ${
              selectedType === UserType.WORKER
                ? 'border-orange-500 bg-orange-50'
                : 'border-gray-300 bg-white'
            }`}
            onClick={() => setSelectedType(UserType.WORKER)}
            role='button'
            tabIndex={0}
            onKeyDown={(e) =>
              (e.key === 'Enter' || e.key === ' ') && setSelectedType(UserType.WORKER)
            }
          >
            <span
              className={`w-5 h-5 mr-3 flex items-center justify-center border-2 rounded-full ${
                selectedType === 'worker' ? 'border-orange-500' : 'border-gray-300'
              }`}
            >
              {selectedType === UserType.WORKER && (
                <span className='w-3 h-3 bg-orange-500 rounded-full block'></span>
              )}
            </span>
            <span className='text-lg font-medium whitespace-nowrap'>{t('USER.WORKER')}</span>
          </div>
        </div>
        {isStudentSelected && (
          <div className='w-full'>
            <div className='mb-3'>
              <input
                className='w-full border border-gray-300 rounded-xl px-4 py-4 text-base outline-none focus:border-orange-500 transition-colors'
                placeholder='Tên trường *'
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <input
                className='w-full border border-gray-300 rounded-xl px-4 py-4 text-base outline-none focus:border-orange-500 transition-colors'
                placeholder='Mã số sinh viên *'
                value={studentCode}
                onChange={(e) => setStudentCode(e.target.value)}
              />
            </div>
          </div>
        )}
        <div className='mt-4 w-full flex justify-center'>
          <Button
            onClick={handleContinue}
            disabled={isContinueDisabled}
            loading={isPending}
            className='w-full max-w-xs h-full px-4 py-2 text-lg font-semibold rounded-full border !border-primary !bg-orange-500 !text-white hover:!bg-white hover:!text-primary active:bg-orange-700 transition-all duration-300'
          >
            {t('BUTTON.CONTINUE')}
          </Button>
        </div>
      </div>
    );
  };

  const handleStartTest = () => {
    navigate(NAVIGATE_URL.TEST);
  };
  const handleReviewResult = () => {
    navigate(NAVIGATE_URL.TEST_RESULT);
  };
  const handleBackInfo = () => {
    setShowInfoModal(true);
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
              <span className='text-xl text-[#0069E2] md:text-3xl font-extrabold'>
                {user?.isStudent === null ? '!' : '?'}
              </span>
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
