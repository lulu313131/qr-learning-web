import Image from "next/image";

export default function BossExpectations() {
  return (
    <div className="flex h-full min-h-[360px] w-full flex-row items-stretch gap-6">
      <div className="flex w-1/2 shrink-0 items-center justify-center self-stretch p-6">
        <Image
          src="/team-photo.jpg"
          alt="團隊照片"
          width={600}
          height={400}
          className="block w-[70%] rounded-[20px] object-cover"
          style={{
            width: "70%",
            height: "auto",
            objectFit: "cover",
            borderRadius: "20px",
            display: "block",
          }}
        />
      </div>

      <div className="flex w-1/2 items-center justify-center self-stretch p-8 text-lg text-[#1D1D1F]">
        (說明文字)
      </div>
    </div>
  );
}
