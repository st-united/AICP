import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import dayjs, { Dayjs } from 'dayjs';

export const useDateFilterSchema = () => {
  const { t } = useTranslation();

  return yup.object().shape({
    dateRange: yup
      .array()
      .of(yup.mixed<Dayjs | null>().nullable())
      .length(2)
      .test('valid-range', t('VALIDATE.INVALID_DATE_RANGE') as string, (value) => {
        const [start, end] = value || [];
        if (!start || !end) return true;
        return !start.isAfter(end);
      })
      .test('no-future-date', t('VALIDATE.NO_FUTURE_DATE') as string, (value) => {
        const [start, end] = value || [];
        const now = dayjs().endOf('day');
        if (start && start.isAfter(now)) return false;
        if (end && end.isAfter(now)) return false;
        return true;
      }),
  });
};
