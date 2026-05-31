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
    <span className="visit-capsule shrink-0 whitespace-nowrap">
      人次：{count.toLocaleString()}
    </span>
  );
}
