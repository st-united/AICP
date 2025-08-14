import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { PASSWORD_REGEX_PATTERN_WITHOUT_NUMBER_LIMIT_AND_SPECIAL_CHARACTER } from '@app/constants/regex';

export const useChangePasswordSchema = () => {
  const { t } = useTranslation();

  return yup.object().shape({
    oldPassword: yup
      .string()
      .required(t('VALIDATE.REQUIRED', { field: t('PROFILE.OLD_PASSWORD') }) as string),

    newPassword: yup
      .string()
      .required(t('VALIDATE.REQUIRED', { field: t('PROFILE.NEW_PASSWORD') }) as string)
      .test(
        'no-spaces',
        t('VALIDATE.PASSWORD_NO_SPACE') as string, // tạo key trong i18n cho message này
        (value) => !value || /^\S+$/.test(value),
      )
      .min(8, t('VALIDATE.PASSWORD_MIN', { field: t('PROFILE.NEW_PASSWORD'), min: 8 }) as string)
      .max(50, t('VALIDATE.PASSWORD_MAX', { field: t('PROFILE.NEW_PASSWORD'), max: 50 }) as string)
      .test(
        'complexity',
        t('VALIDATE.PASSWORD_COMPLEXITY') as string,
        (value) =>
          !value || PASSWORD_REGEX_PATTERN_WITHOUT_NUMBER_LIMIT_AND_SPECIAL_CHARACTER.test(value),
      )
      .test('not-same-as-old', t('VALIDATE.NEW_PASSWORD_DIFFERENT') as string, function (value) {
        const { oldPassword } = this.parent;
        return !value || !oldPassword || value !== oldPassword;
      }),

    confirmPassword: yup
      .string()
      .required(t('VALIDATE.REQUIRED', { field: t('PROFILE.CONFIRM_PASSWORD') }) as string)
      .test(
        'complexity',
        t('VALIDATE.PASSWORD_COMPLEXITY') as string,
        (value) =>
          !value || PASSWORD_REGEX_PATTERN_WITHOUT_NUMBER_LIMIT_AND_SPECIAL_CHARACTER.test(value),
      )
      .oneOf([yup.ref('newPassword')], t('VALIDATE.PASSWORD_MATCH') as string),
  });
};
