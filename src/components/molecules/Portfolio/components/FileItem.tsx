import { DeleteFilled, FilePdfOutlined, FileWordFilled } from '@ant-design/icons';
import { Button, Image, Divider } from 'antd';
import React, { useMemo, useCallback, memo } from 'react';

import { getFileSrc, isImageFile, isPdfFile, createOfficePreviewUrl } from '../utils/fileUtils';
import { FileItemProps } from '@app/interface/portfolio.interface';

const FileItem: React.FC<FileItemProps> = memo(
  ({ file, type, onRemove, onPreview, isEdit }: FileItemProps) => {
    const fileSrc = useMemo(() => getFileSrc(file), [file]);
    const isImage = useMemo(() => isImageFile(file.type), [file.type]);
    const isPdf = useMemo(() => isPdfFile(file.type), [file.type]);

    const handleRemove = useCallback(() => {
      onRemove(file, type);
    }, [file, type, onRemove]);

    const handlePreview = useCallback(() => {
      if (file.originFileObj && !isPdf) {
        onPreview(file);
      } else if (file.originFileObj) {
        const url = URL.createObjectURL(file?.originFileObj as File);
        file.url = url;
        onPreview(file);
      } else {
        const officeUrl = createOfficePreviewUrl(file.url || '');
        onPreview({ ...file, url: officeUrl, originalUrl: file.url, type: 'office' });
      }
    }, [file, isPdf, onPreview]);

    return (
      <div
        key={file.uid}
        className={`relative ${
          file.originFileObj &&
          'rounded-xl p-[2px] my-2 bg-gradient-to-br from-[#ff9946] via-[#f3f3f3] to-[#fd7200] animate-gradient'
        }`}
      >
        {isEdit && (
          <Button
            type='text'
            icon={<DeleteFilled className='!text-xl text-red-700' />}
            className={`${
              isEdit ? 'cursor-pointer' : 'cursor-not-allowed'
            } absolute left-4 top-1/2 -translate-y-1/2 z-10`}
            onClick={handleRemove}
            disabled={!isEdit}
          />
        )}
        <div
          className={`flex flex-col md:flex-row justify-between w-full items-center gap-0 px-6 py-2 ${
            file.originFileObj && 'bg-white'
          } rounded-xl`}
        >
          <div className='relative w-1/2'>
            <div
              className={`ml-0 ${
                isEdit ? 'md:ml-10' : 'md:ml-0'
              } flex justify-center md:justify-start items-center w-full`}
            >
              {isImage ? (
                <div className='custom-img'>
                  <Image src={fileSrc} alt={file.name} />
                </div>
              ) : (
                <div className='flex items-center justify-center p-5'>
                  {isPdf ? (
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
              <span className='text-center md:text-end'>{file.name}</span>
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
