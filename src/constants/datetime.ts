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
  WEEKDAY_DAY: 'dddd, DD/MM/YYYY',
  WEEKDAY_TIME: 'hh:mm A',
};

export const getTimeRangeLabel = (slot: string): string => {
  const mapping: Record<string, [string, string]> = {
    AM_08_09: ['08:00', '09:00'],
    AM_09_10: ['09:00', '10:00'],
    AM_10_11: ['10:00', '11:00'],
    AM_11_12: ['11:00', '12:00'],
    PM_02_03: ['14:00', '15:00'],
    PM_03_04: ['15:00', '16:00'],
    PM_04_05: ['16:00', '17:00'],
    PM_05_06: ['17:00', '18:00'],
  };

  const [start, end] = mapping[slot] || ['--:--', '--:--'];
  const startFormatted = dayjs(start, 'HH:mm').locale('vi').format('HH:mm A');
  const endFormatted = dayjs(end, 'HH:mm').locale('vi').format('HH:mm A');

  return `${startFormatted} - ${endFormatted}`;
};
