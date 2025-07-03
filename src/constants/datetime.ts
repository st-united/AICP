import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(customParseFormat);
dayjs.extend(updateLocale);

// Cập nhật lại locale 'vi' để hiển thị SA/CH thay vì am/pm
dayjs.updateLocale('vi', {
  meridiem: (hour: number) => (hour < 12 ? 'SA' : 'CH'),
});

export const DATE_TIME = {
  YEAR_MONTH_DATE: 'YYYY-MM-DD',
  DAY_MONTH_YEAR: 'DD/MM/YYYY',
  DAY_MONTH_YEAR_TIME: 'DD/MM/YYYY HH:mm:ss',
  YEAR: 'YYYY',
  FULL_YEAR_MONTH_DATE_TIME: 'YYYY-MM-DD HH:mm:ss.SSS',
  TIME_HH_MM_SS: 'HH:mm:ss',
  TIME_HH_MM: 'HH:mm',
  YEAR_MONTH_DATE_TIME: 'YYYY-MM-DD HH:mm:ss',
  WEEKDAY_DAY_MONTH_YEAR_TIME: 'dddd, DD/MM/YYYY - hh:mm A',
};
