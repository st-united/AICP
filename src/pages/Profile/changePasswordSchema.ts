import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import {
  NUMBER_LENGTH_REGEX,
  PASSWORD_REGEX_PATTERN_WITHOUT_NUMBER_LIMIT_AND_SPECIAL_CHARACTER,
} from '@app/constants/regex';

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
        'length',
        t('VALIDATE.PASSWORD_MIN') as string,
        (value) => !value || NUMBER_LENGTH_REGEX.test(value),
      )
      .test(
        'complexity',
        t('VALIDATE.PASSWORD_COMPLEXITY') as string,
        (value) =>
          !value || PASSWORD_REGEX_PATTERN_WITHOUT_NUMBER_LIMIT_AND_SPECIAL_CHARACTER.test(value),
      ),

    confirmPassword: yup
      .string()
      .required(t('VALIDATE.REQUIRED', { field: t('PROFILE.CONFIRM_PASSWORD') }) as string)
      .test(
        'length',
        t('VALIDATE.PASSWORD_MIN') as string,
        (value) => !value || NUMBER_LENGTH_REGEX.test(value),
      )
      .test(
        'complexity',
        t('VALIDATE.PASSWORD_COMPLEXITY') as string,
        (value) =>
          !value || PASSWORD_REGEX_PATTERN_WITHOUT_NUMBER_LIMIT_AND_SPECIAL_CHARACTER.test(value),
      ),
  });
};
