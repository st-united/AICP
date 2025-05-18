import { useQuery } from '@tanstack/react-query';

import { fetchCountries } from '@app/services/locationAPI';

export const useGetCountry = () => {
  return useQuery({
    queryKey: ['countries'],
    queryFn: fetchCountries,
  });
};
