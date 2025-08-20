import { CloseCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { ContinueTestModal } from './Modals/ContinueTestModal';
import { ImproveTestModal } from './Modals/ImproveTestModal';
import { NewTestModal } from './Modals/NewTestModal';
import { Modal } from '@app/components/molecules';
import { NAVIGATE_URL } from '@app/constants';
import { ExamStatusEnum } from '@app/constants/enum';
import { useHasTakenExamDefault, useSubmitExam, useGetHistory } from '@app/hooks';
import './confirmBeforeTestModal.scss';

interface ConfirmBeforeTestModalProps {
  open: boolean;
  onClose: () => void;
  domain?: string;
}

export default function ConfirmBeforeTestModal({
  open,
  onClose,
  domain,
}: ConfirmBeforeTestModalProps) {
  const navigate = useNavigate();

  const { mutate: submitExam } = useSubmitExam();
  const { data: exam } = useHasTakenExamDefault();
  const { data: hasTakenExam } = useHasTakenExamDefault();
  const { data: historyData } = useGetHistory({ examSetName: domain });

  const handleStartTest = () => navigate(NAVIGATE_URL.TEST, { state: { domain } });
  const handleReviewResult = () => navigate(NAVIGATE_URL.TEST_RESULT);

  const renderModalContent = () => {
    const inProgressExam = historyData?.find(
      (item) => item.examStatus === ExamStatusEnum.IN_PROGRESS,
    );
    if (inProgressExam) {
      return (
        <ContinueTestModal
          examId={inProgressExam.id}
          handleStartTest={handleStartTest}
          submitExam={submitExam}
        />
      );
    }

    if (exam?.hasTakenExam) {
      return (
        <ImproveTestModal
          hasTakenExam={exam}
          handleReviewResult={handleReviewResult}
          handleStartTest={handleStartTest}
          submitExam={submitExam}
        />
      );
    }

    return <NewTestModal handleStartTest={handleStartTest} hasTakenExam={exam} />;
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnHidden
      closable={false}
      className='p-0 m-0'
      classNames={{ content: '!rounded-3xl !pr-[0.875rem]' }}
      width={{
        xs: '90%',
        sm: '80%',
        md: '70%',
        lg: '60%',
        xl: '85%',
        xxl: '60%',
      }}
    >
      <div className='relative'>
        <div className='fixed-close-button text-right pr-2'>
          <CloseCircleOutlined
            onClick={onClose}
            className='text-2xl cursor-pointer text-gray-500 hover:text-gray-700 md:text-3xl'
          />
        </div>

        <div className='custom-scrollbar overflow-y-auto max-h-[80vh] pr-[0.625rem]'>
          {renderModalContent()}
        </div>
      </div>
    </Modal>
  );
}
