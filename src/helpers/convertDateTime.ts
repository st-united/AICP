import dayjs from 'dayjs';
import 'dayjs/locale/vi'; // Import locale tiếng Việt

export const capitalizeWords = (str: string) => {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toLocaleUpperCase('vi') + word.slice(1))
    .join(' ');
};

export const convertTimeBooking = (key: string, dateStr: string) => {
  const formatted = dayjs(dateStr).locale('vi').format('dddd DD/MM/YYYY');
  const [period, startRaw] = key.split('_');
  let hour = parseInt(startRaw, 10);

  if (period === 'PM' && hour !== 12) {
    hour += 12;
  } else if (period === 'AM' && hour === 12) {
    hour = 0;
  }

  return `${hour.toString().padStart(2, '0')}:00 , ${capitalizeWords(formatted)}`;
};
