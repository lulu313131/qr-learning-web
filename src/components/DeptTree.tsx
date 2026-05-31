"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import {
  expandedStateFromPath,
  findPathToName,
  type DeptNodeKey,
} from "@/lib/searchUtils";
import type { Course, SkillMapping } from "@/lib/types";

import PlanCourses from "./PlanCourses";
import TreeNode from "./TreeNode";

type DeptTreeProps = {
  mappings: SkillMapping[];
  courses: Course[];
  highlightName?: string | null;
};

const NODE_META: Record<
  DeptNodeKey,
  { emoji: string; hasChildren: boolean; plans: string[] }
> = {
  Ryan: { emoji: "🐱", hasChildren: true, plans: [] },
  曜群: { emoji: "🐰", hasChildren: true, plans: [] },
  Jenny: { emoji: "🐻", hasChildren: false, plans: [] },
  政男: { emoji: "🐭", hasChildren: true, plans: [] },
  天中: { emoji: "🐼", hasChildren: true, plans: [] },
  Steven: {
    emoji: "🐸",
    hasChildren: false,
    plans: ["EM_introduction", "Package Qual", "QR_training"],
  },
  Emily: {
    emoji: "🐙",
    hasChildren: false,
    plans: ["Data_python_plan", "Stat_model_plan", "ML_basics_plan"],
  },
};

const DESCENDANTS: Record<DeptNodeKey, DeptNodeKey[]> = {
  Ryan: ["曜群", "Jenny", "政男", "天中", "Steven", "Emily"],
  曜群: ["政男", "天中", "Steven", "Emily"],
  Jenny: [],
  政男: ["Steven"],
  天中: ["Emily"],
  Steven: [],
  Emily: [],
};

const INITIAL_EXPANDED: Record<DeptNodeKey, boolean> = {
  Ryan: false,
  曜群: false,
  Jenny: false,
  政男: false,
  天中: false,
  Steven: false,
  Emily: false,
};

function buildConnectorPaths(
  parent: HTMLElement,
  children: HTMLElement[],
  container: HTMLElement
): string[] {
  if (children.length === 0) return [];

  const containerRect = container.getBoundingClientRect();
  const parentRect = parent.getBoundingClientRect();
  const px = parentRect.left + parentRect.width / 2 - containerRect.left;
  const pyBottom = parentRect.bottom - containerRect.top;

  const childPoints = children.map((child) => {
    const rect = child.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2 - containerRect.left,
      yTop: rect.top - containerRect.top,
    };
  });

  const midY = pyBottom + (childPoints[0].yTop - pyBottom) / 2;
  const paths: string[] = [`M ${px} ${pyBottom} L ${px} ${midY}`];

  if (childPoints.length === 1) {
    paths.push(`M ${px} ${midY} L ${childPoints[0].x} ${childPoints[0].yTop}`);
  } else {
    const xs = childPoints.map((p) => p.x);
    const leftX = Math.min(...xs);
    const rightX = Math.max(...xs);
    paths.push(`M ${leftX} ${midY} L ${rightX} ${midY}`);
    for (const point of childPoints) {
      paths.push(`M ${point.x} ${midY} L ${point.x} ${point.yTop}`);
    }
  }

  return paths;
}

