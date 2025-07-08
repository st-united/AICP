import { useEffect, useState } from 'react';

import { useGetCountry } from '@app/hooks/useLocation';
import { StepConditionProps } from '@app/interface/stepSection.interface';

export const useDemoCondition = (): StepConditionProps => {
  const { data: data, isLoading: isLoadingCountry } = useGetCountry();
  const [isLoading, setIsLoading] = useState(true);
  const [isPass, setIsPass] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isLoadingCountry) {
      setIsLoading(true);
      timer = setTimeout(() => {
        setIsPass(!!data?.data?.length);
        setIsLoading(false);
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [data, isLoadingCountry]);

  return { isPass, isLoading };
};
