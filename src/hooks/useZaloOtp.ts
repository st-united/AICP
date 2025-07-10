import { useMutation, useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '@app/constants/requestReactQuery';
import { CallingCode } from '@app/interface/callingCode.interface';
import { sendOtp, verifyOtp, checkOtpStatus, callingCode } from '@app/services';

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

export const useCheckOtpStatus = () =>
  useQuery({
    queryKey: [QUERY_KEY.ZALO_OTP_CHECK_STATUS],
    queryFn: async () => {
      const { data } = await checkOtpStatus();
      return data;
    },
    retry: false,
  });
export const useCallingCode = () =>
  useQuery<CallingCode[]>({
    queryKey: [QUERY_KEY.ZALO_OTP_COUNTRY_CODE],
    queryFn: async () => {
      const { data } = await callingCode();
      return data;
    },
  });
