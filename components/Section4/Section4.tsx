"use client";

import Image from "next/image";
import CategoryGrid from "../Section3/CategoryGrid";

export default function Section4({
  setSection,
}: {
  setSection: (n: number) => void;
}) {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#3d381b]">

      {/* CONTACT */}
      <div
        onClick={() => setSection(4)}
        className="absolute top-5 right-6 z-[100] text-[18px] tracking-[0.25em] text-white cursor-pointer"
      >
        CONTACT
      </div>

      {/* TITLE (TOP CENTER — CLEAN) */}
      <div className="absolute top-[120px] left-1/2 -translate-x-1/2 z-[50]">
        <Image
          src="/images/videography.png"
          alt="videography"
          width={600}
          height={120}
          className="opacity-90"
        />
      </div>

      {/* GRID — CONTROLLED POSITION */}
      <div className="absolute top-[240px] left-1/2 -translate-x-1/2 w-full max-w-[1520px] px-6">
        <CategoryGrid />
      </div>

      {/* BACK */}
      <button
        onClick={() => setSection(0)}
        className="absolute bottom-[40px] left-6 z-[100] text-5xl text-white"
      >
        ↑
      </button>
    </section>
  );
}