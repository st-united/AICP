import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

export const useSignUpSchema = () => {
  const { t } = useTranslation();

  return yup.object().shape({
    fullName: yup.string().required(t('VALIDATE.FULL_NAME_REQUIRED') as string),

    phoneNumber: yup
      .string()
      .required(t('VALIDATE.PHONE_REQUIRED') as string)
      .matches(/^\+?[0-9]{7,15}$/, t('VALIDATE.PHONE_INVALID') as string),

    email: yup
      .string()
      .required(t('VALIDATE.EMAIL_REQUIRED') as string)
      .email(t('VALIDATE.EMAIL_INVALID') as string),

    password: yup
      .string()
      .required(t('VALIDATE.PASSWORD_REQUIRED') as string)
      .min(8, t('VALIDATE.PASSWORD_MIN') as string)
      .max(50, t('VALIDATE.PASSWORD_MAX') as string)
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, t('VALIDATE.PASSWORD_COMPLEXITY') as string),

    confirm_password: yup.string().required(t('VALIDATE.CONFIRM_PASSWORD_REQUIRED') as string),
  });
};
