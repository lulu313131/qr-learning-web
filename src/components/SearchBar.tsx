"use client";

import { useState } from "react";

type SearchBarProps = {
  onSearch: (query: string) => void;
  onClear: () => void;
};

export default function SearchBar({ onSearch, onClear }: SearchBarProps) {
  const [value, setValue] = useState("");

  const handleSearch = () => {
    const trimmed = value.trim();
    if (trimmed) onSearch(trimmed);
  };

  const handleClear = () => {
    setValue("");
    onClear();
  };

  return (
    <div className="relative mx-6 flex min-w-0 flex-1 items-center">
      <button
        type="button"
        onClick={handleSearch}
        className="absolute left-3 flex h-5 w-5 items-center justify-center text-[var(--text-muted)] transition-all duration-150 ease-in-out hover:text-[var(--accent)]"
        aria-label="搜尋"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-4 w-4"
        >
          <path
            fillRule="evenodd"
            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
        placeholder="搜尋人名或關鍵字..."
        className="h-9 w-full rounded-lg border border-[var(--border)] bg-[var(--bg-input)] py-2 pr-9 pl-9 text-base text-[var(--text-primary)] placeholder:text-[15px] placeholder:text-[var(--text-muted)] transition-all duration-150 ease-in-out focus:border-[var(--border-strong)] focus:shadow-[0_0_0_3px_var(--accent-glow)] focus:outline-none"
      />

      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 flex h-5 w-5 items-center justify-center text-[var(--text-muted)] transition-all duration-150 ease-in-out hover:text-[var(--accent)]"
          aria-label="清除搜尋"
        >
          ✕
        </button>
      )}
    </div>
  );
}
