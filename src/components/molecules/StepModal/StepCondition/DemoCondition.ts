import { useGetCountry } from '@app/hooks/useLocation';
import { StepConditionProps } from '@app/interface/stepSection.interface';

export const useDemoCondition = (): StepConditionProps => {
  const { data: data, isLoading: isLoadingCountry } = useGetCountry();

  return { isPass: !!data?.data?.length, isLoading: isLoadingCountry };
};
