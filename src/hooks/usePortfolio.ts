import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { QUERY_KEY } from '@app/constants/requestReactQuery';
import { PortfolioResponse } from '@app/interface/portfolio.interface';
import {
  updatePortfolioApi,
  getPortfolioApi,
  uploadPortfolioFilesApi,
  downloadPortfolioFileApi,
} from '@app/services/portfolioApi';

export const useUpdatePortfolio = (): UseMutationResult<
  PortfolioResponse,
  AxiosError,
  FormData
> => {
  const queryClient = useQueryClient();
  return useMutation<PortfolioResponse, AxiosError, FormData>({
    mutationFn: (data: FormData) => updatePortfolioApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PORTFOLIO] });
    },
  });
};

export const useGetPortfolio = (
  portfolio?: PortfolioResponse,
): UseQueryResult<PortfolioResponse> => {
  return useQuery({
    queryKey: [QUERY_KEY.PORTFOLIO],
    queryFn: getPortfolioApi,
    select: (data) => data.data.data,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !portfolio,
  });
};

// export const useUploadPortfolioFiles = () => {
//   return useMutation({
//     mutationFn: async ({
//       formData,
//       onProgress,
//       controller,
//     }: {
//       formData: FormData;
//       onProgress: (percent: number) => void;
//       controller?: AbortController;
//     }) => uploadPortfolioFilesApi(formData, onProgress, controller),
//   });
// };

export const useDownloadPortfolioFile = (): UseMutationResult<
  AxiosResponse<Blob>,
  AxiosError,
  { url: string; filename: string }
> => {
  return useMutation({
    mutationFn: ({ url, filename }: { url: string; filename: string }) =>
      downloadPortfolioFileApi(url, filename),
  });
};
