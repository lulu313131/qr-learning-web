"use client";

import Image from "next/image";

import { SKILL_CATEGORIES, TABS } from "@/lib/constants";
import type { SkillCategoryKey, TabId } from "@/lib/types";

type MobileDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  activeSkill: SkillCategoryKey | null;
  onSkillChange: (skill: SkillCategoryKey) => void;
  highlightTab: boolean;
};

export default function MobileDrawer({
  isOpen,
  onClose,
  activeTab,
  onTabChange,
  activeSkill,
  onSkillChange,
  highlightTab,
}: MobileDrawerProps) {
  const handleTabClick = (tab: TabId) => {
    onTabChange(tab);
    onClose();
  };

  const handleSkillClick = (skill: SkillCategoryKey) => {
    onSkillChange(skill);
    onClose();
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      <aside
        className={`fixed top-0 left-0 z-50 flex h-full w-[280px] flex-col overflow-y-auto transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
        aria-hidden={!isOpen}
      >
        <div className="relative flex flex-col gap-4 p-5">
          <button
            type="button"
            onClick={onClose}
            className="transition-interactive absolute top-4 right-4 flex h-10 w-10 items-center justify-center text-xl text-[var(--color-text-main)]"
            aria-label="關閉選單"
          >
            ✕
          </button>

          <div className="mt-2 flex justify-center">
            <Image
              src="/mascot.jpg"
              alt="Q兔吉祥物"
              width={80}
              height={80}
              style={{ objectFit: "contain", width: 80, height: "auto" }}
            />
          </div>

          <hr className="border-[rgba(255,255,255,0.6)]" />

          <nav className="flex flex-col">
            {TABS.map((tab) => {
              const selected = highlightTab && activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabClick(tab.id)}
                  className={`transition-interactive flex h-12 items-center rounded-[var(--radius-md)] px-4 text-left text-base ${
                    selected
                      ? "bg-[rgba(0,118,203,0.1)] font-semibold text-[var(--color-primary)]"
                      : "font-normal text-[var(--color-text-main)]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>

          <hr className="border-[rgba(255,255,255,0.6)]" />

          <p className="px-4 text-[13px] text-[var(--color-text-secondary)]">
            技能大類
          </p>

          <div className="flex flex-col">
            {SKILL_CATEGORIES.map((cat) => {
              const selected = activeSkill === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleSkillClick(cat)}
                  className={`transition-interactive flex h-12 items-center rounded-[var(--radius-md)] px-4 text-left text-base ${
                    selected
                      ? "font-bold text-[var(--color-primary)]"
                      : "font-normal text-[var(--color-text-secondary)]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
}
