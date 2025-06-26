import { Empty, Typography } from 'antd';
import React from 'react';

import { FileItem } from './FileItem';
import { usePortfolioContext } from '../context/PortfolioContext';
import { PortfolioFileType } from '@app/constants/portfolioFileType';

interface FileListProps {
  type: PortfolioFileType;
}

const FileList: React.FC<FileListProps> = ({ type }) => {
  const { isEdit, certificationFiles, experienceFiles, handleRemove, handleFilePreview, t } =
    usePortfolioContext();

  const files = type === PortfolioFileType.CERTIFICATION ? certificationFiles : experienceFiles;

  return (
    <div>
      <div
        className={`w-full mt-4 p-4 rounded-lg ${
          isEdit ? 'bg-white' : 'bg-gray-100'
        } flex justify-center flex-col`}
      >
        {files.length > 0 ? (
          files.map((file) => (
            <FileItem
              key={file.uid}
              file={file}
              type={type}
              onRemove={handleRemove}
              onPreview={handleFilePreview}
              isEdit={isEdit}
              t={t}
            />
          ))
        ) : (
          <Empty description={<Typography.Text>{t('PORTFOLIO.NO_DATA')}</Typography.Text>} />
        )}
      </div>
    </div>
  );
};

export { FileList };
