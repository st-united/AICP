import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { NAVIGATE_URL, QUERY_KEY } from '@app/constants';
import {
  GetUsersParams,
  GetHistoryParams,
  UserDetail,
  UpdateForgotPassword,
  HasTakenExam,
  HistoryTesting,
  DetailExam,
  UpdateUserStudentInfo,
  UserProfile,
} from '@app/interface/user.interface';
import {
  checkHasTakenExam,
  checkHasTakenExamDefault,
  createUser,
  deleteUserAPI,
  getHistoryTestingApi,
  getUserByIdAPI,
  getUsersAPI,
  resetPasswordApi,
  updateUser,
  forgotPasswordApi,
  updateForgotPasswordApi,
  checkResetPasswordTokenApi,
  getDetailExam,
  UpdateUserStudentInfoApi,
  getUserProfileAPI,
} from '@app/services';

export const useCreateUser = () => {
  const navigate = useNavigate();
  return useMutation(
    async (formData: FormData) => {
      const response = await createUser(formData);
      return response.data;
    },
    {
      onSuccess({ message }) {
        navigate(NAVIGATE_URL.USERS);
      },
    },
  );
};

export const useGetUsers = (params: GetUsersParams) =>
  useQuery(
    [QUERY_KEY.USERS, params.search, params.status, params.page, params.take],
    async () => {
      const { data } = await getUsersAPI(params);
      return data;
    },
    {
      enabled: false,
      keepPreviousData: true,
      cacheTime: 0,
    },
  );

export const useHasTakenExam = (examSetId: string) =>
  useQuery([QUERY_KEY.HAS_TAKEN_EXAM, examSetId], async (): Promise<HasTakenExam> => {
    const { data } = await checkHasTakenExam(examSetId);
    return data.data;
  });

export const useHasTakenExamDefault = () =>
  useQuery([QUERY_KEY.HAS_TAKEN_EXAM_DEFAULT], async (): Promise<HasTakenExam> => {
    const { data } = await checkHasTakenExamDefault();
    return data.data;
  });

export const useGetUserById = (id: number) =>
  useQuery([QUERY_KEY.USERS, id], async () => {
    const { data } = await getUserByIdAPI(id);
    return data.data;
  });

export const useUpdateUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(
    async (user: UserDetail) => {
      const response = await updateUser(user);
      return response.data;
    },
    {
      onSuccess({ message }) {
        queryClient.refetchQueries([QUERY_KEY.USERS]);
        queryClient.refetchQueries([QUERY_KEY.PROFILE]);
        navigate(NAVIGATE_URL.USERS);
      },
    },
  );
};

export const useDeleteUser = () => {
  return useMutation(async (id: number) => {
    const response = await deleteUserAPI(id);
    return response.data;
  });
};

export const useResetPassword = () => {
  return useMutation(async (id: number) => {
    const response = await resetPasswordApi(id);
    return response.data;
  });
};

export const useGetHistory = (params?: GetHistoryParams) => {
  return useQuery<HistoryTesting[]>([QUERY_KEY.EXAM_HISTORY, params], async () => {
    const { data } = await getHistoryTestingApi(params);
    return data.data;
  });
};

export const useForgotPassword = () => {
  return useMutation(async (email: string) => {
    const response = await forgotPasswordApi(email);
    return response.data;
  });
};

export const useUpdateForgotPassword = () => {
  return useMutation(async (payload: UpdateForgotPassword) => {
    const response = await updateForgotPasswordApi(payload);
    return response.data;
  });
};

export const useCheckResetPasswordToken = (token: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.CHECK_RESET_PASSWORD_TOKEN, token],
    queryFn: async () => {
      const response = await checkResetPasswordTokenApi(token);
      return response.data;
    },
    enabled: !!token,
    retry: false,
  });
};
export const useExamDetail = (examId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.EXAM_DETAIL, examId],
    queryFn: async (): Promise<DetailExam> => {
      const { data } = await getDetailExam(examId);
      return data.data;
    },
    enabled: !!examId,
  });
};
export const useUpdateUserStudentInfo = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (payload: UpdateUserStudentInfo) => {
      const response = await UpdateUserStudentInfoApi(payload);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PROFILE] });
      },
      onError: ({ message }) => {
        message.error('Failed to update student info');
      },
    },
  );
};
