import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { openModal } from '@app/components/molecules';
import { NAVIGATE_URL, QUERY_KEY } from '@app/constants';
import { ModalTypeEnum } from '@app/constants/modalType';
import { ICON_URL } from '@app/constants/urlImage';
import { notificationError, notificationSuccess } from '@app/helpers';
import { GetUsersParams, UserDetail } from '@app/interface/user.interface';
import {
  createUser,
  deleteUserAPI,
  getUserByIdAPI,
  getUsersAPI,
  resetPasswordApi,
  updateUser,
  uploadAvatarApi,
  removeAvatarApi,
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
  return useMutation(
    async (id: number) => {
      const response = await deleteUserAPI(id);
      return response.data;
    },
    {
      onSuccess({ message }) {},
    },
  );
};

export const useResetPassword = () => {
  const { t } = useTranslation();

  return useMutation(
    async (id: number) => {
      const response = await resetPasswordApi(id);
      return response.data;
    },
    {
      onSuccess({ data }) {
        openModal(
          () => {
            navigator.clipboard.writeText(data.password);
          },
          ModalTypeEnum.SUCCESS,
          ICON_URL.ICON_SUCCESS,
          t<string>('MODAL.COPY_PASSWORD', { name: data.password }),
          t<string>('MODAL.SUGGESTION_COPY_PASSWORD'),
          t<string>('MODAL.COPY'),
        );
      },
    },
  );
};
