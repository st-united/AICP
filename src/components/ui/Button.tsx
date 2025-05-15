import { Button } from 'antd';
interface ButtonProps {
  children: string;
  type?: 'primary' | 'default' | 'dashed' | 'text' | 'link' | 'ghost';
  className?: string;
  disabled?: boolean;
}

export default function ButtonComponent({ ...props }: ButtonProps) {
  const { children, type, className, disabled } = props;
  return (
    <Button
      type={type ? type : 'primary'}
      disabled={disabled}
      htmlType='submit'
      className={`${className} !h-12 !rounded-md !font-medium`}
    >
      {children}
    </Button>
  );
}
