import { Button } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

enum InterviewBookingStep {
  OVERVIEW = 'overview',
  BOOKING = 'booking',
}

const InterviewBooking: React.FC = () => {
  const { t } = useTranslation();
  const [interviewBookingStep, setInterviewBookingStep] = useState<InterviewBookingStep>(
    InterviewBookingStep.OVERVIEW,
  );
  return (
    <div>
      {interviewBookingStep === InterviewBookingStep.OVERVIEW && (
        <div className='flex flex-col gap-8 bg-white'>
          <div className='flex flex-col items-center justify-center max-w-xl mx-auto mt-12'>
            <div className='text-center'>
              <h2 className='text-xl font-semibold text-[#5B5B5B] mb-12'>
                {t('TEST_RESULT.BOOKING_TITLE')}
              </h2>
            </div>
            <Button
              type='primary'
              className='rounded-full text-lg font-bold px-6 py-5 mb-6'
              onClick={() => setInterviewBookingStep(InterviewBookingStep.BOOKING)}
            >
              {t('TEST_RESULT.BOOKING_BUTTON')}
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
