import { Button } from 'antd';
import { useTranslation, Trans } from 'react-i18next';

import { ContentModal } from './ContentModal';
import { HeaderModal } from './HeaderModal';
import { ExamStatusEnum } from '@app/constants/enum';

interface ContinueTestModalProps {
  examId: string;
  handleStartTest: () => void;
  submitExam: (examId: string) => void;
}

export const ContinueTestModal = ({
  examId,
  handleStartTest,
  submitExam,
}: ContinueTestModalProps) => {
  const { t } = useTranslation();

  const hasTakenExam = {
    examStatus: ExamStatusEnum.IN_PROGRESS,
  };

  return (
    <div className='relative flex flex-col items-center justify-center'>
      <HeaderModal title={t('MODAL.TITLE_CONFIRM_CONTINUE_TEST')} symbol='?' />

      <div className='px-6 w-full flex flex-col items-start md:my-6 !my-0 gap-3'>
        <p className='text-base text-gray-900 md:text-lg'>
          <Trans i18nKey='MODAL.CONTINUE_TEST_DESCRIPTION_1' components={{ br: <br /> }} />
        </p>
        <p className='text-base text-gray-900 md:text-lg mt-[6px]'>
          <Trans i18nKey='MODAL.CONTINUE_TEST_DESCRIPTION_2' components={{ br: <br /> }} />
        </p>
        <ul className='text-base text-gray-900 md:text-lg text-left list-disc list-inside pl-4 flex flex-col !leading-9'>
          <li>
            <Trans i18nKey='MODAL.CONTINUE_TEST_OPTION_CONTINUE' components={{ b: <b /> }} />
          </li>
          <li>
            <Trans i18nKey='MODAL.CONTINUE_TEST_OPTION_EXIT' components={{ b: <b /> }} />
          </li>
        </ul>
      </div>

      <ContentModal durationKey='MODAL.TEST_DURATION_MESSAGE' hasTakenExam={hasTakenExam} />

      <div className='px-3 my-6 w-full'>
        <div className='flex flex-col gap-4 md:flex-row md:justify-center md:gap-4'>
          <Button
            onClick={() => submitExam(examId)}
            className='w-full h-full text-base font-semibold px-3 py-2 rounded-full bg-white border-2 !border-orange-500 !text-orange-500 hover:border-orange-600 hover:text-orange-600 active:border-orange-700 active:text-orange-700 transition-colors duration-200 md:w-48 md:px-6 md:py-3 md:text-xl'
          >
            {t('BUTTON.EXIT_TEST')}
          </Button>

          <Button
            onClick={handleStartTest}
            className='w-full h-full text-base font-semibold border !border-primary px-3 py-2 rounded-full !bg-orange-500 hover:!bg-white hover:!text-primary !text-white transition-colors duration-200 md:w-48 md:px-6 md:py-3 md:text-xl'
          >
            {t('BUTTON.CONTINUE_NOW')}
          </Button>
        </div>
      </div>
    </div>
  );
};
