import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { EMAIL_REGEX_PATTERN } from '@app/constants/regex';

export const useSignInSchema = () => {
  const { t } = useTranslation();

  return yup.object().shape({
    email: yup
      .string()
      .required(t('LOGIN.EMAIL_REQUIRED') as string)
      .matches(EMAIL_REGEX_PATTERN, t('LOGIN.EMAIL_INVALID') as string),

    password: yup.string().required(t('LOGIN.PASSWORD_REQUIRED') as string),
  });
};
