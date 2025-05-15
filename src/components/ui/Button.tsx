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
      className={`${className} text-lg h-[48px] sm:h-[48px] md:h-[52px] xl:h-[60px] rounded-md font-medium text-sm sm:text-sm md:text-md xl:text-lg`}
    >
      {children}
    </Button>
  );
}
