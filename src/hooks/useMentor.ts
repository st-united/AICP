import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { CreateScheduleParams, UseMentorInfiniteParams } from '@app/interface/mentor.interface';
import {
  createBookedSlots,
  fetchBookedSlots,
  getMentorsAvailableAPI,
} from '@app/services/mentorAPI';

export const useMentorInfinite = ({
  search,
  scheduledDate,
  timeSlot,
  take,
}: UseMentorInfiniteParams) => {
  return useInfiniteQuery({
    queryKey: ['mentors', search, scheduledDate, timeSlot],
    queryFn: async ({ pageParam = 1 }) => {
      const skip = (pageParam - 1) * take;
      const res = await getMentorsAvailableAPI({
        take,
        skip,
        search,
        scheduledDate,
        timeSlot,
      });

      const { data, total } = res.data;

      return {
        data,
        nextPage: pageParam + 1,
        hasMore: skip + data.length < total,
      };
    },
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextPage : undefined),
  });
};

export const useBookedSlots = (mentorId: string) => {
  return useQuery({
    queryKey: ['bookedSlots', mentorId],
    queryFn: async () => {
      const response = await fetchBookedSlots(mentorId);
      return response.data;
    },
    enabled: !!mentorId,
  });
};

export const useCreateSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateScheduleParams) => await createBookedSlots(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookedSlots'] });
    },
  });
};
