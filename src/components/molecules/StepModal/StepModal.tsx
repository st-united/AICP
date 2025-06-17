import { Button, Modal, Steps } from 'antd';
import { useEffect, useState } from 'react';

import './StepModal.scss';
import PortfolioContent from '../Portfolio/PortfolioContent';
import { useGetPortfolio } from '@app/hooks/usePortfolio';
import PortfolioPage from '@app/pages/Portfolio/PortfolioPage';

interface StepModalProps {
  current?: number;
  onClose: () => void;
  open: boolean;
}

type StepStatus = 'finish' | 'wait' | 'process' | 'error';

interface Step {
  title: string;
  icon?: React.ReactNode;
  status?: StepStatus;
  component: React.ReactNode;
}

const StepModal = ({ current, onClose, open }: StepModalProps) => {
  const [currentStep, setCurrentStep] = useState(current || 0);
  const { data: portfolio, isSuccess: isHavePortfolio } = useGetPortfolio();

  const handleChangeToPortfolioStep = () => {
    if (isHavePortfolio) {
      setCurrentStep(2);
    } else setCurrentStep(1);
  };
  const handleVerifyStep = () => {
    setCurrentStep(0);
  };
  const handleChangeToTestNoteStep = () => {
    setCurrentStep(2);
  };
  const handleEndStep = () => {
    setCurrentStep(2);
  };
  const steps: Step[] = [
    {
      title: 'Personal Info',
      component: (
        <Button
          type='primary'
          onClick={() => {
            handleChangeToPortfolioStep();
          }}
        >
          Next
        </Button>
      ),
    },
    {
      title: 'Portfolio',
      component: (
        <PortfolioPage
          portfolio={portfolio || undefined}
          onSave={() => {
            handleChangeToTestNoteStep();
          }}
          onCancel={() => {
            handleChangeToTestNoteStep();
          }}
        />
      ),
    },
    {
      title: 'Review',
      component: (
        <Button
          type='primary'
          onClick={() => {
            handleEndStep();
          }}
        >
          Next
        </Button>
      ),
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
            current={currentStep}
            items={steps.map((step) => ({
              title: step.title,
              status: step.status,
              icon: step.icon,
            }))}
          />
        </div>
        <div className='flex flex-col gap-4 h-[calc(100vh-200px)] max-w-[1000px] overflow-y-auto custom-scrollbar'>
          {steps[currentStep]?.component}
        </div>
      </div>
    </Modal>
  );
};

export default StepModal;
