import { useTranslation } from 'react-i18next';

import Testing from './components/Testing';

const AptitudeTest = () => {
  const { t } = useTranslation();
  return (
    <div className='flex flex-col w-full bg-gray-100'>
      <div className='flex flex-col justify-start items-center w-full h-full gap-4'>
        <div className='text-2xl leading-[22px] font-extrabold flex gap-2'>
          <span className='text-[#FE7743]'>{t('TEST.TEST_TITLE')}</span>
          <span className='text-[#02185B]'>{t('TEST.TEST_TITLE_AI')}</span>
        </div>
        <span className='text-[#686868] text-xl font-semibold'>{t('TEST.SUB_TITLE')}</span>
      </div>
      <Testing />
    </div>
  );
};

export default AptitudeTest;
