import { ExclamationCircleTwoTone } from '@ant-design/icons';
import { Button, Form, FormProps, Select } from 'antd';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { Modal } from '@app/components/molecules';
import { useHasScheduled } from '@app/hooks';

interface ExamDomainSelectModalProps {
  open: boolean;
  onClose: () => void;
  onSelectDomain: (domain: string) => void;
}

type FieldType = {
  domain?: string;
};

const ExamDomainSelectModal = ({ open, onClose, onSelectDomain }: ExamDomainSelectModalProps) => {
  const { t } = useTranslation();
  const [selectedDomain, setSelectedDomain] = useState<string>();
  const { data: hasScheduled } = useHasScheduled(selectedDomain || '');

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    onSelectDomain(values.domain || '');
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnHidden
      closable={false}
      className='p-0 m-0'
      classNames={{ content: '!rounded-3xl !pr-[0.875rem]' }}
      width={{ xs: '90%', sm: '80%', md: '70%', lg: '60%', xl: '85%', xxl: '60%' }}
    >
      <div className='custom-scrollbar overflow-y-auto max-h-[80vh] w-[80vw] lg:w-[40vw]'>
        <div className='flex flex-col items-center justify-center p-10'>
          <div className='bg-blue-100 rounded-full p-2'>
            <ExclamationCircleTwoTone className='text-[4rem] bg-blue-300 rounded-full p-2 inset-ring-4' />
          </div>
          <span className='text-base font-bold !my-5 text-center px-2 sm:text-xl md:text-2xl md:px-4 md:my-6'>
            {t('MODAL.SELECT_DOMAIN.TITLE_SELECT_EXAM_DOMAIN')}
          </span>

          <div className='px-4 w-full flex flex-col items-start md:my-6 !my-0 gap-3'>
            <p className='text-base text-gray-900 md:text-lg font-semibold'>
              <Trans i18nKey='MODAL.SELECT_DOMAIN.FORM.LABEL_YOU_ARE' components={{ br: <br /> }} />
            </p>

            <Form className='w-full' name='exam-domain' onFinish={onFinish} autoComplete='off'>
              <Form.Item<FieldType>
                name='domain'
                rules={[
                  {
                    required: true,
                    message: t<string>('MODAL.SELECT_DOMAIN.FORM.ERROR_SELECT_DOMAIN'),
                  },
                ]}
              >
                <Select
                  className='w-full h-12 md:h-14 text-base md:text-lg font-semibold'
                  placeholder={t('MODAL.SELECT_DOMAIN.FORM.PLACEHOLDER_SELECT_DOMAIN')}
                  onChange={(value) => setSelectedDomain(value)}
                  options={[
                    { value: 'AI For Fresher', label: t('MODAL.SELECT_DOMAIN.DOMAIN_OPTIONS.IT') },
                    {
                      value: 'AI For Fresher (Non-IT)',
                      label: t('MODAL.SELECT_DOMAIN.DOMAIN_OPTIONS.NON_IT'),
                    },
                  ]}
                />
              </Form.Item>

              <div className='min-h-[24px] flex items-center'>
                {hasScheduled ? (
                  <span className='text-sm text-green-600 font-semibold'>
                    {t('MODAL.SELECT_DOMAIN.MESSAGE.HAS_SCHEDULED')}
                  </span>
                ) : (
                  <span className='invisible text-sm font-semibold'>placeholder</span>
                )}
              </div>

              <div className='px-3 my-6 w-full'>
                <div className='flex flex-col gap-4 md:flex-row md:justify-center md:gap-4'>
                  <Button
                    htmlType='submit'
                    disabled={hasScheduled}
                    className={`w-full h-full text-base font-semibold px-3 py-2 rounded-full transition-colors duration-200 md:w-48 md:px-6 md:py-3 md:text-xl ${
                      hasScheduled
                        ? 'bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed'
                        : 'border !border-primary !bg-orange-500 !text-white hover:!bg-white hover:!text-primary'
                    }`}
                  >
                    {t('MODAL.SELECT_DOMAIN.BUTTON.CONTINUE')}
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ExamDomainSelectModal;
