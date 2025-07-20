import { useEffect, useState } from 'react';

import { useCheckOtpStatus } from '@app/hooks';
import { StepConditionProps } from '@app/interface/stepSection.interface';

export const useDemoCondition = (): StepConditionProps => {
  const { data: data, isLoading: isCheckOtpStatus } = useCheckOtpStatus();

  return { isPass: !!data?.zaloVerified, isLoading: isCheckOtpStatus };
};
