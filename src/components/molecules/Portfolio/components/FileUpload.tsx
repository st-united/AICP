import { Upload } from 'antd';
import React from 'react';

import { MAX_FILE_COUNT, ACCEPTED_FILE_TYPES } from '../constants';
import { UploadContent } from './UploadContent';
import { usePortfolioContext } from '../context/PortfolioContext';
import { PortfolioFileType } from '@app/constants/portfolioFileType';

const { Dragger } = Upload;

interface FileUploadProps {
  type: PortfolioFileType;
}

const FileUpload: React.FC<FileUploadProps> = ({ type }) => {
  const {
    isEdit,
    certificationFiles,
    experienceFiles,
    handleCertificationChange,
    handleExperienceChange,
    t,
  } = usePortfolioContext();

  const files = type === PortfolioFileType.CERTIFICATION ? certificationFiles : experienceFiles;
  const onChange =
    type === PortfolioFileType.CERTIFICATION ? handleCertificationChange : handleExperienceChange;

  if (!isEdit) return null;

  return (
    <section className='w-full'>
      <Dragger
        className='custom-upload'
        multiple
        maxCount={MAX_FILE_COUNT}
        accept={ACCEPTED_FILE_TYPES}
        disabled={!isEdit}
        showUploadList={false}
        fileList={files}
        beforeUpload={() => false}
        onChange={({ fileList }) => onChange({ fileList })}
      >
        <UploadContent />
      </Dragger>
      <p className='text-sm text-gray-400 text-center mt-2'>{t('PORTFOLIO.VALIDATION')}</p>
    </section>
  );
};

export { FileUpload };
