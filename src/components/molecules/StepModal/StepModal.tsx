import { LoadingOutlined } from '@ant-design/icons';
import { Modal, Steps } from 'antd';
import { useState } from 'react';

import './StepModal.scss';
import { DemoComponent } from './StepComponent/DemoComponent';
import DemoCondition from './StepCondition/DemoCondition';
import { StepItem, StepModalProps } from '@app/interface/stepSection.interface';

const StepModal = ({ onClose, open, onFinish }: StepModalProps) => {
  const steps: StepItem[] = [
    {
      title: 'Personal Info',
      render: (props) => <DemoComponent {...props} />,
      shouldSkip: DemoCondition,
    },
    {
      title: 'Portfolio',
      render: (props) => <DemoComponent {...props} />,
      shouldSkip: DemoCondition,
    },
    {
      title: 'Review',
      render: (props) => <DemoComponent {...props} />,
      shouldSkip: () => false,
    },
  ];

  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState<number | null>(null);

  const resolveShouldSkip = async (index: number): Promise<boolean> => {
    setLoading(index);
    const step = steps[index];
    let result = false;
    if (step.shouldSkip) {
      result = await step.shouldSkip();
    }
    setLoading(null);
    return result;
  };

  const findNextStepIndex = async (from: number): Promise<number | null> => {
    for (let i = from + 1; i < steps.length; i++) {
      const skip = await resolveShouldSkip(i);
      if (!skip) return i;
    }
    return null;
  };

  const findPrevStepIndex = async (from: number): Promise<number | null> => {
    for (let i = from - 1; i >= 0; i--) {
      const skip = await resolveShouldSkip(i);
      if (!skip) return i;
    }
    return null;
  };

  const goNext = async () => {
    const next = await findNextStepIndex(current);
    if (next !== null) {
      setCurrent(next);
    } else {
      onFinish?.();
    }
  };

  const goBack = async () => {
    const prev = await findPrevStepIndex(current);
    if (prev !== null) {
      setCurrent(prev);
    } else {
      onClose?.();
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      className='step-modal'
      width={{ xs: '100%', md: '70%', lg: '60%' }}
    >
      <div className='flex flex-col items-start justify-start gap-4 py-4 md:py-6 lg:py-8'>
        <div className='w-full sticky top-0 z-10 bg-white custom-steps'>
          <Steps
            className='!cursor-pointer'
            size='default'
            current={current}
            onChange={() => {
              console.log('onChange');
            }}
            items={steps.map((step, idx) => ({
              title: step.title,
              disabled: true,
              icon:
                loading === idx ? (
                  <LoadingOutlined className='!text-[#42160b] font-[900] !text-center' />
                ) : undefined,
            }))}
          />
        </div>
        <div className='flex flex-col gap-4 h-[calc(100vh-200px)] max-w-[1000px] overflow-y-auto custom-scrollbar'>
          {steps[current]?.render({ goNext, goBack })}
        </div>
      </div>
    </Modal>
  );
};

export default StepModal;
