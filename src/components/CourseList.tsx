import {
  BADGE_OPTIONAL_CLASS,
  BADGE_REQUIRED_CLASS,
} from "@/lib/categoryStyles";
import type { Course, SkillCategoryKey } from "@/lib/types";

type CourseListProps = {
  category: SkillCategoryKey;
  courses: Course[];
};

export default function CourseList({ category, courses }: CourseListProps) {
  const filtered = courses.filter((c) => c.skillCategory === category);

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-[var(--color-text-main)]">
        {category} 技能課程
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((course) => {
          const isRequired = course.type === "必修";
          return (
            <article
              key={`${course.skillCategory}-${course.courseName}`}
              className="glass-card transition-interactive flex flex-col p-5 hover:bg-[rgba(255,255,255,0.85)]"
            >
              <h3 className="mb-3 text-base font-medium text-[var(--color-text-main)]">
                {course.courseName}
              </h3>
              <span
                className={
                  isRequired ? BADGE_REQUIRED_CLASS : BADGE_OPTIONAL_CLASS
                }
              >
                {course.type}
              </span>
              <a
                href={course.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-interactive mt-auto inline-flex items-center gap-1 pt-4 text-[13px] text-[var(--color-primary)] hover:underline"
              >
                前往課程 →
              </a>
            </article>
          );
        })}
      </div>
      {filtered.length === 0 && (
        <p className="text-sm text-[var(--color-text-secondary)]">
          此大類尚無課程資料。
        </p>
      )}
    </div>
  );
}
