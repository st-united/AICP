import { Button } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { HeaderModal } from './HeaderModal';
import { UserType } from '@app/constants/enum';

interface InfoModalProps {
  userProfile: any;
  onSubmit: (data: { isStudent: boolean; university: string; studentCode: string }) => void;
  onClose: () => void;
  isPending: boolean;
}

export const InfoModal: React.FC<InfoModalProps> = ({
  userProfile,
  onSubmit,
  onClose,
  isPending,
}) => {
  const { t } = useTranslation();
  const [selectedType, setSelectedType] = React.useState<UserType>(
    userProfile?.isStudent === true ? UserType.STUDENT : UserType.WORKER,
  );

  const [university, setUniversity] = React.useState(userProfile?.university || '');
  const [studentCode, setStudentCode] = React.useState(userProfile?.studentCode || '');

  const handleContinue = () => {
    const payload = {
      isStudent: selectedType === UserType.STUDENT,
      ...(selectedType === UserType.STUDENT
        ? { university, studentCode }
        : { university: '', studentCode: '' }),
    };

    onSubmit(payload);
  };

  const isStudentSelected = selectedType === UserType.STUDENT;
  const isContinueDisabled =
    selectedType === null || (isStudentSelected && (!university.trim() || !studentCode.trim()));

  return (
    <div className='relative flex flex-col items-center w-full px-2 sm:px-6 max-w-xl mx-auto'>
      <HeaderModal
        title={t('CONFIRM_BEFORE_TEST_MODAL.TITLE_INFO')}
        onClose={onClose}
        symbol={userProfile?.isStudent == null ? '!' : '?'}
      />
      <div className='w-full mb-2 text-base font-semibold text-start'>
        {t('CONFIRM_BEFORE_TEST_MODAL.INFO_TEXT')}
      </div>
      <div className='flex flex-row gap-4 w-full mb-4 pb-2'>
        <div
          className={`flex-1 border rounded-xl px-8 py-4 flex items-center justify-center cursor-pointer transition-all duration-150 whitespace-nowrap ${
            selectedType === UserType.STUDENT
              ? 'border-orange-500 bg-orange-50'
              : 'border-gray-300 bg-white'
          }`}
          onClick={() => setSelectedType(UserType.STUDENT)}
          role='button'
          tabIndex={0}
          onKeyDown={(e) =>
            (e.key === 'Enter' || e.key === ' ') && setSelectedType(UserType.STUDENT)
          }
        >
          <span
            className={`w-5 h-5 mr-3 flex items-center justify-center border-2 rounded-full ${
              selectedType === UserType.STUDENT ? 'border-orange-500' : 'border-gray-300'
            }`}
          >
            {selectedType === UserType.STUDENT && (
              <span className='w-3 h-3 bg-orange-500 rounded-full block'></span>
            )}
          </span>
          <span className='text-lg font-medium whitespace-nowrap'>{t('USER.STUDENT')}</span>
        </div>
        <div
          className={`flex-1 border rounded-xl px-8 py-4 flex items-center justify-center cursor-pointer transition-all duration-150 whitespace-nowrap ${
            selectedType === UserType.WORKER
              ? 'border-orange-500 bg-orange-50'
              : 'border-gray-300 bg-white'
          }`}
          onClick={() => setSelectedType(UserType.WORKER)}
          role='button'
          tabIndex={0}
          onKeyDown={(e) =>
            (e.key === 'Enter' || e.key === ' ') && setSelectedType(UserType.WORKER)
          }
        >
          <span
            className={`w-5 h-5 mr-3 flex items-center justify-center border-2 rounded-full ${
              selectedType === UserType.WORKER ? 'border-orange-500' : 'border-gray-300'
            }`}
          >
            {selectedType === UserType.WORKER && (
              <span className='w-3 h-3 bg-orange-500 rounded-full block'></span>
            )}
          </span>
          <span className='text-lg font-medium whitespace-nowrap'>{t('USER.WORKER')}</span>
        </div>
      </div>
      {isStudentSelected && (
        <div className='w-full'>
          <div className='mb-3'>
            <input
              className='w-full border border-gray-300 rounded-xl px-4 py-4 text-base outline-none focus:border-orange-500 transition-colors'
              placeholder='Tên trường *'
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <input
              className='w-full border border-gray-300 rounded-xl px-4 py-4 text-base outline-none focus:border-orange-500 transition-colors'
              placeholder='Mã số sinh viên *'
              value={studentCode}
              onChange={(e) => setStudentCode(e.target.value)}
            />
          </div>
        </div>
      )}
      <div className='mt-4 w-full flex justify-center'>
        <Button
          onClick={handleContinue}
          disabled={isContinueDisabled}
          loading={isPending}
          className='w-full max-w-xs h-full px-4 py-2 text-lg font-semibold rounded-full border !border-primary !bg-orange-500 !text-white hover:!bg-white hover:!text-primary active:bg-orange-700 transition-all duration-300'
        >
          {t('BUTTON.CONTINUE')}
        </Button>
      </div>
    </div>
  );
};
