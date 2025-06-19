import { Button } from 'antd';

import { StepItemComponent } from '@app/interface/stepSection.interface';

export const DemoComponent = ({ goNext, goBack }: StepItemComponent) => (
  <>
    <p>
      Content 1 Content 1 Content 1 Content 1 Content 1 Content 1 Content 1 Content 1 Content 1
      Content 1 Content 1
    </p>
    <Button onClick={goNext}>Next</Button>
    <Button onClick={goBack}>Back</Button>
  </>
);
