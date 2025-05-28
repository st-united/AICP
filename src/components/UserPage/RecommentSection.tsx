import RecommendCard from '@app/components/atoms/Card/RecommendCard';
import { useTranslation } from 'react-i18next';

const RecommendSection = () => {
  const { t } = useTranslation();

  return (
    <section className='w-full py-20 overflow-x-hidden'>
      <div className='container mx-auto'>
        <h2 className='text-3xl text-center sm:text-4xl sm:text-start font-semibold mb-4 p-4'>
          {t('RECOMMEND.TITLE')}
        </h2>
        <p className='text-xl text-center sm:text-start text-[#686868] mb-8 p-4'>
          {t('RECOMMEND.DESCRIPTION')}
        </p>

        <div className='flex flex-col items-center md:flex-row md:justify-between md:gap-6'>
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
