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
import { useExamDetail } from '@app/hooks';

const getExamLevelText = (level: string, t: (key: string) => string): string => {
  switch (level) {
    case 'LEVEL_1 - STARTER':
      return t('EXAM.EXAM_LEVEL.LEVEL_1_STARTER');
    case 'LEVEL_2 - EXPLORER':
      return t('EXAM.EXAM_LEVEL.LEVEL_2_EXPLORER');
    case 'LEVEL_3 - PRACTITIONER':
      return t('EXAM.EXAM_LEVEL.LEVEL_3_PRACTITIONER');
    case 'LEVEL_4 - INTEGRATOR':
      return t('EXAM.EXAM_LEVEL.LEVEL_4_INTEGRATOR');
    case 'LEVEL_5 - STRATEGIST':
      return t('EXAM.EXAM_LEVEL.LEVEL_5_STRATEGIST');
    case 'LEVEL_6 - LEADER':
      return t('EXAM.EXAM_LEVEL.LEVEL_6_LEADER');
    case 'LEVEL_7 - EXPERT':
      return t('EXAM.EXAM_LEVEL.LEVEL_7_EXPERT');
    default:
      return '-';
  }
};

const SkillLevel: React.FC = () => {
  const { t } = useTranslation();
  const examId = getStorageData(EXAM_LATEST);
  const { data: examDetail } = useExamDetail(examId || '');
  const { data } = useTestResultContext();
  const chartData = [
    { skill: 'Mindset', value: examDetail?.mindsetScore.score },
    { skill: 'Skillset', value: examDetail?.skillsetScore.score },
    { skill: 'Toolset', value: examDetail?.toolsetScore.score },
  ];

  const level = data?.level ? getExamLevelText(data.level, t) : '-';
  return (
    <div className='text-lg'>
      <Divider className='!p-1 !m-0 !mb-4 italic !text-[#5B5B5B] !text-[20px] !font-bold'>
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
          <div className='text-gray-700 mb-2'>{data.description}</div>
          <div className='text-xl font-bold text-black relative inline-block align-bottom'>
            {t('TEST_RESULT.SUGGEST')}:
            <span className='block h-1 bg-[#fe7743] absolute left-0 right-0 -bottom-1 rounded w-[29%] ml-1' />
          </div>
          <div className='text-gray-700'>{data.learningPath}</div>
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
