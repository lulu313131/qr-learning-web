import type { Course, SkillCategoryKey } from "@/lib/types";

type CourseListProps = {
  category: SkillCategoryKey;
  courses: Course[];
};

export default function CourseList({ category, courses }: CourseListProps) {
  const filtered = courses.filter((c) => c.skillCategory === category);

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-[var(--text-primary)]">
        {category} 技能課程
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((course) => {
          const isRequired = course.type === "必修";
          return (
            <article
              key={`${course.skillCategory}-${course.courseName}`}
              className="flex flex-col rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-5 transition-all duration-150 ease-in-out hover:border-[var(--border-strong)] hover:bg-[var(--bg-card-hover)]"
            >
              <h3 className="mb-3 text-base font-medium text-[var(--text-primary)]">
                {course.courseName}
              </h3>
              <span
                className={`mb-4 inline-flex w-fit rounded px-3 py-0.5 text-xs font-medium ${
                  isRequired
                    ? "bg-[var(--accent-glow)] text-[var(--required)]"
                    : "bg-[rgba(80,191,195,0.15)] text-[var(--optional)]"
                }`}
              >
                {course.type}
              </span>
              <a
                href={course.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-1 text-sm text-[var(--accent)] transition-all duration-150 ease-in-out hover:underline"
              >
                前往課程 →
              </a>
            </article>
          );
        })}
      </div>
      {filtered.length === 0 && (
        <p className="text-sm text-[var(--text-muted)]">此大類尚無課程資料。</p>
      )}
    </div>
  );
}
