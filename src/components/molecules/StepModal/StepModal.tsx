import { Modal, Steps } from 'antd';
import { useState } from 'react';

import './StepModal.scss';
import { DemoComponent } from './StepComponent/DemoComponent';
import DemoCondition from './StepCondition/DemoCondition';
import { StepItem, StepModalProps } from '@app/interface/stepSection.interface';

const StepModal = ({ onClose, open, onFinish }: StepModalProps) => {
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);

  const resolveShouldSkip = async (index: number): Promise<boolean> => {
    const step = steps[index];
    if (step.shouldSkip) {
      const result = await step.shouldSkip();
      return result;
    }
    return false;
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
    setLoading(true);
    const next = await findNextStepIndex(current);
    setLoading(false);

    if (next !== null) {
      setCurrent(next);
    } else {
      onFinish?.();
    }
  };

  const goBack = async () => {
    setLoading(true);
    const prev = await findPrevStepIndex(current);
    setLoading(false);
    if (prev !== null) {
      setCurrent(prev);
    } else {
      onClose?.();
    }
  };
  const steps: StepItem[] = [
    {
      title: 'Personal Info',
      render: (props) => <DemoComponent {...props} />,
      shouldSkip: DemoCondition,
    },
    {
      title: 'Portfolio',
      render: (props) => <DemoComponent {...props} />,
      shouldSkip: () => {
        return true;
      },
    },
    {
      title: 'Review',
      render: (props) => <DemoComponent {...props} />,
      shouldSkip: () => {
        return false;
      },
    },
  ];

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
            size='default'
            current={current}
            onChange={() => {
              console.log('onChange');
            }}
            items={steps.map((step) => ({
              title: step.title,
            }))}
          />
        </div>
        <div className='flex flex-col gap-4 h-[calc(100vh-200px)] max-w-[1000px] overflow-y-auto custom-scrollbar'>
          {!loading && steps[current]?.render({ goNext, goBack })}
        </div>
      </div>
    </Modal>
  );
};

export default StepModal;
