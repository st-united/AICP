import { Button, Divider } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { getStorageData } from '@app/config';
import { NAVIGATE_URL } from '@app/constants';
import { EXAM_LATEST } from '@app/constants/testing';
import { useCheckInterview } from '@app/hooks/useMentor';

enum InterviewBookingStep {
  OVERVIEW = 'overview',
  BOOKING = 'booking',
}

const InterviewBooking: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const examId = getStorageData(EXAM_LATEST);
  const [interviewBookingStep] = useState<InterviewBookingStep>(InterviewBookingStep.OVERVIEW);
  const { data, isLoading } = useCheckInterview(examId);
  return (
    <div>
      {interviewBookingStep === InterviewBookingStep.OVERVIEW && (
        <div className='flex flex-col gap-8 bg-white'>
          <div className='flex flex-col items-center justify-center max-w-xl mx-auto'>
            <div className='flex flex-col items-center justify-center max-w-3xl mx-auto gap-8 text-center'>
              <div className='text-[1.625rem] xsM:text-2xl sm:text-3xl md:text-4xl font-bold text-[#FE7743]'>
                {t('TEST_RESULT.BOOKING_BUTTON')}
              </div>
              <div className='w-[50%]'>
                <Divider className='border-[#FE7743] !p-0 !m-0' />
              </div>
              <h2 className='text-xl font-semibold text-[#5B5B5B] mb-12'>
                {t('TEST_RESULT.BOOKING_TITLE')}
              </h2>
            </div>
            <Button
              type='primary'
              loading={isLoading}
              className='rounded-full text-lg font-bold px-6 py-5 mb-6'
              onClick={() => navigate(NAVIGATE_URL.INTERVIEW_DYNAMIC(examId))}
            >
              {!data?.hasInterviewRequest
                ? t('TEST_RESULT.BOOKING_BUTTON')
                : t('TEST_RESULT.VIEW_DETAIL_BUTTON_BOOKED')}
            </Button>
          </div>
        </div>
      )}
      {interviewBookingStep === InterviewBookingStep.BOOKING && (
        <div className='flex flex-col gap-8 bg-white min-h-screen'>
          <div className='flex flex-col items-center justify-center max-w-xl mx-auto mt-10'>
            <div className='text-center'>
              <h2 className='text-xl font-semibold text-[#5B5B5B]'>
                {t('TEST_RESULT.BOOKING_TITLE')}
              </h2>
            </div>
            <Button type='primary' className='rounded-full text-lg font-bold px-6 py-5'>
              {t('TEST_RESULT.BOOKING_BUTTON')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewBooking;
