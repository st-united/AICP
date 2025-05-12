import { Input } from 'antd';
interface InputFieldProps {
  type?: string;
  placeholder?: string;
  alt?: string;
  className?: string;
}

export default function InputField({ ...props }: InputFieldProps) {
  const { type, placeholder, alt, className } = props;
  return (
    <>
      <Input
        type={type || 'text'}
        alt={alt}
        className={`h-12 !bg-[#1955A0] !border-none !placeholder:text-[#69C0FF] !text-white !rounded-md ${
          className ? className : ''
        }`}
        placeholder={placeholder}
      />
    </>
  );
}
