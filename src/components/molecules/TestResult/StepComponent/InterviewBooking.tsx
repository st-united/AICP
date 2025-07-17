import { Button } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

import SkillLevel from './InterviewBooking/SkillLevel';
import SuggestionList from './InterviewBooking/SuggestionList';
import SummaryBox from './InterviewBooking/SummaryBox';

const InterviewBooking: React.FC = () => {
  const { t } = useTranslation();
  const radarData = [
    { subject: 'AI', value: 60 },
    { subject: 'ML', value: 40 },
    { subject: 'DS', value: 50 },
    { subject: 'Python', value: 70 },
    { subject: 'Math', value: 30 },
    { subject: 'Soft', value: 80 },
  ];

  const suggestions = [
    {
      image: '/src/assets/images/SlideImages/carousel-1.png',
      title: t('TEST_RESULT.SUGGESTION_1_TITLE'),
      desc: t('TEST_RESULT.SUGGESTION_1_DESC'),
      buttonText: t('TEST_RESULT.SUGGESTION_BUTTON'),
      onClick: () => window.open('https://devplus.edu.vn', '_blank'),
    },
    {
      image: '/src/assets/images/SlideImages/carousel-2.png',
      title: t('TEST_RESULT.SUGGESTION_2_TITLE'),
      desc: t('TEST_RESULT.SUGGESTION_2_DESC'),
      buttonText: t('TEST_RESULT.SUGGESTION_BUTTON'),
      onClick: () => window.open('https://devplus.edu.vn', '_blank'),
    },
  ];

  return (
    <div className='flex flex-col gap-8 pb-12 bg-white min-h-screen'>
      <div className='flex flex-col items-center justify-center max-w-xl mx-auto mt-6'>
        <div className='text-center mb-4'>
          <h2 className='text-xl font-semibold mb-2 text-[#5B5B5B]'>
            {t('TEST_RESULT.BOOKING_TITLE')}
          </h2>
        </div>
        <Button type='primary' className='rounded-full text-lg font-bold px-6 py-5'>
          {t('TEST_RESULT.BOOKING_BUTTON')}
        </Button>
      </div>
      <SummaryBox />
      <SkillLevel
        level='Level 1'
        levelText='Beginner'
        comment={t('TEST_RESULT.SKILL_COMMENT')}
        suggestion={t('TEST_RESULT.SKILL_SUGGEST')}
        radarData={radarData}
      />
      <SuggestionList suggestions={suggestions} />
    </div>
  );
};

export default InterviewBooking;
