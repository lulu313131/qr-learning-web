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
    <nav className="flex flex-wrap gap-1 border-b border-[rgba(180,210,240,0.4)] bg-transparent px-6 pt-4">
      {TABS.map((tab) => {
        const selected = highlightTab && activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`rounded-t-[10px] border px-5 py-2.5 text-[15px] transition-all duration-150 ease-in-out ${
              selected
                ? "border-[#4A90D9] bg-[#4A90D9] font-semibold text-white"
                : "border-[#C8DDEF] bg-[rgba(255,255,255,0.75)] text-[var(--text-secondary)] hover:bg-[#EBF4FF] hover:text-[var(--accent)]"
            }`}
            style={
              selected
                ? { boxShadow: "var(--shadow-tab-selected)" }
                : { boxShadow: "0 1px 4px rgba(100,160,220,0.1)" }
            }
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}
