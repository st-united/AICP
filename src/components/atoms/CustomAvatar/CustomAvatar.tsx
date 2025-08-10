import { CameraFilled, LoadingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, GetProp, Upload, UploadFile, UploadProps } from 'antd';
import { RcFile, UploadChangeParam } from 'antd/es/upload';
import { useState } from 'react';

interface Props {
  avatar?: string;
  previewImage?: string;
  isEdit?: boolean;
  onAvatarChange?: () => void;
  setPreviewImage: (file: string) => void;
  setFileImage: (file: RcFile) => void;
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const CustomAvatar = ({ avatar, isEdit, previewImage, setPreviewImage, setFileImage }: Props) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleChange = async (info: UploadChangeParam) => {
    const file = info.fileList[0]?.originFileObj;
    if (!file) {
      setFileList([]);
      return;
    }
    setFileList(info.file.originFileObj ? [info.file as UploadFile] : []);
    setFileImage(file);
    const fileBase = await getBase64(info.file as FileType);
    setPreviewImage(fileBase as string);

    const formData = new FormData();
    formData.append('avatar', file);
  };

  return (
    <div className='relative'>
      {/* {!isPending ? ( */}
      <Avatar
        className='relative md:!w-[180px] !w-[150px] md:!h-[180px] !h-[150px] !max-w-[900px]'
        src={previewImage ?? avatar}
        icon={<UserOutlined className='md:!text-[180px] !text-[150px] bg-gray-300' />}
      />

      {!isEdit && (
        <Upload
          key={avatar}
          showUploadList={false}
          fileList={fileList}
          beforeUpload={() => false}
          onChange={handleChange}
          accept='image/*'
        >
          <div className='absolute bottom-0 right-2 cursor-pointer'>
            <div className='flex items-center justify-center bg-[#FF8C5F] rounded-full !p-2'>
              <CameraFilled style={{ color: '#fff', fontSize: '24px' }} />
            </div>
          </div>
        </Upload>
      )}
    </div>
  );
};

export default CustomAvatar;
