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
              className="w-[800px] lg:w-[950px]"
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
              className="w-[700px] lg:w-[900px]"
            />
          </motion.div>

          {/* TOGETHER */}
          <motion.div
            className="absolute bottom-[100px] left-1/2 -translate-x-1/2 tracking-[0.4em] text-xl"
          >
            TOGETHER
          </motion.div>

          {/* ================= RIGHT COLUMN ================= */}

          <motion.div
            className="absolute top-[180px] right-[130px] flex flex-col gap-10 items-start"
          >
            {/* INSTAGRAM */}
            <div className="flex items-center gap-6">
              <Image
                src="/images/instagram-icon.png"
                alt="insta"
                width={140}
                height={140}
                className="w-[500px]"
              />
              <span className="tracking-[0.25em] text-l">
                : VISUALS_BY_GOUTHAM
              </span>
            </div>

            {/* WHATSAPP */}
            <div className="flex items-center gap-6">
              <Image
                src="/images/whatsapp-icon.png"
                alt="whatsapp"
                width={140}
                height={140}
                className="w-[500px]"
              />
              <span className="tracking-[0.25em] text-l">
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