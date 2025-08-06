import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { NotificationTypeEnum, openNotificationWithIcon } from '@app/components/atoms/notification';
import { QUERY_KEY } from '@app/constants';
import { CheckInterviewRequestResponse } from '@app/interface/booking.interface';
import { checkInterviewRequestApi, userInterviewRequestApi } from '@app/services/bookingAPI';

export const useUserInterviewRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userInterviewRequestApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.BOOKING_STATUS] });
    },
    onError: ({ response }) => {
      openNotificationWithIcon(NotificationTypeEnum.ERROR, response.data.message);
    },
  });
};

export const useCheckInterviewRequest = () => {
  return useQuery<CheckInterviewRequestResponse, Error>({
    queryKey: [QUERY_KEY.BOOKING_STATUS],
    queryFn: async () => {
      const { data } = await checkInterviewRequestApi();
      return data.data;
    },
  });
};
