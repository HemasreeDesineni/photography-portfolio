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
              className="absolute bottom-[120px] left-0 w-full h-auto opacity-65"
            />
            <div className="absolute inset-0 bg-[#3d381b]/45" />

            {/* CONTACT */}
            <div className="
              absolute top-5 right-6 z-[30]
              text-white text-[18px]
              tracking-[0.25em]
              font-[var(--font-bodoni)]
            ">
              CONTACT
            </div>

            {/* VISUAL PORTFOLIO */}
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 2 }}
              style={{ top: "-22px" }}
              className="absolute left-[51%] z-[20] h-[135px] w-[640px] -translate-x-1/2 pointer-events-none md:h-[182px] md:w-[860px] lg:h-[244px] lg:w-[1180px] xl:h-[306px] xl:w-[1450px]"
            >
              <Image
                src="/images/visual-portfolio.png"
                alt="visual portfolio"
                fill
                priority
                sizes="(max-width: 768px) 640px, (max-width: 1024px) 860px, (max-width: 1280px) 1180px, 1450px"
                className="object-cover opacity-90"
                style={{ objectPosition: "50% 47.3%" }}
              />
            </motion.div>

            {/* PHOTOGRAPHY */}
            <div
              style={{ bottom: "140px" }}
              className="absolute left-1/2 z-[20] h-[18px] w-[240px] -translate-x-1/2 pointer-events-none md:h-[26px] md:w-[340px] lg:h-[34px] lg:w-[460px] xl:h-[44px] xl:w-[580px]"
            >
              <Image
                src="/images/photography.png"
                alt="photography"
                fill
                priority
                sizes="(max-width: 768px) 240px, (max-width: 1024px) 340px, (max-width: 1280px) 460px, 580px"
                className="object-cover opacity-90"
                style={{ objectPosition: "50% 49.5%" }}
              />
            </div>
          </div>
        </div>

        {/* CATEGORY GRID */}
        <div
          style={{ marginTop: "-110px" }}
          className="relative z-[40] mx-auto w-full max-w-[1520px] px-6"
        >
          <CategoryGrid />
        </div>
      </div>

      {/* BACK BUTTON */}
      <button
        onClick={() => setSection(0)}
        className="absolute bottom-[40px] left-6 z-[100] p-3 text-white text-5xl hover:opacity-80 transition"
      >
        ↑
      </button>
    </section>
  );
}
