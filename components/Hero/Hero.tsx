"use client";

import Image from "next/image";
import HeroText from "./HeroText";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 400);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">

      {/* BACKGROUND IMAGE (blur → clear) */}
      <motion.div
        initial={{ filter: "blur(20px)", scale: 1.05 }}
        animate={loaded ? { filter: "blur(0px)", scale: 1 } : {}}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src="/images/hero-bg.jpg"
          alt="hero-bg"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* RED OVERLAY (fade out) */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 bg-[#7a0000] z-20"
      />

      {/* TOP RED STRIP */}
      <div className="absolute top-0 w-full h-[70px] bg-[#7a0000] z-10" />

      {/* TITLE (RANDOM LETTER ANIMATION) */}
      <AnimatedTitle />

      {/* TEXT OVERLAY */}
      <HeroText loaded={loaded} />

      {/* BOTTOM RED STRIP */}
      <div className="absolute bottom-0 w-full h-[60px] bg-[#7a0000] z-10" />

    </div>
  );
}

function AnimatedTitle() {
  const text = "Goutham Photography";

  return (
    <div className="absolute top-[45px] w-full text-center text-white font-serif text-4xl z-30 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">

      {text.split("").map((char, i) => {
        const randomDelay = 1.2 + Math.random() * 0.8; // 🔥 RANDOM

        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: randomDelay,
              duration: 0.4,
              ease: "easeOut",
            }}
          >
            {char}
          </motion.span>
        );
      })}

      {/* CONTACT (no animation shift) */}
      <span className="absolute right-10 text-xl top-1 -translate-y-1/2">
        Contact
      </span>
    </div>
  );
}