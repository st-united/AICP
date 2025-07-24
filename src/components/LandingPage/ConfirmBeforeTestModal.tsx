import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ImproveTestModal } from './Modals/ImproveTestModal';
import { InfoModal } from './Modals/InfoModal';
import { NewTestModal } from './Modals/NewTestModal';
import { Modal } from '@app/components/molecules';
import { NAVIGATE_URL } from '@app/constants';
import { useHasTakenExamDefault, useSubmitExam, useUpdateUserStudentInfo } from '@app/hooks';
import { RootState } from '@app/redux/store';

interface ConfirmBeforeTestModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ConfirmBeforeTestModal(confirmProps: ConfirmBeforeTestModalProps) {
  const navigate = useNavigate();
  const { mutate: submitExam, isPending } = useSubmitExam();
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: hasTakenExam } = useHasTakenExamDefault();
  const { mutate: updateUserStudentInfo } = useUpdateUserStudentInfo();
  const [showInfoModal, setShowInfoModal] = React.useState(false);

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
      <div className='relative flex flex-col items-center w-full px-4 sm:px-6 max-w-xl mx-auto'>
        <ModalHeader title={t('CONFIRM_BEFORE_TEST_MODAL.TITLE_INFO')} />
        <div className='w-full mb-4 text-sm sm:text-base font-semibold text-start'>
          {t('CONFIRM_BEFORE_TEST_MODAL.INFO_TEXT')}
        </div>
        <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 w-full mb-4 pb-2'>
          <div
            className={`flex-1 border rounded-xl px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex items-center justify-center cursor-pointer transition-all duration-150 ${
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
              className={`w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex items-center justify-center border-2 rounded-full ${
                selectedType === 'student' ? 'border-orange-500' : 'border-gray-300'
              }`}
            >
              {selectedType === UserType.STUDENT && (
                <span className='w-2 h-2 sm:w-3 sm:h-3 bg-orange-500 rounded-full block'></span>
              )}
            </span>
            <span className='text-sm sm:text-base md:text-lg font-medium whitespace-nowrap'>
              {t('USER.STUDENT')}
            </span>
          </div>
          <div
            className={`flex-1 border rounded-xl px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex items-center justify-center cursor-pointer transition-all duration-150 ${
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
              className={`w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex items-center justify-center border-2 rounded-full ${
                selectedType === 'worker' ? 'border-orange-500' : 'border-gray-300'
              }`}
            >
              {selectedType === UserType.WORKER && (
                <span className='w-2 h-2 sm:w-3 sm:h-3 bg-orange-500 rounded-full block'></span>
              )}
            </span>
            <span className='text-sm sm:text-base md:text-lg font-medium whitespace-nowrap'>
              {t('USER.WORKER')}
            </span>
          </div>
        </div>
        {isStudentSelected && (
          <div className='w-full space-y-3'>
            <div>
              <input
                className='w-full border border-gray-300 rounded-xl px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-base outline-none focus:border-orange-500 transition-colors'
                placeholder='Tên trường *'
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
              />
            </div>
            <div>
              <input
                className='w-full border border-gray-300 rounded-xl px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-base outline-none focus:border-orange-500 transition-colors'
                placeholder='Mã số sinh viên *'
                value={studentCode}
                onChange={(e) => setStudentCode(e.target.value)}
              />
            </div>
          </div>
        )}
        <div className='mt-6 w-full flex justify-center'>
          <Button
            onClick={handleContinue}
            disabled={isContinueDisabled}
            loading={isPending}
            className='w-full sm:w-auto sm:min-w-[200px] h-10 sm:h-12 px-6 py-2 text-sm sm:text-base md:text-lg font-semibold rounded-full border !border-primary !bg-orange-500 !text-white hover:!bg-white hover:!text-primary active:bg-orange-700 transition-all duration-300'
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

  const handleSubmitUserInfo = (data: {
    isStudent: boolean;
    university: string;
    studentCode: string;
  }) => {
    updateUserStudentInfo(data, {
      onSuccess: () => setShowInfoModal(false),
    });
  };

  const renderModalContent = () => {
    if (showInfoModal || user?.isStudent === null) {
      return (
        <InfoModal
          userProfile={user}
          onSubmit={handleSubmitUserInfo}
          onClose={confirmProps.onClose}
          isPending={isPending}
        />
      );
    }

    if (hasTakenExam?.hasTakenExam) {
      return (
        <ImproveTestModal
          confirmProps={confirmProps}
          handleReviewResult={handleReviewResult}
          handleStartTest={handleStartTest}
          submitExam={submitExam}
        />
      );
    }

    return (
      <NewTestModal
        confirmProps={confirmProps}
        handleBackInfo={handleBackInfo}
        handleStartTest={handleStartTest}
      />
    );
  };

  return (
    <Modal
      open={confirmProps.open}
      onCancel={confirmProps.onClose}
      footer={null}
      destroyOnHidden
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
      {renderModalContent()}
    </Modal>
  );
}
