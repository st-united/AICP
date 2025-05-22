import { Button, ButtonProps } from 'antd';

export default function ButtonComponent({ ...props }: ButtonProps) {
  const { children, type, className, disabled } = props;

  return (
    <Button
      type={type ? type : 'dashed'}
      disabled={disabled}
      htmlType='submit'
      className={`${className} focus:bg-primary-bold bg-primary-bold hover:bg-primary border-none w-full h-[52px] sm:h-[52px] md:h-[52px] xl:h-[60px] rounded-md font-medium text-sm sm:text-sm md:text-md xl:text-lg`}
    >
      {children}
    </Button>
  );
}
