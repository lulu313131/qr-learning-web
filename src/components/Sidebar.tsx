"use client";

import Image from "next/image";

import type { SkillCategoryKey } from "@/lib/types";

type SidebarProps = {
  activeCategory: SkillCategoryKey | null;
  onCategoryClick: (category: SkillCategoryKey) => void;
};

export default function Sidebar({
  activeCategory,
  onCategoryClick,
}: SidebarProps) {
  const categories: SkillCategoryKey[] = ["Q", "R", "A", "M"];

  return (
    <aside className="glass-sidebar flex w-[280px] shrink-0 flex-col">
      <div
        className="m-4 rounded-2xl p-3 transition-interactive"
        style={{
          background: "rgba(255,255,255,0.5)",
          border: "var(--glass-border)",
        }}
      >
        <Image
          src="/mascot.jpg"
          alt="Q兔吉祥物"
          width={180}
          height={180}
          style={{ objectFit: "contain", width: "100%", height: "auto" }}
          priority
        />
      </div>

      <div>
        <h2 className="mx-4 mb-2 text-[11px] font-medium tracking-[0.12em] text-[var(--color-text-secondary)] uppercase">
          技能大類
        </h2>
        <div className="flex flex-col px-4">
          {categories.map((cat) => {
            const selected = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onCategoryClick(cat)}
                className={`transition-interactive my-0.5 flex h-11 items-center justify-center rounded-[var(--radius-md)] text-base ${
                  selected
                    ? "border border-[rgba(0,118,203,0.3)] bg-[rgba(255,255,255,0.6)] font-bold text-[var(--color-primary)]"
                    : "border border-transparent bg-transparent font-normal text-[var(--color-text-secondary)] hover:cursor-pointer hover:bg-[rgba(0,0,0,0.05)]"
                }`}
                style={selected ? { boxShadow: "var(--shadow-focus)" } : undefined}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
