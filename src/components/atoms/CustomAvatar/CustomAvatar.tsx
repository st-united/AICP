import { CameraFilled, LoadingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Spin, Upload } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUploadAvatar } from '@app/hooks/useProfile';
import {
  NotificationTypeEnum,
  openNotificationWithIcon,
} from '@app/services/notification/notificationService';
import type { UploadChangeParam, UploadFile } from 'antd/es/upload';

interface Props {
  avatar?: string;
  isEdit?: boolean;
  onAvatarChange?: (base64: string) => void;
}

const CustomAvatar = ({ avatar, isEdit, onAvatarChange }: Props) => {
  const { t } = useTranslation();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { mutate: uploadAvatar, isPending } = useUploadAvatar();

  const handleChange = (info: UploadChangeParam) => {
    const file = info.fileList[0]?.originFileObj;
    if (!file) {
      setFileList([]);
      return;
    }

    setFileList(info.file.originFileObj ? [info.file as UploadFile] : []);

    const formData = new FormData();
    formData.append('avatar', file);

    uploadAvatar(formData, {
      onSuccess: (response) => {
        onAvatarChange?.(response.data.avatarUrl || response.data.avatar);
        openNotificationWithIcon(NotificationTypeEnum.SUCCESS, t('PROFILE.AVATAR_UPLOAD_SUCCESS'));
      },
      onError: (error: any) => {
        openNotificationWithIcon(
          NotificationTypeEnum.ERROR,
          error.response?.data?.message || t('PROFILE.AVATAR_UPLOAD_FAILED'),
        );
        setFileList([]);
      },
    });
  };

  return (
    <div className='relative'>
      {!isPending ? (
        <Avatar
          className='relative md:!w-[180px] !w-[150px] md:!h-[180px] !h-[150px] !max-w-[900px]'
          src={avatar}
          icon={<UserOutlined className='md:!text-[180px] !text-[150px]' />}
        />
      ) : (
        <div className='relative md:!w-[180px] !w-[150px] md:!h-[180px] !h-[150px] !max-w-[900px] !text-black flex items-center justify-center'>
          <LoadingOutlined className='md:!text-[150px] !text-[100px]' />
        </div>
      )}
      {isEdit && !isPending && (
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
