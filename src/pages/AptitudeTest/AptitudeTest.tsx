import { CloseOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import Testing from './components/Testing';

const AptitudeTest = () => {
  const { t } = useTranslation();
  return (
    <div className='flex flex-col w-full bg-gray-100 h-screen overflow-hidden'>
      <div className='absolute top-10 right-10'>
        <CloseOutlined className='text-lg p-1 rounded-full bg-white flex border-[0.5px] border-black' />
      </div>
      <div className='flex flex-col justify-start items-center w-full py-8 px-6 gap-4'>
        <div className='flex text-xl smM:text-2xl leading-[22px] font-extrabold gap-2 smM:flex-row flex-col text-center'>
          <span className='text-[#FE7743]'>{t('TEST.TEST_TITLE')}</span>
          <span className='text-[#02185B]'>{t('TEST.TEST_TITLE_AI')}</span>
        </div>
        <span className='text-[#686868] max-w-[500px] smM:max-w-none smM:min-w-[600px] text-lg smM:text-xl font-semibold text-center'>
          {t('TEST.SUB_TITLE')}
        </span>
      </div>
      <Testing />
    </div>
  );
};

export default AptitudeTest;
