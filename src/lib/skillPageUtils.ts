import { fuzzyMatch } from "./fuzzyMatch";
import type { DepartmentRow, SkillMapping } from "./types";

export function getFirstKeyword(fuzzyKeywords: string): string {
  return fuzzyKeywords.split("/")[0]?.trim() ?? "";
}

export function getRelatedCourses(
  keyword: string,
  mappings: SkillMapping[]
): string[] {
  const names = mappings
    .filter((m) => fuzzyMatch(m.fuzzyKeywords, keyword))
    .map((m) => m.courseName);
  return [...new Set(names)];
}

export function getRelatedPlans(
  keyword: string,
  mappings: SkillMapping[]
): string[] {
  const plans = mappings
    .filter((m) => fuzzyMatch(m.fuzzyKeywords, keyword))
    .map((m) => m.relatedPlan)
    .filter(Boolean);
  return [...new Set(plans)];
}

export function getPeopleByPlan(
  planName: string,
  deptData: DepartmentRow[]
): string[] {
  const people = deptData
    .filter((row) => row.plan === planName)
    .map((row) => row.l4 || row.l3)
    .filter(Boolean);
  return [...new Set(people)];
}

export function getMappingForCourse(
  courseName: string,
  mappings: SkillMapping[]
): SkillMapping | undefined {
  return mappings.find((m) => m.courseName === courseName);
}
