import { EyeOutlined, CheckOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import clsx from 'clsx';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DefaultAvatar } from '@app/assets/images';
import MentorDetailModal from '@app/pages/MentorBooking/components/MentorDetailModal';

interface UserData {
  id: string;
  user: {
    fullName: string;
    role: string;
    image: string;
    id: string;
  };
}
interface UserCardProps {
  dataUser: UserData;
  isSelected: boolean;
  setSelected: (key: string) => void;
}

const UserCard = ({ dataUser, isSelected, setSelected }: UserCardProps) => {
  const { fullName, role, image } = dataUser.user;

  const [open, setOpen] = useState(false);

  const { t } = useTranslation();

  const advisorData = {
    name: 'Nguyễn Văn A',
    avatar: '',
    experience: [
      { title: 'Fullstack Developer', years: 8, icon: 'fullstack' },
      { title: 'Kỹ sư AI', years: 10, icon: 'ai' },
    ],
    bio: `Mình là AI Engineer với 10 năm kinh nghiệm...`,
  };

  const handleBookMentor = () => {
    setSelected(dataUser.id);
    setOpen(false);
  };

  return (
    <div className='relative group w-full max-w-xs sm:max-w-sm md:max-w-md aspect-square rounded-xl overflow-hidden shadow-md'>
      <Card
        hoverable={!isSelected}
        cover={
          <img
            alt={fullName}
            src={image ? image : DefaultAvatar}
            className='w-full object-contain'
          />
        }
        className='!p-0 !m-0 h-full w-full'
      />

      <div
        className={clsx(
          'absolute bottom-0 w-full bg-black bg-opacity-60 text-white text-center py-2 z-10',
          'transition-opacity duration-300 group-hover:opacity-0',
        )}
      >
        <p className='font-semibold text-base sm:text-lg'>{fullName}</p>
        <p className='text-xs sm:text-sm'>{role}</p>
      </div>

      <div
        className={clsx(
          'absolute inset-0 flex flex-col items-center justify-center',
          'bg-black bg-opacity-70 text-white transition-opacity duration-300 z-20',
          {
            'opacity-0 group-hover:opacity-100': !isSelected,
            'opacity-0 pointer-events-none': isSelected,
          },
        )}
      >
        <div
          className='flex items-center gap-2 mb-3 hover:text-blue-400 cursor-pointer text-sm sm:text-base'
          role='button'
          tabIndex={0}
          onClick={() => !isSelected && setOpen(true)}
          onKeyDown={(e) => {
            if (!isSelected && (e.key === 'Enter' || e.key === ' ')) setOpen(true);
          }}
        >
          <EyeOutlined />
          <span>{t('MENTOR_BOOKING.VIEW_DETAIL')}</span>
        </div>
        <div
          className='flex items-center gap-2 hover:text-green-400 cursor-pointer text-sm sm:text-base'
          role='button'
          tabIndex={0}
          onClick={() => !isSelected && handleBookMentor()}
          onKeyDown={(e) => {
            if (!isSelected && (e.key === 'Enter' || e.key === ' ')) handleBookMentor();
          }}
        >
          <CheckOutlined />
          <span>{t('MENTOR_BOOKING.BOOK_MENTOR')}</span>
        </div>
      </div>

      {isSelected && (
        <div className='absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-30'>
          <div className='bg-orange-500 rounded-full p-4'>
            <CheckOutlined className='text-white text-2xl' />
          </div>
        </div>
      )}

      {/* <MentorDetailModal
        isOpen={open}
        onClose={() => setOpen(false)}
        advisor={advisorData}
        handleSubmit={handleBookMentor}
      /> */}
    </div>
  );
};

export default UserCard;
