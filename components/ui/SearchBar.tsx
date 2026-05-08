"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useAppStore } from "@/store/appStore";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  placeholder?: string;
}

export function SearchBar({ placeholder = "Search countries…" }: SearchBarProps) {
  const { setSearchQuery } = useAppStore();
  const [value, setValue] = useState("");
  const debounced = useDebounce(value, 350);

  useEffect(() => {
    setSearchQuery(debounced);
  }, [debounced, setSearchQuery]);

  return (
    <div className="relative group">
      <Search
        size={16}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 transition-colors group-focus-within:text-emerald-500"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full pl-10 pr-10 py-3 rounded-xl",
          "bg-zinc-900/60 border border-zinc-800",
          "text-zinc-100 placeholder:text-zinc-500 text-sm",
          "outline-none focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/10",
          "transition-all duration-200"
        )}
      />
      {value && (
        <button
          onClick={() => setValue("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-200 transition-colors"
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
