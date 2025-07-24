import { Button } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate: submitExam, isPending } = useSubmitExam();
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: hasTakenExam } = useHasTakenExamDefault();
  const { mutate: updateUserStudentInfo } = useUpdateUserStudentInfo();
  const [showInfoModal, setShowInfoModal] = React.useState(false);

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
