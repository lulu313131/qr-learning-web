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
      <p className="py-16 text-center text-base text-[var(--color-text-secondary)]">
        查無結果，請嘗試其他關鍵字
      </p>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-[var(--color-text-main)] md:text-[26px]">
        「<span className="text-[var(--color-primary)]">{query}</span>」的搜尋結果
      </h2>

      <div className="mt-6 space-y-6 md:mt-8 md:space-y-8">
        {hasCourses && (
          <section>
            <h3 className="mb-3 border-b border-[rgba(255,255,255,0.4)] pb-1.5 text-[15px] font-semibold text-[var(--color-text-secondary)]">
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
                    <span className="flex items-center gap-2 text-base text-[var(--color-text-main)]">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-primary)]" />
                      {name}
                    </span>
                    {url && (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-interactive shrink-0 text-sm text-[var(--color-primary)] hover:underline"
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
            <h3 className="mb-3 border-b border-[rgba(255,255,255,0.4)] pb-1.5 text-[15px] font-semibold text-[var(--color-text-secondary)]">
              相關計畫與人員
            </h3>
            <ul className="space-y-2">
              {result.plansWithPeople.map(({ plan, people }) => (
                <li
                  key={plan}
                  className="flex items-start gap-2 text-base text-[var(--color-text-main)]"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-primary)]" />
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
