"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import CategoryGrid from "./CategoryGrid";

export default function Section3({
  setSection,
}: {
  setSection: (n: number) => void;
}) {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#3d381b]">

      {/* CONTACT */}
      <div className="
        absolute top-[25px] right-10 z-30
        text-white text-[18px]
        tracking-[0.25em]
        font-[var(--font-bodoni)]
      ">
        CONTACT
      </div>

      {/* ================= TITLE STACK ================= */}

      {/* VISUAL PORTFOLIO (TOPMOST) */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 z-[60] pointer-events-none">
        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 2 }}
        >
          <Image
            src="/images/visual-portfolio.png"
            alt="visual portfolio"
            width={1400}
            height={400}
            priority
            className="w-[90vw] max-w-[1600px] h-auto"
          />
        </motion.div>
      </div>

      {/* PHOTOGRAPHY */}
      <div className="absolute top-[50px] left-1/2 -translate-x-1/2 z-[55] pointer-events-none">
        <Image
          src="/images/photography.png"
          alt="photography"
          width={400}
          height={100}
          priority
          className="w-[550px] h-auto opacity-90"
        />
      </div>

      {/* ================= CATEGORY GRID ================= */}

      {/* PUSHED SLIGHTLY DOWN */}
      <div className="absolute bottom-[10px] left-1/2 -translate-x-1/2 w-full z-[40] px-10">
        <CategoryGrid />
      </div>

      {/* BACK BUTTON */}
      <button
        onClick={() => setSection(0)}
        className="absolute bottom-[40px] left-6 z-[100] p-3 text-white text-5xl hover:opacity-80 transition"
      >
        ↑
      </button>
    </section>
  );
}