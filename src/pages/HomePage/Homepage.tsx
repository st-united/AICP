import BackgroundImg from '@app/assets/images/background.png';

const Homepage = () => {
  return (
    <div className='flex flex-col w-full h-full'>
      <div
        className='h-screen w-full'
        style={{
          backgroundImage: `url(${BackgroundImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className='flex justify-center items-center flex-col gap-12 h-full !px-4'>
          <div className='lg:text-7xl md:text-5xl text-4xl max-w-[300px] md:max-w-full text-center leading-12 font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#C05604] via-[#E16100] to-[#FFF] !p-4'>
            Khám Phá Năng Lực AI
          </div>
          <div className='lg:text-2xl md:text-lg text-lg text-white font-semibold !p-4 lg:max-w-[980px] md:max-w-[700px] text-center leading-10'>
            Tham gia bài kiểm tra đánh giá năng lực sử dụng AI để hiểu rõ khả năng của bạn và nhận
            lộ trình phát triển cá nhân hóa
          </div>
          <div className='!uppercase !rounded-full !md:py-4 !md:px-10 !py-3 !px-8 bg-white text-lg md:text-xl text-[#096DD9] font-bold hover:bg-[#096DD9] hover:text-white transition-all duration-300 ease-in-out'>
            Khám phá ngay
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
