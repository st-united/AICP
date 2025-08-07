import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEY } from '@app/constants';
import {
  CheckInterviewRequestResponse,
  CreateScheduleParams,
} from '@app/interface/mentor.interface';
import { checkMyInterview, createBookedSlots } from '@app/services/mentorAPI';

export const useCheckInterview = (examId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.CHECK_MY_INTERVIEW, examId],
    queryFn: async (): Promise<CheckInterviewRequestResponse> => {
      const response = await checkMyInterview(examId);
      return response.data.data;
    },
    enabled: !!examId,
  });
};

export const useCreateSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateScheduleParams) => {
      console.log('🚀 ~ useCreateSchedule ~ data:', data);
      return await createBookedSlots(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CHECK_MY_INTERVIEW] });
    },
  });
};
