"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect } from "react";
import type { CategoryPhoto } from "./categoryData";

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-8 w-8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 5L19 19" />
      <path d="M19 5L5 19" />
    </svg>
  );
}

function PreviousIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 5-7 7 7 7" />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}

export default function CategoryImageModalMobile({
  photo,
  currentIndex,
  totalPhotos,
  onClose,
  onPrevious,
  onNext,
}: {
  photo: CategoryPhoto;
  currentIndex: number;
  totalPhotos: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < totalPhotos - 1;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-black"
    >
      {/* Top Bar */}
      <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-5 py-5">
        <span className="text-[11px] tracking-[0.35em] text-white/70">
          {String(currentIndex + 1).padStart(2, "0")} /{" "}
          {String(totalPhotos).padStart(2, "0")}
        </span>

        <button
          type="button"
          onClick={onClose}
          className="text-white"
        >
          <CloseIcon />
        </button>
      </div>

      {/* Image */}
      <div className="relative h-screen w-screen">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          priority
          sizes="100vw"
          className="object-contain"
        />
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-10">
        <button
          type="button"
          disabled={!canGoPrevious}
          onClick={onPrevious}
          className="text-white disabled:opacity-30"
        >
          <PreviousIcon />
        </button>

        <button
          type="button"
          disabled={!canGoNext}
          onClick={onNext}
          className="text-white disabled:opacity-30"
        >
          <NextIcon />
        </button>
      </div>
    </motion.div>
  );
}