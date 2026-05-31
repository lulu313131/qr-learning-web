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
    <aside className="glass-card flex w-[240px] shrink-0 flex-col gap-6 px-4 py-6">
      <div className="glass-card-inner p-3">
        <Image
          src="/mascot.jpg"
          alt="Q兔吉祥物"
          width={180}
          height={180}
          style={{ objectFit: "contain", width: "100%", height: "auto" }}
          priority
        />
      </div>

      <div className="flex flex-col gap-5">
        <h2 className="text-[11px] font-medium tracking-[0.12em] text-[var(--color-text-secondary)] uppercase">
          技能大類
        </h2>
        <div className="flex flex-col gap-5">
          {categories.map((cat) => {
            const selected = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onCategoryClick(cat)}
                className={`transition-interactive flex h-11 items-center justify-center rounded-[var(--radius-md)] text-base ${
                  selected
                    ? "border border-[rgba(0,118,203,0.3)] bg-[rgba(255,255,255,0.6)] font-bold text-[var(--color-primary)]"
                    : "border border-transparent bg-transparent font-normal text-[var(--color-text-secondary)] hover:bg-[rgba(255,255,255,0.5)]"
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
