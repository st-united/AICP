import { t } from 'i18next';
import React from 'react';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from 'recharts';

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
  return (
    <div className='flex justify-center'>
      <div className='w-96 h-96 relative'>
        <ResponsiveContainer width='100%' height='100%'>
          <RadarChart data={data} margin={{ top: 20, right: 40, bottom: 20, left: 40 }}>
            <PolarGrid stroke='#e5e7eb' strokeWidth={1} gridType='polygon' />
            <PolarAngleAxis
              dataKey='skill'
              tick={{ fontSize: 11, fill: '#374151' }}
              className='text-xs'
            />
            <Radar
              name='Skill Level'
              dataKey='value'
              stroke='#f97316'
              fill='#f97316'
              fillOpacity={0.3}
              strokeWidth={3}
              dot={{ r: 4, fill: '#f97316' }}
            />
          </RadarChart>
        </ResponsiveContainer>

        <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
          <div className='w-32 h-32 bg-orange-100 rounded-full flex items-center justify-center'>
            <div className='text-center'>
              <div className='text-2xl font-bold text-orange-600'>{averageScore}</div>
              <div className='text-sm text-orange-500'>{t<string>('DRAFT.AVG_SCORE_LABEL')}:</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillRadarChart;
