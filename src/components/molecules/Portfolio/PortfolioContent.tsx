import React from 'react';

import { FilePreview } from './components/FilePreview';
import { PortfolioContentContainer } from './components/PortfolioContentContainer';
import { PortfolioProvider } from './context/PortfolioContext';

import './PortfolioContent.scss';

interface PortfolioContentProps {
  edit?: boolean;
  cancelLabel?: string;
  onCancel?: () => void;
  onSave?: () => void;
  saveLabel?: string;
}

const PortfolioContent: React.FC<PortfolioContentProps> = ({
  edit = false,
  onCancel,
  onSave,
  saveLabel,
  cancelLabel,
}: PortfolioContentProps) => {
  return (
    <PortfolioProvider
      onCancel={onCancel}
      onSave={onSave}
      edit={edit}
      saveLabel={saveLabel}
      cancelLabel={cancelLabel}
    >
      <PortfolioContentContainer />
      <FilePreview />
    </PortfolioProvider>
  );
};

export default PortfolioContent;
