const BOSS_EXPECTATIONS_TEXT =
  "老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許老闆期許";

export default function BossExpectations() {
  return (
    <div
      className="rounded-2xl border border-[rgba(255,255,255,0.6)] px-12 py-10 text-[18px] leading-[2.2] text-[var(--text-primary)]"
      style={{
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <p>{BOSS_EXPECTATIONS_TEXT}</p>
    </div>
  );
}
