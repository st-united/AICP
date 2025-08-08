import { Trans, useTranslation } from 'react-i18next';

interface ModalContentProps {
  durationKey: string;
  hasTakenExam?: {
    examSetDuration?: number;
    examStatus?: string;
  };
}

export const ContentModal = ({ durationKey, hasTakenExam }: ModalContentProps) => {
  const { t } = useTranslation();

  return (
    <div className='px-2 space-y-2 md:px-6 md:space-y-3'>
      {hasTakenExam?.examStatus !== 'IN_PROGRESS' && durationKey && (
        <p className='text-base text-gray-900 md:text-xl !leading-9'>
          <Trans
            i18nKey={durationKey}
            values={{ duration: hasTakenExam?.examSetDuration }}
            components={{ bold: <span className='font-bold text-[#fe7743]' /> }}
          />
        </p>
      )}
      {hasTakenExam?.examStatus !== 'IN_PROGRESS' && (
        <p className='text-base text-gray-900 md:text-xl !mt-4 !leading-9'>
          {t('MODAL.RESULT_CONFIRM_TEST')}
        </p>
      )}
      <p className='text-base text-gray-900 md:text-xl !mt-4 !leading-9'>
        <span className='text-orange-500 font-semibold'>{t('MODAL.NOTE_CONFIRM_TEST')}:</span>{' '}
        {t('MODAL.WARNING_CONFIRM_TEST')}
      </p>
    </div>
  );
};
