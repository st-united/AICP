import { Select, SelectProps } from 'antd';
import './CustomSelect.scss';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useGetJob } from '@app/hooks';

interface ProvinceSelectProps extends SelectProps {
  options?: { value: string; label: JSX.Element }[];
}

const JobSelect: React.FC<ProvinceSelectProps> = (props) => {
  const { data: domainData, isLoading } = useGetJob();

  const jobOptions = useMemo(() => {
    return (domainData || []).map((job) => ({
      value: job.id,
      label: job.name,
    }));
  }, [domainData]);
  const { t } = useTranslation();
  return (
    <div id='customSelect'>
      <Select
        allowClear
        options={jobOptions}
        placeholder={t('PLACEHOLDER.SELECT_JOB')}
        {...props}
      />
    </div>
  );
};

export default JobSelect;
