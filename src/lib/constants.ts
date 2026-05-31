import type { SkillCategoryKey, TabId } from "./types";

export const NAME_EMOJI_MAP: Record<string, string> = {
  Ryan: "🐱",
  曜群: "🐰",
  Jenny: "🐻",
  政男: "🐭",
  天中: "🐼",
  Steven: "🐸",
  Emily: "🐙",
};

export const SKILL_CATEGORIES: SkillCategoryKey[] = ["Q", "R", "A", "M"];

export const TABS: { id: TabId; label: string }[] = [
  { id: "boss", label: "老闆期待" },
  { id: "dept-a", label: "A部門架構圖" },
  { id: "dept-b", label: "B部門架構圖" },
  { id: "dept-c", label: "C部門架構圖" },
];
