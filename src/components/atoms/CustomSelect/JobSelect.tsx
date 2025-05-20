import { Select, SelectProps } from 'antd';
import './CustomSelect.scss';
import { useTranslation } from 'react-i18next';

interface ProvinceSelectProps extends SelectProps {
  options?: { value: string; label: JSX.Element }[];
}

const jobOptions = [
  { value: 'developer', label: 'Developer' },
  { value: 'designer', label: 'Designer' },
  { value: 'manager', label: 'Manager' },
  { value: 'qa', label: 'QA' },
  { value: 'hr', label: 'HR' },
  { value: 'other', label: 'Other' },
];

const JobSelect: React.FC<ProvinceSelectProps> = (props) => {
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
