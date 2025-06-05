import { WarningOutlined } from '@ant-design/icons';
import { Button, Divider, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useCountdown } from '@app/hooks';

interface CountdownTimerProps {
  duration: number;
  onTimeUp: () => void;
}

const CountdownTimer = ({ duration, onTimeUp }: CountdownTimerProps) => {
  const { t } = useTranslation();
  const { hours, minutes, seconds, formatTime } = useCountdown(duration);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitCountdown, setSubmitCountdown] = useState(10);

  useEffect(() => {
    if (hours === 0 && minutes === 0 && seconds === 0) {
      setIsModalOpen(true);
    }
  }, [hours, minutes, seconds]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isModalOpen && submitCountdown > 0) {
      timer = setInterval(() => {
        setSubmitCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            onTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isModalOpen, submitCountdown, onTimeUp]);

  const timeUnits = [
    { value: formatTime(hours), label: t('TEST.HOURS') },
    { value: formatTime(minutes), label: t('TEST.MINUTES') },
    { value: formatTime(seconds), label: t('TEST.SECONDS') },
  ];

  return (
    <>
      <div className='bg-white rounded-xl p-6 shadow-lg border border-gray-100'>
        <h2 className='text-xl font-bold text-center text-blue-900 mb-4'>{t('TEST.TIME_LEFT')}</h2>
        <div className='border-t border-gray-200 pt-4'>
          <div className='grid grid-cols-3 gap-3'>
            {timeUnits.map(({ value, label }, index) => (
              <div key={index} className='text-center'>
                <div className='text-3xl font-bold text-gray-900 mb-1'>{value}</div>
                <div className='text-sm text-gray-600 font-medium'>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        width={700}
        open={isModalOpen}
        footer={null}
        closable={false}
        maskClosable={false}
        centered
      >
        <div className='flex flex-col gap-4 p-4'>
          <div className='flex items-center justify-center '>
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
            <Button className='bg-[#FE7743] border-2 border-[#ff682d] rounded-3xl text-white px-8 py-2 h-full text-lg font-bold hover:bg-[#ff5029] hover:border-[#ff5029] hover:text-white'>
              {t('BUTTON.SUBMIT')}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CountdownTimer;
