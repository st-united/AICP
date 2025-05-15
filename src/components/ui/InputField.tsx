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
      className={`w-full px-6 py-4 border-none !outline-none rounded-md text-sm sm:text-sm md:text-md lg:text-md xl:text-lg ${
        className ? className : ''
      }`}
      placeholder={placeholder}
      {...props}
    />
  );
}
