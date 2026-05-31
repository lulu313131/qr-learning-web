"use client";

import { useEffect, useMemo, useState } from "react";

import {
  BADGE_OPTIONAL_CLASS,
  BADGE_REQUIRED_CLASS,
  getCategoryBadgeClass,
} from "@/lib/categoryStyles";
import { resolveCoursesForPlan } from "@/lib/planUtils";
import type { Course, SkillMapping } from "@/lib/types";

import AccordionPanel from "./AccordionPanel";

type PlanCoursesProps = {
  planName: string;
  mappings: SkillMapping[];
  courses: Course[];
  isOpen: boolean;
};

export default function PlanCourses({
  planName,
  mappings,
  courses,
  isOpen,
}: PlanCoursesProps) {
  const matchedCourses = useMemo(
    () => resolveCoursesForPlan(planName, mappings, courses),
    [planName, mappings, courses]
  );
  const [openCourseName, setOpenCourseName] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) setOpenCourseName(null);
  }, [isOpen]);

  const toggleCourse = (name: string) => {
    setOpenCourseName((prev) => (prev === name ? null : name));
  };

  return (
    <AccordionPanel open={isOpen} openDuration={200} closeDuration={150}>
      <div className="glass-card mt-2 w-full px-3.5 py-2.5">
        {matchedCourses.length === 0 ? (
          <p className="py-2 text-center text-sm text-[var(--color-text-secondary)]">
            尚無對應課程
          </p>
        ) : (
          <ul className="divide-y divide-[rgba(255,255,255,0.4)]">
            {matchedCourses.map((course) => {
              const detailOpen = openCourseName === course.courseName;
              const isRequired = course.type === "必修";

              return (
                <li key={course.courseName} className="py-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleCourse(course.courseName)}
                      className="transition-interactive flex min-w-0 flex-1 items-center gap-2 text-left text-[15px] font-medium text-[var(--color-text-main)] hover:text-[var(--color-primary)]"
                    >
                      <span className="shrink-0" aria-hidden>
                        📘
                      </span>
                      <span>{course.courseName}</span>
                      <span className="shrink-0 text-xs text-[var(--color-text-secondary)]">
                        {detailOpen ? "▼" : "▶"}
                      </span>
                    </button>
                    {course.url && (
                      <a
                        href={course.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-interactive shrink-0 text-sm font-medium text-[var(--color-primary)] hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        前往課程 →
                      </a>
                    )}
                  </div>

                  <AccordionPanel
                    open={detailOpen}
                    openDuration={200}
                    closeDuration={150}
                  >
                    <div className="glass-card mt-2 space-y-2 px-3.5 py-2.5">
                      <div className="flex flex-wrap gap-2">
                        <span className={getCategoryBadgeClass(course.skillCategory)}>
                          {course.skillCategory}
                        </span>
                        <span
                          className={
                            isRequired
                              ? `${BADGE_REQUIRED_CLASS} text-xs`
                              : `${BADGE_OPTIONAL_CLASS} text-xs`
                          }
                        >
                          {course.type}
                        </span>
                      </div>
                    </div>
                  </AccordionPanel>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </AccordionPanel>
  );
}
