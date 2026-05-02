"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function CategoryCard({
  title,
  image,
  isActive,
  onClick,
  zoom = 1,
  position = "center",
}: {
  title: string;
  image: string;
  isActive: boolean;
  onClick: () => void;
  zoom?: number;
  position?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative h-full min-h-[360px] overflow-hidden text-left"
    >
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
        className="object-cover"
        style={{
          transform: `scale(${zoom})`,
          objectPosition: position,
        }}
      />

      <div className="absolute inset-0 z-[1]">
        <div
          className={`absolute inset-0 transition-colors duration-300 ${
            isActive ? "bg-black/25" : "bg-black/40 group-hover:bg-black/30"
          }`}
        />
        <div
          className={`absolute inset-0 transition-colors duration-300 ${
            isActive
              ? "bg-[#3d381b]/15"
              : "bg-[#3d381b]/30 group-hover:bg-[#3d381b]/20"
          }`}
        />
        <div className="absolute inset-[1px] border border-white/10" />
      </div>

      <div
        className="
          absolute left-1/2 top-5 z-10 -translate-x-1/2
          whitespace-nowrap text-center text-[18px] text-white
          tracking-[0.28em] font-[var(--font-bodoni)]
        "
      >
        {title}
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <motion.div
          animate={{ rotate: isActive ? 90 : 0, scale: isActive ? 1.04 : 1 }}
          transition={{ duration: 0.3 }}
          className="relative h-[90px] w-[90px]"
        >
          <Image
            src="/images/category-arrow.png"
            alt="arrow"
            fill
            className="
              object-contain
              brightness-110 contrast-110
              transition group-hover:scale-110
            "
          />
        </motion.div>
      </div>
    </button>
  );
}
