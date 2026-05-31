import type { Course, SkillMapping } from "./types";

/** 相關計畫 → skill_mapping 完全比對 → skill_categories 完全比對 */
export function resolveCoursesForPlan(
  planName: string,
  mappings: SkillMapping[],
  courses: Course[]
): Course[] {
  const courseNames = [
    ...new Set(
      mappings
        .filter((m) => m.relatedPlan === planName)
        .map((m) => m.courseName)
    ),
  ];

  return courseNames
    .map((name) => courses.find((c) => c.courseName === name))
    .filter((c): c is Course => Boolean(c));
}
