import { Button } from 'antd';

import { StepItemComponent } from '@app/interface/stepSection.interface';

export const DemoComponent = ({ goNext, goBack }: StepItemComponent) => {
  return (
    <>
      <p></p>
      <Button onClick={goNext}>Next</Button>
      <Button onClick={goBack}>Back</Button>
    </>
  );
};
