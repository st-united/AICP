import { Input, Select, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useCallingCode } from '@app/hooks/useZaloOtp';
import './PhoneInput.scss';

interface PhoneInputProps {
  className?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
  placeholder?: string;
  size?: 'small' | 'middle' | 'large';
  dialCode?: string;
  setDialCode?: (dialCode: string) => void;
}

const PhoneInput = ({
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
  const currentValue = formValue !== undefined ? formValue : '';
  useEffect(() => {
    if (currentValue && CallingCode) {
      const matchedCallingCode = CallingCode.find(
        (item) =>
          currentValue.startsWith(item.dialCode) || currentValue.startsWith(`(${item.dialCode}`),
      );

      if (matchedCallingCode) {
        const remainingNumber = currentValue.substring(
          currentValue.startsWith('(')
            ? matchedCallingCode.dialCode.length + 2
            : matchedCallingCode.dialCode.length,
        );
        setSelectedCallingCode(matchedCallingCode.dialCode);
        setPhoneNumber(remainingNumber);
        formOnChange?.(`(${matchedCallingCode.dialCode})${remainingNumber}`);
      } else {
        setSelectedCallingCode('+84');
        setPhoneNumber(currentValue);
      }
    }
  }, [currentValue, CallingCode, formOnChange]);

  const handleChangeCallingCode = (callingCode: string) => {
    setSelectedCallingCode(callingCode);
    const newPhoneValue = callingCode + phoneNumber;
    if (formOnChange) {
      formOnChange(newPhoneValue);
    }
  };

  const handleChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value.length < selectedCallingCode.length + 2 || value === `(${selectedCallingCode}`)
      return;

    if (value.startsWith(`(${selectedCallingCode})`)) {
      value = value.slice(selectedCallingCode.length + 2);
      setPhoneNumber(value);
      const newPhoneValue = `(${selectedCallingCode})${value}`;
      if (formOnChange) {
        formOnChange(newPhoneValue);
      }
    }
  };

  return (
    <Input
      className={`${className || ''} custom-phone-input`}
      placeholder={placeholder || (t('OTP.PHONE_PLACEHOLDER') as string)}
      value={`(${selectedCallingCode})${phoneNumber}`}
      onChange={handleChangePhoneNumber}
      size={size}
      disabled={disabled}
      addonBefore={
        <Select
          disabled={disabled}
          className='!w-[80px] !h-full !rounded-[8px] '
          value={selectedCallingCode}
          onChange={handleChangeCallingCode}
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
  );
};

export default PhoneInput;
