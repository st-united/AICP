import { Divider } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface CountdownTimerProps {
  initialTime: number;
}

const CountTime = ({ initialTime }: CountdownTimerProps) => {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (value: number) => value.toString().padStart(2, '0');

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className='flex flex-col w-full rounded-[20px] p-8 shadow-custom bg-white'>
      <span className='flex justify-center text-2xl font-bold w-full text-[#02185B]'>
        {t('TEST.TIME_LEFT')}
      </span>
      <Divider />
      <div className='grid grid-cols-3 gap-4'>
        {[
          { value: formatTime(hours), label: t('TEST.HOURS') },
          { value: formatTime(minutes), label: t('TEST.MINUTES') },
          { value: formatTime(seconds), label: t('TEST.SECONDS') },
        ].map((time, index) => (
          <div key={index} className='flex flex-col p-4 text-black'>
            <div className='text-center text-2xl font-bold'>{time.value}</div>
            <div className='text-center text-base font-medium text-[#686868]'>{time.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountTime;
