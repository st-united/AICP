import { Image } from 'antd';
import { useTranslation } from 'react-i18next';

import { CyborgHand, RobotHand } from '@app/assets/images';
import { PartnerUnit1, PartnerUnit2, CelebUnit, DevPlus } from '@app/assets/images/Logos';
import '../LandingPage/homepage.scss';

const BannerUserScreen = () => {
  const { t } = useTranslation();

  return (
    <div className='w-full h-screen bg-[#FFFBF9] flex flex-col '>
      <div className='w-full flex flex-row items-center gap-4 sm:gap-20 pt-8 mt-14 px-2 sm:px-10'>
        <div className='flex md:flex-row flex-col items-center gap-2 w-3/5 sm:w-2/5 justify-end'>
          <span className='text-lg md:text-2xl font-bold'>Đơn vị tổ chức</span>
          <div className='flex flex-row items-center gap-2'>
            <Image
              preview={false}
              height={58}
              className='object-contain mt-1'
              src={CelebUnit}
              alt='...'
            />
            <Image preview={false} height={66} className='object-contain' src={DevPlus} alt='...' />
          </div>
        </div>
        <div className='flex md:flex-row flex-col md:items-center gap-2'>
          <span className='text-lg md:text-2xl font-bold'>Đơn vị đồng hành</span>
          <div className='flex flex-row items-center gap-2'>
            <Image
              preview={false}
              height={66}
              className='object-contain py-1'
              src={PartnerUnit1}
              alt='...'
            />
            <Image
              preview={false}
              height={66}
              className='object-contain py-1'
              src={PartnerUnit2}
              alt='...'
            />
          </div>
        </div>
      </div>

      <div className='flex flex-row w-full flex-1 mt-8 gap-20 justify-center'>
        <div className='relative w-2/5 h-full items-center justify-center  hidden mdL:flex'>
          <div className='absolute left-0 bottom-0 w-full items-end justify-center flex'>
            <img
              className='!object-cover scale-x-[-1] max-h-[450px] md:max-h-[550px] xl:max-h-[650px]'
              src={RobotHand}
              alt='Robot hand'
            />
          </div>
        </div>
        <div className='flex-1 flex flex-col text-center md:text-start mdL:align-middle justify-start sm:justify-center pt-20 sm:pt-0 sm:pb-32 mdL:pb-48 px-6 mdL:px-0 mdL:pr-20'>
          <span className='text-[48px] mdL:text-[72px] font-[1000] tracking-wide mb-6 bg-gradient-to-r from-[#FE7743] via-[#cc7935] to-[#862e0b] bg-clip-text text-transparent'>
            READY FOR AI
          </span>
          <span className='text-base md:text-xl font-[700] mb-2 block'>
            Chương trình xác định và phát triển bộ khung năng lực thời đại AI do Sở Khoa Học Công
            Nghệ Đà Nẵng chỉ đạo triển khai
          </span>
          <span className='text-xl font-semibold mt-4'>
            <span className='text-3xl font-[900] text-[#FF8242]'>10.000</span> sinh viên sẵn sàng
            bước vào thời đại AI
          </span>
        </div>
      </div>
    </div>
  );
};

export default BannerUserScreen;
