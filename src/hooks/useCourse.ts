import { useMutation, useQuery } from '@tanstack/react-query';

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

export const useCourse = () => {
  return useQuery({
    queryKey: [QUERY_KEY.COURSES],
    queryFn: async (): Promise<Course[]> => {
      const { data } = await getAllCourseAPI();
      return data.data;
    },
  });
};

export const useRegisterCourse = () => {
  return useMutation(async (courseId: string) => {
    const response = await registerCourseAPI(courseId);
    return response.data;
  });
};
