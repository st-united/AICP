export type StepItem = {
  title: string;
  render: (actions: StepItemComponent) => React.ReactNode;
  shouldSkip?: boolean;
  status?: 'finish' | 'process' | 'wait';
  icon?: React.ReactNode | null;
  disabled?: boolean;
  loading?: boolean;
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
export interface StepConditionProps {
  isPass: boolean;
  isLoading: boolean;
}
