import { CameraFilled, UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

interface Props {
  avatar?: string;
  isEdit?: boolean;
}

const CustomAvartar = ({ avatar, isEdit }: Props) => {
  return (
    <div className='relative'>
      <Avatar
        className='relative md:!w-[180px] !w-[150px] md:!h-[180px] !h-[150px] !max-w-[900px]'
        src={avatar}
        icon={<UserOutlined className='md:!text-[180px] !text-[150px]' />}
      />
      <div className={`absolute bottom-0 right-2 cursor-pointer ${isEdit ? 'block' : 'hidden'}`}>
        <div className='flex items-center justify-center bg-[#3D6ADA] rounded-full !p-2'>
          <CameraFilled style={{ color: '#fff', fontSize: '24px' }} />
        </div>
      </div>
    </div>
  );
};

export default CustomAvartar;
