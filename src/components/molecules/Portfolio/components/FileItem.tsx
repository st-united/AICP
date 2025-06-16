import {
  DeleteFilled,
  FilePdfOutlined,
  FileWordFilled,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { Button, Image, Divider, Progress } from 'antd';
import React, { useMemo, useCallback, memo } from 'react';

import { IMAGE_EXTENSIONS, PDF_MIME_TYPES } from '../constants';
import { FileItemProps } from '@app/interface/portfolio.interface';

const FileItem: React.FC<FileItemProps> = memo(
  ({ file, type, onRemove, onPreview, isEdit, t }: FileItemProps) => {
    const fileSrc = useMemo(() => {
      let src = file.url || file.thumbUrl;
      if (!src && file.originFileObj) {
        src = URL.createObjectURL(file.originFileObj);
      }
      return src;
    }, [file.url, file.thumbUrl, file.originFileObj]);

    const isImageFile = useMemo(() => {
      return file.type && IMAGE_EXTENSIONS.some((ext) => file.type?.includes(ext));
    }, [file.type]);

    const isPdfFile = useMemo(() => {
      return file.type && PDF_MIME_TYPES.some((type) => file.type?.includes(type));
    }, [file.type]);

    const handleRemove = useCallback(() => {
      onRemove(file, type);
    }, [file, type, onRemove]);

    const handlePreview = useCallback(() => {
      const officeUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(
        file.url || '',
      )}&embedded=true`;
      onPreview({ ...file, url: officeUrl, originalUrl: file.url });
    }, [file, onPreview]);

    const handleCancel = useCallback(() => {
      if (file.uploadController) {
        file.uploadController.abort();
      }
    }, [file]);

    return (
      <div
        key={file.uid}
        className={`${
          file.originFileObj &&
          'relative rounded-xl p-[2px] my-2 bg-gradient-to-br from-[#ff9946] via-[#f3f3f3] to-[#fd7200] animate-gradient'
        }`}
      >
        <div
          className={`flex flex-col md:flex-row justify-between w-full items-center gap-0 px-12 py-2 ${
            file.originFileObj && 'bg-white'
          } rounded-xl p-6`}
        >
          <div className='relative w-1/2'>
            {isEdit && file.status !== 'uploading' && (
              <Button
                type='text'
                icon={<DeleteFilled className='!text-xl text-red-700' />}
                className={`${
                  isEdit ? 'cursor-pointer' : 'cursor-not-allowed'
                } absolute left-0 top-1`}
                onClick={handleRemove}
                disabled={!isEdit}
              />
            )}
            <div
              className={`ml-0 ${
                isEdit ? 'md:ml-10' : 'md:ml-0'
              } flex justify-center md:justify-start items-center w-full`}
            >
              {isImageFile ? (
                <div className='custom-img'>
                  <Image src={fileSrc} alt={file.name} />
                </div>
              ) : (
                <div className='flex items-center justify-center p-5'>
                  {isPdfFile ? (
                    <FilePdfOutlined
                      className='!text-6xl !text-[#c87351] cursor-pointer hover:!text-[#a85f42] hover:scale-105 transition-colors'
                      onClick={handlePreview}
                    />
                  ) : (
                    <div className='relative'>
                      <FileWordFilled
                        className='!text-6xl !text-[#2a318a] cursor-pointer hover:!text-[#5a58e0] hover:scale-105 transition-colors'
                        onClick={handlePreview}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className='text-end flex-wrap text-ellipsis md:w-1/2'>
            <div className='flex items-center justify-center md:justify-end gap-2'>
              {file.status === 'uploading' ? (
                <>
                  <Progress
                    percent={file.progress}
                    size='small'
                    status='active'
                    className='!w-100'
                    strokeColor={{
                      '0%': '#ffdf52',
                      '100%': '#fd7200',
                    }}
                  />
                  <CloseCircleOutlined
                    className='ml-2 text-red-500 text-xl cursor-pointer'
                    title='Hủy tải lên'
                    onClick={handleCancel}
                  />
                </>
              ) : file.status === 'removed' ? (
                <span className='text-red-500'>{t('PORTFOLIO.CANCEL_UPLOAD')}</span>
              ) : (
                <span className='text-center md:text-end'>{file.name}</span>
              )}
            </div>
          </div>
        </div>
        {isEdit && !file.originFileObj && <Divider className='bg-[#E5E5E5] !my-2 md:!my-0' />}
      </div>
    );
  },
);

FileItem.displayName = 'FileItem';

export { FileItem };
