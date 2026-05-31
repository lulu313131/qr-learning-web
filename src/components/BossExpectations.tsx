const BOSS_EXPECTATIONS_TEXT =
  "老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許";

export default function BossExpectations() {
  return (
    <div
      className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] px-12 py-10 text-[18px] leading-[2.2] text-[var(--text-primary)]"
      style={{ boxShadow: "var(--shadow-md)" }}
    >
      <p>{BOSS_EXPECTATIONS_TEXT}</p>
    </div>
  );
}
