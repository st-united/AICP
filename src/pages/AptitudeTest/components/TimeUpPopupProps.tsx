import { WarningOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface TimeUpPopupProps {
  visible?: boolean;
  onSubmit: () => void;
  countdownSeconds?: number;
}

const TimeUpPopup = ({ visible = false, onSubmit, countdownSeconds = 10 }: TimeUpPopupProps) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(visible);
  const [submitCountdown, setSubmitCountdown] = useState(countdownSeconds);

  useEffect(() => {
    setIsModalOpen(visible);
    setSubmitCountdown(countdownSeconds);
  }, [visible, countdownSeconds]);

  useEffect(() => {
    if (!isModalOpen) return;
    let timer: NodeJS.Timeout;

    timer = setInterval(() => {
      setSubmitCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isModalOpen, onSubmit]);

  return (
    <Modal
      width={700}
      open={isModalOpen}
      footer={null}
      closable={false}
      maskClosable={false}
      centered
    >
      <div className='flex flex-col gap-4 p-4'>
        <div className='flex items-center justify-center'>
          <div className='p-3 bg-[#FEEEEE] rounded-full'>
            <div className='flex p-4 bg-[#FFDEDE] rounded-full'>
              <WarningOutlined className='flex text-[45px] text-[#FF0000]' />
            </div>
          </div>
        </div>
        <h2 className='text-2xl font-bold text-black mb-4 text-center'>{t('TEST.TIME_UP')}</h2>
        <p className='text-lg font-medium mb-4'>{t('TEST.TIME_UP_MESSAGE')}</p>
        <p className='text-lg font-bold text-[#FF0B0B]'>
          {t('TEST.AUTO_SUBMIT_MESSAGE_2', { countdown: submitCountdown })}
        </p>
        <div className='flex items-center justify-center mt-4'>
          <Button
            onClick={onSubmit}
            className='bg-[#FE7743] border-2 border-[#ff682d] rounded-3xl text-white px-8 py-2 h-full text-lg font-bold hover:bg-[#ff5029] hover:border-[#ff5029] hover:text-white'
          >
            {t('BUTTON.SUBMIT')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TimeUpPopup;
