type BannerDemoProps = {
  deptLabel: string;
};

export default function BannerDemo({ deptLabel }: BannerDemoProps) {
  return (
    <div className="mb-8 flex justify-center">
      <div className="glass-card w-full max-w-2xl px-6 py-5 text-center text-[var(--color-text-secondary)]">
        {deptLabel}架構圖建置中，目前以 A部門資料示範
      </div>
    </div>
  );
}
