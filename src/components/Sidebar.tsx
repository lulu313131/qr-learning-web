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
    <aside className="glass-sidebar flex w-[220px] shrink-0 flex-col">
      <div
        className="m-4 rounded-2xl p-3"
        style={{
          background: "rgba(235,244,255,0.7)",
          backdropFilter: "blur(6px)",
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
                className={`mx-4 my-1 h-11 w-[calc(100%-32px)] rounded-[10px] border text-base transition-all duration-150 ease-in-out ${
                  selected
                    ? "border-[#4A90D9] bg-[#4A90D9] font-bold text-white"
                    : "border-[#C8DDEF] bg-white font-semibold text-[#4A7FA5] hover:bg-[#EBF4FF]"
                }`}
                style={
                  selected
                    ? { boxShadow: "var(--shadow-btn-selected)" }
                    : undefined
                }
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
