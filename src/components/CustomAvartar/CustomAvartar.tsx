import { CameraFilled } from '@ant-design/icons';
import { Avatar } from 'antd';

const CustomAvartar = () => {
  return (
    <div className='relative'>
      <Avatar className='relative !w-[180px] !h-[180px]' />
      <div className='absolute bottom-0 right-2'>
        <div className='flex items-center justify-center bg-[#3D6ADA] rounded-full !p-2'>
          <CameraFilled style={{ color: '#fff', fontSize: '24px' }} />
        </div>
      </div>
    </div>
  );
};

export default CustomAvartar;
