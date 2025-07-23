import { Select, SelectProps } from 'antd';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useGetJob } from '@app/hooks';
import type { DefaultOptionType } from 'antd/es/select';
import './CustomSelect.scss';

interface JobSelectProps extends SelectProps<string[]> {
  options?: { value: string; label: JSX.Element | string }[];
}

const JobSelect: React.FC<JobSelectProps> = (props) => {
  const { data: domainData } = useGetJob();
  const { t } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const jobOptions = useMemo(() => {
    return (domainData || []).map((job) => ({
      value: job.id,
      label: job.name,
    }));
  }, [domainData]);

  useEffect(() => {
    if (!dropdownOpen) return;

    const input = selectRef.current?.querySelector(
      '.ant-select-selection-search-input',
    ) as HTMLInputElement | null;

    if (input) {
      input.setAttribute('readonly', 'true');

      const observer = new MutationObserver(() => {
        if (!input.hasAttribute('readonly')) {
          input.setAttribute('readonly', 'true');
        }
      });

      observer.observe(input, {
        attributes: true,
        attributeFilter: ['readonly'],
      });

      return () => observer.disconnect();
    }
  }, [dropdownOpen]);

  return (
    <div id='customSelect' ref={selectRef}>
      <Select
        mode='multiple'
        className='w-full'
        maxTagCount='responsive'
        maxTagTextLength={10}
        style={{ maxHeight: 'auto' }}
        placeholder={t('PLACEHOLDER.SELECT_JOB')}
        options={jobOptions}
        open={dropdownOpen}
        onOpenChange={setDropdownOpen}
        onSelect={() => setDropdownOpen(true)}
        autoClearSearchValue={false}
        showSearch
        allowClear
        filterOption={(input: string, option?: DefaultOptionType) =>
          (option?.label as string)?.toLowerCase().includes(input.toLowerCase())
        }
        {...props}
        value={props.value?.length ? props.value : undefined}
      />
    </div>
  );
};

export default JobSelect;
