import React, { memo } from 'react';

import { FilePreview } from './components/FilePreview';
import { PortfolioContentContainer } from './components/PortfolioContentContainer';
import { PortfolioProvider } from './context/PortfolioContext';
import { PortfolioResponse } from '@app/interface/portfolio.interface';

import './PortfolioContent.scss';

interface PortfolioContentProps {
  edit?: boolean;
  cancelLabel?: string;
  onCancel?: () => void;
  onSave?: () => void;
  saveLabel?: string;
  portfolio?: PortfolioResponse;
}

const PortfolioContent: React.FC<PortfolioContentProps> = ({
  edit = false,
  onCancel,
  onSave,
  portfolio,
}: PortfolioContentProps) => {
  return (
    <PortfolioProvider portfolio={portfolio} onCancel={onCancel} onSave={onSave} edit={edit}>
      <PortfolioContentContainer />
      <FilePreview />
    </PortfolioProvider>
  );
};

export default PortfolioContent;
