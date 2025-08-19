import { WarningOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface TimeUpPopupProps {
  visible?: boolean;
  onSubmit: () => void;
  countdownSeconds?: number;
}

const TimeUpPopup = ({ visible = false, onSubmit, countdownSeconds = 10 }: TimeUpPopupProps) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(visible);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const calcRemaining = useCallback(
    (end: number) => Math.max(Math.ceil((end - Date.now()) / 1000), 0),
    [],
  );

  const [submitCountdown, setSubmitCountdown] = useState<number>(() => {
    const endTime = localStorage.getItem('timeUpEndTime');
    if (endTime) return calcRemaining(Number(endTime));
    return countdownSeconds;
  });

  const stopTimerAndSubmit = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    localStorage.removeItem('timeUpEndTime');
    onSubmit();
  }, [onSubmit]);

  useEffect(() => {
    setIsModalOpen(visible);

    if (visible) {
      let endTime = localStorage.getItem('timeUpEndTime');
      if (!endTime) {
        endTime = (Date.now() + countdownSeconds * 1000).toString();
        localStorage.setItem('timeUpEndTime', endTime);
      }

      const end = Number(endTime);

      setSubmitCountdown(calcRemaining(end));

      timerRef.current = setInterval(() => {
        const remaining = calcRemaining(end);
        setSubmitCountdown(remaining);

        if (remaining <= 0) {
          stopTimerAndSubmit();
        }
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [visible, countdownSeconds]);

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
            onClick={() => {
              localStorage.removeItem('timeUpEndTime');
              onSubmit();
            }}
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
