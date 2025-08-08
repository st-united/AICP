import { Divider } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

import CompetencyChart from '@app/components/ai-assessment/CompetencyChart';
import SkillChart from '@app/components/atoms/Chart/SkillChart/SkillChart';
import { getStorageData } from '@app/config';
import { EXAM_LATEST } from '@app/constants/testing';
import { useExamDetail, useGetExamResult } from '@app/hooks';
import { DetailExam } from '@app/interface/user.interface';

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
  const { data } = useGetExamResult(examId);
  const chartData = [
    { skill: 'Mindset', value: examDetail?.mindsetScore.score },
    { skill: 'Skillset', value: examDetail?.skillsetScore.score },
    { skill: 'Toolset', value: examDetail?.toolsetScore.score },
  ];

  const transformApiData = (apiData: DetailExam) => {
    const allAspects = [
      ...apiData.mindsetScore.aspects,
      ...apiData.skillsetScore.aspects,
      ...apiData.toolsetScore.aspects,
    ];

    return allAspects
      .map((aspect) => ({
        code: aspect.represent,
        score: Math.round(aspect.score * 10) / 10,
        name: aspect.name,
      }))
      .sort((a, b) => a.code.localeCompare(b.code));
  };
  if (!examDetail) return null;
  const dataChart = transformApiData(examDetail);

  const level = data?.level ? getExamLevelText(data.level, t) : '-';

  return (
    <div className='text-lg'>
      <Divider className='justify-center !p-1 !m-0 !mb-4 italic !text-[#5B5B5B] !text-[1rem] xsL:!text-[20px] !font-bold'>
        {t('TEST_RESULT.REVIEW')}
      </Divider>
      <div className='flex flex-col md:flex-row gap-6 w-full'>
        <div className='flex-1 flex flex-col gap-2'>
          <div className='mb-2'>
            <span className='text-[1.125rem] md:text-xl font-bold text-black relative inline-block align-bottom'>
              {t('TEST_RESULT.LEVEL')}:
              <span className='block h-1 bg-[#fe7743] absolute left-0 right-0 -bottom-1 rounded w-[90%] ml-1' />
            </span>
            <span className='text-[1.125rem] md:text-xl font-bold text-[#fe7743] ml-3 align-bottom'>
              {level}
            </span>
          </div>
          <div className='text-gray-700 mb-2'>{data?.description}</div>
          <div className='text-[18px] md:text-xl font-bold text-black relative inline-block align-bottom'>
            {t('TEST_RESULT.SUGGEST')}:
            <span className='block h-1 bg-[#fe7743] absolute left-0 right-0 -bottom-1 rounded w-[29%] ml-1' />
          </div>
          <div className='text-gray-700'>{data?.learningPath}</div>
        </div>
        <div className='md:w-[0.5px] md:h-[200px] w-full h-[0.5px] bg-gray-50' />
        <div className='grid grid-cols-1 smL:grid-cols-2 md:grid-cols-1 gap-2 smL:gap-0 md:gap-8 flex-1'>
          <SkillChart chartData={chartData} />
          <CompetencyChart data={dataChart} />
        </div>
      </div>
    </div>
  );
};

export default SkillLevel;
