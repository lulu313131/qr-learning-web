"use client";

import { useMemo, useState } from "react";

import {
  getFirstKeyword,
  getMappingForCourse,
  getPeopleByPlan,
  getRelatedCourses,
  getRelatedPlans,
} from "@/lib/skillPageUtils";
import type { Course, DepartmentRow, SkillCategoryKey, SkillMapping } from "@/lib/types";

type SkillPageProps = {
  category: SkillCategoryKey;
  courses: Course[];
  mappings: SkillMapping[];
  deptData: DepartmentRow[];
};

function CourseSection({
  title,
  labelClass,
  barColor,
  items,
  selectedCourse,
  onSelect,
}: {
  title: string;
  labelClass: string;
  barColor: string;
  items: Course[];
  selectedCourse: string | null;
  onSelect: (name: string) => void;
}) {
  if (items.length === 0) return null;

  return (
    <section
      className="relative pl-4"
      style={{ borderLeft: `4px solid ${barColor}` }}
    >
      <span
        className={`mb-4 inline-block rounded-md px-2.5 py-0.5 text-[13px] font-semibold ${labelClass}`}
      >
        {title}
      </span>
      <ul className="space-y-2">
        {items.map((course) => {
          const selected = selectedCourse === course.courseName;
          return (
            <li
              key={course.courseName}
              className={`rounded-[10px] border px-4 py-3 transition-all duration-150 ease-in-out ${
                selected
                  ? "border-[var(--accent)] bg-[var(--bg-accent-soft)]"
                  : "border-[var(--border)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)]"
              }`}
              style={{ boxShadow: selected ? "var(--shadow-sm)" : undefined }}
              onMouseEnter={(e) => {
                if (!selected) {
                  e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                }
              }}
              onMouseLeave={(e) => {
                if (!selected) {
                  e.currentTarget.style.boxShadow = "none";
                }
              }}
            >
              <button
                type="button"
                onClick={() => onSelect(course.courseName)}
                className="text-left text-base font-medium text-[var(--text-primary)] transition-all duration-150 ease-in-out hover:text-[var(--accent)]"
              >
                {course.courseName}
              </button>
              {course.url && (
                <a
                  href={course.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex text-[13px] text-[var(--accent)] transition-all duration-150 ease-in-out hover:underline"
                >
                  前往課程 →
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default function SkillPage({
  category,
  courses,
  mappings,
  deptData,
}: SkillPageProps) {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const categoryCourses = useMemo(
    () => courses.filter((c) => c.skillCategory === category),
    [courses, category]
  );

  const requiredCourses = useMemo(
    () => categoryCourses.filter((c) => c.type === "必修"),
    [categoryCourses]
  );

  const electiveCourses = useMemo(
    () => categoryCourses.filter((c) => c.type === "選修"),
    [categoryCourses]
  );

  const courseUrlMap = useMemo(
    () => new Map(courses.map((c) => [c.courseName, c.url])),
    [courses]
  );

  const relatedInfo = useMemo(() => {
    if (!selectedCourse) return null;

    const mapping = getMappingForCourse(selectedCourse, mappings);
    if (!mapping) return null;

    const keyword = getFirstKeyword(mapping.fuzzyKeywords);
    if (!keyword) return null;

    const relatedCourses = getRelatedCourses(keyword, mappings);
    const relatedPlans = getRelatedPlans(keyword, mappings);

    const plansWithPeople = relatedPlans.map((plan) => ({
      plan,
      people: getPeopleByPlan(plan, deptData),
    }));

    return { keyword, relatedCourses, plansWithPeople };
  }, [selectedCourse, mappings, deptData]);

  return (
    <div className="flex min-h-[480px] gap-0">
      <div className="w-1/2 shrink-0 border-r border-[var(--border)] pr-6">
        <h2 className="border-b border-[var(--border)] pb-3 text-[22px] font-bold text-[var(--text-primary)]">
          {category} 課程列表
        </h2>
        <div className="mt-6 space-y-8">
          <CourseSection
            title="必修"
            labelClass="bg-[var(--accent-glow)] text-[var(--accent)]"
            barColor="var(--accent)"
            items={requiredCourses}
            selectedCourse={selectedCourse}
            onSelect={setSelectedCourse}
          />
          <CourseSection
            title="選修"
            labelClass="bg-[rgba(80,191,195,0.12)] text-[var(--accent-teal)]"
            barColor="var(--accent-teal)"
            items={electiveCourses}
            selectedCourse={selectedCourse}
            onSelect={setSelectedCourse}
          />
        </div>
      </div>

      <div className="flex w-1/2 flex-col pl-6">
        {!relatedInfo ? (
          <p className="flex flex-1 items-center justify-center text-center text-sm text-[var(--text-muted)]">
            點擊左側課程名稱，串聯相關計畫
          </p>
        ) : (
          <div className="space-y-6">
            <div>
              <h3 className="text-[48px] font-bold text-[var(--accent)]">
                {relatedInfo.keyword}
              </h3>
              <div className="mt-3 border-b border-[var(--border)]" />
            </div>

            <section>
              <p className="mb-3 border-b border-[var(--border)] pb-1.5 text-xs font-semibold tracking-[0.1em] text-[var(--text-muted)] uppercase">
                課程：
              </p>
              <ul className="space-y-2">
                {relatedInfo.relatedCourses.map((name) => {
                  const url = courseUrlMap.get(name);
                  return (
                    <li
                      key={name}
                      className="flex items-center justify-between gap-3"
                    >
                      <span className="flex items-center gap-2 text-base text-[var(--text-primary)]">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                        {name}
                      </span>
                      {url && (
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 text-[13px] text-[var(--accent)] transition-all duration-150 ease-in-out hover:underline"
                        >
                          前往課程 →
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>

            <section>
              <p className="mb-3 border-b border-[var(--border)] pb-1.5 text-xs font-semibold tracking-[0.1em] text-[var(--text-muted)] uppercase">
                相關計畫：
              </p>
              <ul className="space-y-2">
                {relatedInfo.plansWithPeople.map(({ plan, people }) => (
                  <li
                    key={plan}
                    className="flex items-start gap-2 text-base text-[var(--text-primary)]"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                    <span>
                      {plan} → {people.length > 0 ? people.join("、") : "—"}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
