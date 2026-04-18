"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Section2({
  setSection,
}: {
  setSection: (n: number) => void;
}) {
  return (
    <section className="relative h-screen w-full overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <Image
          src="/images/page2-bg.jpg"
          alt="bg"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* YELLOW REVEAL */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute inset-0 bg-[#8a5a2b] z-20"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[#8a5a2b]/50 z-10" />

      {/* STRIPS */}
      <div className="absolute top-0 w-full h-[10px] bg-[#b88a52] z-20" />
      <div className="absolute bottom-0 w-full h-[10px] bg-[#b88a52] z-20" />

      {/* CONTACT */}
      <div className="absolute top-[25px] right-10 z-30 text-white text-lg font-[var(--font-playfair)]">
        Contact
      </div>

      {/* ================= CONTENT ================= */}

      {/* TITLE */}
      <div className="absolute top-[-8px] left-1/2 -translate-x-1/2 z-[60]">
        <motion.div
          initial={{ x: -20, filter: "blur(10px)" }}
          animate={{ x: 0, filter: "blur(0px)" }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        >
          <Image
            src="/images/page2-title.png"
            alt="title"
            width={1000}
            height={300}
            priority
            className="w-[90vw] max-w-[1800px] h-auto"
          />
        </motion.div>
      </div>

      {/* I COMPOSE (NO ANIMATION) */}
      <div className="absolute top-[-11px] left-1/2 -translate-x-1/2 z-[40]">
        <Image
          src="/images/page2-icompose-text.png"
          alt="compose"
          width={1200}
          height={350}
          priority
          className="w-[100vw] max-w-[1200px] h-auto"
        />
      </div>

      {/* PARAGRAPH (BLUR → SHARP, NO MOVEMENT) */}
      <motion.div
        className="absolute top-[8px] left-1/2 -translate-x-1/2 z-[20]"
        initial={{
          opacity: 0,
          filter: "blur(14px)",
        }}
        animate={{
          opacity: 1,
          filter: "blur(0px)",
        }}
        transition={{
          duration: 3,
          ease: [0.25, 0.8, 0.25, 1],
          delay: 0.5,
        }}
      >
        <Image
          src="/images/page2-white-text.png"
          alt="text"
          width={1300}
          height={600}
          priority
          className="w-[95vw] max-w-[1100px] h-auto"
        />
      </motion.div>

      {/* ARROW */}
      <button
        onClick={() => setSection(0)}
        className="absolute bottom-[40px] left-6 z-[100] p-3 text-white text-5xl hover:scale-110 transition"
      >
        ↑
      </button>

    </section>
  );
}