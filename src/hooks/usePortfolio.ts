import { useMutation, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';

import { QUERY_KEY } from '@app/constants/requestReactQuery';
import { Portfolio } from '@app/interface/portfolio.interface';
import {
  updatePortfolioApi,
  getPortfolioApi,
  uploadPortfolioFilesApi,
  downloadPortfolioFileApi,
} from '@app/services/portfolioApi';

export const useUpdatePortfolio = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Portfolio) => updatePortfolioApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PORTFOLIO] });
    },
  });
};

export const useGetPortfolio = (): UseQueryResult<Portfolio> => {
  return useQuery({
    queryKey: [QUERY_KEY.PORTFOLIO],
    queryFn: getPortfolioApi,
    select: (data) => data.data.data,
    refetchOnWindowFocus: false,
  });
};

export const useUploadPortfolioFiles = () => {
  return useMutation({
    mutationFn: ({
      formData,
      onProgress,
    }: {
      formData: FormData;
      onProgress: (percent: number) => void;
    }) => uploadPortfolioFilesApi(formData, onProgress),
  });
};

export const useDownloadPortfolioFile = () => {
  return useMutation({
    mutationFn: ({ url, filename }: { url: string; filename: string }) =>
      downloadPortfolioFileApi(url, filename),
  });
};
