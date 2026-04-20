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

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition" />

      {/* TITLE (CENTER ALIGNED) */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white text-lg tracking-widest font-[var(--font-playfair)] z-10 text-center whitespace-nowrap">
        {title}
      </div>

      {/* ARROW BUTTON */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.div
          animate={{ rotate: isActive ? 90 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-[60px] h-[60px] bg-black/50 rounded-full flex items-center justify-center"
        >
          <Image
            src="/images/category-arrow.png"
            alt="arrow"
            width={24}
            height={24}
          />
        </motion.div>
      </div>
    </div>
  );
}