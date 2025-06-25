import { CalendarOutlined } from '@ant-design/icons';
import { DatePicker, Form } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ValidationError } from 'yup';

import { useDateFilterSchema } from './useDateFilterSchema';
import { DATE_TIME } from '@app/constants';

interface DateFilterProps {
  onDateChange: (dates: [Dayjs | null, Dayjs | null] | null) => void;
  value?: [Dayjs | null, Dayjs | null] | null;
}

const disabledFutureDate = (current: Dayjs) => {
  return current && current > dayjs().endOf('day');
};

const DateFilter = ({ onDateChange, value }: DateFilterProps) => {
  const { t } = useTranslation();
  const [startDate, endDate] = value || [null, null];
  const schema = useDateFilterSchema();

  const [errorStart, setErrorStart] = useState<string | null>(null);
  const [errorEnd, setErrorEnd] = useState<string | null>(null);

  const validate = (dateRange: [Dayjs | null, Dayjs | null]) => {
    try {
      schema.validateSync({ dateRange });
      setErrorStart(null);
      setErrorEnd(null);
      return true;
    } catch (err) {
      if (err instanceof ValidationError) {
        const [start, end] = dateRange;
        if (!start || (start && end && start.isAfter(end))) {
          setErrorStart(err.message);
          setErrorEnd(null);
        } else if (!end || (end && end.isAfter(dayjs()))) {
          setErrorStart(null);
          setErrorEnd(err.message);
        } else {
          setErrorStart(err.message);
          setErrorEnd(null);
        }
      }
      return false;
    }
  };

  const handleStartChange = (date: Dayjs | null) => {
    const isValid = validate([date, endDate]);
    if (isValid) {
      onDateChange([date, endDate]);
    }
  };

  const handleEndChange = (date: Dayjs | null) => {
    const isValid = validate([startDate, date]);
    if (isValid) {
      onDateChange([startDate, date]);
    }
  };

  return (
    <div className='relative p-4 md:p-6 shadow-sm bg-white rounded-xl md:rounded-2xl hover:shadow-md transition-shadow duration-200'>
      <div className='flex flex-col md:flex-row gap-3'>
        <Form.Item
          validateStatus={errorStart ? 'error' : ''}
          help={errorStart}
          className='w-full m-0'
        >
          <DatePicker
            placeholder={t<string>('EXAM.DATE_FILTER_START')}
            className='w-full text-sm md:text-base rounded-lg border-gray-300 py-2 md:py-3 px-3 md:px-4'
            suffixIcon={<CalendarOutlined className='text-gray-400' />}
            onChange={handleStartChange}
            value={startDate}
            format={DATE_TIME.DAY_MONTH_YEAR}
            disabledDate={disabledFutureDate}
          />
        </Form.Item>
        <Form.Item validateStatus={errorEnd ? 'error' : ''} help={errorEnd} className='w-full m-0'>
          <DatePicker
            placeholder={t<string>('EXAM.DATE_FILTER_END')}
            className='w-full text-sm md:text-base rounded-lg border-gray-300 py-2 md:py-3 px-3 md:px-4'
            suffixIcon={<CalendarOutlined className='text-gray-400' />}
            onChange={handleEndChange}
            value={endDate}
            format={DATE_TIME.DAY_MONTH_YEAR}
            disabledDate={disabledFutureDate}
          />
        </Form.Item>
      </div>
    </div>
  );
};

export default DateFilter;
