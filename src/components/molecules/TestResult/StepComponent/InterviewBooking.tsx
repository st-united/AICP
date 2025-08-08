import { Button, Divider } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import InterviewSuccessModal from './InterviewBooking/InterviewSuccessModal';
import { NAVIGATE_URL } from '@app/constants';
import { EXAM_LATEST } from '@app/constants/testing';
import { useCheckInterviewRequest, useUserInterviewRequest } from '@app/hooks/useBooking';
import { useGetPortfolio } from '@app/hooks/usePortfolio';

const InterviewBooking: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [openInterviewBookingModal, setOpenInterviewBookingModal] = useState(false);
  const { isLoading: isLoadingPortfolio, isSuccess: isSuccessPortfolio } = useGetPortfolio();
  const { mutate: userBooking, isPending: isPendingUserBooking } = useUserInterviewRequest();
  const { data: bookingStatus, isLoading: isLoadingCheckBooking } = useCheckInterviewRequest();
  console.log(bookingStatus);
  const handleBooking = () => {
    if (!isSuccessPortfolio) {
      navigate(NAVIGATE_URL.RESULT_PORTFOLIO);
    } else {
      const examId = localStorage.getItem(EXAM_LATEST);
      if (!bookingStatus?.hasInterviewRequest) {
        userBooking(
          { examId: examId as string },
          {
            onSuccess: () => {
              setOpenInterviewBookingModal(true);
            },
          },
        );
      }
    }
  };
  return (
    <div>
      <div className='flex flex-col items-center justify-center max-w-3xl mx-auto gap-8 text-center'>
        <div className='text-[1.625rem] xsM:text-2xl sm:text-3xl md:text-4xl font-bold text-[#FE7743]'>
          {t('TEST_RESULT.BOOKING_BUTTON')}
        </div>
        <div className='w-1/3'>
          <Divider className='bg-[#FE7743] !p-0 !m-0' />
        </div>
        <h2 className='text-xl font-semibold text-[#5B5B5B] text-center'>
          {t('TEST_RESULT.BOOKING_TITLE')}
        </h2>

        <Button
          type='primary'
          disabled={
            isLoadingPortfolio ||
            isPendingUserBooking ||
            isLoadingCheckBooking ||
            bookingStatus?.hasInterviewRequest
          }
          className='rounded-full text-lg font-bold px-6 py-5'
          onClick={handleBooking}
        >
          {bookingStatus?.hasInterviewRequest
            ? t('TEST_RESULT.BOOKING_BUTTON_BOOKED')
            : t('TEST_RESULT.BOOKING_BUTTON')}
        </Button>
        <InterviewSuccessModal
          open={openInterviewBookingModal}
          onCancel={() => {
            setOpenInterviewBookingModal(false);
          }}
        />
      </div>
    </div>
  );
};

export default InterviewBooking;
