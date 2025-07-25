import { useTranslation } from 'react-i18next';

import { ExpertIcons } from '@app/assets/images/ExpertIcon';

const Experts = () => {
  const { t } = useTranslation();
  return (
    <div id='experts' className='w-full h-full bg-white pt-20'>
      <div className='w-full md:w-[80%] mx-auto'>
        <div className='text-center'>
          <div className='text-2xl font-extrabold md:text-5xl text-[#FE7743]'>
            {t('HOMEPAGE.EXPERTS_TITLE')}
          </div>
          <div className='text-base text-[#444444] py-8'>{t('HOMEPAGE.EXPERTS_DESC')}</div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14 w-full h-full mx-auto'>
          {ExpertIcons.map((expert) => (
            <div key={expert.idx} className='flex flex-col items-center justify-center px-10'>
              <div className='relative rounded-[20px] overflow-hidden w-full h-full shadow-[10px_10px_10px_0px] shadow-gray-500/50'>
                <img src={expert.img} alt={expert.name} className='w-full h-full object-cover' />
                <div className='absolute bottom-0 left-0 w-full h-full flex flex-col justify-end'>
                  <div className='px-5 pb-4 pt-16 relative z-10'>
                    <div className='text-white text-3xl font-bold leading-tight w-2/3'>
                      {expert.name}
                    </div>
                    <div className='text-white text-xs mt-1'>{expert.desc}</div>
                  </div>
                  <div className='absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-[#fa7042]  via-transparent to-transparent z-0'></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experts;
