import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { EMAIL_REGEX_PATTERN } from '@app/constants/regex';

export const useForgotPasswordSchema = () => {
  const { t } = useTranslation();

  return yup.object().shape({
    email: yup
      .string()
      .required(t<string>('VALIDATE.REQUIRED', { field: 'Email' }))
      .matches(EMAIL_REGEX_PATTERN, t<string>('FORGOT_PASSWORD.EMAIL_VALID', { field: 'Email' })),
  });
};
