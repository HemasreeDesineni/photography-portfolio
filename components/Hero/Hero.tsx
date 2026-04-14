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

  // Pre-generate random delays (IMPORTANT: prevents re-random on re-render)
  const delays = text.split("").map(() => 1.2 + Math.random() * 0.8);

  return (
    <div className="absolute top-[45px] w-full text-center text-white font-serif text-4xl z-30 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">

      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block" }} // IMPORTANT
          initial={{
            opacity: 0,
            x: -30,              // 👈 start from LEFT (more visible now)
            filter: "blur(12px)" // 👈 strong blur at start
          }}
          animate={{
            opacity: 1,
            x: 0,
            filter: "blur(0px)"
          }}
          transition={{
            delay: delays[i],    // 👈 RANDOM order preserved
            duration: 0.9,
            ease: [0.25, 0.8, 0.25, 1] // 👈 smooth cinematic ease
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}

      {/* CONTACT */}
      <span className="absolute right-10 text-xl top-1 -translate-y-1/2">
        Contact
      </span>
    </div>
  );
}