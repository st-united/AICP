import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
  Tooltip,
} from 'recharts';

interface ColumnChartProps {
  data: any;
  title?: string;
}

const CompetencyChart = ({ data }: ColumnChartProps) => {
  return (
    <div className='h-96'>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id='colorScore' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#3b82f6' stopOpacity={0.8} />
              <stop offset='95%' stopColor='#3b82f6' stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray='3 3' stroke='#e0e4e7' vertical={false} />
          <XAxis dataKey='code' tick={{ fontSize: 12, fill: '#6b7280' }} interval={0} angle={-0} />
          <YAxis
            tick={{ fontSize: 12, fill: '#6b7280' }}
            domain={[0, 7]}
            ticks={[0, 1, 2, 3, 4, 5, 6, 7]}
          />

          <Tooltip
            cursor={{ fill: '#f3f4f6' }}
            contentStyle={{ fontSize: '12px', borderRadius: '8px' }}
            formatter={(value: number) => [`${value} điểm`, 'Điểm']}
            labelFormatter={(label: string) => `Mã: ${label}`}
          />
          <Bar
            dataKey='score'
            fill='url(#colorScore)'
            radius={[4, 4, 0, 0]}
            label={{ position: 'top', fill: '#374151', fontSize: 12 }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CompetencyChart;