function PlanCard({
  emoji,
  name,
  plans,
  highlighted,
  currentOpenPlan,
  onPlanToggle,
  mappings,
  courses,
}: {
  emoji: string;
  name: string;
  plans: string[];
  highlighted: boolean;
  currentOpenPlan: string | null;
  onPlanToggle: (plan: string) => void;
  mappings: SkillMapping[];
  courses: Course[];
}) {
  return (
    <div
      className={`glass-plan-card mt-4 w-full max-w-[400px] min-w-[280px] p-4 ${
        highlighted ? "glass-node-highlight" : ""
      }`}
    >
      <h4 className="border-b border-[rgba(255,255,255,0.4)] pb-3 text-[15px] font-bold text-[var(--color-primary)]">
        {emoji} {name} 的相關計畫
      </h4>
      <ul className="mt-3 space-y-2">
        {plans.map((plan) => {
          const isOpen = highlighted || currentOpenPlan === plan;
          return (
            <li key={plan}>
              <button
                type="button"
                onClick={() => onPlanToggle(plan)}
                className="transition-interactive group flex w-full items-center justify-between gap-2 text-left text-[15px] text-[var(--color-text-main)] hover:text-[var(--color-primary)]"
              >
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-primary)]" />
                  <span className="group-hover:underline">{plan}</span>
                </span>
                <span
                  className="shrink-0 text-xs text-[var(--color-text-secondary)]"
                  aria-hidden
                >
                  {isOpen ? "▼" : "▶"}
                </span>
              </button>
              <PlanCourses
                planName={plan}
                mappings={mappings}
                courses={courses}
                isOpen={isOpen}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function DeptTree({
  mappings,
  courses,
  highlightName = null,
}: DeptTreeProps) {
  const [expanded, setExpanded] =
    useState<Record<DeptNodeKey, boolean>>(INITIAL_EXPANDED);
  const [currentOpenPlan, setCurrentOpenPlan] = useState<string | null>(null);
  const [svgLines, setSvgLines] = useState<string[]>([]);
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Partial<Record<DeptNodeKey, HTMLButtonElement>>>({});

  const setNodeRef = useCallback(
    (key: DeptNodeKey) => (el: HTMLButtonElement | null) => {
      if (el) nodeRefs.current[key] = el;
      else delete nodeRefs.current[key];
    },
    []
  );

  const getNode = useCallback((key: DeptNodeKey) => nodeRefs.current[key], []);

  const updateLines = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    setSvgSize({ width: rect.width, height: rect.height });

    const paths: string[] = [];
    const connect = (parentKey: DeptNodeKey, childKeys: DeptNodeKey[]) => {
      const parent = getNode(parentKey);
      if (!parent) return;
      const children = childKeys
        .map((key) => getNode(key))
        .filter((el): el is HTMLButtonElement => Boolean(el));
      paths.push(...buildConnectorPaths(parent, children, container));
    };

    if (expanded.Ryan) {
      connect("Ryan", ["曜群", "Jenny"]);
    }
    if (expanded.Ryan && expanded.曜群) {
      connect("曜群", ["政男", "天中"]);
    }
    if (expanded.Ryan && expanded.曜群 && expanded.政男) {
      connect("政男", ["Steven"]);
    }
    if (expanded.Ryan && expanded.曜群 && expanded.天中) {
      connect("天中", ["Emily"]);
    }

    setSvgLines(paths);
  }, [expanded, getNode]);

  useEffect(() => {
    if (highlightName) {
      const path = findPathToName(highlightName);
      if (path.length > 0) {
        setExpanded(expandedStateFromPath(path));
      }
    } else {
      setExpanded(INITIAL_EXPANDED);
      setCurrentOpenPlan(null);
    }
  }, [highlightName]);

  useLayoutEffect(() => {
    const frame = requestAnimationFrame(updateLines);
    return () => cancelAnimationFrame(frame);
  }, [expanded, highlightName, currentOpenPlan, updateLines]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ro = new ResizeObserver(() => updateLines());
    ro.observe(container);
    window.addEventListener("resize", updateLines);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateLines);
    };
  }, [updateLines]);

  const handleToggle = (name: DeptNodeKey) => {
    setExpanded((prev) => {
      const next = { ...prev };
      if (prev[name]) {
        next[name] = false;
        for (const descendant of DESCENDANTS[name]) {
          next[descendant] = false;
        }
      } else {
        next[name] = true;
      }
      return next;
    });
  };

  const handlePlanToggle = (plan: string) => {
    setCurrentOpenPlan((prev) => (prev === plan ? null : plan));
  };

  const renderNode = (key: DeptNodeKey) => {
    const meta = NODE_META[key];
    return (
      <TreeNode
        ref={setNodeRef(key)}
        emoji={meta.emoji}
        name={key}
        hasChildren={meta.hasChildren}
        expanded={expanded[key]}
        isHighlighted={highlightName === key}
        onToggle={() => handleToggle(key)}
      />
    );
  };

  const renderPlanCard = (key: DeptNodeKey) => {
    const meta = NODE_META[key];
    if (meta.plans.length === 0) return null;
    return (
      <PlanCard
        emoji={meta.emoji}
        name={key}
        plans={meta.plans}
        highlighted={highlightName === key}
        currentOpenPlan={currentOpenPlan}
        onPlanToggle={handlePlanToggle}
        mappings={mappings}
        courses={courses}
      />
    );
  };

  return (
    <div className="dept-tree-wrapper box-border flex w-full max-w-full flex-col items-center justify-start overflow-x-hidden px-5 py-10">
      <div
        ref={containerRef}
        className="relative box-border flex w-full max-w-full flex-col items-center overflow-x-hidden"
      >
        {svgSize.width > 0 && svgSize.height > 0 && (
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
            width="100%"
            height="100%"
            viewBox={`0 0 ${svgSize.width} ${svgSize.height}`}
            preserveAspectRatio="xMinYMin meet"
            aria-hidden
          >
            {svgLines.map((d, index) => (
              <path
                key={`${d}-${index}`}
                d={d}
                stroke="rgba(0,118,203,0.2)"
                strokeWidth={1.5}
                fill="none"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>
        )}

        <div className="relative flex w-full flex-col items-center">
          {renderNode("Ryan")}

          {expanded.Ryan && (
            <div className="mt-12 flex w-full flex-wrap items-start justify-center gap-x-20 gap-y-12">
              <div className="flex flex-col items-center">
                {renderNode("曜群")}

                {expanded.曜群 && (
                  <div className="mt-12 flex flex-wrap items-start justify-center gap-x-20 gap-y-12">
                    <div className="flex flex-col items-center">
                      {renderNode("政男")}
                      {expanded.政男 && (
                        <div className="mt-12 flex flex-col items-center">
                          {renderNode("Steven")}
                          {renderPlanCard("Steven")}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-center">
                      {renderNode("天中")}
                      {expanded.天中 && (
                        <div className="mt-12 flex flex-col items-center">
                          {renderNode("Emily")}
                          {renderPlanCard("Emily")}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center">{renderNode("Jenny")}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
