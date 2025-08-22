import { DownloadOutlined } from '@ant-design/icons';
import { Modal, Spin, Button } from 'antd';
import { renderAsync } from 'docx-preview';
import React, { useRef, useEffect, useCallback, useState } from 'react';

import { usePortfolioContext } from '../context/PortfolioContext';
import { isDocxFile, isDocFile, isImageFile } from '../utils/fileUtils';

const FilePreview: React.FC = () => {
  const {
    selectedFile,
    isPreviewLoading,
    docxError,
    handleModalClose,
    handleDownload,
    setDocxError,
    setIsPreviewLoading,
    t,
  } = usePortfolioContext();

  const docxViewerRef = useRef<HTMLDivElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // preload file trước
  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }

    setIsPreviewLoading(true);

    if (isDocxFile(selectedFile.name)) {
      // DOCX dùng arrayBuffer
      selectedFile.originFileObj?.arrayBuffer().then((buffer) => {
        setPreviewUrl('docx-buffer'); // marker
        setIsPreviewLoading(false);
        renderDocxFile(buffer);
      });
    } else if (selectedFile.originFileObj) {
      const blobUrl = URL.createObjectURL(selectedFile.originFileObj);
      setPreviewUrl(blobUrl);
      setIsPreviewLoading(false);
    } else {
      setPreviewUrl(selectedFile.url || selectedFile.thumbUrl || null);
      setIsPreviewLoading(false);
    }
  }, [selectedFile]);

  const renderDocxFile = useCallback(
    async (buffer: ArrayBuffer) => {
      if (!docxViewerRef.current) return;
      try {
        setDocxError(null);
        docxViewerRef.current.innerHTML = '';
        await renderAsync(buffer, docxViewerRef.current);
      } catch (error) {
        setDocxError(t('PORTFOLIO.NOT_SUPPORT_PREVIEW'));
      }
    },
    [setDocxError, t],
  );

  if (!selectedFile) return null;

  const isDocx = isDocxFile(selectedFile.name);
  const isDoc = isDocFile(selectedFile.name);

  return (
    <Modal open={!!selectedFile} onCancel={handleModalClose} footer={null}>
      <div className='w-[90vw] md:w-[80vw] lg:w-[70vw] xl:w-[60vw] h-[90vh] aspect-video !py-10'>
        {/* Header download icon (ẩn nếu là ảnh) */}
        <div className='mb-4 flex justify-end'>
          {!isImageFile(selectedFile.type, selectedFile.name) && !(isDoc || isDocx) && (
            <DownloadOutlined
              onClick={handleDownload}
              className='!text-[#ce6339] hover:!text-[#967569] !text-3xl mr-6'
            />
          )}
        </div>

        {/* Nếu là doc hoặc docx → chỉ hiển thị lỗi + download */}
        {(isDoc || isDocx) && (
          <div className='flex flex-col items-center justify-center h-full'>
            <div className='text-lg font-semibold mb-4'>{t('PORTFOLIO.UNSUPPORTED_FORMAT')}</div>
            <Button type='primary' icon={<DownloadOutlined />} onClick={handleDownload}>
              {t('PORTFOLIO.DOWNLOAD')}
            </Button>
          </div>
        )}

        {/* Các loại file khác → preview */}
        {!isDoc && !isDocx && (
          <div className='relative w-full h-full'>
            {isPreviewLoading && (
              <div className='absolute inset-0 flex items-center justify-center bg-white z-10'>
                <Spin />
              </div>
            )}
            {previewUrl && (
              <iframe
                src={previewUrl}
                title='File Preview'
                className='w-full h-full border rounded min-height-[500]'
                onLoad={() => setIsPreviewLoading(false)}
              />
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};

export { FilePreview };
