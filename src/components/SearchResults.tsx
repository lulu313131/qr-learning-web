import type { Course } from "@/lib/types";
import type { KeywordSearchResult } from "@/lib/searchUtils";

type SearchResultsProps = {
  query: string;
  result: KeywordSearchResult;
  courses: Course[];
};

export default function SearchResults({
  query,
  result,
  courses,
}: SearchResultsProps) {
  const courseUrlMap = new Map(courses.map((c) => [c.courseName, c.url]));
  const hasCourses = result.courses.length > 0;
  const hasPlans = result.plansWithPeople.length > 0;
  const hasAny = hasCourses || hasPlans;

  if (!hasAny) {
    return (
      <p className="py-16 text-center text-base text-[var(--text-muted)]">
        查無結果，請嘗試其他關鍵字
      </p>
    );
  }

  return (
    <div className="glass-card px-10 py-8">
      <h2 className="text-[26px] font-bold text-[var(--text-primary)]">
        「<span className="text-[var(--accent)]">{query}</span>」的搜尋結果
      </h2>

      <div className="mt-8 space-y-8">
        {hasCourses && (
          <section>
            <h3 className="mb-3 border-b border-[rgba(180,210,240,0.4)] pb-1.5 text-xs font-semibold tracking-[0.1em] text-[var(--text-muted)] uppercase">
              相關課程
            </h3>
            <ul className="space-y-2">
              {result.courses.map((name) => {
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
                        className="shrink-0 text-sm text-[var(--accent)] transition-all duration-150 ease-in-out hover:underline"
                      >
                        前往課程 →
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {hasPlans && (
          <section>
            <h3 className="mb-3 border-b border-[rgba(180,210,240,0.4)] pb-1.5 text-xs font-semibold tracking-[0.1em] text-[var(--text-muted)] uppercase">
              相關計畫與人員
            </h3>
            <ul className="space-y-2">
              {result.plansWithPeople.map(({ plan, people }) => (
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
        )}
      </div>
    </div>
  );
}
