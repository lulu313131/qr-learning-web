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
      className={`absolute flex h-12 w-[140px] items-center justify-center gap-2 rounded-xl border px-5 py-2.5 transition-all duration-150 ease-in-out ${
        isHighlighted
          ? "border-[var(--accent)] bg-[var(--highlight-node)]"
          : "border-[#C8DDEF] bg-[rgba(255,255,255,0.9)]"
      } ${
        hasChildren
          ? "cursor-pointer hover:border-[#4A90D9] hover:shadow-[var(--shadow-node-hover)]"
          : "cursor-default"
      }`}
      style={{
        left,
        top,
        boxShadow: isHighlighted
          ? "var(--shadow-node-hover)"
          : "var(--shadow-node)",
      }}
    >
      <span className="text-xl" aria-hidden>
        {emoji}
      </span>
      <span className="truncate text-base font-semibold text-[var(--text-primary)]">
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
