import { useMutation, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';

import { Portfolio } from '@app/interface/portfolio.interface';
import { updatePortfolioApi, getPortfolioApi } from '@app/services/portfolioApi';

export const useUpdatePortfolio = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => updatePortfolioApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
    },
  });
};

export const useGetPortfolio = (): UseQueryResult<Portfolio> => {
  return useQuery({
    queryKey: ['portfolio'],
    queryFn: getPortfolioApi,
    select: (data) => data.data.data,
    refetchOnWindowFocus: false,
  });
};
