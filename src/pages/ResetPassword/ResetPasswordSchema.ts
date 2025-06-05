import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { PASSWORD_REGEX_PATTERN } from '@app/constants/regex';

export const useResetPasswordSchema = () => {
  const { t } = useTranslation();

  return yup.object().shape({
    password: yup
      .string()
      .required(t<string>('RESET_PASSWORD.REQUIRE_PASSWORD'))
      .matches(PASSWORD_REGEX_PATTERN, t<string>('RESET_PASSWORD.REGEX_PASSWORD')),
  });
};
