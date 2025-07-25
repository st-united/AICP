import { Modal } from 'antd';

interface InterviewBookingModalProps {
  open: boolean;
  onCancel: () => void;
}

const InterviewBookingModal: React.FC<InterviewBookingModalProps> = ({
  open,
  onCancel,
}: InterviewBookingModalProps) => {
  return (
    <Modal open={open} onCancel={onCancel} footer={null}>
      <div>
        <h1>Interview Booking</h1>
      </div>
    </Modal>
  );
};

export default InterviewBookingModal;
