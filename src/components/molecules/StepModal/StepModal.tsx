import { UserOutlined } from '@ant-design/icons';
import { Modal, Steps } from 'antd';
import { useState } from 'react';

import './StepModal.scss';
import DashboardSection from '@app/components/UserPage/DashboardSection';
import RecommendSection from '@app/components/UserPage/RecommentSection';
import WelcomeSection from '@app/components/UserPage/WelcomeSection';

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

  const steps: Step[] = [
    {
      title: 'Personal Info',
      component: (
        <p>
          Content 1 Content 1 Content 1 Content 1 Content 1 Content 1 Content 1 Content 1 Content 1
          Content 1 Content 1
        </p>
      ),
    },
    {
      title: 'Portfolio',
      component: (
        <p>
          Content 2 Content 2 Content 2 Content 2 Content 2 Content 2 Content 2 Content 2 Content 2
          Content 2 Content 2
        </p>
      ),
    },
    {
      title: 'Review',
      component: (
        <p>
          Content 3 Content 3Content 3Content 3Content 3Content 3Content 3Content 3Content 3Content
          3 Content 3 Content 3
        </p>
      ),
    },
  ];

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
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
            size='default'
            current={currentStep}
            onChange={handleStepChange}
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
