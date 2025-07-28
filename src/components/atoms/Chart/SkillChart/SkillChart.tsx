import { useTranslation } from 'react-i18next';
import {
  Radar,
  PolarRadiusAxis,
  PolarAngleAxis,
  PolarGrid,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

interface SkillChartProps {
  chartData: { skill: string; value: number | undefined }[];
}

const SkillChart = ({ chartData }: SkillChartProps) => {
  const { t } = useTranslation();
  return (
    <ResponsiveContainer width='100%' height='100%' className='w-full h-full aspect-video'>
      <RadarChart data={chartData}>
        <PolarGrid stroke='#e5e7eb' />
        <PolarAngleAxis dataKey='skill' tick={{ fontSize: 16, fill: '#374151' }} tickLine={false} />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 7]}
          tick={{ fontSize: 10, fill: '#9ca3af' }}
          tickCount={8}
          axisLine={false}
          tickLine={false}
        />
        <Radar
          name={t('TEST_RESULT.SCORE_LABEL') || ''}
          dataKey='value'
          stroke='#fe7743'
          fill='#fe774366'
          strokeWidth={2}
          dot={{ r: 2, fill: '#fe7743' }}
        />
        <Tooltip
          wrapperStyle={{ fontSize: '12px' }}
          formatter={(value: number) => [`${value}/7`, t('TEST_RESULT.SCORE_LABEL')]}
        />
        <Legend wrapperStyle={{ fontSize: '12px' }} />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default SkillChart;
