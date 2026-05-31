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
    <nav className="hidden flex-wrap gap-2.5 md:flex">
      {TABS.map((tab) => {
        const selected = highlightTab && activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={selected ? "tab-pill tab-pill-selected" : "tab-pill"}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}
