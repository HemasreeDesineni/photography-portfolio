"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import CategoryGrid from "./CategoryGrid";

export default function Section3({
  setSection,
}: {
  setSection: (n: number) => void;
}) {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#3d381b]">
      <div className="flex h-full flex-col">

        {/* TOP BANNER */}
        <div className="relative w-full shrink-0">
          <div className="relative h-[240px] overflow-hidden md:h-[290px] lg:h-[340px] xl:h-[380px]">

            <Image
              src="/images/page3banner.jpeg"
              alt="Page 3 banner"
              width={4910}
              height={1089}
              priority
              sizes="100vw"
              className="absolute bottom-[120px] left-0 w-full opacity-65"
            />

            <div className="absolute inset-0 bg-[#3d381b]/45" />

            {/* CONTACT */}
            <div
              onClick={() => setSection(4)}
              className="absolute top-5 right-6 z-[100] text-[18px] tracking-[0.25em] text-white cursor-pointer"
            >
              CONTACT
            </div>

            {/* VISUAL PORTFOLIO */}
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 2 }}
              className="pointer-events-none absolute left-1/2 top-[-22px] z-[20] h-[135px] w-[640px] -translate-x-1/2 md:h-[182px] md:w-[860px] lg:h-[244px] lg:w-[1180px] xl:h-[306px] xl:w-[1450px]"
            >
              <Image
                src="/images/visual-portfolio.png"
                alt="visual portfolio"
                fill
                priority
                className="object-cover opacity-90"
              />
            </motion.div>

            {/* TITLE */}
            <div className="pointer-events-none absolute left-1/2 bottom-[140px] z-[20] h-[44px] w-[580px] -translate-x-1/2">
              <Image
                src="/images/photography.png"
                alt="photography"
                fill
                priority
                className="object-cover opacity-90"
              />
            </div>

          </div>
        </div>

        {/* GRID */}
        <div className="relative z-[40] mx-auto flex-1 w-full max-w-[1520px] px-6 -mt-[110px]">
          <CategoryGrid />
        </div>
      </div>

      {/* BACK */}
      <button
        onClick={() => setSection(0)}
        className="absolute bottom-[40px] left-6 z-[100] text-5xl text-white"
      >
        ↑
      </button>
    </section>
  );
}