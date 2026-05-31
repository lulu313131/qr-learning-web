"use client";

import { TABS } from "@/lib/constants";
import type { TabId } from "@/lib/types";

type TabBarProps = {
  activeTab: TabId;
  highlightTab: boolean;
  onTabChange: (tab: TabId) => void;
};

export default function TabBar({
  activeTab,
  highlightTab,
  onTabChange,
}: TabBarProps) {
  return (
    <nav className="flex flex-wrap gap-1 border-b border-[var(--border)] bg-[var(--bg-base)] px-6 pt-4">
      {TABS.map((tab) => {
        const selected = highlightTab && activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`rounded-t-[10px] border px-5 py-2.5 text-[15px] transition-all duration-150 ease-in-out ${
              selected
                ? "border-[var(--accent)] bg-[var(--accent)] font-semibold text-white"
                : "border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--accent)]"
            }`}
            style={
              selected
                ? { boxShadow: "var(--shadow-md)" }
                : { boxShadow: "var(--shadow-sm)" }
            }
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}
