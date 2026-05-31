type TreeNodeProps = {
  emoji: string;
  name: string;
  left: number;
  top: number;
  hasChildren: boolean;
  expanded: boolean;
  isHighlighted?: boolean;
  onToggle: () => void;
};

export default function TreeNode({
  emoji,
  name,
  left,
  top,
  hasChildren,
  expanded,
  isHighlighted = false,
  onToggle,
}: TreeNodeProps) {
  return (
    <button
      type="button"
      onClick={hasChildren ? onToggle : undefined}
      className={`absolute flex w-[140px] items-center justify-center gap-2 ${
        isHighlighted ? "glass-node-highlight" : "glass-node"
      } ${hasChildren ? "cursor-pointer" : "cursor-default"}`}
      style={{ left, top }}
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
}
