import React from 'react';
import { useTranslation } from 'react-i18next';

import { getStorageData } from '@app/config/storage';
import { EXAM_LATEST } from '@app/constants/testing';
import { useGetExamResult } from '@app/hooks';
import RelationCourseList from '@app/pages/ViewCourseDetail/RelationCourseList';

const SuggestionList: React.FC = () => {
  const { t } = useTranslation();
  const { data } = useGetExamResult(getStorageData(EXAM_LATEST) ?? '');

  if (!data) return <div>{t('TEST_RESULT.NO_DATA')}</div>;
  return (
    <RelationCourseList
      courses={data.recommendedCourses}
      title={t<string>('TEST_RESULT.SUGGESTION_TITLE')}
    />
  );
};

export default SuggestionList;
