import { ClockCircleOutlined, TrophyOutlined } from '@ant-design/icons';
import { Card, Tag, Checkbox } from 'antd';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';

import { DATE_TIME } from '@app/constants';
import { ExamStatusEnum, LevelOfDomainEnum } from '@app/constants/enum';
import { HistoryTesting } from '@app/interface/user.interface';

interface QuizCardProps {
  quiz: HistoryTesting;
  onCheckboxChange: (quizId: string, checked: boolean) => void;
  isChecked: boolean;
}

const QuizCard = ({ quiz, onCheckboxChange, isChecked }: QuizCardProps) => {
  const { t } = useTranslation();

  const formatDateTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, DATE_TIME.WEEKDAY_DAY_MONTH_YEAR_TIME, { locale: vi });
    } catch (error) {
      return dateString;
    }
  };

  const getStatusColor = (statusKey: string) => {
    switch (statusKey) {
      case ExamStatusEnum.IN_PROGRESS:
        return 'processing';
      case ExamStatusEnum.SUBMITTED:
        return 'warning';
      case ExamStatusEnum.WAITING_FOR_REVIEW:
        return 'default';
      case ExamStatusEnum.GRADED:
        return 'success';
      default:
        return 'default';
    }
  };

  const getLevelColor = (levelKey: string) => {
    switch (levelKey) {
      case LevelOfDomainEnum.FOUNDATION_L1_L2:
        return 'text-green-500';
      case LevelOfDomainEnum.INTERMEDIATE_L3_L4:
        return 'text-blue-500';
      case LevelOfDomainEnum.ADVANCED_L5_L6:
        return 'text-orange-500';
      case LevelOfDomainEnum.EXPERT_L7:
        return 'text-red-500';
      default:
        return 'text-orange-500';
    }
  };

  const getStatusText = (status: ExamStatusEnum) => {
    switch (status) {
      case ExamStatusEnum.IN_PROGRESS:
        return t('EXAM.STATUS.IN_PROGRESS');
      case ExamStatusEnum.SUBMITTED:
        return t('EXAM.STATUS.SUBMITTED');
      case ExamStatusEnum.WAITING_FOR_REVIEW:
        return t('EXAM.STATUS.WAITING_FOR_REVIEW');
      case ExamStatusEnum.GRADED:
        return t('EXAM.STATUS.GRADED');
      default:
        return status;
    }
  };

  const getLevelText = (level: LevelOfDomainEnum) => {
    switch (level) {
      case LevelOfDomainEnum.FOUNDATION_L1_L2:
        return t('EXAM.LEVEL.FOUNDATION');
      case LevelOfDomainEnum.INTERMEDIATE_L3_L4:
        return t('EXAM.LEVEL.INTERMEDIATE');
      case LevelOfDomainEnum.ADVANCED_L5_L6:
        return t('EXAM.LEVEL.ADVANCED');
      case LevelOfDomainEnum.EXPERT_L7:
        return t('EXAM.LEVEL.EXPERT');
      default:
        return level;
    }
  };

  return (
    <Card className='rounded-xl md:rounded-2xl shadow-sm border-0 bg-white hover:shadow-md transition-shadow duration-200 w-full'>
      <div className='flex flex-col sm:flex-row items-start sm:items-center space-y-0 sm:space-x-4'>
        <div className='flex-shrink-0'>
          <Checkbox
            checked={isChecked}
            onChange={(e) => onCheckboxChange(quiz.id, e.target.checked)}
          />
        </div>

        <div className='flex-1 text-sm sm:text-base space-y-2 w-full'>
          <div className='flex flex-col items-center sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3'>
            <div className='text-gray-600 font-medium'>
              {t('EXAM.QUIZ_ID_PREFIX')}
              <span className='font-bold text-black'> #{quiz.id.slice(0, 8)}</span>
            </div>
            <Tag
              color={getStatusColor(quiz.examStatus)}
              className='rounded-xl px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold border-none w-fit'
            >
              {getStatusText(quiz.examStatus)}
            </Tag>
          </div>

          <div className='flex items-center space-x-2'>
            <ClockCircleOutlined className='text-gray-600 text-base sm:text-lg hidden sm:block' />
            <span className='text-xs sm:text-sm'>
              {t('EXAM.CREATED_TIME')}
              <span className='font-medium ml-1'>{formatDateTime(quiz.createdAt.toString())}</span>
            </span>
          </div>

          <div className='flex items-center space-x-2'>
            <TrophyOutlined className='text-gray-600 text-base sm:text-lg hidden sm:block' />
            <span className='text-xs sm:text-sm'>
              {t('EXAM.COMPETENCY_LEVEL')}{' '}
              <span className={`font-medium ${getLevelColor(quiz.levelOfDomain)}`}>
                {getLevelText(quiz.levelOfDomain)}
              </span>
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default QuizCard;
