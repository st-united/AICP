import { QuestionOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
const { confirm } = Modal;
import { t } from 'i18next';

export const showSkipInterviewConfirmation = (onConfirm: () => void) => {
  confirm({
    icon: (
      <div className='w-full pb-1'>
        <div className='w-12 h-12 mx-auto bg-[#BBDBFF] rounded-full flex items-center justify-center shadow-[0_0_0_6px_rgba(230,241,255,0.5)]'>
          <QuestionOutlined className='text-2xl text-blue-500' />
        </div>
      </div>
    ),
    title: (
      <div className='text-center text-lg font-semibold text-black'>
        {t('SKIP_INTERVIEW.TITLE')}
      </div>
    ),
    content: (
      <p className='text-center text-sm text-gray-700 leading-relaxed'>
        {t('SKIP_INTERVIEW.DESCRIPTION')}
      </p>
    ),
    okText: t('SKIP_INTERVIEW.OK'),
    cancelText: t('SKIP_INTERVIEW.CANCEL'),
    centered: true,
    okButtonProps: {
      type: 'default',
      className: 'bg-[#FE7743] border-none rounded-full px-6 py-1 text-white hover:bg-[#ff8857]',
    },
    cancelButtonProps: {
      type: 'default',
      className:
        'border border-[#FE7743] text-[#FE7743] rounded-full px-6 py-1 hover:text-orange-600 hover:border-orange-500',
    },
    onOk: onConfirm,
    className:
      'ant-modal-confirm [&_.ant-modal-confirm-body]:block max-sm:[&_.ant-modal-content]:w-4/5 max-sm:[&_.ant-modal-content]:mx-auto max-sm:[&_.ant-modal-confirm-btns]:text-center',
  });
};

export default showSkipInterviewConfirmation;
