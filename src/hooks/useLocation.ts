import { useQuery } from '@tanstack/react-query';

import { fetchCountries, fetchProvinces } from '@app/services/locationAPI';

export const useGetCountry = () => {
  return useQuery({
    queryKey: ['countries'],
    queryFn: fetchCountries,
  });
};

export const useGetProvince = () => {
  return useQuery({
    queryKey: ['provinces'],
    queryFn: fetchProvinces,
  });
};
