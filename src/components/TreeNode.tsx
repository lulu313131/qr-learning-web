import { forwardRef } from "react";

type TreeNodeProps = {
  emoji: string;
  name: string;
  hasChildren: boolean;
  expanded: boolean;
  isHighlighted?: boolean;
  onToggle: () => void;
};

const TreeNode = forwardRef<HTMLButtonElement, TreeNodeProps>(function TreeNode(
  {
    emoji,
    name,
    hasChildren,
    expanded,
    isHighlighted = false,
    onToggle,
  },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={hasChildren ? onToggle : undefined}
      className={`flex w-[140px] shrink-0 items-center justify-center gap-2 ${
        isHighlighted ? "glass-node-highlight" : "glass-node"
      } ${hasChildren ? "cursor-pointer" : "cursor-default"}`}
    >
      <span className="text-xl" aria-hidden>
        {emoji}
      </span>
      <span className="truncate text-base font-semibold text-[var(--color-text-main)]">
        {name}
      </span>
      {hasChildren && (
        <span
          className="shrink-0 text-xs text-[var(--color-text-secondary)]"
          aria-hidden
        >
          {expanded ? "▲" : "▼"}
        </span>
      )}
    </button>
  );
});

export default TreeNode;
