import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

export const usePortfolioSchema = () => {
  const { t } = useTranslation();

  return yup.object().shape({
    linkedInUrl: yup
      .string()
      .url(t('VALIDATE.URL_INVALID') as string)
      .nullable(),
    githubUrl: yup
      .string()
      .url(t('VALIDATE.URL_INVALID') as string)
      .nullable(),
    foundationalCertifications: yup
      .array()
      .of(
        yup.mixed().test('fileType', t('VALIDATE.IMAGE_ONLY') as string, (file) => {
          if (!file) return false;
          if (file.originFileObj) {
            return file.originFileObj.type.startsWith('image/');
          }
          return false;
        }),
      )
      .min(1, t('VALIDATE.CERT_REQUIRED') as string),
    intermediateCertifications: yup
      .array()
      .of(
        yup.mixed().test('fileType', t('VALIDATE.IMAGE_ONLY') as string, (file) => {
          if (!file) return false;
          if (file.originFileObj) {
            return file.originFileObj.type.startsWith('image/');
          }
          return false;
        }),
      )
      .min(1, t('VALIDATE.CERT_REQUIRED') as string),
    advancedCertifications: yup
      .array()
      .of(
        yup.mixed().test('fileType', t('VALIDATE.IMAGE_ONLY') as string, (file) => {
          if (!file) return false;
          if (file.originFileObj) {
            return file.originFileObj.type.startsWith('image/');
          }
          return false;
        }),
      )
      .min(1, t('VALIDATE.CERT_REQUIRED') as string),
  });
};
