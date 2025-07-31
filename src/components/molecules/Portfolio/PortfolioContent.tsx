import React from 'react';

import { FilePreview } from './components/FilePreview';
import { PortfolioContentContainer } from './components/PortfolioContentContainer';
import { PortfolioProvider } from './context/PortfolioContext';
import { PortfolioRequest } from '@app/interface/portfolio.interface';

import './PortfolioContent.scss';

interface PortfolioContentProps {
  edit?: boolean;
  cancelLabel?: string;
  onCancel?: () => void;
  onSave?: () => void;
  saveLabel?: string;
  isWithUserInfo?: boolean;
  triggerConfirmationModal?: (values: PortfolioRequest, onConfirm: () => void) => void;
}

const PortfolioContent: React.FC<PortfolioContentProps> = ({
  edit,
  onCancel,
  onSave,
  saveLabel,
  cancelLabel,
  isWithUserInfo = false,
  triggerConfirmationModal,
}: PortfolioContentProps) => {
  return (
    <PortfolioProvider
      onCancel={onCancel}
      onSave={onSave}
      edit={edit}
      saveLabel={saveLabel}
      cancelLabel={cancelLabel}
      isWithUserInfo={isWithUserInfo}
      triggerConfirmationModal={triggerConfirmationModal}
    >
      <PortfolioContentContainer />
      <FilePreview />
    </PortfolioProvider>
  );
};

export default PortfolioContent;
