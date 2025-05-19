import { CameraFilled, UserOutlined } from '@ant-design/icons';
import { Avatar, Upload } from 'antd';

import type { UploadChangeParam } from 'antd/es/upload';

interface Props {
  avatar?: string;
  isEdit?: boolean;
  onAvatarChange?: (base64: string) => void;
}

const CustomAvatar = ({ avatar, isEdit, onAvatarChange }: Props) => {
  const handleChange = (info: UploadChangeParam) => {
    const file = info.fileList[0]?.originFileObj;
    console.log('base64:', file);
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      console.log('base64:', base64);
      onAvatarChange?.(base64);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className='relative'>
      <Avatar
        className='relative md:!w-[180px] !w-[150px] md:!h-[180px] !h-[150px] !max-w-[900px]'
        src={avatar}
        icon={<UserOutlined className='md:!text-[180px] !text-[150px]' />}
      />

      {isEdit && (
        <Upload
          showUploadList={false}
          beforeUpload={() => false}
          onChange={handleChange}
          accept='image/*'
        >
          <div className='absolute bottom-0 right-2 cursor-pointer'>
            <div className='flex items-center justify-center bg-[#3D6ADA] rounded-full !p-2'>
              <CameraFilled style={{ color: '#fff', fontSize: '24px' }} />
            </div>
          </div>
        </Upload>
      )}
    </div>
  );
};

export default CustomAvatar;
