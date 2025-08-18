import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

dayjs.extend(isSameOrBefore);
import {
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
      .required(t('VALIDATE.PHONE_REQUIRED') as string)
      .matches(/^\S+$/, t('VALIDATE.NOT_ALLOW_SPACE', { field: t('PROFILE.PHONE') }) as string)
      .test('no-leading-zero-after-84', t('VALIDATE.NO_LEADING_ZERO') as string, function (value) {
        if (!value) return true;
        const normalized = value.replace(/[\s()-]/g, '');
        if (normalized.startsWith('+84')) {
          return !/^(\+84)0/.test(normalized);
        }
        return true;
      })
      .test(
        'exactly-9-digits-after-84',
        t('VALIDATE.PHONE_MUST_BE_9_DIGITS') as string,
        function (value) {
          if (!value) return true;
          const normalized = value.replace(/[\s()-]/g, '');
          if (normalized.startsWith('+84')) {
            return /^\+84[1-9]\d{8}$/.test(normalized);
          }
          return true;
        },
      )
      .test(
        'valid-international-format',
        t('VALIDATE.INVALID', { field: t('PROFILE.PHONE') }) as string,
        function (value) {
          if (!value) return false;
          const normalized = value.replace(/[\s()-]/g, '');

          if (normalized.startsWith('+84')) {
            return true;
          }
          return /^\+\d{1,6}\d{6,14}$/.test(normalized);
        },
      ),

    dob: yup
      .mixed()
      .nullable()
      .test('is-valid-date', t('VALIDATE.DATE_NOT_FUTURE') as string, (value) => {
        if (!value) return true;
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

    isStudent: yup.boolean().required(),

    university: yup
      .string()
      .required(t<string>('VALIDATE.USER_UNIVERSITY_REQUIRED'))
      .matches(NO_SPACE_START_END, t('VALIDATE.NO_SPACE_START_END') as string)
      .matches(NO_TWO_SPACE, t('VALIDATE.NO_TWO_SPACE') as string)
      .matches(
        /^[A-Za-z0-9]+$/,
        t('VALIDATE.SPESIAL_CHARACTERS', { field: t('PROFILE.SCHOOL_LABEL') }) as string,
      )
      .max(
        255,
        t('VALIDATE.MAX_CHARACTER', { field: t('PROFILE.SCHOOL_LABEL'), number: 255 }) as string,
      ),

    studentCode: yup
      .string()
      .required(t<string>('VALIDATE.USER_STUDENT_CODE_REQUIRED'))
      .matches(NO_SPACE_START_END, t('VALIDATE.NO_SPACE_START_END') as string)
      .matches(
        /^[A-Za-z0-9]+$/,
        t('VALIDATE.SPESIAL_CHARACTERS', { field: t('PROFILE.STUDENT_ID_LABEL') }) as string,
      )
      .max(
        50,
        t('VALIDATE.MAX_CHARACTER', { field: t('PROFILE.STUDENT_ID_LABEL'), number: 50 }) as string,
      ),
  });
};
