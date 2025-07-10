import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { NAVIGATE_URL, QUERY_KEY } from '@app/constants';
import { ChangePassword, Job, UserProfile } from '@app/interface/user.interface';
import { setAuth } from '@app/redux/features/auth/authSlice';
import {
  changePassword,
  getjobApi,
  getProfileApi,
  updateProfileApi,
  uploadAvatarApi,
} from '@app/services';
import {
  NotificationTypeEnum,
  openNotificationWithIcon,
} from '@app/services/notification/notificationService';

export const useGetProfile = (isAuth = true) => {
  const dispatch = useDispatch();

  return useQuery<UserProfile>(
    [QUERY_KEY.PROFILE],
    async () => {
      const { data } = await getProfileApi();
      return data.data;
    },
    {
      onSuccess(data) {
        dispatch(setAuth(data));
      },
      enabled: isAuth,
    },
  );
};

export const useGetJob = () => {
  return useQuery<Job[]>([QUERY_KEY.JOB], async () => {
    const { data } = await getjobApi();
    return data.data;
  });
};

export const useChangePassword = () => {
  const navigate = useNavigate();
  return useMutation(
    async (password: ChangePassword) => {
      const response = await changePassword(password);
      return response.data;
    },
    {
      onSuccess: ({ message }) => {
        openNotificationWithIcon(NotificationTypeEnum.SUCCESS, message);
        navigate(NAVIGATE_URL.PROFILE);
      },
      onError({ response }) {
        openNotificationWithIcon(NotificationTypeEnum.ERROR, response.data.message);
      },
    },
  );
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (user: UserProfile) => {
      const response = await updateProfileApi(user);
      return response.data;
    },
    {
      onSuccess({ message }) {
        queryClient.refetchQueries([QUERY_KEY.PROFILE]);
      },
    },
  );
};

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (data: { identityId: string; formData: FormData }) => {
      const response = await uploadAvatarApi(data.identityId, data.formData);
      return response.data;
    },
    {
      onSuccess({ message }) {
        queryClient.refetchQueries([QUERY_KEY.PROFILE]);
      },
    },
  );
};
