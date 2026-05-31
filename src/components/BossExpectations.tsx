import Image from "next/image";

export default function BossExpectations() {
  return (
    <div className="flex h-full min-h-[280px] w-full flex-col items-stretch gap-4 md:min-h-[360px] md:flex-row md:gap-6">
      <div className="flex w-full shrink-0 items-center justify-center self-stretch p-4 md:w-1/2 md:p-6">
        <Image
          src="/team-photo.jpg"
          alt="團隊照片"
          width={600}
          height={400}
          className="block h-auto w-full rounded-2xl object-cover md:w-[70%] md:rounded-[20px]"
        />
      </div>

      <div className="flex w-full items-center justify-center self-stretch p-4 text-lg text-[#1D1D1F] md:w-1/2 md:p-8">
        (說明文字)
      </div>
    </div>
  );
}
