"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const cinematicEase = [0.22, 1, 0.36, 1] as const;

export default function MobileHero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-black text-white">

      {/* TOP RED STRIP */}
      <div className="absolute top-0 left-0 z-30 h-[92px] w-full bg-[#7a0000]" />

      {/* BOTTOM RED STRIP */}
      {/* <div className="absolute bottom-0 left-0 z-30 h-[48px] w-full bg-[#7a0000]" /> */}

      {/* HERO IMAGE */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 1.08,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 2,
          ease: cinematicEase,
        }}
        className="absolute inset-0"
      >
        <Image
            src="/images/hero-bg-mobile.jpg"
            alt="Hero"
            fill
            quality={100}
            priority
            sizes="100vw"
            className="object-cover"
            style={{
                objectPosition: "58% center",
                transform: "scale(1)",
            }}
        />
      </motion.div>

      {/* DARK CINEMATIC OVERLAY */}
      <div className="absolute inset-0 bg-black/30" />

      {/* CONTENT */}
      <div className="relative z-40 flex min-h-[100svh] flex-col">

        {/* TOP BAR */}
        <div className="flex h-[72px] items-center justify-between px-5">

          {/* <motion.h1
            initial={{
                opacity: 0,
                y: -20,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: 1.2,
                ease: cinematicEase,
            }}
            className="
                absolute
                left-4
                top-[42px]
                z-50
                max-w-[150px]
                text-[1.1rem]
                leading-[1]
                tracking-[-0.03em]
                text-white
            "
            style={{
                fontFamily: "serif",
                textShadow: "0 4px 14px rgba(0,0,0,0.45)",
            }}
            >
            Goutham Photography
          </motion.h1> */}

          <motion.div
            initial={{
                opacity: 0,
                y: -20,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: 1.2,
                ease: cinematicEase,
            }}
            className="
                absolute
                left-[-280px]
                top-[-310px]
                z-50
                h-[800px]
                w-[1000px]
            "
            >
            <Image
                src="/images/hero-title.png"
                alt="Goutham Photography"
                fill
                quality={100}
                priority
                className="object-contain"
                style={{
                  filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.35))",
                }}
            />
          </motion.div>

          <button
            className="
                absolute
                right-4
                top-[44px]
                z-50
                text-[9px]
                uppercase
                tracking-[0.22em]
                text-white
                ">
            Contact
          </button>

        </div>

        {/* CENTER CONTENT */}
        <div className="flex flex-1 items-center justify-center">

          <motion.div
            initial={{
              opacity: 0,
              y: 60,
              filter: "blur(12px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 1.8,
              delay: 0.3,
              ease: cinematicEase,
            }}
            className="
              relative
              h-[520px]
              w-[700px]
              -translate-y-[40px]
            "
          >

            {/* THROUGH MY */}
            <div
              className="
                absolute
                left-1/2
                top-[55px]
                h-[350px]
                w-[600px]
                -translate-x-1/2
                z-20
              "
            >
              <Image
                src="/images/through-my.png"
                alt="Through My"
                fill
                quality={100}
                sizes="220px"
                className="object-contain"
              />
            </div>

            {/* EYES */}
            <div
              className="
                absolute
                left-1/2
                top-[10px]
                h-[520px]
                w-[700px]
                -translate-x-1/2
                z-10
              "
            >
              <Image
                src="/images/hero-text.png"
                alt="Eyes"
                fill
                quality={100}
                sizes="300px"
                className="object-contain"
              />
            </div>

          </motion.div>

        </div>

        {/* SCROLL INDICATOR */}
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
          }}
          className="
            relative
            z-40
            flex
            h-[72px]
            items-center
            justify-center
          "
        >
          <div className="text-3xl text-white">
            ↓
          </div>
        </motion.div>

      </div>
    </section>
  );
}