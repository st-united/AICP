import { ClockCircleOutlined, TrophyOutlined } from '@ant-design/icons';
import { Card, Tag, Checkbox } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { t } from 'i18next';

import { DATE_TIME } from '@app/constants';
import { ExamLevelEnum, ExamStatusEnum, SFIALevel } from '@app/constants/enum';
import { HistoryTesting } from '@app/interface/user.interface';

interface QuizCardProps {
  quiz: HistoryTesting;
  onCheckboxChange: (quizId: string, checked: boolean) => void;
  isChecked: boolean;
  onClick: (quizId: string) => void;
  disabled?: boolean;
}

export const getStatusText = (status: ExamStatusEnum) => {
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

export const getLevelText = (level: SFIALevel) => {
  switch (level) {
    case SFIALevel.LEVEL_1_AWARENESS:
      return t('EXAM.LEVEL.LEVEL_1_AWARENESS');
    case SFIALevel.LEVEL_2_FOUNDATION:
      return t('EXAM.LEVEL.LEVEL_2_FOUNDATION');
    case SFIALevel.LEVEL_3_APPLICATION:
      return t('EXAM.LEVEL.LEVEL_3_APPLICATION');
    case SFIALevel.LEVEL_4_INTEGRATION:
      return t('EXAM.LEVEL.LEVEL_4_INTEGRATION');
    case SFIALevel.LEVEL_5_INNOVATION:
      return t('EXAM.LEVEL.LEVEL_5_INNOVATION');
    case SFIALevel.LEVEL_6_LEADERSHIP:
      return t('EXAM.LEVEL.LEVEL_6_LEADERSHIP');
    case SFIALevel.LEVEL_7_MASTERY:
      return t('EXAM.LEVEL.LEVEL_7_MASTERY');
    default:
      return level;
  }
};

export const getExamLevelText = (level: ExamLevelEnum) => {
  switch (level) {
    case ExamLevelEnum.LEVEL_1_STARTER:
      return t('EXAM.EXAM_LEVEL.LEVEL_1_STARTER');
    case ExamLevelEnum.LEVEL_2_EXPLORER:
      return t('EXAM.EXAM_LEVEL.LEVEL_2_EXPLORER');
    case ExamLevelEnum.LEVEL_3_PRACTITIONER:
      return t('EXAM.EXAM_LEVEL.LEVEL_3_PRACTITIONER');
    case ExamLevelEnum.LEVEL_4_INTEGRATOR:
      return t('EXAM.EXAM_LEVEL.LEVEL_4_INTEGRATOR');
    case ExamLevelEnum.LEVEL_5_STRATEGIST:
      return t('EXAM.EXAM_LEVEL.LEVEL_5_STRATEGIST');
    case ExamLevelEnum.LEVEL_6_LEADER:
      return t('EXAM.EXAM_LEVEL.LEVEL_6_LEADER');
    case ExamLevelEnum.LEVEL_7_EXPERT:
      return t('EXAM.EXAM_LEVEL.LEVEL_7_EXPERT');
    default:
      return level;
  }
};

export const getStatusColor = (statusKey: string) => {
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

export const formatDateTime = (dateString: string) => {
  try {
    dayjs.locale('vi');
    const formatted = dayjs(dateString).format(DATE_TIME.WEEKDAY_DAY_MONTH_YEAR_TIME);
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  } catch (error) {
    return dateString;
  }
};

const QuizCard = ({ quiz, disabled, onCheckboxChange, isChecked, onClick }: QuizCardProps) => {
  const getLevelColor = (levelKey: string) => {
    switch (levelKey) {
      case ExamLevelEnum.LEVEL_1_STARTER:
      case ExamLevelEnum.LEVEL_2_EXPLORER:
        return 'text-[#FE7743]';
      case ExamLevelEnum.LEVEL_3_PRACTITIONER:
      case ExamLevelEnum.LEVEL_4_INTEGRATOR:
        return 'text-[#FE7743]';
      case ExamLevelEnum.LEVEL_5_STRATEGIST:
      case ExamLevelEnum.LEVEL_6_LEADER:
        return 'text-[#FE7743]';
      case ExamLevelEnum.LEVEL_7_EXPERT:
        return 'text-[#FE7743]';
      default:
        return 'text-[#FE7743]';
    }
  };

  return (
    <Card
      className={`rounded-xl md:rounded-2xl shadow-sm border-0 bg-white transition-shadow duration-200 w-full
        ${disabled ? 'opacity-50 pointer-events-none' : 'hover:shadow-md cursor-pointer'}`}
      onClick={() => {
        if (!disabled) onClick(quiz.id);
      }}
    >
      <div className='flex flex-col sm:flex-row items-start sm:items-center space-y-0 sm:space-x-4'>
        <div className='flex-1 text-base sm:text-lg space-y-2 w-full cursor-pointer'>
          <div className='flex flex-col items-center sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3'>
            <div className='text-gray-600 font-medium'>
              {t('EXAM.QUIZ_ID_PREFIX')}
              <span className='font-bold text-black'> #{quiz.id.slice(0, 8)}</span>
            </div>
            <Tag
              color={getStatusColor(quiz.examStatus)}
              className='rounded-xl px-2 sm:px-3 py-1 text-sm sm:text-base font-bold border-none w-fit'
            >
              {getStatusText(quiz.examStatus)}
            </Tag>
          </div>

          <div className='flex items-center space-x-2'>
            <ClockCircleOutlined className='text-gray-600 text-lg sm:text-xl hidden sm:block' />
            <span className='text-sm sm:text-base'>
              {t('EXAM.CREATED_TIME')}
              <span className='font-medium ml-1'>{formatDateTime(quiz.createdAt.toString())}</span>
            </span>
          </div>

          <div className='flex items-center space-x-2'>
            <TrophyOutlined className='text-gray-600 text-lg sm:text-xl hidden sm:block' />
            <span className='text-sm sm:text-base'>
              {t('EXAM.COMPETENCY_LEVEL')}{' '}
              <span className={`font-medium ${getLevelColor(quiz.examLevel?.examLevel ?? '')}`}>
                {quiz.examLevel?.examLevel
                  ? getExamLevelText(quiz.examLevel.examLevel)
                  : t('EXAM.EXAM_LEVEL.NONE_LEVEL')}
              </span>
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default QuizCard;
