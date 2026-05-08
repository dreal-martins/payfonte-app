import { create } from "zustand";

interface AppState {
  searchQuery: string;
  page: number;
  pageSize: number;
  activeLocale: string;
  setSearchQuery: (q: string) => void;
  setPage: (p: number) => void;
  setLocale: (l: string) => void;
  reset: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  searchQuery: "",
  page: 1,
  pageSize: 12,
  activeLocale: "en-US",
  setSearchQuery: (q) => set({ searchQuery: q, page: 1 }),
  setPage: (p) => set({ page: p }),
  setLocale: (l) => set({ activeLocale: l }),
  reset: () => set({ searchQuery: "", page: 1 }),
}));
