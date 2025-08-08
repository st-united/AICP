import { t } from 'i18next';
import { Trans } from 'react-i18next';

import { ExamLevelEnum } from '@app/constants/enum';
import { getExamLevelText, getLevelText } from '@app/pages/Profile/QuizManagement/QuizCard';

interface Pilar {
  toolSetScore: number;
  mindSetScore: number;
  skillSetScore: number;
  examLevel: ExamLevelEnum | null;
  className?: string;
}

const SkillsList = ({ toolSetScore, mindSetScore, skillSetScore, examLevel, className }: Pilar) => {
  return (
    <div className={className}>
      <h2 className='font-semibold mb-6 text-lg sm:text-xl text-gray-800 flex flex-wrap max-xs400:flex-col max-xs400:text-center max-xs400:items-center'>
        <span className='mr-2'>{t('EXAM.COMPETENCY_LEVEL')}</span>
        <span className='text-[#FE7743] font-bold'>
          {examLevel ? getExamLevelText(examLevel) : t('EXAM.LEVEL.NONE_LEVEL')}
        </span>
      </h2>
      <div className='space-y-3 mb-6'>
        <div className='text-base sm:text-lg text-gray-700'>
          <span className='inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0'></span>
          <Trans
            i18nKey={'EXAM.AI_MINDSET_SCORE'}
            values={{ score: mindSetScore, maxScore: 7 }}
            components={{ bold: <span className='font-bold' /> }}
          />
        </div>
        <div className='text-base sm:text-lg text-gray-700'>
          <span className='inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0'></span>
          <Trans
            i18nKey={'EXAM.AI_SKILLSET_SCORE'}
            values={{ score: skillSetScore, maxScore: 7 }}
            components={{ bold: <span className='font-bold' /> }}
          />
        </div>
        <div className='text-base sm:text-lg text-gray-700'>
          <span className='inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0'></span>
          <Trans
            i18nKey={'EXAM.AI_TOOLSET_SCORE'}
            values={{ score: toolSetScore, maxScore: 7 }}
            components={{ bold: <span className='font-bold' /> }}
          />
        </div>
      </div>
    </div>
  );
};

export default SkillsList;
