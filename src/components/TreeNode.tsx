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
      className={`flex w-[110px] shrink-0 items-center justify-center gap-1 px-3 py-2 md:w-[140px] md:gap-2 md:px-5 md:py-2.5 ${
        isHighlighted ? "glass-node-highlight" : "glass-node"
      } ${hasChildren ? "cursor-pointer" : "cursor-default"} mobile-tree-node`}
    >
      <span className="text-lg md:text-xl" aria-hidden>
        {emoji}
      </span>
      <span className="truncate text-sm font-semibold text-[var(--color-text-main)] md:text-base">
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
