import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEY } from '@app/constants';
import { Course } from '@app/interface/course.interface';
import { getAllCourseAPI, getCourseDetailAPI, registerCourseAPI } from '@app/services/courseAPI';

export const useCourseDetail = (courseId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.COURSE_DETAIL, courseId],
    queryFn: async (): Promise<Course> => {
      const { data } = await getCourseDetailAPI(courseId);
      return data.data;
    },
    enabled: !!courseId,
  });
};

export const useCourse = (excludeId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.COURSES],
    queryFn: async (): Promise<Course[]> => {
      const { data } = await getAllCourseAPI(excludeId);
      return data.data;
    },
  });
};

export const useRegisterCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (courseId: string) => {
      const response = await registerCourseAPI(courseId);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.COURSES],
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.EXAM_RESULT] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.COURSE_DETAIL],
      });
    },
  });
};
