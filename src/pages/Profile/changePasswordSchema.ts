import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { PASSWORD_REGEX_PATTERN_WITHOUT_NUMBER_LIMIT_AND_SPECIAL_CHARACTER } from '@app/constants/regex';

export const useChangePasswordSchema = () => {
  const { t } = useTranslation();

  const basePasswordTest = (field: string) =>
    yup
      .string()
      .required(t('VALIDATE.REQUIRED', { field: t(field) }) as string)
      // 1️⃣ Không cho phép khoảng trắng
      .test(
        'no-spaces',
        t('VALIDATE.PASSWORD_NO_SPACE') as string,
        (value) => !/\s/.test(value || ''),
      )
      .test(
        'length',
        t('VALIDATE.MIN_MAX', { min: 8, max: 50 }) as string,
        (value) => !value || (value.length >= 8 && value.length <= 50),
      )
      .test(
        'complexity',
        t('VALIDATE.PASSWORD_COMPLEXITY') as string,
        (value) =>
          !value || PASSWORD_REGEX_PATTERN_WITHOUT_NUMBER_LIMIT_AND_SPECIAL_CHARACTER.test(value),
      );

  return yup.object().shape({
    oldPassword: basePasswordTest('PROFILE.OLD_PASSWORD'),

    newPassword: basePasswordTest('PROFILE.NEW_PASSWORD'),

    confirmPassword: basePasswordTest('PROFILE.CONFIRM_PASSWORD').oneOf(
      [yup.ref('newPassword')],
      t('VALIDATE.PASSWORD_NOT_MATCH') as string,
    ),
  });
};
