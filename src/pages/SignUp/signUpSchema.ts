import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import {
  EMAIL_REGEX_PATTERN,
  PHONE_REGEX_PATTERN,
  NO_SPECIAL_CHARACTER_IN_NAME,
  DIAL_CODE_REGEX_PATTERN,
  NO_SPACE_START_END,
  NO_TWO_SPACE,
} from '@app/constants/regex';

export const useSignUpSchema = () => {
  const { t } = useTranslation();

  return yup.object().shape({
    fullName: yup
      .string()
      .required(t('VALIDATE.FULL_NAME_REQUIRED') as string)
      .matches(
        NO_SPECIAL_CHARACTER_IN_NAME,
        t('VALIDATE.ONLY_ALPHABET', { field: t('PROFILE.FULLNAME') }) as string,
      )
      .matches(
        NO_SPACE_START_END,
        t('VALIDATE.NO_SPACE_START_END', { field: t('PROFILE.FULLNAME') }) as string,
      )
      .matches(
        NO_TWO_SPACE,
        t('VALIDATE.NO_TWO_SPACE', { field: t('PROFILE.FULLNAME') }) as string,
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
      .test(
        'no-whitespace-anywhere',
        t('VALIDATE.PASSWORD_NO_SPACE') as string,
        (value) => !/\s/.test(value || ''),
      )
      .required(t('VALIDATE.PASSWORD_REQUIRED') as string)
      .min(8, t('VALIDATE.PASSWORD_MIN') as string)
      .max(50, t('VALIDATE.PASSWORD_MAX') as string)
      .test('has-lowercase', t('VALIDATE.PASSWORD_NEED_LOWERCASE') as string, (value) =>
        /[a-z]/.test(value || ''),
      )
      .test('has-uppercase', t('VALIDATE.PASSWORD_NEED_UPPERCASE') as string, (value) =>
        /[A-Z]/.test(value || ''),
      )
      .test('has-number', t('VALIDATE.PASSWORD_NEED_NUMBER') as string, (value) =>
        /[0-9]/.test(value || ''),
      ),

    confirm_password: yup.string().required(t('VALIDATE.CONFIRM_PASSWORD_REQUIRED') as string),
  });
};
