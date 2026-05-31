import type { SkillCategoryKey } from "./types";

const CATEGORY_STYLES: Record<string, string> = {
  Q: "badge-required px-2 py-0.5 text-xs font-medium",
  R: "badge-optional px-2 py-0.5 text-xs font-medium",
  A: "badge-required px-2 py-0.5 text-xs font-medium",
  M: "badge-optional px-2 py-0.5 text-xs font-medium",
};

export function getCategoryBadgeClass(category: string): string {
  return (
    CATEGORY_STYLES[category as SkillCategoryKey] ??
    "badge-required px-2 py-0.5 text-xs font-medium"
  );
}

export const BADGE_REQUIRED_CLASS =
  "badge-required px-2.5 py-0.5 text-[13px] font-semibold";

export const BADGE_OPTIONAL_CLASS =
  "badge-optional px-2.5 py-0.5 text-[13px] font-semibold";
