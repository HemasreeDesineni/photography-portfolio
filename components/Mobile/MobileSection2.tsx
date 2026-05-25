"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const cinematicEase = [0.22, 1, 0.36, 1] as const;

export default function MobileSection2() {
  return (
    <section className="relative h-[100svh] overflow-hidden bg-black text-white">

      {/* BACKGROUND IMAGE */}
      <motion.div
        initial={{
          scale: 1.08,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 2.2,
          ease: cinematicEase,
        }}
        className="absolute inset-0"
      >
        <Image
          src="/images/page2-bg.jpg"
          alt="Section 2 Background"
          width={1179}
          height={2556}
          priority
          quality={95}
          sizes="100vw"
          className="
            h-full
            w-full
            object-cover
          "
          style={{
            objectPosition: "50% 42%",
          }}
        />
      </motion.div>

      {/* YELLOW REVEAL */}
      <motion.div
        initial={{
          opacity: 1,
        }}
        animate={{
          opacity: 0,
        }}
        transition={{
          duration: 2,
          ease: "easeOut",
        }}
        className="
          absolute
          inset-0
          z-20
          bg-[#8a5a2b]
        "
      />

      {/* WARM OVERLAY */}
      <div
        className="
          absolute
          inset-0
          z-10
          bg-[#8a5a2b]/35
        "
      />

      {/* CINEMATIC VIGNETTE */}
      <div
        className="
          absolute
          inset-0
          z-20
          bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.32)_100%)]
        "
      />

      {/* TOP STRIP */}
      <div
        className="
          absolute
          top-0
          left-0
          z-30
          h-[8px]
          w-full
          bg-[#b88a52]
        "
      />

      {/* BOTTOM STRIP */}
      <div
        className="
          absolute
          bottom-0
          left-0
          z-30
          h-[8px]
          w-full
          bg-[#b88a52]
        "
      />

      {/* TITLE GROUP */}
      <div
        className="
          absolute
          top-[50px]
          left-[-10%]
          z-40
          h-[260px]
          w-full
          -translate-x-1/2
        "
      >

        {/* I DON'T JUST CAPTURE */}
        <motion.div
          initial={{
            opacity: 0,
            y: -30,
            filter: "blur(10px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 1.8,
            ease: cinematicEase,
          }}
          className="
            absolute
            left-[30%]
            top-0
            z-50
            w-[700px]
            -translate-x-1/2
          "
        >
          <Image
            src="/images/page2-title.png"
            alt="I don't just Capture"
            width={1000}
            height={300}
            priority
            quality={100}
            className="h-auto w-full object-contain"
            style={{
              filter: "drop-shadow(0 3px 10px rgba(0,0,0,0.35))",
            }}
          />
        </motion.div>

        {/* I COMPOSE */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.92,
            filter: "blur(14px)",
          }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 2,
            delay: 0.25,
            ease: cinematicEase,
          }}
          className="
            absolute
            left-[28%]
            top-[-1px]
            z-40
            w-[700px]
            -translate-x-1/2
          "
        >
          <Image
            src="/images/page2-icompose-text.png"
            alt="I Compose"
            width={1200}
            height={350}
            priority
            quality={100}
            className="h-auto w-full object-contain"
            style={{
              filter: "drop-shadow(0 3px 10px rgba(0,0,0,0.35))",
            }}
          />
        </motion.div>

      </div>

      {/* PARAGRAPH BLOCK */}
      <motion.div
        initial={{
          opacity: 0,
          y: 30,
          filter: "blur(12px)",
        }}
        animate={{
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        }}
        transition={{
          duration: 2,
          delay: 0.45,
          ease: cinematicEase,
        }}
        className="
          absolute
          left-[-34%]
          top-[100px]
          z-30
          w-[720px]
          -translate-x-1/2
        "
      >
        <Image
          src="/images/page2-white-text.png"
          alt="Section 2 Text"
          width={1300}
          height={600}
          priority
          quality={100}
          className="h-auto w-full object-contain"
          style={{
            filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.25))",
          }}
        />
      </motion.div>

      {/* SCROLL INDICATOR */}
      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          bottom-[22px]
          left-1/2
          z-50
          -translate-x-1/2
        "
      >
        <div
          className="
            text-[28px]
            text-[#e0c08f]
            opacity-80
          "
          style={{
            textShadow: "0 2px 10px rgba(0,0,0,0.35)",
          }}
        >
          ↓
        </div>
      </motion.div>
    </section>
  );
}