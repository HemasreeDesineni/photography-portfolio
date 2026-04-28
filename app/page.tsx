"use client";

import { useState, useEffect, useEffectEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Hero from "@/components/Hero/Hero";
import Section2 from "@/components/Section2/Section2";
import Section3 from "@/components/Section3/Section3";
import Section4 from "@/components/Section4/Section4";
import Section5 from "@/components/Section5/Section5";

const SECTION_COUNT = 5;
const SCROLLBAR_TRACK_HEIGHT = 180;
const SCROLLBAR_THUMB_HEIGHT = SCROLLBAR_TRACK_HEIGHT / SECTION_COUNT;

export default function Home() {
  const [section, setSection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleScroll = useEffectEvent((direction: "up" | "down") => {
    if (isAnimating) return;

    const nextSection =
      direction === "down"
        ? Math.min(section + 1, SECTION_COUNT - 1)
        : Math.max(section - 1, 0);

    if (nextSection === section) return;

    setIsAnimating(true);
    setSection(nextSection);
    window.setTimeout(() => setIsAnimating(false), 700);
  });

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) handleScroll("down");
      else handleScroll("up");
    };

    window.addEventListener("wheel", onWheel);
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  // ✅ NEW: KEYBOARD NAVIGATION
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        handleScroll("down");
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        handleScroll("up");
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <main className="relative h-screen w-full overflow-hidden">
      {/* SCROLLBAR */}
      <div className="fixed right-3 top-1/2 z-[999] -translate-y-1/2">
        <div className="h-[180px] w-[4px] overflow-hidden rounded-full bg-white/20">
          <motion.div
            animate={{ y: section * SCROLLBAR_THUMB_HEIGHT }}
            transition={{ duration: 0.5 }}
            className="w-full rounded-full bg-white"
            style={{ height: SCROLLBAR_THUMB_HEIGHT }}
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

        {/* SECTION 4 */}
        {section === 3 && (
          <motion.div
            key="section4"
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
            <Section4 setSection={setSection} />
          </motion.div>
        )}

        {/* SECTION 5 */}
        {section === 4 && (
          <motion.div
            key="section5"
            initial={{ opacity: 0, filter: "blur(15px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <Section5 setSection={setSection} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}