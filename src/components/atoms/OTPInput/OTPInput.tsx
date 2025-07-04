import { Input, Space } from 'antd';
import { useState, useRef, useEffect } from 'react';

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export const OTPInput = ({
  length = 6,
  value,
  onChange,
  disabled = false,
  placeholder = '0',
  className,
}: OTPInputProps) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Update internal state when value prop changes
    const otpArray = value.split('').slice(0, length);
    const newOtp = [...new Array(length).fill(''), ...otpArray].slice(0, length);
    setOtp(newOtp);
  }, [value, length]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    const val = element.value;
    if (isNaN(Number(val))) return;

    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    // Update parent component
    onChange(newOtp.join(''));

    // Move to next input if current input is filled
    if (val && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').replace(/\D/g, '');
    const pastedArray = pastedData.split('').slice(0, length);

    if (pastedArray.length > 0) {
      const newOtp = [...new Array(length).fill(''), ...pastedArray].slice(0, length);
      setOtp(newOtp);
      onChange(newOtp.join(''));

      // Focus the next empty input or the last input
      const nextIndex = Math.min(pastedArray.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <Space size='small' className={className}>
      {otp.map((_, index) => (
        <Input
          key={index}
          ref={(el) => {
            if (el) {
              inputRefs.current[index] = el.input;
            }
          }}
          type='text'
          inputMode='numeric'
          pattern='[0-9]*'
          maxLength={1}
          value={otp[index]}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          disabled={disabled}
          placeholder={placeholder}
          style={{
            width: '40px',
            height: '40px',
            textAlign: 'center',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        />
      ))}
    </Space>
  );
};
