import { useGetPortfolio } from '@app/hooks/usePortfolio';
import { StepConditionProps } from '@app/interface/stepSection.interface';

export const usePortfolioCondition = (): StepConditionProps => {
  const { isLoading: isLoading, isSuccess } = useGetPortfolio();

  return { isPass: isSuccess, isLoading: isLoading };
};
