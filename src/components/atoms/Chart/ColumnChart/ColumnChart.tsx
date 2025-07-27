import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import { Aspect } from '@app/interface/user.interface';

interface ColumnChartProps {
  barChartData: { label: string; value: number; name: string }[];
}

const ColumnChart = ({ barChartData }: ColumnChartProps) => {
  return (
    <ResponsiveContainer width='100%' height='100%' className='w-full h-full aspect-[3/1]'>
      <BarChart data={barChartData}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='label' tick={{ fontSize: 12 }} />
        <YAxis allowDecimals={false} domain={[0, 8]} tick={{ fontSize: 12 }} />
        <Bar dataKey='value' fill='#4285F4' barSize={24} />
        <Tooltip
          wrapperStyle={{ fontSize: '12px' }}
          formatter={(_value, _name, { payload = {} } = {}) => [
            `${payload.value ?? ''}`,
            payload.name ?? '',
          ]}
          labelFormatter={(label) => label}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ColumnChart;
