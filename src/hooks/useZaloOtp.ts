import { useMutation, useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '@app/constants/requestReactQuery';
import { sendOtp, verifyOtp, checkOtpStatus } from '@app/services';

export const useSendOtp = () =>
  useMutation({
    mutationKey: [QUERY_KEY.ZALO_OTP_SEND_OTP],
    mutationFn: (phone: string) => sendOtp(phone),
  });

export const useVerifyOtp = () =>
  useMutation({
    mutationKey: [QUERY_KEY.ZALO_OTP_VERIFY],
    mutationFn: (data: { phone: string; otp: string }) => verifyOtp(data),
  });

export const useCheckOtpStatus = (phone: string) =>
  useQuery({
    queryKey: [QUERY_KEY.ZALO_OTP_CHECK_STATUS, phone],
    queryFn: async () => {
      const { data } = await checkOtpStatus(phone);
      return data;
    },
    enabled: !!phone,
    retry: false,
  });
