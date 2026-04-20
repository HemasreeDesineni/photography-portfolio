"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/Hero/Hero";
import Section2 from "@/components/Section2/Section2";
import Section3 from "@/components/Section3/Section3";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [section, setSection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleScroll = (direction: "up" | "down") => {
    if (isAnimating) return;

    setIsAnimating(true);

    // DOWN SCROLL
    if (direction === "down") {
      if (section === 0) setSection(1);
      else if (section === 1) setSection(2);
    }

    // UP SCROLL
    if (direction === "up") {
      if (section === 2) setSection(1);
      else if (section === 1) setSection(0);
    }

    setTimeout(() => setIsAnimating(false), 700);
  };

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) handleScroll("down");
      else handleScroll("up");
    };

    window.addEventListener("wheel", onWheel);
    return () => window.removeEventListener("wheel", onWheel);
  }, [section, isAnimating]);

  return (
    <main className="relative w-full h-screen overflow-hidden">

      {/* SCROLLBAR */}
      <div className="fixed right-3 top-1/2 -translate-y-1/2 z-[999]">
        <div className="w-[4px] h-[180px] bg-white/20 rounded-full overflow-hidden">
          <motion.div
            animate={{
              y:
                section === 0
                  ? 0
                  : section === 1
                  ? 60
                  : 120,
            }}
            transition={{ duration: 0.5 }}
            className="w-full h-[60px] bg-white rounded-full"
          />
        </div>
      </div>

      <AnimatePresence mode="sync">

        {/* HERO */}
        {section === 0 && (
          <motion.div
            key="hero"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              filter: "blur(8px)",
            }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <Hero />
          </motion.div>
        )}

        {/* SECTION 2 */}
        {section === 1 && (
          <motion.div
            key="section2"
            initial={{
              opacity: 0,
              filter: "blur(15px)",
            }}
            animate={{
              opacity: 1,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              filter: "blur(10px)",
            }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <Section2 setSection={setSection} />
          </motion.div>
        )}

        {/* SECTION 3 */}
        {section === 2 && (
          <motion.div
            key="section3"
            initial={{
              opacity: 0,
              filter: "blur(15px)",
            }}
            animate={{
              opacity: 1,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              filter: "blur(10px)",
            }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <Section3 setSection={setSection} />
          </motion.div>
        )}

      </AnimatePresence>
    </main>
  );
}