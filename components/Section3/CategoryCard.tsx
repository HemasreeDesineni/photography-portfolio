"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import TransparentImageLabel from "./TransparentImageLabel";

const cinematicEase = [0.22, 1, 0.36, 1] as const;

export default function CategoryCard({
  title,
  titleImage,
  titleScale = 39,
  image,
  isActive,
  onClick,
  zoom = 1,
  position = "center",
}: {
  title: string;
  titleImage: string;
  titleScale?: number;
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
      aria-label={title}
      className="group relative h-full min-h-[360px] overflow-hidden text-left"
    >
      {/* IMAGE */}
      <motion.div
        initial={{
          y: 220,
        }}
        animate={{
          y: 0,
        }}
        transition={{
          duration: 1.9,
          ease: cinematicEase,
        }}
        className="absolute inset-0"
      >
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
          className="object-cover"
          style={{
            transform: `scale(${zoom})`,
            objectPosition: position,
          }}
        />
      </motion.div>

      {/* OVERLAYS */}
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 1.2,
          delay: 1.1,
          ease: cinematicEase,
        }}
        className="absolute inset-0 z-[1]"
      >
        <div
          className={`absolute inset-0 transition-colors duration-300 ${
            isActive
              ? "bg-black/25"
              : "bg-black/40 group-hover:bg-black/30"
          }`}
        />

        <div
          className={`absolute inset-0 transition-colors duration-300 ${
            isActive
              ? "bg-[#3d381b]/15"
              : "bg-[#3d381b]/30 group-hover:bg-[#3d381b]/20"
          }`}
        />
      </motion.div>

      {/* TITLE */}
      <motion.div
        initial={{
          opacity: 0,
          x: -55,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 2.8,
          ease: cinematicEase,
        }}
        className="absolute inset-x-0 top-5 z-10 flex justify-center px-4"
      >
        <TransparentImageLabel
          src={titleImage}
          alt={title}
          scale={titleScale}
          sizes="240px"
          className="h-[20px] w-full max-w-[220px] md:h-[22px] md:max-w-[230px] xl:h-[24px] xl:max-w-[240px]"
        />
      </motion.div>

      {/* ARROW */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <motion.div
          animate={{
            rotate: isActive ? 90 : 0,
            scale: isActive ? 1.04 : 1,
          }}
          transition={{
            duration: 0.3,
          }}
          className="relative h-[90px] w-[90px]"
        >
          <Image
            src="/images/category-arrow.webp"
            alt=""
            fill
            className="
              object-contain
              brightness-110 contrast-110
              transition
              group-hover:scale-110
            "
          />
        </motion.div>
      </div>
    </button>
  );
}