"use client";

import Image from "next/image";
import CategoryGrid from "../Section3/CategoryGrid";
import SectionContactButton from "../Section3/SectionContactButton";

export default function Section4({
  setSection,
}: {
  setSection: (n: number) => void;
}) {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#3d381b]">
      <SectionContactButton onClick={() => setSection(4)} />

      {/* TITLE — EXACT SAME AS SECTION 3 */}
      <div className="pointer-events-none absolute left-1/2 top-[70px] -translate-x-1/2 z-[50] h-[70px] w-[1000px]">
        <Image
          src="/images/videography.png"
          alt="videography"
          fill
          priority
          className="object-cover opacity-90"
        />
      </div>

      {/* GRID — MOVED UP */}
      <div className="absolute top-[180px] left-1/2 -translate-x-1/2 w-full max-w-[1520px] px-6">
        <div className="h-[calc(100vh-230px)]">
          <CategoryGrid />
        </div>
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
