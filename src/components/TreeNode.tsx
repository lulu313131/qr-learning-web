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
      className={`absolute flex h-12 w-[140px] items-center justify-center gap-2 rounded-[10px] px-[18px] py-2.5 transition-all duration-150 ease-in-out ${
        isHighlighted
          ? "border border-[var(--accent)] bg-[var(--highlight-node)]"
          : "border border-[var(--border)] bg-[var(--bg-card)]"
      } ${
        hasChildren
          ? "cursor-pointer hover:scale-[1.01] hover:border-[var(--border-strong)] hover:bg-[var(--bg-card-hover)]"
          : "cursor-default"
      }`}
      style={{ left, top }}
    >
      <span className="text-xl" aria-hidden>
        {emoji}
      </span>
      <span className="truncate text-[17px] font-semibold text-[var(--text-primary)]">
        {name}
      </span>
      {hasChildren && (
        <span
          className="shrink-0 text-xs text-[var(--text-secondary)]"
          aria-hidden
        >
          {expanded ? "▲" : "▼"}
        </span>
      )}
    </button>
  );
}
