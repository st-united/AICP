import { useTranslation } from 'react-i18next';

import RecommendCard from '@app/components/atoms/Card/RecommendCard';

const RecommendSection = () => {
  const { t } = useTranslation();

  return (
    <section className='w-full h-full'>
      <div className='container w-full h-full gap-6 mx-auto py-28 xsM:w-[90%] smM:pl-2 smM:py-24 smM:items-center mdM:h-full mdM: xl:w-[90%]'>
        <h2 className='font-bold text-center text-2xl mb-8 smM:text-start smM:text-3xl mdM:text-4xl'>
          {t('RECOMMEND.TITLE')}
        </h2>
        <p className='font-semibold text-base sm:text-xl md:text-2xl text-center sm:text-start !text-primary-gray mb-8'>
          {t('RECOMMEND.DESCRIPTION')}
        </p>

        <div className='flex flex-col items-center smM:flex-row mdM:justify-between gap-4 smM:gap-2 mdM:gap-6 lgM:gap-28'>
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
