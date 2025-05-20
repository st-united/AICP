import { Select, SelectProps } from 'antd';
import './CustomSelect.scss';
import { useTranslation } from 'react-i18next';

import { useGetProvince } from '@app/hooks/useLocation';

interface ProvinceSelectProps extends SelectProps {
  options?: { value: string; label: JSX.Element }[];
}

const ProvinceSelect: React.FC<ProvinceSelectProps> = (props) => {
  const { t } = useTranslation();
  const { data } = useGetProvince();

  const provinceOptions =
    data?.map((province: any) => ({
      value: province.name,
      label: province.codeName,
    })) || [];
  return (
    <div id='customSelect'>
      <Select
        options={provinceOptions}
        allowClear
        placeholder={t('PLACEHOLDER.SELECT_CITY')}
        {...props}
      />
    </div>
  );
};

export default ProvinceSelect;
