import axios from "axios";
import { Country, CountriesResponse } from "@/types/country";

const BASE_URL = "https://api.payfonte.com/payfusion/public/v1";

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function fetchCountries(): Promise<Country[]> {
  const { data } = await api.get<CountriesResponse>("/countries");

  const list: unknown = data?.data ?? data;
  if (!Array.isArray(list)) {
    throw new Error("Unexpected response shape from /countries");
  }
  return list as Country[];
}
