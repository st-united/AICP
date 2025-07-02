import { Select, SelectProps } from 'antd';
import './CustomSelect.scss';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useGetJob } from '@app/hooks';

interface JobSelectProps extends SelectProps<string[]> {
  options?: { value: string; label: JSX.Element | string }[];
}

const JobSelect: React.FC<JobSelectProps> = (props) => {
  const { data: domainData } = useGetJob();
  const { t } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const jobOptions = useMemo(() => {
    return (domainData || []).map((job) => ({
      value: job.id,
      label: job.name,
    }));
  }, [domainData]);

  return (
    <div id='customSelect'>
      <Select
        mode='multiple'
        className='h-10 flex items-center w-full'
        maxTagCount='responsive'
        maxTagTextLength={10}
        style={{ maxHeight: 'auto' }}
        placeholder={t('PLACEHOLDER.SELECT_JOB')}
        options={jobOptions}
        open={dropdownOpen}
        onDropdownVisibleChange={(open) => setDropdownOpen(open)}
        onSelect={() => setDropdownOpen(true)}
        autoClearSearchValue={false}
        showSearch
        allowClear
        {...props}
      />
    </div>
  );
};

export default JobSelect;
