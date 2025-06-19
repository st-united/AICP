import { t } from 'i18next';
import { Trans } from 'react-i18next';

import { SFIALevel } from '@app/constants/enum';
import { getLevelText } from '@app/pages/Profile/QuizManagement/QuizCard';

interface Pilar {
  toolSetScore: number;
  mindSetScore: number;
  skillSetScore: number;
  sfiaLevel: SFIALevel | null;
}

const SkillsList = ({ toolSetScore, mindSetScore, skillSetScore, sfiaLevel }: Pilar) => {
  return (
    <div className=''>
      <h2 className='font-semibold mb-6 text-base sm:text-lg'>
        <span className='text-gray-800'>
          {t('EXAM.COMPETENCY_LEVEL')}{' '}
          <span className='text-orange-500 font-bold'>
            {sfiaLevel ? getLevelText(sfiaLevel) : t('EXAM.NONE_LEVEL')}
          </span>
        </span>
      </h2>

      <div className='space-y-3 mb-6'>
        <div className='text-base text-gray-700'>
          <span className='inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0'></span>
          <Trans
            i18nKey={'EXAM.AI_MINDSET_SCORE'}
            values={{ score: mindSetScore, maxScore: 7 }}
            components={{ bold: <span className='font-bold' /> }}
          />
        </div>
        <div className='text-base text-gray-700'>
          <span className='inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0'></span>
          <Trans
            i18nKey={'EXAM.AI_SKILLSET_SCORE'}
            values={{ score: skillSetScore, maxScore: 7 }}
            components={{ bold: <span className='font-bold' /> }}
          />
        </div>
        <div className='text-base text-gray-700'>
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
