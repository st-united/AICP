import { Card } from 'antd';
import { t } from 'i18next';
import { ArrowLeft } from 'lucide-react';

import ActionButtons from '@app/components/ai-assessment/ActionButtons';
import SkillsList from '@app/components/ai-assessment/SkillList';
import SkillRadarChart from '@app/components/ai-assessment/SkillRadarChart';

import './style.scss';

const Index = () => {
  const chartData = [
    { skill: 'AI Foundation', value: 75, fullMark: 100 },
    { skill: 'Data analysis', value: 70, fullMark: 100 },
    { skill: 'Critical Thinking', value: 80, fullMark: 100 },
    { skill: 'Commitment', value: 65, fullMark: 100 },
    { skill: 'Adaptability', value: 75, fullMark: 100 },
    { skill: 'Problem Solving', value: 70, fullMark: 100 },
    { skill: 'Learning Mindset', value: 85, fullMark: 100 },
    { skill: 'Management', value: 60, fullMark: 100 },
    { skill: 'Ethics', value: 90, fullMark: 100 },
    { skill: 'Prompt Engineering', value: 72, fullMark: 100 },
    { skill: 'Teamwork', value: 68, fullMark: 100 },
    { skill: 'AI Tools and Libraries', value: 73, fullMark: 100 },
  ];

  const skillsData = [
    { name: 'Kiến thức AI', score: 75, total: 100 },
    { name: 'Kỹ năng lập trình', score: 65, total: 100 },
    { name: 'Áp dụng thực tế', score: 70, total: 100 },
  ];

  const handleInterviewClick = () => {
    console.log('Chọn lịch phỏng vấn clicked');
  };

  const handleOtherClick = () => {
    console.log('Lúc khác clicked');
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 p-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='mb-8'>
          <button className='flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors'>
            <ArrowLeft className='w-5 h-5 mr-2' />
            Quay về trang chủ
          </button>
        </div>

        <Card className='bg-white rounded-3xl shadow-xl p-8 border-0'>
          <div className='text-center mb-8'>
            <h1 className='text-xl sm:text-4xl font-bold mb-3 sm:mb-4 leading-tight'>
              <span className='text-[#FE7743]'>{t<string>('DRAFT.TITLE1')}:</span>{' '}
              <span className='text-[#02185B]'>{t<string>('DRAFT.TITLE2')}</span>{' '}
              <span className='text-[#FE7743]'>{t<string>('DRAFT.TITLE3')}</span>
            </h1>
            <p className='text-[#686868] text-sm sm:text-lg '>{t<string>('DRAFT.SUBTITLE')}</p>
            <p className='text-[#686868] text-sm sm:text-lg'>{t<string>('DRAFT.CALL_TO_ACTION')}</p>
            <hr className='my-8 border-t border-gray-300' />
          </div>

          <div className='grid lg:grid-cols-2 lg:gap-12 items-start relative'>
            <SkillsList skills={skillsData} />
            <div className='my-8 h-px w-full bg-gray-300   lg:my-0 lg:absolute lg:left-1/2 lg:top-0 lg:h-64 lg:w-px lg:-translate-x-1/2 lg:translate-y-0 lg:bg-gray-300' />
            <div className='flex flex-col gap-6'>
              <SkillRadarChart data={chartData} averageScore={72} />
              <ActionButtons
                onInterviewClick={handleInterviewClick}
                onOtherClick={handleOtherClick}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
