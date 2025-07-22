import { DownloadOutlined } from '@ant-design/icons';
import { Modal, Spin, Button } from 'antd';
import { renderAsync } from 'docx-preview';
import React, { useRef, useEffect, useCallback } from 'react';

import { usePortfolioContext } from '../context/PortfolioContext';
import { isDocxFile, isDocFile } from '../utils/fileUtils';

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

  const renderDocxFile = useCallback(async () => {
    if (!selectedFile?.originFileObj || !docxViewerRef.current) return;

    try {
      setDocxError(null);
      docxViewerRef.current.innerHTML = '';
      await renderAsync(selectedFile.originFileObj, docxViewerRef.current);
    } catch (error) {
      setDocxError(t('PORTFOLIO.NOT_SUPPORT_PREVIEW'));
    }
  }, [selectedFile, setDocxError, t]);

  useEffect(() => {
    if (selectedFile && isDocxFile(selectedFile.name)) {
      renderDocxFile();
    }
  }, [selectedFile, renderDocxFile]);

  if (!selectedFile) return null;

  const isDocx = isDocxFile(selectedFile.name);
  const isDoc = isDocFile(selectedFile.name);

  return (
    <Modal open={!!selectedFile} onCancel={handleModalClose} footer={null}>
      <div className='w-[90vw] md:w-[80vw] lg:w-[70vw] xl:w-[60vw] h-[90vh] aspect-video !py-10'>
        <div className='mb-4 flex justify-end'>
          {isDocx && (
            <DownloadOutlined
              onClick={handleDownload}
              className='!text-[#ce6339] hover:!text-[#967569] !text-3xl mr-6'
            />
          )}
        </div>

        {isDoc && selectedFile.originFileObj ? (
          <div className='flex flex-col items-center justify-center h-full'>
            <div className='text-lg font-semibold mb-4'>{t('PORTFOLIO.UNSUPPORTED_FORMAT')}</div>
            <Button type='primary' icon={<DownloadOutlined />} onClick={handleDownload}>
              {t('PORTFOLIO.DOWNLOAD')}
            </Button>
          </div>
        ) : isDocx && selectedFile.originFileObj ? (
          <div className='flex flex-col items-center justify-center h-full'>
            {docxError ? (
              <div className='text-lg font-semibold mb-4'>{docxError}</div>
            ) : (
              <div className='w-full h-full overflow-auto bg-white rounded shadow'>
                <div
                  ref={docxViewerRef}
                  className='w-full h-full overflow-auto bg-white rounded shadow'
                />
              </div>
            )}
            <Button type='primary' icon={<DownloadOutlined />} onClick={handleDownload}>
              {t('PORTFOLIO.DOWNLOAD')}
            </Button>
          </div>
        ) : (
          <div className='relative w-full h-full'>
            {isPreviewLoading && (
              <div className='absolute inset-0 flex items-center justify-center bg-white z-10'>
                <Spin />
              </div>
            )}
            <iframe
              src={selectedFile?.url || selectedFile?.thumbUrl}
              title='File Preview'
              className='w-full h-full border rounded'
              onLoad={() => setIsPreviewLoading(false)}
              style={{ minHeight: 500 }}
            />
          </div>
        )}
      </div>
    </Modal>
  );
};

export { FilePreview };
