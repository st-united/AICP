import { Flex, Input } from 'antd';

import type { GetProps } from 'antd';

type OTPProps = GetProps<typeof Input.OTP>;
interface OTPInputProps {
  value: string;
  setValue: (value: string) => void;
}
const OTPInput = ({ value, setValue }: OTPInputProps) => {
  console.log('value', value);
  const onChange: OTPProps['onChange'] = (text) => {
    console.log('onChange:', text);
  };

  const onInput: OTPProps['onInput'] = (value) => {
    setValue(value.join(''));
    console.log('onInput:', value);
  };
  const sharedProps: OTPProps = {
    onChange,
    onInput,
  };
  return (
    <Flex gap='middle' align='flex-start' vertical>
      <Input.OTP formatter={(str) => str.toUpperCase()} {...sharedProps} />
    </Flex>
  );
};

export default OTPInput;
