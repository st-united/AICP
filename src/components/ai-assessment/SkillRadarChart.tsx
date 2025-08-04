import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';

export interface ChartDataItem {
  skill: string;
  value: number;
}

interface CustomTickProps {
  x: number;
  y: number;
  textAnchor?: string;
  payload: {
    value: string;
  };
}

interface SkillRadarChartProps {
  data: ChartDataItem[];
}

const SkillRadarChart = ({ data }: SkillRadarChartProps) => {
  const chartData = data.map((item) => ({
    pilar: item.skill,
    score: item.value,
  }));
  const CustomTick: React.FC<CustomTickProps> = ({ payload, x, y, textAnchor }) => {
    let adjustedY = y;
    let adjustedX = x;

    if (window.innerWidth < 420 && ['Skillset', 'Toolset'].includes(payload.value)) {
      adjustedY = y + 20;
      if (payload.value === 'Toolset') {
        adjustedX = x + 15;
      }
      if (payload.value === 'Skillset') {
        adjustedX = x - 15;
      }
    }

    return (
      <text x={adjustedX} y={adjustedY} textAnchor={textAnchor} fill='#374151' fontSize={12}>
        {payload.value}
      </text>
    );
  };
  return (
    <div className='flex justify-center'>
      <div className='w-full max-w-sm sm:max-w-md h-64 sm:h-80 relative'>
        <ResponsiveContainer width='100%' height='100%'>
          <RadarChart data={chartData}>
            <PolarGrid stroke='#e5e7eb' />
            <PolarAngleAxis
              dataKey='pilar'
              tick={(props) => <CustomTick {...props} />}
              tickLine={false}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 7]}
              tick={{ fontSize: 10, fill: '#9ca3af' }}
              tickCount={5}
              axisLine={false}
              tickLine={false}
            />
            <Radar
              name='Score'
              dataKey='score'
              stroke='#f97316'
              fill='#f9731666'
              strokeWidth={2}
              dot={{ r: 3, fill: '#f97316' }}
            />
            <Tooltip
              wrapperStyle={{ fontSize: '12px' }}
              formatter={(value: number) => [`${value}`, 'Score']}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SkillRadarChart;
