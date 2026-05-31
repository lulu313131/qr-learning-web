import { fuzzyMatch } from "./fuzzyMatch";
import type { DepartmentRow, SkillMapping } from "./types";
import { getPeopleByPlan } from "./skillPageUtils";

export function findPersonName(
  query: string,
  deptData: DepartmentRow[]
): string | null {
  const q = query.trim().toLowerCase();
  if (!q) return null;

  for (const row of deptData) {
    for (const name of [row.l1, row.l2, row.l3, row.l4]) {
      if (name && name.toLowerCase() === q) return name;
    }
  }
  return null;
}

export type KeywordSearchResult = {
  courses: string[];
  plansWithPeople: { plan: string; people: string[] }[];
};

export function searchByKeyword(
  input: string,
  mappings: SkillMapping[],
  deptData: DepartmentRow[]
): KeywordSearchResult {
  const matched = mappings.filter((m) => fuzzyMatch(m.fuzzyKeywords, input));

  const courses = [
    ...new Set(matched.map((m) => m.courseName).filter(Boolean)),
  ];

  const plans = [
    ...new Set(matched.map((m) => m.relatedPlan).filter(Boolean)),
  ];

  const plansWithPeople = plans.map((plan) => ({
    plan,
    people: getPeopleByPlan(plan, deptData),
  }));

  return { courses, plansWithPeople };
}

export type DeptNodeKey =
  | "Ryan"
  | "曜群"
  | "Jenny"
  | "政男"
  | "天中"
  | "Steven"
  | "Emily";

export function findPathToName(name: string): DeptNodeKey[] {
  const paths: Record<string, DeptNodeKey[]> = {
    Ryan: ["Ryan"],
    曜群: ["Ryan", "曜群"],
    Jenny: ["Ryan", "Jenny"],
    政男: ["Ryan", "曜群", "政男"],
    天中: ["Ryan", "曜群", "天中"],
    Steven: ["Ryan", "曜群", "政男", "Steven"],
    Emily: ["Ryan", "曜群", "天中", "Emily"],
  };
  return paths[name] ?? [];
}

export function expandedStateFromPath(
  path: DeptNodeKey[]
): Record<DeptNodeKey, boolean> {
  const state: Record<DeptNodeKey, boolean> = {
    Ryan: false,
    曜群: false,
    Jenny: false,
    政男: false,
    天中: false,
    Steven: false,
    Emily: false,
  };

  for (let i = 0; i < path.length - 1; i++) {
    state[path[i]] = true;
  }

  return state;
}
