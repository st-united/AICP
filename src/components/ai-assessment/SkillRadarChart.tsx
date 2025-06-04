import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

interface ChartDataItem {
  skill: string;
  value: number;
  fullMark: number;
}

interface SkillRadarChartProps {
  data: ChartDataItem[];
  averageScore: number;
}

const SkillRadarChart: React.FC<SkillRadarChartProps> = ({ data, averageScore }) => {
  // Transform data for Recharts
  const chartData = data.map((item) => ({
    subject: item.skill,
    A: item.value,
    fullMark: item.fullMark,
  }));

  return (
    <div className='flex justify-center'>
      <div className='w-full max-w-sm sm:max-w-md h-64 sm:h-80 relative'>
        <ResponsiveContainer width='100%' height='100%'>
          <RadarChart data={chartData}>
            <PolarGrid stroke='#e5e7eb' />
            <PolarAngleAxis
              dataKey='subject'
              tick={{ fontSize: 10, fill: '#374151' }}
              className='text-xs sm:text-sm'
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fontSize: 8, fill: '#9ca3af' }}
              tickCount={6}
            />
            <Radar
              name='Skill Level'
              dataKey='A'
              stroke='#f97316'
              fill='rgba(249, 115, 22, 0.3)'
              strokeWidth={2}
              dot={{ fill: '#f97316', strokeWidth: 2, r: 3 }}
            />
          </RadarChart>
        </ResponsiveContainer>

        {/* Center score indicator */}
        <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
          <div className='w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-full flex items-center justify-center'>
            <span className='text-xs sm:text-sm font-bold text-orange-600'>{averageScore}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillRadarChart;
