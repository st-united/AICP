import { LeftOutlined } from '@ant-design/icons';
import { Button, Card, Result, Spin, Typography } from 'antd';
import { Trans, useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';

import ActionButtons from '@app/components/ai-assessment/ActionButtons';
import SkillsList from '@app/components/ai-assessment/SkillList';
import SkillRadarChart from '@app/components/ai-assessment/SkillRadarChart';
import { NAVIGATE_URL } from '@app/constants';
import { useExamDetail } from '@app/hooks';

const { Title, Paragraph } = Typography;

const Capacity = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { examId } = useParams<{ examId: string }>();

  const { data: examDetail, isLoading, error } = useExamDetail(examId || '');
  const chartData = [
    { skill: 'Mindset', value: examDetail?.mindsetScore.score || 0 },
    { skill: 'Skillset', value: examDetail?.skillsetScore.score || 0 },
    { skill: 'Toolset', value: examDetail?.toolsetScore.score || 0 },
  ];

  const handleInterviewClick = () => {
    navigate(NAVIGATE_URL.INTERVIEW_DYNAMIC(examId || ''));
  };

  const handleOtherClick = () => {
    navigate('/');
  };

  if (isLoading) return <Spin className='flex items-center justify-center h-full' />;

  if (error) {
    return (
      <Result
        status='500'
        title={t<string>('EXAM.ERROR_TITLE')}
        extra={<Button type='primary'>{t<string>('EXAM.RESULT.BACK_TO_HOME')}</Button>}
      />
    );
  }

  return (
    <div className='w-full md:w-11/12 lg:w-5/6 mx-auto px-1 md:px-4'>
      <div className='py-4 md:py-6 lg:py-8 px-2 md:px-4'>
        <Link className='flex items-center border-none !text-gray-600 gap-2' to={'/'}>
          <LeftOutlined size={30} />
          {t<string>('EXAM.RESULT.BACK_TO_HOME')}
        </Link>
      </div>

      <Card
        className='rounded-2xl md:rounded-3xl shadow-[0_0_20px_rgba(0,0,0,0.1)] border-none sm:p-5'
        classNames={{ body: '!p-2' }}
      >
        <div className='text-center mb-6 md:mb-8'>
          <Title level={1} className='mb-3 md:mb-4 !text-[#FE7743] text-xl md:text-3xl lg:text-4xl'>
            <Trans
              i18nKey={'EXAM.RESULT.TITLE'}
              components={{ span: <span className='text-[#02185B]' /> }}
            />
          </Title>
          <Paragraph className='text-gray-600 text-base md:text-lg mb-2'>
            {t<string>('EXAM.RESULT.SUBTITLE')}
          </Paragraph>
          <Paragraph className='text-gray-600 text-base md:text-lg'>
            {t<string>('EXAM.RESULT.CALL_TO_ACTION')}
          </Paragraph>
          <div className='my-6 md:my-8 border-t border-gray-200' />
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-start relative px-2 md:px-5'>
          <div>
            <SkillsList
              mindSetScore={examDetail?.mindsetScore.score || 0}
              skillSetScore={examDetail?.skillsetScore.score || 0}
              toolSetScore={examDetail?.toolsetScore.score || 0}
              examLevel={examDetail?.examLevel?.examLevel || null}
              className='ps-3 sm:ps-7'
            />
            <Paragraph className='text-gray-600 text-sm md:text-base ps-3 sm:ps-7 italic'>
              {t<string>('EXAM.RESULT.NOTE')}
            </Paragraph>
          </div>
          <div className='my-6 h-px w-full bg-gray-200 lg:my-0 lg:absolute lg:left-1/2 lg:top-0 lg:h-64 lg:w-px lg:-translate-x-1/2 lg:translate-y-0' />

          <div className='flex flex-col gap-4 md:gap-6'>
            <SkillRadarChart data={chartData} />
            {/* <ActionButtons
              onInterviewClick={handleInterviewClick}
              onOtherClick={handleOtherClick}
            /> */}
          </div>
        </div>
      </Card>
    </div>
  );
};
export default Capacity;
