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
    <aside
      className="flex w-[220px] shrink-0 flex-col border-r border-[var(--border)] bg-[var(--bg-surface)]"
      style={{ boxShadow: "2px 0 8px rgba(74,144,217,0.06)" }}
    >
      <div className="m-4 rounded-2xl bg-[var(--bg-accent-soft)] p-3">
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
        <h2 className="mx-4 mb-2 text-[11px] font-medium tracking-[0.12em] text-[var(--text-muted)] uppercase">
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
                className={`mx-4 my-1 h-11 w-[calc(100%-32px)] rounded-xl border text-base transition-all duration-150 ease-in-out ${
                  selected
                    ? "border-[var(--accent)] bg-[var(--accent)] font-bold text-white"
                    : "border-[var(--border)] bg-[var(--bg-accent-soft)] font-semibold text-[var(--text-secondary)] hover:border-[var(--accent)] hover:bg-[#D6EEFF] hover:text-[var(--accent)]"
                }`}
                style={selected ? { boxShadow: "var(--shadow-sm)" } : undefined}
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
