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
    const newPhoneValue = `(${callingCode}) ${phoneNumber}`;
    setPhoneNumber(newPhoneValue);
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
        <Skeleton.Button active className='!w-[80px] !h-full' size='large' />
        <Skeleton.Input active className='!w-3/5 !h-full' size='large' />
      </div>
    );
  }

  return (
    <div
      className={`w-full items-center gap-2 flex justify-between ${className || ''}`}
      style={style}
    >
      <Input
        className='flex-1 !rounded-[8px] !h-full'
        placeholder={placeholder || (t('OTP.PHONE_PLACEHOLDER') as string)}
        value={phoneNumber}
        type='tel'
        onChange={(e) => handleChangePhoneNumber(e.target.value.replace(/[^0-9]/g, ''))}
        size={size}
        disabled={disabled}
        addonBefore={
          <Select
            disabled={disabled}
            className='!w-[80px] !h-full !rounded-[8px]'
            showSearch
            value={selectedCallingCode}
            onChange={handleChangeCallingCode}
            filterOption={(input, option) => {
              const value = String(option?.key ?? '').toLowerCase();
              return value.includes(input.toLowerCase());
            }}
            optionLabelProp='label'
            size={size}
            classNames={{ popup: { root: 'min-w-[300px] sm:min-w-[400px]' } }}
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
                label={<img className=' w-full rounded-xl' src={item.flag} alt={item.name} />}
              >
                <div className='flex items-center flex-row w-[400px]'>
                  <img className='mr-2 w-4' src={item.flag} alt={item.name} />
                  <span className=''>{item.name}</span>
                  <span className='ml-1 font-bold'>{item.code}</span>
                  <span className='text-gray-600 ml-1'>({item.dialCode})</span>
                </div>
              </Select.Option>
            ))}
          </Select>
        }
      />
    </div>
  );
};

export default PhoneInput;
