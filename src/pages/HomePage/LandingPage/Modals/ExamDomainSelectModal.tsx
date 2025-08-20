import { CloseCircleOutlined, ExclamationCircleTwoTone } from '@ant-design/icons';

import { Modal } from '@app/components/molecules';
import { HeaderModal } from './HeaderModal';
import { Trans, useTranslation } from 'react-i18next';
import { Button, Form, FormProps, Select } from 'antd';

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
      width={{
        xs: '90%',
        sm: '80%',
        md: '70%',
        lg: '60%',
        xl: '85%',
        xxl: '60%',
      }}
    >
      <div className='custom-scrollbar overflow-y-auto max-h-[80vh] w-[80vw] lg:w-[40vw]'>
        <div className='flex flex-col items-center justify-center p-10'>
          <div className='bg-blue-100 rounded-full p-2'>
            <ExclamationCircleTwoTone className='text-[4rem] bg-blue-300 rounded-full p-2 inset-ring-4' />
          </div>
          <span className='text-base font-bold !my-5 text-center px-2 sm:text-xl md:text-2xl md:px-4 md:my-6'>
            {t('MODAL.TITLE_SELECT_EXAM_DOMAIN')}
          </span>
          <div className='px-4 w-full flex flex-col items-start md:my-6 !my-0 gap-3'>
            <p className='text-base text-gray-900 md:text-lg font-semibold'>
              <Trans i18nKey='Bạn là' components={{ br: <br /> }} />
            </p>
            <Form className='w-full' name='basic' onFinish={onFinish} autoComplete='off'>
              <Form.Item<FieldType>
                name='domain'
                rules={[{ required: true, message: 'Vui lòng chọn ngành nghề của bạn' }]}
              >
                <Select
                  className='w-full h-12 md:h-14 text-base md:text-lg font-semibold'
                  placeholder={'Chọn ngành nghề của bạn'}
                  options={[
                    { value: 'AI For Fresher', label: 'Lập trình viên' },
                    {
                      value: 'AI For Fresher (Non-IT)',
                      label: 'Ngành nghề khác',
                    },
                  ]}
                />
              </Form.Item>
              <div className='px-3 my-6 w-full'>
                <div className='flex flex-col gap-4 md:flex-row md:justify-center md:gap-4'>
                  <Button
                    htmlType='submit'
                    className='w-full h-full text-base font-semibold border !border-primary px-3 py-2 rounded-full !bg-orange-500 hover:!bg-white hover:!text-primary !text-white transition-colors duration-200 md:w-48 md:px-6 md:py-3 md:text-xl'
                  >
                    {t('BUTTON.CONTINUE')}
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
