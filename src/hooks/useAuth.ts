import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { removeStorageData, setStorageData } from '@app/config';
import { ACCESS_TOKEN, NAVIGATE_URL, REFRESH_TOKEN, USER_PROFILE } from '@app/constants';
import { Credentials, GoogleCredentials, RegisterUser } from '@app/interface/user.interface';
import { logout, login, setAuth } from '@app/redux/features/auth/authSlice';
import {
  loginApi,
  getLogout,
  registerApi,
  getActivateAccount,
  useLoginWithGoogleApi,
} from '@app/services';
import {
  NotificationTypeEnum,
  openNotificationWithIcon,
} from '@app/services/notification/notificationService';

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatchAuth = useDispatch();

  return useMutation(
    async (credentials: Credentials) => {
      const { data } = await loginApi(credentials);
      return data;
    },
    {
      onSuccess: ({ data, message }) => {
        dispatchAuth(login());
        dispatchAuth(
          setAuth({
            user: { name: data.name },
            permissions: [],
          }),
        );
        setStorageData(ACCESS_TOKEN, data.accessToken);
        setStorageData(REFRESH_TOKEN, data.refreshToken);
        setStorageData(USER_PROFILE, { name: data.name });
        openNotificationWithIcon(NotificationTypeEnum.SUCCESS, message);

        navigate('/');
      },
      onError({ response }) {
        openNotificationWithIcon(NotificationTypeEnum.ERROR, response.data.message);
      },
    },
  );
};

export const useLoginWithGoogle = () => {
  const navigate = useNavigate();
  const dispatchAuth = useDispatch();

  return useMutation(
    async (GoogleCredentials: GoogleCredentials) => {
      const { data } = await useLoginWithGoogleApi(GoogleCredentials);
      return data;
    },
    {
      onSuccess: ({ data, message }) => {
        dispatchAuth(login());
        dispatchAuth(
          setAuth({
            user: { name: data.name },
            permissions: [],
          }),
        );
        setStorageData(ACCESS_TOKEN, data.accessToken);
        setStorageData(REFRESH_TOKEN, data.refreshToken);
        setStorageData(USER_PROFILE, { name: data.name });
        openNotificationWithIcon(NotificationTypeEnum.SUCCESS, message);

        navigate('/');
      },
      onError({ response }) {
        openNotificationWithIcon(NotificationTypeEnum.ERROR, response.data.message);
      },
    },
  );
};

export const useLogout = () => {
  const navigate = useNavigate();
  const dispatchAuth = useDispatch();

  return useMutation(
    async () => {
      const { data } = await getLogout();
      return data;
    },
    {
      onSuccess: () => {
        removeStorageData(ACCESS_TOKEN);
        removeStorageData(REFRESH_TOKEN);
        removeStorageData(USER_PROFILE);

        dispatchAuth(logout());

        navigate(NAVIGATE_URL.SIGN_IN);
      },
    },
  );
};

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation(
    async (registerUserDto: RegisterUser) => {
      const { data } = await registerApi(registerUserDto);
      return data;
    },
    {
      onSuccess: ({ message }) => {
        openNotificationWithIcon(NotificationTypeEnum.SUCCESS, message);
        navigate('/login');
      },
      onError({ response }) {
        openNotificationWithIcon(NotificationTypeEnum.ERROR, response.data.message);
      },
    },
  );
};

export const useActivateAccount = () => {
  return useMutation(
    async (token: string) => {
      const { data } = await getActivateAccount(token);
      return data;
    },
    {
      onSuccess: ({ message }) => {
        openNotificationWithIcon(NotificationTypeEnum.SUCCESS, message);
      },
      onError({ response }) {
        openNotificationWithIcon(NotificationTypeEnum.ERROR, response.data.message);
      },
    },
  );
};
