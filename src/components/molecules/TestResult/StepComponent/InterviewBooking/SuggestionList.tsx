import React from 'react';
import { useTranslation } from 'react-i18next';

import { useTestResultContext } from '../../TestResultContext';
import RelationCourseList from '@app/pages/ViewCourseDetail/RelationCourseList';

const SuggestionList: React.FC = () => {
  const { t } = useTranslation();
  const { data } = useTestResultContext();

  if (!data) return <div>{t('TEST_RESULT.NO_DATA')}</div>;
  return (
    <RelationCourseList
      courses={data.recommendedCourses}
      title={t<string>('TEST_RESULT.SUGGESTION_TITLE')}
    />
  );
};

export default SuggestionList;
