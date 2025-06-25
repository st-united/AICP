import React from 'react';

import PortfolioContent from '@app/components/molecules/Portfolio/PortfolioContent';
import { StepItemComponent } from '@app/interface/stepSection.interface';
const PortfolioComponent: React.FC<StepItemComponent> = ({ goNext }) => {
  return (
    <PortfolioContent
      onSave={goNext}
      onCancel={goNext}
      edit={true}
      saveLabel='Hoàn tất'
      cancelLabel='Để sau'
    />
  );
};

export default PortfolioComponent;
