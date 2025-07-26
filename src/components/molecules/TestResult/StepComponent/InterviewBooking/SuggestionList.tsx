import { Button } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

import CourseCard from './CourseCard';
import { getStorageData } from '@app/config';
import { EXAM_LATEST } from '@app/constants/testing';
import { useGetExamResult } from '@app/hooks';

const SuggestionList: React.FC = () => {
  const { t } = useTranslation();
  const examId = getStorageData(EXAM_LATEST);
  const { data, isLoading } = useGetExamResult(examId);
  if (!data) return <div>{t('TEST_RESULT.NO_DATA')}</div>;
  return (
    <div className='w-full mx-auto'>
      <h3 className='text-2xl md:text-3xl lg:text-4xl font-bold text-[#fe7743] py-8 text-center'>
        {t('TEST_RESULT.SUGGESTION_TITLE')}
      </h3>
      <div className='grid grid-cols-1 md:grid-cols-2 justify-around px-2 md:px-8 pb-8 gap-y-10'>
        {data?.recommendedCourses &&
          data.recommendedCourses.map((item, idx) => (
            <div key={item.title} className='w-full smL:w-3/4  mx-auto h-full'>
              <CourseCard item={item} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default SuggestionList;
