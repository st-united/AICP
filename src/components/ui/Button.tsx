export default function Button({ children }: { children: string }) {
  return (
    <button className='!text-white bg-[#1890FF] w-full h-11 rounded-md hover:bg-[#1955A0] transition-all duration-300 ease-in-out cursor-pointer'>
      {children}
    </button>
  );
}
