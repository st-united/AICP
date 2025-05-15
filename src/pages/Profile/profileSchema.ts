import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import {
  PHONE_REGEX_PATTERN,
  EMAIL_REGEX_PATTERN,
  NO_SPECIAL_CHARACTER_IN_NAME,
  NO_SPACE_START_END,
  NO_TWO_SPACE,
} from '@app/constants/regex';

export const useProfileSchema = () => {
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

    phone: yup
      .string()
      .required(t('VALIDATE.PHONE_REQUIRED') as string)
      .matches(PHONE_REGEX_PATTERN, t('VALIDATE.INVALID', { field: t('PROFILE.PHONE') }) as string),

    dob: yup
      .date()
      .nullable()
      .max(new Date(), t('VALIDATE.DATE_NOT_FUTURE') as string),

    country: yup.string().nullable(),

    province: yup.string().nullable(),

    occupation: yup.string().nullable(),

    referral: yup.string().nullable(),
  });
};
