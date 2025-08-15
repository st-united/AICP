import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEY } from '@app/constants';
import { ExamSlotsReportDto } from '@app/interface/interview.interface';
import {
  CheckInterviewRequestResponse,
  CreateScheduleParams,
} from '@app/interface/mentor.interface';
import {
  checkMyInterview,
  createBookedSlots,
  getAvailableInterview,
} from '@app/services/mentorAPI';

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

export const useAvailableInterview = (examId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.SLOT_INTERVIEW, examId],
    queryFn: async (): Promise<ExamSlotsReportDto | null> => {
      const response = await getAvailableInterview(examId);
      return response.data.data;
    },
    enabled: !!examId,
  });
};

export const useCreateSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateScheduleParams) => {
      return await createBookedSlots(data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.CHECK_MY_INTERVIEW, data.data.data.examId],
      });
    },
  });
};
