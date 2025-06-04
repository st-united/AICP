import { Card } from 'antd';
import { t } from 'i18next';
import React from 'react';

interface Skill {
  name: string;
  score: number;
  total: number;
}

interface SkillsListProps {
  skills: Skill[];
}

const SkillsList: React.FC<SkillsListProps> = ({ skills }) => {
  return (
    <div className=''>
      <h2 className='font-semibold mb-6 text-sm sm:text-lg'>
        {t<string>('DRAFT.LEVEL_LABEL')}:
        <span className='text-orange-500 '> {t<string>('DRAFT.LEVEL_VALUE')}</span>
      </h2>

      <div className='space-y-4 mb-6'>
        {skills.map((skill, index) => (
          <div key={index} className='flex items-center '>
            <span className='text-[#000000 font-medium text-sm sm:text-lg'>• {skill.name}: </span>
            <span className='font-bold text-lg'>
              <span className='text-[#000000] font-bold text-sm sm:text-lg'>{skill.score}</span>
              <span className='text-[#000000] font-bold text-sm sm:text-lg'>/{skill.total}</span>
            </span>
          </div>
        ))}
      </div>

      <p className='text-[#808080] italic text-sm sm:text-lg'>{t<string>('DRAFT.NOTE')}</p>
    </div>
  );
};

export default SkillsList;
