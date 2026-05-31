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
            className={`rounded-t-lg border px-5 py-2 text-base transition-all duration-150 ease-in-out hover:scale-[1.01] ${
              selected
                ? "border-[var(--border-strong)] border-b-[3px] border-b-[var(--accent)] bg-[var(--bg-card)] font-semibold text-[var(--accent)]"
                : "border-[var(--border)] bg-transparent text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-primary)]"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}
