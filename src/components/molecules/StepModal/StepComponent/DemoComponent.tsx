import { OTPVerification } from '@app/components/molecules/OTPVerification/OTPVerification';
import { StepItemComponent } from '@app/interface/stepSection.interface';

export const DemoComponent = ({ goNext, goBack }: StepItemComponent) => {
  return (
    <OTPVerification onSuccess={goNext} onBack={goBack} showTitle={true} showBackButton={true} />
  );
};
