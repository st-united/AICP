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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

import ColumnChart from '@app/components/atoms/Chart/ColumnChart/ColumnChart';
import SkillChart from '@app/components/atoms/Chart/SkillChart/SkillChart';
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

  const allAspects = [
    ...(examDetail?.mindsetScore?.aspects || []),
    ...(examDetail?.skillsetScore?.aspects || []),
    ...(examDetail?.toolsetScore?.aspects || []),
  ];
  console.log(allAspects);
  const barChartData = allAspects
    .map((aspect) => ({
      label: aspect.represent,
      value: aspect.score,
      name: aspect.name,
    }))
    .sort((a, b) => {
      const levelOrder: Record<string, number> = { A: 1, B: 2, C: 3 };
      const aLevel = a.label.charAt(0);
      const bLevel = b.label.charAt(0);
      const aNumber = parseInt(a.label.slice(1));
      const bNumber = parseInt(b.label.slice(1));
      if (levelOrder[aLevel] !== levelOrder[bLevel]) {
        return levelOrder[aLevel] - levelOrder[bLevel];
      }
      return aNumber - bNumber;
    });

  const level = data?.level ? capitalizeWords(data.level.replace('_', ' ')) : '-';

  return (
    <div className='text-lg'>
      <Divider className='!p-1 !m-0 !mb-4 italic !text-[#5B5B5B] !text-[12px] xsL:!text-[20px] !font-bold'>
        {t('TEST_RESULT.REVIEW')}
      </Divider>
      <div className=' flex flex-col md:flex-row gap-6 w-full mx-auto items-center'>
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
        <div className='flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-8'>
          <div className='h-full flex items-center justify-center w-full'>
            <SkillChart chartData={chartData} />
          </div>
          <div className='w-full h-full flex items-center justify-center'>
            <ColumnChart barChartData={barChartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillLevel;
