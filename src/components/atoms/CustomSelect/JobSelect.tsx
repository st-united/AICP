import { Select, SelectProps } from 'antd';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useGetJob } from '@app/hooks';
import type { DefaultOptionType } from 'antd/es/select';

interface JobSelectProps extends SelectProps<string[]> {
  options?: { value: string; label: JSX.Element | string }[]; // không dùng nếu đã dùng useGetJob
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

  // ✅ Cấm nhập text bằng MutationObserver (triệt để)
  useEffect(() => {
    if (!dropdownOpen) return;

    const input = selectRef.current?.querySelector(
      '.ant-select-selection-search-input',
    ) as HTMLInputElement | null;

    if (input) {
      input.setAttribute('readonly', 'true');

      // Backup: Nếu AntD override readonly → mình quan sát và set lại
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
        className='h-10 flex items-center w-full'
        maxTagCount='responsive'
        maxTagTextLength={10}
        style={{ maxHeight: 'auto' }}
        placeholder={t('PLACEHOLDER.SELECT_JOB')}
        options={jobOptions}
        open={dropdownOpen}
        onDropdownVisibleChange={setDropdownOpen}
        onSelect={() => setDropdownOpen(true)}
        autoClearSearchValue={false}
        showSearch
        allowClear
        filterOption={(input: string, option?: DefaultOptionType) =>
          (option?.label as string)?.toLowerCase().includes(input.toLowerCase())
        }
        {...props}
      />
    </div>
  );
};

export default JobSelect;
