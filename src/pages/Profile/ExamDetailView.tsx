import { ClockCircleOutlined, LeftOutlined } from '@ant-design/icons';
import { Button, Card, Tag } from 'antd';
import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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
      <div className='rounded-xl shadow-lg bg-white w-full auto h-full overflow-y-auto'>
        <div className='w-[95%] mx-auto'>
          <Button
            onClick={() => navigate(-1)}
            type='text'
            className='!border-0 !shadow-none px-0 ml-0 text-[15px] text-black text-sm flex items-center gap-1 hover:!text-black hover:!bg-transparent py-6'
          >
            <LeftOutlined />
            {t('BUTTON.BACK')}
          </Button>
          <div className='flex flex-col sm:flex-row items-center justify-center sm:justify-between w-full gap-3 sm:gap-0'>
            <div className='text-xl font-bold text-gray-800 text-center sm:text-left'>
              {t('EXAM.QUIZ_ID_PREFIX')}
              <span className='text-black ml-1'>#{exam.examSet.name}</span>
            </div>

            <Button
              onClick={() => {
                localStorage.setItem('examLatest', exam.id);
                navigate('/result');
              }}
              className='text-sm text-[#FE7743] border border-[#FE7743] rounded-full px-4 py-1 hover:bg-orange-50 transition'
            >
              {t('EXAM.VIEW_DETAIL')}
            </Button>
          </div>

          <div className='flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mb-4 px-1 pt-4'>
            <div className='flex items-center gap-2'>
              <ClockCircleOutlined className='text-gray-600 text-base sm:text-xl' />
              <span className='text-sm sm:text-base max-xs370:text-xs'>
                {t('EXAM.CREATED_TIME')}
                <span className='font-medium ml-1'>
                  {formatDateTime(exam.createdAt.toString())}
                </span>
              </span>
            </div>

            <Tag
              color={getStatusColor(exam.examStatus)}
              className='rounded-xl px-2 sm:px-3 py-1 text-sm sm:text-base font-bold border-none w-fit'
            >
              {getStatusText(exam.examStatus)}
            </Tag>
          </div>

          <Card
            className='p-4 sm:p-8 mb-4 rounded-2xl bg-white shadow-[rgba(0,0,0,0.12)_0px_10px_20px] hover:shadow-[rgba(0,0,0,0.15)_0px_12px_24px] transition-shadow duration-300 ease-in-out !border-0'
            classNames={{ body: '!p-0' }}
          >
            <div className='mb-6 text-center sm:text-start border-b pb-0 sm:pb-6'>
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
            <div className='w-full overflow-x-auto'>
              <div className='min-w-[62.5rem] h-full'>
                <CompetencyChart data={dataChart} />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ExamDetailView;
