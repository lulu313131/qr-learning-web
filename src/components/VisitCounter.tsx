"use client";

import { useEffect, useState } from "react";

export default function VisitCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const key = "qr_learning_visit_count";
    const current = parseInt(localStorage.getItem(key) || "0", 10);
    const next = current + 1;
    localStorage.setItem(key, String(next));
    setCount(next);
  }, []);

  if (count === null) return null;

  return (
    <span className="shrink-0 text-[13px] whitespace-nowrap text-[var(--text-secondary)]">
      👥 人次：{count.toLocaleString()}
    </span>
  );
}
