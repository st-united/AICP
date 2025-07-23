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

import { useTestResultContext } from '../../TestResultContext';
import { getStorageData } from '@app/config';
import { EXAM_LATEST } from '@app/constants/testing';
import { useExamDetail, useGetExamResult } from '@app/hooks';

const capitalizeWords = (str: string) =>
  str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());

const SkillLevel: React.FC = () => {
  const { t } = useTranslation();
  const examId = getStorageData(EXAM_LATEST);
  const { data: examDetail } = useExamDetail(examId || '');
  const { data, isLoading } = useGetExamResult(examId);
  const chartData = [
    { skill: 'Mindset', value: examDetail?.mindsetScore.score },
    { skill: 'Skillset', value: examDetail?.skillsetScore.score },
    { skill: 'Toolset', value: examDetail?.toolsetScore.score },
  ];
  if (isLoading) return <div>Loading...</div>;
  const level = data?.level ? capitalizeWords(data.level.replace('_', ' ')) : '-';

  return (
    <div className='text-lg'>
      <Divider className='!p-1 !m-0 !mb-4 italic !text-[#5B5B5B] !text-[12px] xsL:!text-[20px] !font-bold'>
        {t('TEST_RESULT.REVIEW')}
      </Divider>
      <div className=' flex flex-col md:flex-row gap-6 w-full mx-auto '>
        <div className='flex-1 flex flex-col gap-2'>
          <div className='mb-2'>
            <span className='text-xl font-bold text-black relative inline-block align-bottom'>
              {t('TEST_RESULT.LEVEL')}:
              <span className='block h-1 bg-[#fe7743] absolute left-0 right-0 -bottom-1 rounded w-[90%] ml-1' />
            </span>
            <span className='text-xl font-bold text-[#fe7743] ml-3 align-bottom'>{level}</span>
          </div>
          <div className='text-gray-700 mb-2'>{data?.description}</div>
          <div className='text-xl font-bold text-black relative inline-block align-bottom'>
            {t('TEST_RESULT.SUGGEST')}:
            <span className='block h-1 bg-[#fe7743] absolute left-0 right-0 -bottom-1 rounded w-[29%] ml-1' />
          </div>
          <div className='text-gray-700'>{data?.learningPath}</div>
        </div>
        <div className='md:w-[0.5px] md:h-[200px] w-full h-[0.5px] bg-gray-50' />
        <div className='flex-1 flex items-center justify-center min-w-[220px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <RadarChart data={chartData}>
              <PolarGrid stroke='#e5e7eb' />
              <PolarAngleAxis
                dataKey='skill'
                tick={{ fontSize: 16, fill: '#374151' }}
                tickLine={false}
              />
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
        </div>
      </div>
    </div>
  );
};

export default SkillLevel;
