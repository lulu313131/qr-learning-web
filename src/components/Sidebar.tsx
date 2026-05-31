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
    <aside className="flex w-[220px] shrink-0 flex-col border-r border-[var(--border)] bg-[var(--bg-surface)]">
      <div className="m-4 rounded-xl bg-[var(--bg-card)] p-3">
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
        <h2 className="mx-4 mb-2 text-[13px] font-medium tracking-[0.15em] text-[var(--text-muted)] uppercase">
          技能大類
        </h2>
        <div className="flex flex-col">
          {categories.map((cat) => {
            const selected = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onCategoryClick(cat)}
                className={`mx-4 my-1 h-11 w-[calc(100%-32px)] rounded-lg border text-[18px] transition-all duration-150 ease-in-out hover:scale-[1.01] ${
                  selected
                    ? "border-[var(--accent)] bg-[var(--accent-glow)] font-bold text-[var(--accent)]"
                    : "border-[var(--border)] bg-[var(--bg-card)] font-semibold text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-primary)]"
                }`}
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
