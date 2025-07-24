import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { Upload, Progress, notification, Button } from 'antd';
import { UploadProps, RcFile } from 'antd/es/upload';
import clsx from 'clsx';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface FileUploaderProps {
  disabled?: boolean;
  onChange?: (file: RcFile | null) => void;
}

const ACCEPTED_TYPES = [
  'image/png',
  'image/jpg',
  'image/jpeg',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export const FileUploader = ({ disabled = false, onChange }: FileUploaderProps) => {
  const { t } = useTranslation();
  const [progress, setProgress] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<RcFile | null>(null);

  const customRequest = (options: any) => {
    const { file, onSuccess, onError, onProgress } = options;
    const isValidFile = ACCEPTED_TYPES.includes(file.type) && file.size / 1024 / 1024 <= 5;

    if (!isValidFile) {
      notification.error({
        message: 'Tệp không hợp lệ',
        description: 'Chỉ chấp nhận PNG, JPG, JPEG, DOCX, DOC, PDF < 5MB',
      });
      onError?.(new Error('Invalid file'));
      return;
    }

    let percent = 0;
    const interval = setInterval(() => {
      percent += 10;
      onProgress({ percent });
      setProgress(percent);
      if (percent >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setSelectedFile(file);
          setProgress(null);
          notification.success({
            message: 'Tải lên thành công',
            description: `${file.name} đã được tải lên`,
          });
          onSuccess?.('ok');
          onChange?.(file);
        }, 300);
      }
    }, 100);
  };

  const resetFile = () => {
    setSelectedFile(null);
    setProgress(null);
    onChange?.(null);
  };

  const uploadProps: UploadProps = {
    customRequest,
    showUploadList: false,
    disabled,
  };

  return (
    <div className='space-y-2'>
      <div
        className={clsx(
          'border-2 border-dashed rounded-md p-4 text-center transition-all duration-300 ease-in-out',
          disabled ? 'border-gray-300 bg-gray-100 cursor-not-allowed' : 'border-orange-400',
        )}
      >
        <Upload {...uploadProps}>
          <div className='space-y-4'>
            <div className='text-orange-500'>
              <UploadOutlined style={{ fontSize: 24 }} />
            </div>
            <p className='text-sm text-gray-700'>{t('PORTFOLIO.CHOOSE_FILE')}</p>
            <span className='text-gray-500'>Hoặc</span>
            <div>
              <button
                type='button'
                disabled={disabled}
                className='bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-1 rounded transition disabled:opacity-50'
              >
                {t('PORTFOLIO.PICK_FILE')}
              </button>
            </div>
          </div>
        </Upload>
      </div>

      <p className='text-center text-gray-500'>{t('PORTFOLIO.VALIDATION')}</p>

      {/* Hiển thị progress */}
      {progress !== null && (
        <div className='transition-all duration-300 ease-in-out mt-2'>
          <p className='text-sm text-gray-600'>Đang tải lên...</p>
          <Progress percent={progress} size='small' />
        </div>
      )}

      {/* Hiển thị file đã chọn */}
      {selectedFile && (
        <div className='flex justify-between items-center mt-2 p-2 bg-gray-50 rounded'>
          <span className='text-sm text-gray-700 truncate'>{selectedFile.name}</span>
          <Button size='small' type='text' icon={<DeleteOutlined />} danger onClick={resetFile}>
            Hủy
          </Button>
        </div>
      )}
    </div>
  );
};
