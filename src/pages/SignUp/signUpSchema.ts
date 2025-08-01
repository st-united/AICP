import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import {
  EMAIL_REGEX_PATTERN,
  PHONE_REGEX_PATTERN,
  NO_SPECIAL_CHARACTER_IN_NAME,
  PASSWORD_REGEX_PATTERN_WITHOUT_NUMBER_LIMIT_AND_SPECIAL_CHARACTER,
  DIAL_CODE_REGEX_PATTERN,
} from '@app/constants/regex';

export const useSignUpSchema = () => {
  const { t } = useTranslation();

  return yup.object().shape({
    fullName: yup
      .string()
      .required(t('VALIDATE.FULL_NAME_REQUIRED') as string)
      .min(5, t('VALIDATE.MIN_CHARACTER', { field: t('SIGN_UP.FULL_NAME'), length: 5 }) as string)
      .matches(
        NO_SPECIAL_CHARACTER_IN_NAME,
        t('VALIDATE.ONLY_ALPHABET', { field: t('SIGN_UP.FULL_NAME') }) as string,
      ),

    phoneNumber: yup
      .string()
      .required(t('VALIDATE.PHONE_REQUIRED') as string)
      .trim()
      .test('is-have-phone', t('VALIDATE.PHONE_REQUIRED') as string, (value) => {
        if (!value || value.trim().length === 0 || value.trim() === '') return true;
        const dialCodeMatch = value.match(DIAL_CODE_REGEX_PATTERN);
        if (dialCodeMatch && value === dialCodeMatch[0]) return false;
        return true;
      })
      .test(
        'is-valid-phone',
        t('VALIDATE.INVALID', { field: t('PROFILE.PHONE') }) as string,
        (value) => {
          if (!value) return true;
          return PHONE_REGEX_PATTERN.test(value);
        },
      ),

    email: yup
      .string()
      .required(t('VALIDATE.EMAIL_REQUIRED') as string)
      .matches(EMAIL_REGEX_PATTERN, t('VALIDATE.EMAIL_INVALID') as string),

    password: yup
      .string()
      .required(t('VALIDATE.PASSWORD_REQUIRED') as string)
      .min(8, t('VALIDATE.PASSWORD_MIN') as string)
      .max(50, t('VALIDATE.PASSWORD_MAX') as string)
      .matches(
        PASSWORD_REGEX_PATTERN_WITHOUT_NUMBER_LIMIT_AND_SPECIAL_CHARACTER,
        t('VALIDATE.PASSWORD_COMPLEXITY') as string,
      ),

    confirm_password: yup.string().required(t('VALIDATE.CONFIRM_PASSWORD_REQUIRED') as string),
  });
};
