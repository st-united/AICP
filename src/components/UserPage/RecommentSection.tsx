import { useTranslation } from 'react-i18next';

import RecommendCard from '@app/components/atoms/Card/RecommendCard';

const RecommendSection = () => {
  const { t } = useTranslation();

  return (
    <section className='w-full py-10 sm:py-20 overflow-x-hidden md:px-3 lg:px-4 xl:px-0'>
      <div className='container mx-auto'>
        <h2 className='text-2xl text-center sm:text-4xl sm:text-start font-semibold mb-4 py-4 px-2'>
          {t('RECOMMEND.TITLE')}
        </h2>
        <p className='text-base text-center sm:text-start !text-[#686868] mb-8 py-4 px-2'>
          {t('RECOMMEND.DESCRIPTION')}
        </p>

        <div className='flex flex-col items-center md:flex-row md:justify-between'>
          <RecommendCard
            title={t('RECOMMEND.COURSE_1.TITLE')}
            description={t('RECOMMEND.COURSE_1.DESCRIPTION')}
            linkText={t('RECOMMEND.COURSE_1.LINK')}
          />
          <RecommendCard
            title={t('RECOMMEND.COURSE_1.TITLE')}
            description={t('RECOMMEND.COURSE_1.DESCRIPTION')}
            linkText={t('RECOMMEND.COURSE_1.LINK')}
          />
          <RecommendCard
            title={t('RECOMMEND.COURSE_1.TITLE')}
            description={t('RECOMMEND.COURSE_1.DESCRIPTION')}
            linkText={t('RECOMMEND.COURSE_1.LINK')}
          />
        </div>
      </div>
    </section>
  );
};

export default RecommendSection;
