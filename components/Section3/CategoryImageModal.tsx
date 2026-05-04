"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { CategoryPhoto } from "./categoryData";

function FullscreenEnterIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 9V4.5H9" />
      <path d="M15 4.5h4.5V9" />
      <path d="M19.5 15v4.5H15" />
      <path d="M9 19.5H4.5V15" />
    </svg>
  );
}

function FullscreenExitIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.5 4.5H4.5v5" />
      <path d="M14.5 4.5h5v5" />
      <path d="M19.5 14.5v5h-5" />
      <path d="M9.5 19.5h-5v-5" />
      <path d="M9 9 4.5 4.5" />
      <path d="m15 9 4.5-4.5" />
      <path d="m15 15 4.5 4.5" />
      <path d="M9 15 4.5 19.5" />
    </svg>
  );
}

function PreviousIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-8 w-8"
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
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-8 w-8"
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

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-8 w-8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 5 19 19" />
      <path d="M19 5 5 19" />
    </svg>
  );
}

export default function CategoryImageModal({
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
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < totalPhotos - 1;

  const handleClose = () => {
    if (document.fullscreenElement === modalRef.current) {
      void document.exitFullscreen();
    }

    onClose();
  };

  useEffect(() => {
    const closeModal = () => {
      if (document.fullscreenElement === modalRef.current) {
        void document.exitFullscreen();
      }

      onClose();
    };

    const onFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === modalRef.current);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }

      if (event.key === "ArrowLeft" && canGoPrevious) {
        event.preventDefault();
        onPrevious();
      }

      if (event.key === "ArrowRight" && canGoNext) {
        event.preventDefault();
        onNext();
      }
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [canGoNext, canGoPrevious, onClose, onNext, onPrevious]);

  const toggleFullscreen = async () => {
    if (!modalRef.current) {
      return;
    }

    if (document.fullscreenElement === modalRef.current) {
      await document.exitFullscreen();
      return;
    }

    await modalRef.current.requestFullscreen();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-[160] bg-black/85 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div className="flex h-full w-full items-center justify-center p-6 md:p-10">
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] as const }}
          className="relative flex h-full max-h-[880px] w-full max-w-[1440px] flex-col bg-[#17150d] px-5 pb-5 pt-16 md:px-8 md:pb-8 md:pt-20"
          onClick={(event) => event.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label={photo.alt}
        >
          <div className="absolute right-5 top-5 z-10 flex items-center gap-3 md:right-8 md:top-8">
            <span className="text-xs uppercase tracking-[0.32em] text-white/55">
              {String(currentIndex + 1).padStart(2, "0")} /{" "}
              {String(totalPhotos).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={handleClose}
              className="flex h-11 w-11 items-center justify-center text-white transition hover:bg-white/10"
              aria-label="Close image modal"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="flex min-h-0 flex-1 items-center">
            <button
              type="button"
              onClick={onPrevious}
              disabled={!canGoPrevious}
              className="absolute left-4 top-1/2 z-10 hidden h-16 w-16 -translate-y-1/2 items-center justify-center text-5xl text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-25 md:flex"
              aria-label="Previous image"
            >
              <PreviousIcon />
            </button>

            <div className="relative min-h-0 flex-1 self-stretch">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                priority
                sizes="90vw"
                className="object-contain"
              />
              <button
                type="button"
                onClick={() => void toggleFullscreen()}
                className="absolute bottom-4 right-4 z-10 flex h-12 w-12 items-center justify-center text-white transition hover:opacity-75"
                aria-label={isFullscreen ? "Exit full screen" : "Open full screen"}
              >
                {isFullscreen ? <FullscreenExitIcon /> : <FullscreenEnterIcon />}
              </button>
            </div>

            <button
              type="button"
              onClick={onNext}
              disabled={!canGoNext}
              className="absolute right-4 top-1/2 z-10 hidden h-16 w-16 -translate-y-1/2 items-center justify-center text-5xl text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-25 md:flex"
              aria-label="Next image"
            >
              <NextIcon />
            </button>
          </div>

          <div className="mt-5 flex items-center justify-center gap-3 md:hidden">
            <button
              type="button"
              onClick={onPrevious}
              disabled={!canGoPrevious}
              className="flex h-12 w-12 items-center justify-center text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-25"
              aria-label="Previous image"
            >
              <PreviousIcon />
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={!canGoNext}
              className="flex h-12 w-12 items-center justify-center text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-25"
              aria-label="Next image"
            >
              <NextIcon />
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
