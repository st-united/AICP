import { Select, SelectProps } from 'antd';
import './CustomSelect.scss';
import { useTranslation } from 'react-i18next';

interface ProvinceSelectProps extends SelectProps {
  options?: { value: string; label: JSX.Element }[];
}

const countryOptions = [
  { value: 'vn', label: <span>Việt Nam</span> },
  { value: 'us', label: <span>United States</span> },
  { value: 'jp', label: <span>Japan</span> },
];

const ProvinceSelect: React.FC<ProvinceSelectProps> = (props) => {
  const { t } = useTranslation();
  return (
    <div id='customSelect'>
      <Select
        allowClear
        options={countryOptions}
        placeholder={t('PLACEHOLDER.SELECT_CITY')}
        {...props}
      />
    </div>
  );
};

export default ProvinceSelect;
