import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEY } from '@app/constants';
import { checkBookingApi, userBookingApi } from '@app/services/bookingAPI';

export const useUserBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userBookingApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['booking'] });
    },
  });
};

export const useCheckBooking = () => {
  return useQuery({
    queryKey: [QUERY_KEY.BOOKING_STATUS],
    queryFn: async () => {
      const { data } = await checkBookingApi();
      return data.data;
    },
  });
};
