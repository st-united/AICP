import { CountriesResponse } from '@app/interface/location.interface';

export const fetchCountries = async (): Promise<CountriesResponse> => {
  const response = await fetch('https://open.oapi.vn/location/countries');
  if (!response.ok) {
    throw new Error('Failed to fetch countries');
  }
  return response.json();
};
