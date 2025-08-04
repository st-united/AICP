import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Input, InputProps } from 'antd';
import './InputAuth.scss';

interface CustomInputFieldProps extends InputProps {
  alt?: string;
}
export default function InputField({ ...props }: CustomInputFieldProps) {
  const { type, placeholder, alt, className, disabled } = props;

  const customClassName = `hover:shadow-gray-200 text-sm sm:text-sm md:text-md lg:text-md xl:text-lg w-full text-primary-gray px-6 py-4 border-gray-200 hover:border-gray-200 !outline-none rounded-md ${className}`;

  if (type === 'password') {
    return (
      <div id='container-input-field-auth'>
        <Input.Password
          {...props}
          type={type || 'text'}
          alt={alt}
          disabled={disabled}
          className={customClassName}
          placeholder={placeholder}
          iconRender={(visible) =>
            visible ? (
              <EyeOutlined className='text-base md:text-lg' style={{ color: '#69c0ff' }} />
            ) : (
              <EyeInvisibleOutlined className='text-base md:text-lg' style={{ color: '#69c0ff' }} />
            )
          }
        />
      </div>
    );
  }

  return (
    <div id='container-input-field-auth'>
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
