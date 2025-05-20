import { CameraFilled, UserOutlined } from '@ant-design/icons';
import { Avatar, Upload, message } from 'antd';
import { useTranslation } from 'react-i18next';

import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_FILE_SIZE_MB } from '@app/constants/file';
import { validateFile } from '@app/helpers/fileValidation';
import {
  NotificationTypeEnum,
  openNotificationWithIcon,
} from '@app/services/notification/notificationService';
import type { UploadChangeParam } from 'antd/es/upload';

interface Props {
  avatar?: string;
  isEdit?: boolean;
  onAvatarChange?: (base64: string) => void;
}

const CustomAvatar = ({ avatar, isEdit, onAvatarChange }: Props) => {
  const { t } = useTranslation();
  const handleChange = (info: UploadChangeParam) => {
    const file = info.fileList[0]?.originFileObj;
    if (!file) return;
    const validation = validateFile(file, ACCEPTED_IMAGE_TYPES, MAX_IMAGE_FILE_SIZE_MB);
    if (!validation.isValid) {
      openNotificationWithIcon(
        NotificationTypeEnum.WARNING,
        t(validation.errorMessageKey!, {
          field: t('PROFILE.AVATAR'),
          ...validation.errorMessageParams,
        }),
      );
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      onAvatarChange?.(base64);
    };
    reader.onerror = (e) => {
      openNotificationWithIcon(
        NotificationTypeEnum.ERROR,
        t('VALIDATE.FILE_READ_ERROR', { field: t('PROFILE.AVATAR') }),
      );
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
          key={avatar}
          showUploadList={false}
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
