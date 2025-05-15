import { Input } from 'antd';

interface InputFieldProps {
  type?: string;
  placeholder?: string;
  alt?: string;
  className?: string;
  disabled?: boolean;
}

export default function InputField({ ...props }: InputFieldProps) {
  const { type, placeholder, alt, className, disabled } = props;
  return (
    <Input
      type={type || 'text'}
      alt={alt}
      disabled={disabled}
      className={`h-12 !bg-[#1955A0] !border-none !placeholder:text-[#69C0FF] !text-white !rounded-md !pl-6 ${
        className ? className : ''
      }`}
      placeholder={placeholder}
      {...props}
    />
  );
}
