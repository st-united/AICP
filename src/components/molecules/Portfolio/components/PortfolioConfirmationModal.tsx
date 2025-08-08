import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, Button } from 'antd';
import React from 'react';

// import { WarningIcon } from '@app/assets/svgs/NotificationIcon';

interface PortfolioConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onContinue: () => void;
  missingItems: { name: string; onClick: () => void }[];
  t: (key: string) => string;
}

const PortfolioConfirmationModal: React.FC<PortfolioConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  onContinue,
  missingItems,
  t,
}) => {
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={600}
      centered
      className='portfolio-confirmation-modal'
    >
      <div className='text-center p-6'>
        <div className='mb-4'>
          <div className='inline-flex items-center justify-center'>
            {/* <img src={WarningIcon} alt='warning' className='w-20 h-20' /> */}
          </div>
        </div>

        <h2 className='text-xl font-bold mb-4'>{t('PORTFOLIO.CONFIRM_SUBMIT_TITLE')}</h2>

        <p className='mb-4 text-left'>{t('PORTFOLIO.INCOMPLETE_INFO_WARNING')}</p>

        {missingItems.length > 0 && (
          <div className='mb-4 text-left'>
            <ul className='list-none space-y-1'>
              {missingItems.map((item, index) => (
                <li key={index} className='flex items-center'>
                  <Button
                    type='text'
                    onClick={item.onClick}
                    className='flex items-center !font-bold text-[#FE7743] hover:!bg-transparent'
                  >
                    <div className='w-2 h-2 bg-[#FE7743] rounded-full mr-3'></div>
                    {item.name}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className=' mb-4 text-left'>{t('PORTFOLIO.COMPLETE_INFO_BENEFITS')}</p>

        <div className='mb-6 text-left'>
          <ul className='list-none space-y-1'>
            <li className='flex items-center '>
              <div className='w-2 h-2 bg-gray-700 rounded-full mr-3'></div>
              {t('PORTFOLIO.BENEFIT_ACCURATE_LEVEL')}
            </li>
            <li className='flex items-center '>
              <div className='w-2 h-2 bg-gray-700 rounded-full mr-3'></div>
              {t('PORTFOLIO.BENEFIT_BETTER_ROADMAP')}
            </li>
          </ul>
        </div>

        <div className='flex gap-3 justify-center'>
          <Button
            onClick={onConfirm}
            className='px-6 py-2 border border-orange-500 text-orange-500 bg-white hover:bg-orange-50 rounded-lg'
          >
            {t('PORTFOLIO.SUBMIT_NOW')}
          </Button>
          <Button
            type='primary'
            onClick={onContinue}
            className='px-6 py-2 bg-orange-500 border-orange-500 text-white hover:bg-orange-600 rounded-lg'
          >
            {t('PORTFOLIO.CONTINUE_SUPPLEMENT')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default PortfolioConfirmationModal;
