"use client";

import { useEffect, useMemo, useState } from "react";

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

type NodeConfig = {
  emoji: string;
  left: number;
  top: number;
  hasChildren: boolean;
  plans: string[];
};

const CONTAINER_WIDTH = 900;

const NODES: Record<DeptNodeKey, NodeConfig> = {
  Ryan: { emoji: "🐱", left: 380, top: 0, hasChildren: true, plans: [] },
  曜群: { emoji: "🐰", left: 220, top: 120, hasChildren: true, plans: [] },
  Jenny: { emoji: "🐻", left: 540, top: 120, hasChildren: false, plans: [] },
  政男: { emoji: "🐭", left: 120, top: 240, hasChildren: true, plans: [] },
  天中: { emoji: "🐼", left: 320, top: 240, hasChildren: true, plans: [] },
  Steven: {
    emoji: "🐸",
    left: 120,
    top: 360,
    hasChildren: false,
    plans: ["EM_introduction", "Package Qual", "QR_training"],
  },
  Emily: {
    emoji: "🐙",
    left: 320,
    top: 360,
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

function isNodeVisible(
  name: DeptNodeKey,
  expanded: Record<DeptNodeKey, boolean>
): boolean {
  switch (name) {
    case "Ryan":
      return true;
    case "曜群":
    case "Jenny":
      return expanded.Ryan;
    case "政男":
    case "天中":
      return expanded.Ryan && expanded.曜群;
    case "Steven":
      return expanded.Ryan && expanded.曜群 && expanded.政男;
    case "Emily":
      return expanded.Ryan && expanded.曜群 && expanded.天中;
    default:
      return false;
  }
}

function buildSvgLines(expanded: Record<DeptNodeKey, boolean>): string[] {
  const lines: string[] = [];

  if (expanded.Ryan) {
    lines.push("M 450 48 L 450 84");
    lines.push("M 450 84 L 290 84");
    lines.push("M 450 84 L 610 84");
    lines.push("M 290 84 L 290 120");
    lines.push("M 610 84 L 610 120");
  }

  if (expanded.Ryan && expanded.曜群) {
    lines.push("M 290 168 L 290 204");
    lines.push("M 190 204 L 390 204");
    lines.push("M 190 204 L 190 240");
    lines.push("M 390 204 L 390 240");
  }

  if (expanded.Ryan && expanded.曜群 && expanded.政男) {
    lines.push("M 190 288 L 190 360");
  }

  if (expanded.Ryan && expanded.曜群 && expanded.天中) {
    lines.push("M 390 288 L 390 360");
  }

  return lines;
}

function getContainerHeight(expanded: Record<DeptNodeKey, boolean>): number {
  let height = 80;

  if (expanded.Ryan) height = Math.max(height, 180);
  if (expanded.Ryan && expanded.曜群) height = Math.max(height, 300);
  if (
    (expanded.Ryan && expanded.曜群 && expanded.政男) ||
    (expanded.Ryan && expanded.曜群 && expanded.天中)
  ) {
    height = Math.max(height, 420);
  }
  if (
    (expanded.Ryan && expanded.曜群 && expanded.政男) ||
    (expanded.Ryan && expanded.曜群 && expanded.天中)
  ) {
    height = Math.max(height, 680);
  }

  return height;
}

function PlanCard({
  emoji,
  name,
  plans,
  left,
  top,
  highlighted,
  currentOpenPlan,
  onPlanToggle,
  mappings,
  courses,
}: {
  emoji: string;
  name: string;
  plans: string[];
  left: number;
  top: number;
  highlighted: boolean;
  currentOpenPlan: string | null;
  onPlanToggle: (plan: string) => void;
  mappings: SkillMapping[];
  courses: Course[];
}) {
  return (
    <div
      className={`absolute max-w-[400px] min-w-[280px] w-max rounded-[10px] border p-4 ${
        highlighted
          ? "border-[var(--accent)] bg-[var(--highlight-node)]"
          : "border-[var(--border)] bg-[var(--bg-card)]"
      }`}
      style={{ left, top }}
    >
      <h4 className="border-b border-[var(--border)] pb-3 text-base font-bold text-[var(--accent)]">
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
                className="group flex w-full items-center justify-between gap-2 text-left text-[15px] text-[var(--text-primary)] transition-all duration-150 ease-in-out hover:text-[var(--accent)]"
              >
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                  <span className="group-hover:underline">{plan}</span>
                </span>
                <span
                  className="shrink-0 text-xs text-[var(--text-muted)]"
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

  const svgLines = useMemo(() => buildSvgLines(expanded), [expanded]);
  const containerHeight = useMemo(() => getContainerHeight(expanded), [expanded]);

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

  const visibleNodes = (Object.keys(NODES) as DeptNodeKey[]).filter((name) =>
    isNodeVisible(name, expanded)
  );

  return (
    <div className="overflow-x-auto bg-[var(--bg-base)] py-4">
      <div
        className="relative mx-auto"
        style={{ width: CONTAINER_WIDTH, height: containerHeight }}
      >
        <svg
          className="pointer-events-none absolute top-0 left-0"
          width={CONTAINER_WIDTH}
          height={containerHeight}
          aria-hidden
        >
          {svgLines.map((d, index) => (
            <path
              key={`${d}-${index}`}
              d={d}
              stroke="var(--accent-dim)"
              strokeWidth={1.5}
              fill="none"
            />
          ))}
        </svg>

        {visibleNodes.map((name) => {
          const node = NODES[name];
          const isHighlighted = highlightName === name;
          return (
            <TreeNode
              key={name}
              emoji={node.emoji}
              name={name}
              left={node.left}
              top={node.top}
              hasChildren={node.hasChildren}
              expanded={expanded[name]}
              isHighlighted={isHighlighted}
              onToggle={() => handleToggle(name)}
            />
          );
        })}

        {visibleNodes.map((name) => {
          const node = NODES[name];
          if (node.plans.length === 0) return null;
          const isHighlighted = highlightName === name;
          return (
            <PlanCard
              key={`${name}-plans`}
              emoji={node.emoji}
              name={name}
              plans={node.plans}
              left={node.left}
              top={node.top + 60}
              highlighted={isHighlighted}
              currentOpenPlan={currentOpenPlan}
              onPlanToggle={handlePlanToggle}
              mappings={mappings}
              courses={courses}
            />
          );
        })}
      </div>
    </div>
  );
}
