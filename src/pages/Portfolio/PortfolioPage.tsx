import React, { useMemo, memo } from 'react';

import PortfolioContent from '@app/components/molecules/Portfolio/PortfolioContent';
import { Portfolio } from '@app/interface/portfolio.interface';
interface PortfolioPageProps {
  portfolio?: Portfolio;
  onSave?: () => void;
  onCancel?: () => void;
}
const PortfolioPage: React.FC<PortfolioPageProps> = memo(
  ({ portfolio, onSave, onCancel }: PortfolioPageProps) => {
    return (
      <PortfolioContent
        onSave={onSave}
        onCancel={onCancel}
        edit={true}
        saveLabel='Hoàn tất'
        cancelLabel='Để sau'
        portfolio={portfolio}
      />
    );
  },
);

PortfolioPage.displayName = 'PortfolioPage';

export default PortfolioPage;
