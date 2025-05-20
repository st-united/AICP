import { Select, SelectProps, Spin } from 'antd';
import { useTranslation } from 'react-i18next';

import { useGetCountry } from '@app/hooks/useLocation';
import './CustomSelect.scss';

interface CountrySelectProps extends SelectProps {
  options?: { value: string; label: JSX.Element }[];
}

const CountrySelect: React.FC<CountrySelectProps> = (props) => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetCountry();

  const countryOptions =
    data?.data.map((country) => ({
      value: country.iso.toLowerCase(),
      label: (
        <div className='country-option'>
          <img src={country.flag} alt={country.niceName} className='country-flag' />
          <span>{country.niceName}</span>
        </div>
      ),
    })) || [];

  return (
    <div id='customSelect'>
      <Select
        allowClear
        options={countryOptions}
        placeholder={t('PLACEHOLDER.SELECT_COUNTRY')}
        loading={isLoading}
        notFoundContent={isLoading ? <Spin size='small' /> : null}
        {...props}
      />
    </div>
  );
};

export default CountrySelect;
