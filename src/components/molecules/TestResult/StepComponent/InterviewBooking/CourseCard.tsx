import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

interface CourseCardProps {
  item: {
    linkImage: string;
    title: string;
    description: string;
    url: string;
  };
}
const CourseCard = ({ item }: CourseCardProps) => {
  const { t } = useTranslation();
  return (
    <div className=' bg-white border-2 border-[#fe7743] rounded-2xl shadow-lg overflow-hidden flex flex-col'>
      <div className='relative w-full aspect-video'>
        <img src={item.linkImage} alt={item.title} className='w-full h-full object-cover' />
      </div>
      <div className='flex-1 flex flex-col p-4 md:p-6'>
        <h4 className='text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-3 line-clamp-1'>
          {item.title}
        </h4>
        <p className='text-sm md:text-base text-gray-600 mb-4 flex-1 line-clamp-3'>
          {item.description}
        </p>
        <div className='flex justify-end'>
          <Button
            type='primary'
            className='bg-[#fe7743] hover:bg-[#d16236] rounded-full font-semibold text-lg px-6 py-2'
            onClick={() => window.open(item.url, '_blank')}
          >
            {t('TEST_RESULT.SUGGESTION_BUTTON')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
