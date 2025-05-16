import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { PASSWORD_REGEX_PATTERN } from '@app/constants/regex';

export const useResetPasswordSchema = () => {
  const { t } = useTranslation();

  return yup.object().shape({
    password: yup
      .string()
      .required(t<string>('VALIDATE.REQUIRED', { field: 'Password' }))
      .matches(PASSWORD_REGEX_PATTERN, t<string>('VALIDATE.RULE_PASSWORD', { field: 'Password' })),
  });
};
