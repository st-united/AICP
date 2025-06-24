import { LoadingOutlined } from '@ant-design/icons';
import { Modal, Steps } from 'antd';
import { FC, useState, useMemo, useEffect, useCallback } from 'react';

import './StepModal.scss';
import { DemoComponent } from './StepComponent/DemoComponent';
import { useDemoCondition } from './StepCondition/DemoCondition';
import { StepItem, StepModalProps } from '@app/interface/stepSection.interface';

enum NAVIGATION {
  NEXT = 'NEXT',
  BACK = 'BACK',
}

const StepModal: FC<StepModalProps> = ({ onClose, open, onFinish }) => {
  const { isPass, isLoading } = useDemoCondition();
  const [nav, setNav] = useState<NAVIGATION>(NAVIGATION.NEXT);
  const [current, setCurrent] = useState(0);

  const steps = useMemo<StepItem[]>(
    () => [
      {
        title: 'Personal Info',
        render: (props) => <DemoComponent {...props} />,
        shouldSkip: isPass,
        loading: isLoading,
      },
      {
        title: 'Portfolio',
        render: (props) => <DemoComponent {...props} />,
        shouldSkip: isPass,
        loading: isLoading,
      },
      {
        title: 'Review',
        render: (props) => <DemoComponent {...props} />,
        shouldSkip: false,
      },
    ],
    [isPass, isLoading],
  );

  const goNext = useCallback(async () => {
    setNav(NAVIGATION.NEXT);
    if (current < steps.length - 1) {
      setCurrent(current + 1);
    } else {
      setCurrent(0);
      onFinish?.();
    }
  }, [current, onFinish, steps.length]);

  const goBack = useCallback(async () => {
    setNav(NAVIGATION.BACK);
    if (current > 0) {
      setCurrent(current - 1);
    } else {
      onClose?.();
    }
  }, [current, onClose]);

  useEffect(() => {
    const currentStep = steps[current];
    if (!currentStep) return;
    if (!currentStep.loading && currentStep.shouldSkip) {
      const timer = setTimeout(() => {
        if (nav === NAVIGATION.NEXT) {
          goNext();
        } else {
          goBack();
        }
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [current, steps, nav, goNext, goBack]);

  return (
    <Modal open={open} onCancel={onClose} footer={null} centered className='step-modal'>
      <div className='flex flex-col items-start justify-start gap-4 py-4 md:py-6 lg:py-8'>
        <div className='w-full sticky top-0 z-10 bg-white custom-steps'>
          <Steps
            className='!cursor-pointer'
            size='default'
            current={current}
            items={steps.map((step) => ({
              title: step.title,
              disabled: true,
              icon:
                steps[current] === step && step.loading ? (
                  <LoadingOutlined className='!text-[#42160b] font-[900] !text-center' />
                ) : undefined,
            }))}
          />
        </div>
        <div className='flex flex-col gap-4 h-[calc(100vh-200px)] w-full md:min-w-[1000px] overflow-y-auto custom-scrollbar'>
          {steps[current] &&
            !steps[current].loading &&
            !steps[current].shouldSkip &&
            steps[current]?.render({ goNext, goBack })}
        </div>
      </div>
    </Modal>
  );
};

export default StepModal;
