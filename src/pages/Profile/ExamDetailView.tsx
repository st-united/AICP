import { ClockCircleOutlined } from '@ant-design/icons';
import { Button, Card, Tag } from 'antd';
import { t } from 'i18next';

import { formatDateTime, getStatusColor, getStatusText } from './QuizManagement/QuizCard';
import CompetencyChart from '@app/components/ai-assessment/CompetencyChart';
import SkillsList from '@app/components/ai-assessment/SkillList';
import SkillRadarChart from '@app/components/ai-assessment/SkillRadarChart';
import { DetailExam } from '@app/interface/user.interface';

interface ExamDetailViewProps {
  exam: DetailExam;
  onBack: () => void;
}

const ExamDetailView = ({ exam, onBack }: ExamDetailViewProps) => {
  const chartData = [
    { skill: 'Mindset', value: exam.mindsetScore.score },
    { skill: 'Skillset', value: exam.skillsetScore.score },
    { skill: 'Toolset', value: exam.toolsetScore.score },
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

  const dataChart = transformApiData(exam);

  return (
    <>
      <div className='flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mb-4 px-1'>
        <div className='flex items-center gap-2'>
          <ClockCircleOutlined className='text-gray-600 text-lg sm:text-xl' />
          <span className='text-sm sm:text-base'>
            {t('EXAM.CREATED_TIME')}
            <span className='font-medium ml-1'>{formatDateTime(exam.createdAt.toString())}</span>
          </span>
        </div>

        <Tag
          color={getStatusColor(exam.examStatus)}
          className='rounded-xl px-2 sm:px-3 py-1 text-sm sm:text-base font-bold border-none w-fit'
        >
          {getStatusText(exam.examStatus)}
        </Tag>
      </div>

      <Card className='p-3 sm:p-8 rounded-xl shadow-lg bg-white' classNames={{ body: '!p-0' }}>
        <div className='mb-6 text-center sm:text-start border-b pb-6'>
          <h1 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-2'>
            {t('EXAM.COMPETENCY_DETAIL')}
          </h1>
        </div>

        <div className='flex flex-col lg:grid lg:grid-cols-2 lg:gap-12 px-5'>
          <div>
            <SkillsList
              mindSetScore={exam.mindsetScore.score}
              skillSetScore={exam.skillsetScore.score}
              toolSetScore={exam.toolsetScore.score}
              examLevel={exam.examLevel?.examLevel ?? null}
            />
          </div>

          <div className='mt-8 lg:mt-0'>
            <SkillRadarChart data={chartData} />
          </div>
        </div>
        <CompetencyChart data={dataChart} />

        <div className='h-px bg-gray-200'></div>

        <Button
          onClick={onBack}
          className='px-6 py-2 mt-6 !bg-orange-500 border-none !text-white rounded-lg !hover:bg-orange-600 transition-colors duration-200 shadow-sm hover:shadow-md'
        >
          {t('BUTTON.BACK')}
        </Button>
      </Card>
    </>
  );
};

export default ExamDetailView;
