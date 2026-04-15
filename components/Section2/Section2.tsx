"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Section2() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Background animation
  const blur = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, 20]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);
  const blurValue = useTransform(blur, (b) => `blur(${b}px)`);

  const contentOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.8], [0, 1, 0]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden">

      {/* BACKGROUND */}
      <motion.div
        style={{ scale, filter: blurValue }}
        className="absolute inset-0"
      >
        <Image
          src="/images/page2-bg.jpg"
          alt="bg"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* YELLOW OVERLAY */}
      <div className="absolute inset-0 bg-[#8a5a2b]/35 z-10" />

      {/* TOP STRIP */}
      <div className="absolute top-0 w-full h-[10px] bg-[#b88a52] z-20" />

      {/* BOTTOM STRIP */}
      <div className="absolute bottom-0 w-full h-[10px] bg-[#b88a52] z-20" />

      {/* CONTACT */}
      <div className="absolute top-[25px] right-10 z-30 text-white text-lg font-[var(--font-playfair)]">
        Contact
      </div>

      {/* CONTENT */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute inset-0 z-50"
      >

        {/* TITLE */}
        <div className="absolute top-[-1px] left-1/2 -translate-x-1/2">
          <Image
            src="/images/page2-title.png"
            alt="title"
            width={1000}
            height={300}
            priority
            className="w-[90vw] max-w-[1800px] h-auto"
            style={{ mixBlendMode: "normal" }}
          />
        </div>

        {/* I COMPOSE */}
        <div className="absolute top-[-11px] left-1/2 -translate-x-1/2">
          <Image
            src="/images/page2-icompose-text.png"
            alt="compose"
            width={1200}
            height={350}
            priority
            className="w-[100vw] max-w-[1200px] h-auto"
            style={{ mixBlendMode: "normal" }}
          />
        </div>

        {/* WHITE TEXT */}
        <div className="absolute top-[20px] left-1/2 -translate-x-1/2">
          <Image
            src="/images/page2-white-text.png"
            alt="text"
            width={1300}
            height={600}
            priority
            className="w-[95vw] max-w-[1100px] h-auto"
            style={{ mixBlendMode: "normal" }}
          />
        </div>

      </motion.div>

      {/* ARROW */}
      <button
        onClick={scrollToTop}
        className="absolute bottom-[40px] left-6 z-40 text-white text-5xl hover:scale-110 transition"
      >
        ↑
      </button>

    </section>
  );
}