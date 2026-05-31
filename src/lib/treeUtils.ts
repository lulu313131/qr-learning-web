import { NAME_EMOJI_MAP } from "./constants";
import type { DepartmentRow, TreeNodeData } from "./types";

function normalize(value: unknown): string {
  if (value == null) return "";
  const s = String(value).trim();
  if (!s || s.toUpperCase() === "NULL") return "";
  return s;
}

export function getEmojiForName(name: string, fallbackPhoto?: string): string {
  if (NAME_EMOJI_MAP[name]) return NAME_EMOJI_MAP[name];
  return fallbackPhoto?.trim() || "👤";
}

export function buildDeptTree(rows: DepartmentRow[]): TreeNodeData[] {
  const roots: TreeNodeData[] = [];

  for (const row of rows) {
    const layers = [
      normalize(row.l1),
      normalize(row.l2),
      normalize(row.l3),
      normalize(row.l4),
    ].filter(Boolean);

    if (layers.length === 0) continue;

    let currentLevel = roots;
    let path = "";

    for (let i = 0; i < layers.length; i++) {
      const name = layers[i];
      path = path ? `${path}/${name}` : name;

      let node = currentLevel.find((n) => n.name === name);
      if (!node) {
        node = {
          id: path,
          name,
          emoji: getEmojiForName(name, row.photo),
          plans: [],
          children: [],
        };
        currentLevel.push(node);
      }

      if (i === layers.length - 1) {
        const plan = normalize(row.plan);
        if (plan && !node.plans.includes(plan)) {
          node.plans.push(plan);
        }
      }

      currentLevel = node.children;
    }
  }

  return roots;
}
