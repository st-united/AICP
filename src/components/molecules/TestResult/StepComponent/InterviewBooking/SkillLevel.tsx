import { Divider } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
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

import { getStorageData } from '@app/config';
import { EXAM_LATEST } from '@app/constants/testing';
import { useExamDetail } from '@app/hooks';

interface RadarDataItem {
  subject: string;
  value: number;
}

interface SkillLevelProps {
  level: string;
  levelText: string;
  comment: string;
  suggestion: string;
  radarData: RadarDataItem[];
}

const SkillLevel: React.FC<SkillLevelProps> = ({ level, levelText, comment, suggestion }) => {
  const { t } = useTranslation();
  const examId = getStorageData(EXAM_LATEST);
  const { data: examDetail } = useExamDetail(examId || '');
  const chartData = [
    { skill: 'Mindset', value: examDetail?.mindsetScore },
    { skill: 'Skillset', value: examDetail?.skillsetScore },
    { skill: 'Toolset', value: examDetail?.toolsetScore },
  ];
  return (
    <div className='text-lg'>
      <Divider className='!p-1 !m-0 !mb-4 italic text-[#5B5B5B] text-xl'>
        {t('TEST_RESULT.REVIEW')}
      </Divider>
      <div className=' flex flex-col md:flex-row gap-6 w-full mx-auto '>
        <div className='flex-1 flex flex-col gap-2'>
          <div className='mb-2'>
            <span className='text-xl font-bold text-black relative inline-block align-bottom'>
              {t('TEST_RESULT.LEVEL')}:
              <span className='block h-1 bg-[#fe7743] absolute left-0 right-0 -bottom-1 rounded w-[90%] ml-1' />
            </span>
            <span className='text-xl font-bold text-[#fe7743] ml-3 align-bottom'>
              {level} - {levelText}
            </span>
          </div>
          <div className='text-gray-700 mb-2'>{comment}</div>
          <div className='text-xl font-bold text-black relative inline-block align-bottom'>
            {t('TEST_RESULT.SUGGEST')}:
            <span className='block h-1 bg-[#fe7743] absolute left-0 right-0 -bottom-1 rounded w-[15%] ml-1' />
          </div>
          <div className='text-gray-700'>{suggestion}</div>
        </div>
        <div className='w-0.5 h-[200px] bg-gray-50' />
        <div className='flex-1 flex items-center justify-center min-w-[220px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <RadarChart data={chartData}>
              <PolarGrid stroke='#e5e7eb' />
              <PolarAngleAxis
                dataKey='pilar'
                tick={{ fontSize: 12, fill: '#374151' }}
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
                stroke='#fe7743'
                fill='#fe774366'
                strokeWidth={2}
                dot={{ r: 3, fill: '#fe7743' }}
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
    </div>
  );
};

export default SkillLevel;
