interface PartnerCardProps {
  idx: number;
  img: string;
  name: string;
  hScale?: string;
}

const PartnerCard = ({ idx, img, name, hScale = 'h-[80%]' }: PartnerCardProps) => {
  return (
    <div key={idx} className='flex flex-col gap-1 py-2 w-full h-full'>
      <div className='flex flex-col justify-center rounded-lg shadow-[#00000040]  shadow-md border border-[#0000000F] w-full h-full bg-white'>
        <img src={img} alt={name} className={`object-scale-down ${hScale} aspect-[5/2]`} />
      </div>
      <span className='block text-xs md:text-base font-bold text-center text-nowrap w-full'>
        {name}
      </span>
    </div>
  );
};

export default PartnerCard;
