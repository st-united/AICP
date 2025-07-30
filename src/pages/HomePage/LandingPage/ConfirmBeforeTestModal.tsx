import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ContinueTestModal } from './Modals/ContinueTestModal';
import { ImproveTestModal } from './Modals/ImproveTestModal';
import { NewTestModal } from './Modals/NewTestModal';
import { Modal } from '@app/components/molecules';
import { NAVIGATE_URL } from '@app/constants';
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

export default function ConfirmBeforeTestModal({ open, onClose }: ConfirmBeforeTestModalProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { mutate: submitExam, isPending } = useSubmitExam();
  const { mutate: updateUserStudentInfo } = useUpdateUserStudentInfo();
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: hasTakenExam } = useHasTakenExamDefault();
  const { data: historyData } = useGetHistory();

  const handleStartTest = () => navigate(NAVIGATE_URL.TEST);
  const handleReviewResult = () => navigate(NAVIGATE_URL.TEST_RESULT);

  const renderModalContent = () => {
    const inProgressExam = historyData?.find((item) => item.examStatus === 'IN_PROGRESS');
    if (inProgressExam) {
      return (
        <ContinueTestModal
          confirmProps={{ onClose }}
          examId={inProgressExam.id}
          handleStartTest={handleStartTest}
          submitExam={submitExam}
        />
      );
    }

    if (hasTakenExam?.hasTakenExam) {
      return (
        <ImproveTestModal
          confirmProps={{ onClose }}
          hasTakenExam={hasTakenExam}
          handleReviewResult={handleReviewResult}
          handleStartTest={handleStartTest}
          submitExam={submitExam}
        />
      );
    }

    return (
      <NewTestModal
        confirmProps={{ onClose }}
        handleBackInfo={() => {}}
        handleStartTest={handleStartTest}
        hasTakenExam={hasTakenExam}
      />
    );
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
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
