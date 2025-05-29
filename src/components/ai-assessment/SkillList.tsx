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
    <div className='mb-8'>
      <h2 className='text-2xl font-semibold mb-6'>
        {t<string>('DRAFT.LEVEL_LABEL')}:
        <span className='text-orange-500'> {t<string>('DRAFT.LEVEL_VALUE')}</span>
      </h2>

      <div className='space-y-4 mb-6'>
        {skills.map((skill, index) => (
          <div key={index} className='flex items-center justify-between'>
            <span className='text-gray-700 font-medium'>• {skill.name}:</span>
            <span className='font-bold text-lg'>
              <span className='text-orange-500'>{skill.score}</span>
              <span className='text-gray-400'>/{skill.total}</span>
            </span>
          </div>
        ))}
      </div>

      <Card className='bg-orange-50 border-orange-200'>
        <p className='text-gray-700 m-0'>
          <span className='font-semibold'>{t<string>('DRAFT.NOTE')}</span>
        </p>
      </Card>
    </div>
  );
};

export default SkillsList;
