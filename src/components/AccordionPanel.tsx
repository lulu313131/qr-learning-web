"use client";

import { useEffect, useRef, useState } from "react";

type AccordionPanelProps = {
  open: boolean;
  openDuration?: number;
  closeDuration?: number;
  children: React.ReactNode;
  className?: string;
};

export default function AccordionPanel({
  open,
  openDuration = 200,
  closeDuration = 150,
  children,
  className = "",
}: AccordionPanelProps) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    if (open) {
      setMaxHeight(el.scrollHeight);
      const ro = new ResizeObserver(() => setMaxHeight(el.scrollHeight));
      ro.observe(el);
      return () => ro.disconnect();
    }
    setMaxHeight(0);
  }, [open, children]);

  const duration = open ? openDuration : closeDuration;

  return (
    <div
      className={`overflow-hidden transition-[max-height] ease-in-out ${className}`}
      style={{ maxHeight: open ? maxHeight : 0, transitionDuration: `${duration}ms` }}
    >
      <div ref={innerRef}>{children}</div>
    </div>
  );
}
