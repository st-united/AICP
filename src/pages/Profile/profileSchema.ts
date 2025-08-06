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
      .matches(
        /^\S(?:.*\S)?$/,
        t('VALIDATE.NOT_ALLOW_SPACE', { field: t('PROFILE.PHONE') }) as string,
      )
      .matches(/^(?!\s*$).+/, t('VALIDATE.PHONE_REQUIRED') as string)
      .test(
        'valid-phone',
        t('VALIDATE.INVALID', { field: t('PROFILE.PHONE') }) as string,
        function (value) {
          if (!value) return false;

          // Chuẩn hóa giá trị để kiểm tra
          const normalized = value.replace(/[\s()-]/g, '').replace(/^\(\+(\d{1,6})\)/, '+$1');

          // Kiểm tra mã quốc gia +84 (phải có đúng 9 chữ số)
          if (normalized.startsWith('+84') || normalized.startsWith('(+84)')) {
            return /^(\(\+84\)|\+84)\d{9}$/.test(value);
          }

          // Các mã quốc gia khác: 6-14 chữ số
          return /^(\(\+\d{1,6}\)|\+\d{1,6})\d{6,14}$/.test(value);
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
      .matches(NO_TWO_SPACE, t('VALIDATE.NO_TWO_SPACE') as string),

    studentCode: yup
      .string()
      .required(t<string>('VALIDATE.USER_STUDENT_CODE_REQUIRED'))
      .matches(NO_SPACE_START_END, t('VALIDATE.NO_SPACE_START_END') as string),
  });
};
