import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { NAVIGATE_URL, QUERY_KEY } from '@app/constants';
import {
  GetHistoryParams,
  GetUsersParams,
  HistoryTesting,
  UserDetail,
} from '@app/interface/user.interface';
import {
  createUser,
  deleteUserAPI,
  getHistoryTestingApi,
  getUserByIdAPI,
  getUsersAPI,
  resetPasswordApi,
  updateUser,
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
  return useQuery<HistoryTesting[]>(
    [QUERY_KEY.EXAM_HISTORY, params],
    async () => {
      const { data } = await getHistoryTestingApi(params);
      return data.data;
    },
    {
      enabled: true,
    },
  );
};
