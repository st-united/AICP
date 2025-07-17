import {
  CheckOutlined,
  ClockCircleFilled,
  CloseOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import React, { useState } from 'react';

import './SummaryBox.scss';

import { useTranslation } from 'react-i18next';

import ResultDetail from './ResultDetail';
import { useTestResultContext } from '../../TestResultContext';

const SummaryBox = () => {
  const { data } = useTestResultContext();
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();
  const checkAnswer = () => {
    let correct = 0;
    let wrong = 0;
    data.questions.forEach((item) => {
      if (item.answers.every((answer) => answer.isCorrect)) {
        correct++;
      } else {
        wrong++;
      }
    });
    return { correct, wrong };
  };
  const items = [
    {
      label: t('TEST_RESULT.TIME'),
      value: data.elapsedTime,
      icon: <ClockCircleFilled className='text-3xl text-[#FF8C5F] thick-icon' />,
      color: 'text-[#FF8C5F]',
    },
    {
      label: t('TEST_RESULT.CORRECT'),
      value: checkAnswer().correct,
      icon: <CheckOutlined className='text-3xl text-[#52c41a] thick-icon' />,
      color: 'text-[#52c41a]',
    },
    {
      label: t('TEST_RESULT.WRONG'),
      value: checkAnswer().wrong,
      icon: <CloseOutlined className='text-3xl text-[#ff4d4f] !font-bold thick-icon' />,
      color: 'text-[#ff4d4f]',
    },
    {
      label: t('TEST_RESULT.SKIPPED'),
      value: data.questions.length - checkAnswer().correct - checkAnswer().wrong,
      icon: <MinusCircleOutlined className='text-3xl text-[#bfbfbf] thick-icon' />,
      color: 'text-[#bfbfbf]',
    },
  ];
  return (
    <div className=' flex flex-col items-center w-full mx-auto mt-6 text-xl'>
      <h3 className='text-4xl font-[700] mb-4 text-[#fe7743]'>{t('TEST_RESULT.SUMMARY')}</h3>
      <p className='mb-6 text-gray-700 text-xl'>{t('TEST_RESULT.SUMMARY_DESC')}</p>
      <div className='grid grid-cols-1 sm:grid-cols-2 mdM:grid-cols-4 w-full mb-4 gap-4 mdL:gap-16'>
        {items.map((item, idx) => (
          <div
            key={item.label as string}
            className='flex flex-col items-center bg-[#FF8C5F0F] rounded-xl p-4 shadow-lg shadow-black/40 h-full'
          >
            <div className='text-2xl mb-2'>{item.icon}</div>
            <div className='text-2xl font-bold mb-1'>{item.value}</div>
            <div className={`text-xl text-center ${item.color} text-nowrap`}>{item.label}</div>
          </div>
        ))}
      </div>
      <div className='flex justify-end w-full'>
        <Button
          type='primary'
          className='rounded-full text-lg font-bold px-6 py-5'
          onClick={() => {
            setVisible(true);
          }}
        >
          {t('TEST_RESULT.DETAIL')}
        </Button>
      </div>
      <ResultDetail visible={visible} onClose={() => setVisible(false)} examResult={data} />
    </div>
  );
};

export default SummaryBox;
