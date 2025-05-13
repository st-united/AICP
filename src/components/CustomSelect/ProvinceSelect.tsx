import { Select, SelectProps } from 'antd';
import './CustomSelect.scss';

interface ProvinceSelectProps extends SelectProps {
  options?: { value: string; label: JSX.Element }[];
}

const countryOptions = [
  { value: 'vn', label: <span>Việt Nam</span> },
  { value: 'us', label: <span>United States</span> },
  { value: 'jp', label: <span>Japan</span> },
];

const ProvinceSelect: React.FC<ProvinceSelectProps> = (props) => {
  return (
    <div id='customSelect'>
      <Select options={countryOptions} placeholder='Chọn tỉnh thành' {...props} />
    </div>
  );
};

export default ProvinceSelect;
