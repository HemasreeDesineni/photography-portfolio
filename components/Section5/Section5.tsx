"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const INSTAGRAM_URL = "https://instagram.com/goutham_dance_photographer";
const WHATSAPP_URL = "https://wa.me/919154899991";

export default function Section5({
  setSection,
}: {
  setSection: (n: number) => void;
}) {
  return (
    <section className="relative h-screen w-full bg-[#391e0a] text-white overflow-hidden">

      {/* MAIN CENTER SYSTEM */}
      <div className="absolute inset-0 flex items-center justify-center">

        <div className="relative w-[1200px] h-[720px]">

          {/* ================= CENTER COLUMN ================= */}

          {/* REACH ME */}
          <motion.div
            className="pointer-events-none absolute top-[-200px] left-1/2 -translate-x-1/2 w-[1400px] h-[700px]"
          >
            <Image
              src="/images/reach-me.svg"
              alt="reach"
              fill
              className="object-contain scale-125"
            />
          </motion.div>

          {/* AT */}
          <motion.div
            className="pointer-events-none absolute top-[35px] left-[620px] -translate-x-1/2"
          >
            <Image
              src="/images/at.png"
              alt="at"
              width={200}
              height={100}
              className="w-[490px]"
            />
          </motion.div>

          {/* LET'S CREATE */}
          <motion.div
            className="pointer-events-none absolute top-[360px] left-1/2 -translate-x-1/2 tracking-[0.4em] text-xl"
          >
            LET&apos;S CREATE
          </motion.div>

          {/* SOMETHING AMAZING */}
          <motion.div
            className="pointer-events-none absolute top-[300px] left-[580px] -translate-x-1/2 w-[1100px] h-[400px]"
          >
            <Image
              src="/images/something-amazing.webp"
              alt="something"
              fill
              className="object-contain scale-110"
            />
          </motion.div>

          {/* TOGETHER */}
          <motion.div
            className="pointer-events-none absolute bottom-[70px] left-1/2 -translate-x-1/2 tracking-[0.4em] text-xl"
          >
            TOGETHER
          </motion.div>

          {/* ================= RIGHT COLUMN (FIXED) ================= */}

          <motion.div
            className="absolute top-[100px] right-[150px] z-20 w-[420px]"
          >

            {/* INSTAGRAM */}
            <div className="relative h-[120px]">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute left-[-188px] top-[134px] z-20 block h-[1.5rem] w-[1.5rem]"
              >
                <Image
                  src="/images/instagram-icon.svg"
                  alt="Instagram"
                  width={24}
                  height={24}
                  className="h-[1.5rem] w-[1.5rem]"
                />
              </a>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute left-[-150px] top-[130px] whitespace-nowrap tracking-[0.25em] text-lg"
              >
                GOUTHAM_DANCE_PHOTOGRAPHER
              </a>

            </div>

            {/* WHATSAPP */}
            <div className="relative h-[120px] mt-6">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute left-[-188px] top-[32px] z-20 block h-[1.55rem] w-[1.55rem]"
              >
                <Image
                  src="/images/whatsapp-icon.svg"
                  alt="WhatsApp"
                  width={25}
                  height={25}
                  className="h-[1.55rem] w-[1.55rem]"
                />
              </a>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute left-[-150px] top-[30px] whitespace-nowrap tracking-[0.25em] text-lg"
              >
                9154899991
              </a>

            </div>

          </motion.div>

        </div>
      </div>

      {/* BACK BUTTON */}
      <button
        onClick={() => setSection(0)}
        className="absolute bottom-[40px] left-6 text-5xl"
      >
        ↑
      </button>
    </section>
  );
}
