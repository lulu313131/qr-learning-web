import type { SkillCategoryKey } from "./types";

const CATEGORY_STYLES: Record<string, string> = {
  Q: "bg-[var(--accent-glow)] text-[var(--accent)]",
  R: "bg-[rgba(80,191,195,0.12)] text-[var(--accent-teal)]",
  A: "bg-[var(--accent-glow)] text-[var(--accent)]",
  M: "bg-[rgba(80,191,195,0.12)] text-[var(--accent-teal)]",
};

export function getCategoryBadgeClass(category: string): string {
  return (
    CATEGORY_STYLES[category as SkillCategoryKey] ??
    "bg-[var(--accent-glow)] text-[var(--text-secondary)]"
  );
}
