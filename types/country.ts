export interface Country {
  countryCode: string;
  countryName: string;
  currency: string;
  currencyCode: string;
  countryId?: string;
  flag?: string;
}

export interface CountriesResponse {
  data: Country[];
  status: string;
  message?: string;
}

export interface FilterState {
  query: string;
  page: number;
  pageSize: number;
}
