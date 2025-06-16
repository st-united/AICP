import { CalendarOutlined } from '@ant-design/icons';
import { DatePicker } from 'antd';
import { useTranslation } from 'react-i18next';

import { DATE_TIME } from '@app/constants';
import type { Dayjs } from 'dayjs';

interface DateFilterProps {
  onDateChange: (dates: [Dayjs | null, Dayjs | null] | null) => void;
  value?: [Dayjs | null, Dayjs | null] | null;
}

const DateFilter = ({ onDateChange, value }: DateFilterProps) => {
  const { t } = useTranslation();

  const [startDate, endDate] = value || [null, null];

  const handleStartChange = (date: Dayjs | null) => {
    onDateChange([date, endDate]);
  };

  const handleEndChange = (date: Dayjs | null) => {
    onDateChange([startDate, date]);
  };

  return (
    <div className='relative p-4 md:p-6 shadow-sm bg-white rounded-xl md:rounded-2xl hover:shadow-md transition-shadow duration-200'>
      <div className='flex flex-col md:flex-row gap-3'>
        <DatePicker
          placeholder={t<string>('EXAM.DATE_FILTER_START')}
          className='w-full text-sm md:text-base rounded-lg border-gray-300 py-2 md:py-3 px-3 md:px-4'
          suffixIcon={<CalendarOutlined className='text-gray-400' />}
          onChange={handleStartChange}
          value={startDate}
          format={DATE_TIME.DAY_MONTH_YEAR}
        />
        <DatePicker
          placeholder={t<string>('EXAM.DATE_FILTER_END')}
          className='w-full text-sm md:text-base rounded-lg border-gray-300 py-2 md:py-3 px-3 md:px-4'
          suffixIcon={<CalendarOutlined className='text-gray-400' />}
          onChange={handleEndChange}
          value={endDate}
          format={DATE_TIME.DAY_MONTH_YEAR}
        />
      </div>
    </div>
  );
};

export default DateFilter;
