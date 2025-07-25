import { Button } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { useTestResultContext } from '../../TestResultContext';
import { NAVIGATE_URL } from '@app/constants';
import { useRegisterCourse } from '@app/hooks/useCourse';

const SuggestionList: React.FC = () => {
  const { t } = useTranslation();
  const { data } = useTestResultContext();
  const { mutate: registerCourse, isPending } = useRegisterCourse();

  if (!data) return <div>{t('TEST_RESULT.NO_DATA')}</div>;
  return (
    <div className='w-full mx-auto mt-6 bg-white rounded-2xl shadow'>
      <h3 className='text-2xl md:text-3xl lg:text-4xl font-bold text-[#fe7743] py-8 text-center'>
        {t('TEST_RESULT.SUGGESTION_TITLE')}
      </h3>
      <div className='grid grid-cols-1 md:grid-cols-2 md:gap-0 justify-around px-2 md:px-8 pb-8 gap-6'>
        {data.recommendedCourses &&
          data.recommendedCourses.map((item, idx) => (
            <div key={item.title} className='px-4 md:px-16'>
              <div className='bg-white border-2 border-[#fe7743] rounded-2xl shadow-lg overflow-hidden flex flex-col'>
                <div className='relative w-full aspect-video'>
                  <img
                    src={item.linkImage}
                    alt={item.title}
                    className='w-full h-full object-cover'
                  />
                </div>
                <div className='flex-1 flex flex-col p-4 md:p-6'>
                  <h4 className='text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-3 line-clamp-1'>
                    {item.title}
                  </h4>
                  <div
                    className='text-sm md:text-base text-gray-600 mb-4 flex-1 line-clamp-3'
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />

                  <div className='flex justify-end gap-3'>
                    <Button
                      className='rounded-full font-semibold text-base px-5 py-1.5 border-[#fe7743] text-[#fe7743]'
                      onClick={() =>
                        window.open(NAVIGATE_URL.DETAIL_COURSE_DYNAMIC(item.id), '_blank')
                      }
                    >
                      {t('RECOMMEND.VIEW_DETAIL')}
                    </Button>

                    <Button
                      type='primary'
                      className='bg-[#fe7743] hover:bg-[#d16236] rounded-full font-semibold text-base px-5 py-1.5'
                      onClick={() => registerCourse(item.id)}
                    >
                      {t('RECOMMEND.SUGGESTION_REGISTER')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SuggestionList;
