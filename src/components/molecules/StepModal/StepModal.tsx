import { LoadingOutlined } from '@ant-design/icons';
import { Modal, Steps } from 'antd';
import { FC, useState, useMemo, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import './StepModal.scss';
import BeforeTestComponent from './StepComponent/BeforeTestComponent';
import { DemoComponent } from './StepComponent/DemoComponent';
import PortfolioComponent from './StepComponent/PortfolioComponent';
import { useDemoCondition } from './StepCondition/DemoCondition';
import { usePortfolioCondition } from './StepCondition/PortfolioCondition';
import { StepItem, StepModalProps } from '@app/interface/stepSection.interface';

const StepModal: FC<StepModalProps> = ({ onClose, open, onFinish }) => {
  const { t } = useTranslation();
  const { isPass, isLoading } = useDemoCondition();
  const { isPass: havePortfolio, isLoading: loadingPortfolio } = usePortfolioCondition();
  const [current, setCurrent] = useState(0);
  const [autoSkipping, setAutoSkipping] = useState(true);

  const steps = useMemo<StepItem[]>(
    () => [
      {
        title: t('STEP_MODAL.PHONE_INFO'),
        render: (props) => <DemoComponent {...props} />,
        shouldSkip: false,
        loading: isLoading,
      },
      {
        title: t('STEP_MODAL.PERSONAL_INFO'),
        render: (props) => <PortfolioComponent {...props} />,
        shouldSkip: havePortfolio,
        loading: loadingPortfolio,
      },
      {
        title: t('STEP_MODAL.START_CONFIRM_TEST'),
        render: (props) => <BeforeTestComponent {...props} />,
        shouldSkip: false,
      },
    ],
    [t, isLoading, havePortfolio, loadingPortfolio],
  );

  const goNext = useCallback(async () => {
    if (current < steps.length - 1) {
      setCurrent(current + 1);
    } else {
      setCurrent(0);
      onFinish?.();
    }
  }, [current, onFinish, steps.length]);

  const goBack = useCallback(async () => {
    if (current > 0) {
      setCurrent(current - 1);
    } else {
      onClose?.();
    }
  }, [current, onClose]);

  useEffect(() => {
    const currentStep = steps[current];
    if (!currentStep || !autoSkipping) return;
    if (!currentStep.loading && currentStep.shouldSkip) {
      const timer = setTimeout(() => {
        goNext();
      }, 0);
      return () => clearTimeout(timer);
    } else if (currentStep.shouldSkip === false && !currentStep.loading) {
      setAutoSkipping(false);
    }
  }, [current, steps, goNext, autoSkipping]);

  return (
    <Modal open={open} onCancel={onClose} footer={null} centered className='step-modal'>
      <div className='flex flex-col items-start justify-start h-full'>
        <div className='w-full sticky top-0 z-10 bg-white custom-steps'>
          <Steps
            className='!cursor-pointer'
            size='default'
            current={current}
            onChange={setCurrent}
            items={steps.map((step) => ({
              title: step.title,
              icon:
                steps[current] === step && step.loading ? (
                  <div className='w-full h-full flex items-center justify-center'>
                    <LoadingOutlined className='!text-[#42160b] font-[900] !text-center' />
                  </div>
                ) : undefined,
            }))}
          />
        </div>

        <div className='scroll-content custom-scrollbar w-full smL:min-w-[700px] lg:min-w-[1000px]'>
          {!autoSkipping && steps[current]?.render({ goNext, goBack })}
        </div>
      </div>
    </Modal>
  );
};

export default StepModal;
