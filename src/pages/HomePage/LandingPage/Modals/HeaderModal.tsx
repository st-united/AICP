interface ModalHeaderProps {
  title: string;
  symbol?: string;
}

export const HeaderModal = ({ title, symbol }: ModalHeaderProps) => {
  return (
    <div className='w-full relative flex flex-col items-center'>
      <div className='cursor-pointer bg-blue-100 rounded-full w-1/5 md:!w-[13%] xl:!w-[10%] 3xl:!w-[10%] lg:!w-[10%] aspect-square flex items-center justify-center'>
        <div className='bg-blue-300 rounded-full w-[85%] aspect-square flex items-center justify-center'>
          <div className='bg-[#0069E2] rounded-full w-[70%] md:w-[50%] aspect-square flex items-center justify-center'>
            <div className='bg-blue-300 rounded-full w-[95%] md:w-[90%] aspect-square flex items-center justify-center'>
              <span className='text-xl text-[#0069E2] md:text-3xl font-extrabold'>
                {symbol || '?'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <span className='text-xl font-bold !my-5 text-center px-2 md:text-2xl md:px-4 md:my-6'>
        {title}
      </span>
    </div>
  );
};
