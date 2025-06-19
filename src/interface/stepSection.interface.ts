export type StepItem = {
  title: string;
  render: (actions: StepItemComponent) => React.ReactNode;
  shouldSkip?: () => boolean | Promise<boolean>;
  status?: 'finish' | 'process' | 'wait';
  icon?: React.ReactNode | null;
  disabled?: boolean;
};
export type StepItemComponent = {
  goNext: () => void;
  goBack: () => void;
};
export interface StepModalProps {
  onClose: () => void;
  open: boolean;
  onFinish: () => void;
}
