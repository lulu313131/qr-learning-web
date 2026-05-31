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
    <nav className="flex flex-wrap gap-2 bg-transparent px-8 py-4">
      {TABS.map((tab) => {
        const selected = highlightTab && activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`transition-interactive rounded-[var(--radius-md)] px-5 py-2 text-sm ${
              selected
                ? "border border-transparent bg-[var(--color-primary)] font-semibold text-white"
                : "glass-card border text-[var(--color-text-main)] hover:bg-[rgba(255,255,255,0.8)]"
            }`}
            style={
              selected
                ? { boxShadow: "0 4px 12px rgba(0,118,203,0.35)" }
                : undefined
            }
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}
