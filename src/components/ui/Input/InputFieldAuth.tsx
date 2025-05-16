import { Input, InputProps } from 'antd';
import './InputAuth.scss';

interface CustomInputFieldProps extends InputProps {
  alt?: string;
}
export default function InputField({ ...props }: CustomInputFieldProps) {
  const { type, placeholder, alt, className, disabled } = props;

  const customClassName = `text-sm sm:text-sm md:text-md lg:text-md xl:text-lg w-full !bg-[#1955A0] !px-6 !py-4 !border-none !outline-none !rounded-md ${className}`;

  if (type === 'password') {
    return (
      <div id='container-input-field'>
        <Input.Password
          {...props}
          type={type || 'text'}
          alt={alt}
          disabled={disabled}
          className={customClassName}
          placeholder={placeholder}
        />
      </div>
    );
  }

  return (
    <div id='container-input-field'>
      <Input
        {...props}
        type={type || 'text'}
        alt={alt}
        disabled={disabled}
        className={customClassName}
        placeholder={placeholder}
      />
    </div>
  );
}
