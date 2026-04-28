"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Section5({
  setSection,
}: {
  setSection: (n: number) => void;
}) {
  return (
    <section className="relative h-screen w-full bg-[#4a2208] text-white overflow-hidden">

      {/* MAIN CENTER SYSTEM */}
      <div className="absolute inset-0 flex items-center justify-center">

        <div className="relative w-[1200px] h-[720px]">

          {/* ================= CENTER COLUMN ================= */}

          {/* REACH ME */}
          <motion.div
            className="absolute top-[-60px] left-1/2 -translate-x-1/2"
          >
            <Image
              src="/images/reach-me.png"
              alt="reach"
              width={1200}
              height={300}
              className="w-[950px] lg:w-[1100px]"
            />
          </motion.div>

          {/* AT */}
          <motion.div
            className="absolute top-[30px] left-1/2 -translate-x-1/2"
          >
            <Image
              src="/images/at.png"
              alt="at"
              width={200}
              height={100}
              className="w-[450px]"
            />
          </motion.div>

          {/* LET'S CREATE */}
          <motion.div
            className="absolute top-[360px] left-1/2 -translate-x-1/2 tracking-[0.4em] text-xl"
          >
            LET&apos;S CREATE
          </motion.div>

          {/* SOMETHING AMAZING */}
          <motion.div
            className="absolute top-[300px] left-[580px] -translate-x-1/2"
          >
            <Image
              src="/images/something-amazing.png"
              alt="something"
              width={1400}
              height={600}
              className="w-[900px] lg:w-[1100px]"
            />
          </motion.div>

          {/* TOGETHER */}
          <motion.div
            className="absolute bottom-[100px] left-1/2 -translate-x-1/2 tracking-[0.4em] text-xl"
          >
            TOGETHER
          </motion.div>

          {/* ================= RIGHT COLUMN (FIXED) ================= */}

          <motion.div
            className="absolute top-[100px] right-[150px] w-[420px]"
          >

            {/* INSTAGRAM */}
            <div className="relative h-[120px]">

              {/* ICON */}
              <Image
                src="/images/instagram-icon.png"
                alt="insta"
                width={200}
                height={200}
                className="absolute left-[-250px] top-[75px] w-[250px] z-10"
              />

              {/* TEXT */}
              <span className="absolute left-[-100px] top-[130px] tracking-[0.25em] text-lg">
                : VISUALS_BY_GOUTHAM
              </span>

            </div>

            {/* WHATSAPP */}
            <div className="relative h-[120px] mt-6">

              {/* ICON */}
              <Image
                src="/images/whatsapp-icon.png"
                alt="whatsapp"
                width={200}
                height={200}
                className="absolute left-[-228px] top-[-15px] w-[210px] z-10"
              />

              {/* TEXT */}
              <span className="absolute left-[-100px] top-[30px] tracking-[0.25em] text-lg">
                : 9154899991
              </span>

            </div>

          </motion.div>

        </div>
      </div>

      {/* BACK BUTTON */}
      <button
        onClick={() => setSection(3)}
        className="absolute bottom-[40px] left-6 text-5xl"
      >
        ↑
      </button>
    </section>
  );
}