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
    <div className="relative flex min-w-0 flex-1 items-center">
      <button
        type="button"
        onClick={handleSearch}
        className="transition-interactive absolute left-3.5 flex h-5 w-5 items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]"
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
        className="transition-interactive h-10 w-full rounded-[var(--radius-md)] border border-[rgba(255,255,255,0.8)] bg-[rgba(255,255,255,0.6)] py-0 pr-9 pl-[38px] text-base text-[var(--color-text-main)] placeholder:text-[var(--color-text-secondary)] focus:border-[var(--color-primary)] focus:shadow-[var(--shadow-focus)] focus:outline-none"
      />

      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="transition-interactive absolute right-3.5 flex h-5 w-5 items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]"
          aria-label="清除搜尋"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4"
          >
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      )}
    </div>
  );
}
