import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEY } from '@app/constants/requestReactQuery';
import { CallingCode } from '@app/interface/callingCode.interface';
import { sendOtp, verifyOtp, checkOtpStatus, callingCode, canSendOtp } from '@app/services';
import { openNotificationWithIcon, NotificationTypeEnum } from '@app/components/atoms/notification';

export const useSendOtp = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async () => {
      const { data } = await sendOtp();
      return data;
    },
    {
      onSuccess: ({ message }) => {
        openNotificationWithIcon(NotificationTypeEnum.SUCCESS, message);
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ZALO_OTP_CAN_SEND] });
      },
      onError({ response }) {
        openNotificationWithIcon(NotificationTypeEnum.ERROR, response.data.message);
      },
    },
  );
};

export const useVerifyOtp = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (otp: string) => {
      const { data } = await verifyOtp(otp);
      return data;
    },
    {
      onSuccess: ({ message }) => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ZALO_OTP_CAN_SEND] });
        openNotificationWithIcon(NotificationTypeEnum.SUCCESS, message);
      },
      onError({ response }) {
        openNotificationWithIcon(NotificationTypeEnum.ERROR, response.data.message);
      },
    },
  );
};

export const useCheckOtpStatus = () =>
  useQuery<{ zaloVerified: boolean; message: string }>({
    queryKey: [QUERY_KEY.ZALO_OTP_CHECK_STATUS],
    queryFn: async () => {
      const { data } = await checkOtpStatus();
      return data.data;
    },
    retry: false,
  });
export const useCallingCode = () =>
  useQuery<CallingCode[]>({
    queryKey: [QUERY_KEY.ZALO_OTP_COUNTRY_CODE],
    queryFn: async () => {
      const { data } = await callingCode();
      return data.data.sort((a: CallingCode, b: CallingCode) => a.name.localeCompare(b.name));
    },
  });

export const useCanSendOtp = () =>
  useQuery<{ canSend: boolean; remainingSeconds?: number; nextSendTime?: number }>({
    queryKey: [QUERY_KEY.ZALO_OTP_CAN_SEND],
    queryFn: async () => {
      const { data } = await canSendOtp();
      return data.data;
    },
    retry: false,
  });
