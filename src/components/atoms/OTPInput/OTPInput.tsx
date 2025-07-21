import { Flex, Input } from 'antd';

import type { GetProps } from 'antd';

type OTPProps = GetProps<typeof Input.OTP>;
interface OTPInputProps {
  value: string;
  setValue: (value: string) => void;
}
const OTPInput = ({ value, setValue }: OTPInputProps) => {
  const onInput: OTPProps['onInput'] = (value) => {
    setValue(value.join(''));
  };
  const sharedProps: OTPProps = {
    onInput,
  };
  return (
    <Flex gap='middle' align='flex-start' vertical>
      <Input.OTP formatter={(str) => str.toUpperCase()} {...sharedProps} />
    </Flex>
  );
};

export default OTPInput;
