type BannerDemoProps = {
  deptLabel: string;
};

export default function BannerDemo({ deptLabel }: BannerDemoProps) {
  return (
    <div className="mb-8 flex justify-center">
      <div
        className="w-full max-w-2xl rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] px-6 py-5 text-center text-[var(--text-secondary)]"
        style={{ boxShadow: "var(--shadow-sm)" }}
      >
        {deptLabel}架構圖建置中，目前以 A部門資料示範
      </div>
    </div>
  );
}
