import { Alert, Button } from 'antd';
import { useTranslation } from 'react-i18next';

interface ErrorStateProps {
  onRetry: () => void;
}

const ErrorState = ({ onRetry }: ErrorStateProps) => {
  const { t } = useTranslation();

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-4xl mx-auto'>
        <Alert
          message={t('EXAM.ERROR_TITLE')}
          description={t('EXAM.ERROR_DESCRIPTION')}
          type='error'
          showIcon
          action={
            <Button size='small' danger onClick={onRetry}>
              {t('EXAM.RETRY_BUTTON')}
            </Button>
          }
        />
      </div>
    </div>
  );
};

export default ErrorState;
