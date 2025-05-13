import { Button } from 'antd';
interface ButtonProps {
  children: string;
  type?: 'primary' | 'default' | 'dashed' | 'text' | 'link' | 'ghost';
  className?: string;
}

export default function ButtonComponent({ ...props }: ButtonProps) {
  const { children, type, className } = props;
  return (
    <Button
      type={type ? type : 'primary'}
      htmlType='submit'
      className={`${className} !h-12 !rounded-md !font-medium`}
    >
      {children}
    </Button>
  );
}
