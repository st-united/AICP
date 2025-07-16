import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

dayjs.extend(isSameOrBefore);
import {
  PHONE_REGEX_PATTERN,
  EMAIL_REGEX_PATTERN,
  NO_SPECIAL_CHARACTER_IN_NAME,
  NO_SPACE_START_END,
  NO_TWO_SPACE,
} from '@app/constants/regex';
const MIN_AGE = 15;
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

    phoneNumber: yup
      .string()
      .nullable()
      .trim()
      .test(
        'is-valid-phone',
        t('VALIDATE.INVALID', { field: t('PROFILE.PHONE') }) as string,
        (value) => {
          if (!value) return true; // cho phép null hoặc rỗng
          return PHONE_REGEX_PATTERN.test(value);
        },
      ),

    dob: yup
      .mixed()
      .nullable()
      .test('is-valid-date', t('VALIDATE.DATE_NOT_FUTURE') as string, (value) => {
        if (!value) return true; // cho phép null
        const date = dayjs(value).startOf('day');
        return date.isValid() && date.isSameOrBefore(dayjs().startOf('day'));
      })
      .test('is-min-age', t('VALIDATE.MIN_AGE', { age: MIN_AGE }) as string, (value) => {
        if (!value) return true;
        const date = dayjs(value).startOf('day');
        const minDate = dayjs().subtract(MIN_AGE, 'year').startOf('day');
        return date.isSameOrBefore(minDate);
      }),

    country: yup.string().nullable(),

    province: yup.string().nullable(),

    job: yup.array().of(yup.string()).nullable(),

    referralCode: yup.string().nullable(),
  });
};
