export interface Country {
  id: string;
  name: string;
  niceName: string;
  iso: string;
  iso3: string;
  numCode: number | null;
  phoneCode: number;
  flag: string;
}

export interface CountriesResponse {
  total: number;
  data: Country[];
  code: string;
  message: string | null;
}
