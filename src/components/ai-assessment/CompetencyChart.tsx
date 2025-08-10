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
    <div className='h-80 sm:h-96 mt-6'>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id='colorScore' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#3b82f6' stopOpacity={0.8} />
              <stop offset='95%' stopColor='#3b82f6' stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray='3 3' stroke='#e0e4e7' vertical={false} />
          <XAxis
            dataKey='code'
            tick={{ fontSize: 10, fill: '#6b7280' }}
            interval={0}
            angle={-45}
            textAnchor='end'
            height={60}
          />
          <YAxis
            tick={{ fontSize: 10, fill: '#6b7280' }}
            domain={[0, 7]}
            ticks={[0, 1, 2, 3, 4, 5, 6, 7]}
            width={30}
          />

          <Tooltip
            cursor={{ fill: '#f3f4f6' }}
            contentStyle={{
              fontSize: '11px',
              borderRadius: '8px',
              padding: '8px',
              maxWidth: '200px',
              wordWrap: 'break-word',
              whiteSpace: 'normal',
            }}
            formatter={(value: number) => [`${value} điểm`, 'Điểm số']}
            labelFormatter={(label: string, payload: any[]) => {
              const item = payload?.[0]?.payload;
              // eslint-disable-next-line react/prop-types
              return item?.name ? `${item.name}` : `Mã: ${label}`;
            }}
          />
          <Bar dataKey='score' fill='url(#colorScore)' radius={[2, 2, 0, 0]} maxBarSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CompetencyChart;
