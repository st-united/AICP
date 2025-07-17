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
} from 'recharts';

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

const SkillLevel: React.FC<SkillLevelProps> = ({
  level,
  levelText,
  comment,
  suggestion,
  radarData,
}) => {
  const { t } = useTranslation();
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
          <ResponsiveContainer width={250} height={220}>
            <RadarChart cx='50%' cy='50%' outerRadius={90} data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey='subject' />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name='Kỹ năng'
                dataKey='value'
                stroke='#fe7743'
                fill='#fe7743'
                fillOpacity={0.4}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SkillLevel;
