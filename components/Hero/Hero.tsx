"use client";

import Image from "next/image";
import HeroText from "./HeroText";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">

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
      <AnimatedTitle loaded={loaded} />

      {/* TEXT OVERLAY */}
      <HeroText loaded={loaded} />

      {/* BOTTOM RED STRIP */}
      <div className="absolute bottom-0 w-full h-[60px] bg-[#7a0000] z-10" />

    </section>
  );
}

function AnimatedTitle({ loaded }: { loaded: boolean }) {
  const text = "Goutham Photography";

  // Pre-generate random delays (prevents re-random on re-render)
  const delays = text.split("").map(() => 1.2 + Math.random() * 0.8);

  return (
    <div className="absolute top-[45px] w-full text-center text-white font-serif text-4xl z-30 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">

      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block" }}
          initial={{
            opacity: 0,
            x: -30,
            filter: "blur(12px)",
          }}
          animate={{
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
          }}
          transition={{
            delay: delays[i],
            duration: 0.9,
            ease: [0.25, 0.8, 0.25, 1],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}

      {/* CONTACT */}
      <motion.span
        initial={{ opacity: 0, filter: "blur(8px)", y: 10 }}
        animate={loaded ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
        className="absolute right-10 text-xl top-[-15px]"
      >
        Contact
      </motion.span>
    </div>
  );
}