import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { fetchCountries } from "@/lib/api";
import { useAppStore } from "@/store/appStore";
import { Country } from "@/types/country";

export const COUNTRIES_QUERY_KEY = ["countries"] as const;

export function useCountries() {
  const { searchQuery, page, pageSize } = useAppStore();

  const query = useQuery({
    queryKey: COUNTRIES_QUERY_KEY,
    queryFn: fetchCountries,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  const filtered = useMemo<Country[]>(() => {
    if (!query.data) return [];
    const q = searchQuery.toLowerCase().trim();
    if (!q) return query.data;
    return query.data.filter(
      (c) =>
        c.countryName?.toLowerCase().includes(q) ||
        c.countryCode?.toLowerCase().includes(q) ||
        c.currency?.toLowerCase().includes(q),
    );
  }, [query.data, searchQuery]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return {
    ...query,
    countries: paginated,
    filteredCount: filtered.length,
    totalCount: query.data?.length ?? 0,
    totalPages,
  };
}
