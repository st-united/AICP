import { Input, Select, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useCallingCode } from '@app/hooks/useZaloOtp';

interface PhoneInputProps {
  phone?: string;
  setPhone?: (phone: string) => void;
  className?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;

  style?: React.CSSProperties;
  placeholder?: string;
  size?: 'small' | 'middle' | 'large';
}

const PhoneInput = ({
  phone,
  setPhone,
  className,
  disabled,
  value: formValue,
  onChange: formOnChange,
  style,
  placeholder,
  size = 'large',
}: PhoneInputProps) => {
  const [selectedCallingCode, setSelectedCallingCode] = useState<string>('+84');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const { t } = useTranslation();
  const { data: CallingCode } = useCallingCode();
  const [loading, setLoading] = useState<boolean>(true);
  const currentValue = formValue !== undefined ? formValue : phone || '';

  useEffect(() => {
    try {
      if (currentValue && !phoneNumber && CallingCode) {
        const matchedCallingCode = CallingCode.find((item) =>
          currentValue.startsWith(item.dialCode),
        );

        if (matchedCallingCode) {
          const remainingNumber = currentValue.substring(matchedCallingCode.dialCode.length);
          setSelectedCallingCode(matchedCallingCode.dialCode);
          setPhoneNumber(remainingNumber);
        } else {
          setSelectedCallingCode('+84');
          setPhoneNumber(currentValue);
        }
      }
    } finally {
      setLoading(false);
    }
  }, [currentValue, phoneNumber, CallingCode]);

  const handleChangeCallingCode = (callingCode: string) => {
    setSelectedCallingCode(callingCode);
    const newPhoneValue = callingCode + phoneNumber;

    if (formOnChange) {
      formOnChange(newPhoneValue);
    }
    if (setPhone) {
      setPhone(newPhoneValue);
    }
  };

  const handleChangePhoneNumber = (value: string) => {
    setPhoneNumber(value);
    const newPhoneValue = selectedCallingCode + value;

    if (formOnChange) {
      formOnChange(newPhoneValue);
    }
    if (setPhone) {
      setPhone(newPhoneValue);
    }
  };

  if (loading) {
    return (
      <div
        className={`w-full items-center gap-2 flex justify-center h-[50px] ${className || ''}`}
        style={style}
      >
        <Skeleton.Button active className='!w-2/5 !h-full' size='large' />
        <Skeleton.Input active className='!w-3/5 !h-full' size='large' />
      </div>
    );
  }

  return (
    <div
      className={`w-full items-center gap-2 flex justify-center ${className || ''}`}
      style={style}
    >
      <Select
        disabled={disabled}
        className='!w-2/5 !h-full !rounded-[8px]'
        showSearch
        value={selectedCallingCode}
        onChange={handleChangeCallingCode}
        filterOption={(input, option) => {
          const value = String(option?.key ?? '').toLowerCase();
          return value.includes(input.toLowerCase());
        }}
        optionLabelProp='label'
        size={size}
      >
        {(
          CallingCode || [
            {
              dialCode: '+84',
              name: 'Vietnam',
              flag: 'https://flagcdn.com/w320/vn.png',
              code: 'VN',
            },
          ]
        ).map((item) => (
          <Select.Option
            key={item.dialCode + item.name + item.code}
            value={item.dialCode}
            disabled={disabled}
            label={
              <div className='flex items-center flex-row w-full'>
                <img className='mr-2 w-4' src={item.flag} alt={item.name} />
                <span className='truncate'>{item.code}</span>
                <span className='text-gray-600'>({item.dialCode})</span>
              </div>
            }
          >
            {item.name}
          </Select.Option>
        ))}
      </Select>
      <Input
        className='!w-3/5 !rounded-[8px] !h-full'
        placeholder={placeholder || (t('OTP.PHONE_PLACEHOLDER') as string)}
        value={phoneNumber}
        type='tel'
        onChange={(e) => handleChangePhoneNumber(e.target.value)}
        size={size}
        disabled={disabled}
      />
    </div>
  );
};

export default PhoneInput;
