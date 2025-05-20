import { CountriesResponse, Province } from '@app/interface/location.interface';

export const fetchCountries = async (): Promise<CountriesResponse> => {
  const response = await fetch('https://open.oapi.vn/location/countries');
  if (!response.ok) {
    throw new Error('Failed to fetch countries');
  }
  return response.json();
};

export const fetchProvinces = async (): Promise<Province[]> => {
  const response = await fetch('https://provinces.open-api.vn/api/p/');
  if (!response.ok) {
    throw new Error('Failed to fetch province');
  }
  return response.json();
};
