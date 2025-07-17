import { Button } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { useTestResultContext } from '../../TestResultContext';

const SuggestionList: React.FC = () => {
  const { t } = useTranslation();
  const { data } = useTestResultContext();
  return (
    <div className='w-full mx-auto mt-10'>
      <h3 className='text-2xl md:text-3xl lg:text-4xl font-bold text-[#fe7743] mb-6 md:mb-8 text-center'>
        {t('TEST_RESULT.SUGGESTION_TITLE')}
      </h3>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-0 justify-around'>
        {data.recommendedCourses.map((item, idx) => (
          <div key={item.title} className='p-16'>
            <div className='bg-white border-2 border-[#fe7743] rounded-2xl shadow-lg overflow-hidden flex flex-col'>
              <div className='relative w-full aspect-video'>
                <img src={item.linkImage} alt={item.title} className='w-full h-full object-cover' />
              </div>
              <div className='flex-1 flex flex-col p-4 md:p-6'>
                <h4 className='text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-3 line-clamp-1'>
                  {item.title}
                </h4>
                <p className='text-sm md:text-base text-gray-600 mb-4 flex-1 line-clamp-3'>
                  {item.description}
                </p>
                <div className='flex justify-end'>
                  <Button
                    type='primary'
                    className='bg-[#fe7743] border-[#fe7743] hover:bg-[#d16236] hover:border-[#d16236] rounded-full font-semibold text-lg px-6 py-2'
                    onClick={() => window.open(item.url, '_blank')}
                  >
                    {t('TEST_RESULT.SUGGESTION_BUTTON')}
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
