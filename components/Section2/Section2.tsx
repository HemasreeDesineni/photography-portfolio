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
      <div className="absolute inset-0 bg-[#8a5a2b]/70 z-10" />

      {/* TOP STRIP */}
      <div className="absolute top-0 w-full h-[35px] bg-[#b88a52] z-20" />

      {/* BOTTOM STRIP */}
      <div className="absolute bottom-0 w-full h-[30px] bg-[#b88a52] z-20" />

      {/* CONTACT */}
      <div className="absolute top-[50px] right-10 z-30 text-white text-lg font-[var(--font-playfair)]">
        Contact
      </div>

      {/* CONTENT (ABSOLUTE LAYOUT) */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute inset-0 z-30"
      >

        {/* TITLE */}
        <div className="absolute top-[80px] left-1/2 -translate-x-1/2">
          <Image
            src="/images/page2-title.png"
            alt="title"
            width={700}
            height={200}
            priority
          />
        </div>

        {/* I COMPOSE */}
        <div className="absolute top-[160px] left-1/2 -translate-x-1/2">
          <Image
            src="/images/page2-icompose-text.png"
            alt="compose"
            width={800}
            height={250}
            priority
          />
        </div>

        {/* WHITE TEXT */}
        <div className="absolute top-[320px] left-1/2 -translate-x-1/2">
          <Image
            src="/images/page2-white-text.png"
            alt="text"
            width={900}
            height={400}
            priority
          />
        </div>

      </motion.div>

      {/* ARROW */}
      <button
        onClick={scrollToTop}
        className="absolute bottom-[40px] left-6 z-40 text-white text-5xl"
      >
        ↑
      </button>

    </section>
  );
}