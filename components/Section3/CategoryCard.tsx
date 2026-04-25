"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function CategoryCard({
  title,
  image,
  isActive,
  onClick,
}: {
  title: string;
  image: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="relative h-[420px] cursor-pointer overflow-hidden group"
    >
      {/* IMAGE */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
      />

      {/* DARK OVERLAY
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition" /> */}
      {/* OVERLAY STACK */}
      <div className="absolute inset-0 z-[1]">
        {/* Dark base */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition" />

        {/* Green tint (THE IMPORTANT PART) */}
        <div className="absolute inset-0 bg-[#3d381b]/30 group-hover:bg-[#3d381b]/20 transition" />
      </div>

      {/* TITLE (UPDATED FONT) */}
      <div
        className="
          absolute top-5 left-1/2 -translate-x-1/2
          text-white text-[18px]
          tracking-[0.28em]
          font-[var(--font-bodoni)]
          z-10 text-center whitespace-nowrap
        "
      >
        {title}
      </div>

      {/* ARROW */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.div
          animate={{ rotate: isActive ? 90 : 0 }}
          transition={{ duration: 0.3 }}
          className="relative w-[90px] h-[90px]"
        >
          <Image
            src="/images/category-arrow.png"
            alt="arrow"
            fill
            className="
              object-contain
              brightness-110 contrast-110
              group-hover:scale-110 transition
            "
          />
        </motion.div>
      </div>
    </div>
  );
}