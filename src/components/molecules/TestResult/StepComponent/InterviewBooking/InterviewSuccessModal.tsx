import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { SuccessIcon } from '@app/assets/svgs/NotificationIcon';
import NotificationModal from '@app/components/atoms/NotificationModal/NotificationModal';
import { RootState } from '@app/redux/store';

export interface InterviewSuccessModalProps {
  open: boolean;
  onCancel: () => void;
}

const InterviewSuccessModal: React.FC<InterviewSuccessModalProps> = ({
  open,
  onCancel,
}: InterviewSuccessModalProps) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const email = user?.email;
  const { t } = useTranslation();
  return (
    <NotificationModal
      icon={<img src={SuccessIcon} alt='success' className='w-20 h-20' />}
      title={t('NOTIFICATION_MODAL.INTERVIEW_BOOKING_SUCCESS_TITLE')}
      description={
        <div className='text-lg text-center m-0'>
          {t('NOTIFICATION_MODAL.INTERVIEW_BOOKING_SUCCESS_DESCRIPTION')}
          <span className='font-bold'> {email}</span>
        </div>
      }
      open={open}
      onCancel={onCancel}
    />
  );
};

export default InterviewSuccessModal;
