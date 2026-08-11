"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
} from "react";
import type { CategoryPhoto } from "./categoryData";

const MIN_ZOOM = 1;
const MAX_ZOOM = 3.5;
const ZOOM_STEP = 0.25;

type Point = {
  x: number;
  y: number;
};

const ORIGIN: Point = { x: 0, y: 0 };

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getRenderedImageSize(
  viewport: HTMLDivElement | null,
  aspectRatio: number | null,
) {
  const viewportWidth = viewport?.clientWidth ?? 0;
  const viewportHeight = viewport?.clientHeight ?? 0;

  if (viewportWidth === 0 || viewportHeight === 0) {
    return { width: 0, height: 0 };
  }

  if (!aspectRatio) {
    return {
      width: viewportWidth,
      height: viewportHeight,
    };
  }

  const viewportRatio = viewportWidth / viewportHeight;

  if (aspectRatio > viewportRatio) {
    return {
      width: viewportWidth,
      height: viewportWidth / aspectRatio,
    };
  }

  return {
    width: viewportHeight * aspectRatio,
    height: viewportHeight,
  };
}

function clampOffset(
  nextOffset: Point,
  zoom: number,
  viewport: HTMLDivElement | null,
  aspectRatio: number | null,
): Point {
  if (zoom <= 1) {
    return ORIGIN;
  }

  const renderedImage = getRenderedImageSize(viewport, aspectRatio);
  const maxX = Math.max(0, ((renderedImage.width * zoom) - renderedImage.width) / 2);
  const maxY = Math.max(0, ((renderedImage.height * zoom) - renderedImage.height) / 2);

  return {
    x: clamp(nextOffset.x, -maxX, maxX),
    y: clamp(nextOffset.y, -maxY, maxY),
  };
}

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

function ZoomOutIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="6.5" />
      <path d="M21 21l-4.35-4.35" />
      <path d="M8.5 11h5" />
    </svg>
  );
}

function ZoomInIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="6.5" />
      <path d="M21 21l-4.35-4.35" />
      <path d="M11 8.5v5" />
      <path d="M8.5 11h5" />
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
  const imageStageRef = useRef<HTMLDivElement | null>(null);
  const dragStateRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    origin: Point;
  } | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState<Point>(ORIGIN);
  const [isDragging, setIsDragging] = useState(false);
  const [imageAspectRatio, setImageAspectRatio] = useState<number | null>(null);
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < totalPhotos - 1;

  const applyZoom = (nextZoom: number) => {
    const clampedZoom = clamp(nextZoom, MIN_ZOOM, MAX_ZOOM);

    setZoom(clampedZoom);
    setOffset((currentOffset) =>
      clampOffset(
        clampedZoom === 1 ? ORIGIN : currentOffset,
        clampedZoom,
        imageStageRef.current,
        imageAspectRatio,
      ),
    );

    if (clampedZoom === 1) {
      dragStateRef.current = null;
      setIsDragging(false);
    }
  };

  const resetZoom = () => {
    const activeDrag = dragStateRef.current;

    if (
      activeDrag &&
      imageStageRef.current?.hasPointerCapture(activeDrag.pointerId)
    ) {
      imageStageRef.current.releasePointerCapture(activeDrag.pointerId);
    }

    setZoom(1);
    setOffset(ORIGIN);
    setIsDragging(false);
    dragStateRef.current = null;
  };

  const handleClose = () => {
    if (document.fullscreenElement === modalRef.current) {
      void document.exitFullscreen();
    }

    onClose();
  };

  const endDrag = (pointerId?: number) => {
    const dragState = dragStateRef.current;

    if (!dragState) {
      return;
    }

    if (pointerId !== undefined && dragState.pointerId !== pointerId) {
      return;
    }

    if (
      imageStageRef.current?.hasPointerCapture(dragState.pointerId)
    ) {
      imageStageRef.current.releasePointerCapture(dragState.pointerId);
    }

    dragStateRef.current = null;
    setIsDragging(false);
  };

  const handleWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    event.preventDefault();

    const direction = event.deltaY < 0 ? 1 : -1;
    applyZoom(zoom + direction * ZOOM_STEP);
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (zoom <= 1) {
      return;
    }

    event.preventDefault();

    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      origin: offset,
    };

    imageStageRef.current?.setPointerCapture(event.pointerId);
    setIsDragging(true);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const dragState = dragStateRef.current;

    if (!dragState || dragState.pointerId !== event.pointerId || zoom <= 1) {
      return;
    }

    event.preventDefault();

    const nextOffset = {
      x: dragState.origin.x + event.clientX - dragState.startX,
      y: dragState.origin.y + event.clientY - dragState.startY,
    };

    setOffset(
      clampOffset(
        nextOffset,
        zoom,
        imageStageRef.current,
        imageAspectRatio,
      ),
    );
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      handleClose();
    }

    if (event.key === "ArrowLeft" && canGoPrevious) {
      event.preventDefault();
      onPrevious();
    }

    if (event.key === "ArrowRight" && canGoNext) {
      event.preventDefault();
      onNext();
    }

    if (event.key === "+" || event.key === "=") {
      event.preventDefault();
      applyZoom(zoom + ZOOM_STEP);
    }

    if (event.key === "-") {
      event.preventDefault();
      applyZoom(zoom - ZOOM_STEP);
    }

    if (event.key === "0") {
      event.preventDefault();
      resetZoom();
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === modalRef.current);
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
    };
  }, []);

  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  useEffect(() => {
    dragStateRef.current = null;
    setIsDragging(false);
    setZoom(1);
    setOffset(ORIGIN);
    setImageAspectRatio(null);
  }, [photo.src]);

  useEffect(() => {
    const onResize = () => {
      setOffset((currentOffset) =>
        clampOffset(
          currentOffset,
          zoom,
          imageStageRef.current,
          imageAspectRatio,
        ),
      );
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [imageAspectRatio, zoom]);

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
      ref={modalRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      tabIndex={-1}
      className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md"
      onKeyDown={handleKeyDown}
    >
      <div className="relative h-full w-full overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] as const }}
          className="relative flex h-full w-full flex-col bg-[#090805]"
          role="dialog"
          aria-modal="true"
          aria-label={photo.alt}
        >
          <div className="absolute left-5 right-5 top-5 z-20 flex items-center justify-between gap-4 md:left-8 md:right-8 md:top-8">
            <span className="text-xs uppercase tracking-[0.32em] text-white/55 md:text-sm">
              {String(currentIndex + 1).padStart(2, "0")} /{" "}
              {String(totalPhotos).padStart(2, "0")}
            </span>

            <div className="flex items-center gap-2 md:gap-3">
              <button
                type="button"
                onClick={() => applyZoom(zoom - ZOOM_STEP)}
                disabled={zoom <= MIN_ZOOM}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white transition hover:border-white/20 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35"
                aria-label="Zoom out"
              >
                <ZoomOutIcon />
              </button>

              <button
                type="button"
                onClick={resetZoom}
                className="min-w-[72px] rounded-full border border-white/10 bg-black/30 px-3 py-2 text-[11px] uppercase tracking-[0.24em] text-white/75 transition hover:border-white/20 hover:bg-white/10"
                aria-label="Reset zoom"
              >
                {Math.round(zoom * 100)}%
              </button>

              <button
                type="button"
                onClick={() => applyZoom(zoom + ZOOM_STEP)}
                disabled={zoom >= MAX_ZOOM}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white transition hover:border-white/20 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35"
                aria-label="Zoom in"
              >
                <ZoomInIcon />
              </button>

              <button
                type="button"
                onClick={() => void toggleFullscreen()}
                className="hidden h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white transition hover:border-white/20 hover:bg-white/10 lg:flex"
                aria-label={isFullscreen ? "Exit full screen" : "Open full screen"}
              >
                {isFullscreen ? <FullscreenExitIcon /> : <FullscreenEnterIcon />}
              </button>

              <button
                type="button"
                onClick={handleClose}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white transition hover:border-white/20 hover:bg-white/10"
                aria-label="Close image modal"
              >
                <CloseIcon />
              </button>
            </div>
          </div>

          <div className="flex min-h-0 flex-1 items-center">
            <button
              type="button"
              onClick={onPrevious}
              disabled={!canGoPrevious}
              className="absolute left-4 top-1/2 z-20 hidden h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white transition hover:border-white/20 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-25 md:flex"
              aria-label="Previous image"
            >
              <PreviousIcon />
            </button>

            <div
              ref={imageStageRef}
              className={[
                "relative min-h-0 flex-1 self-stretch overflow-hidden px-20 pb-16 pt-20 select-none md:px-28 md:pb-20 md:pt-24",
                zoom > 1
                  ? isDragging
                    ? "cursor-grabbing"
                    : "cursor-grab"
                  : "cursor-zoom-in",
              ].join(" ")}
              onDoubleClick={() => applyZoom(zoom > 1 ? 1 : 2)}
              onWheel={handleWheel}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={(event) => endDrag(event.pointerId)}
              onPointerCancel={(event) => endDrag(event.pointerId)}
              onPointerLeave={(event) => endDrag(event.pointerId)}
            >
              <div
                className="absolute inset-0"
                style={{
                  transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${zoom})`,
                  transition: isDragging ? "none" : "transform 180ms ease-out",
                }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  priority
                  sizes="100vw"
                  className="pointer-events-none object-contain"
                  onLoad={(event) => {
                    const { naturalWidth, naturalHeight } = event.currentTarget;

                    if (naturalWidth > 0 && naturalHeight > 0) {
                      setImageAspectRatio(naturalWidth / naturalHeight);
                    }
                  }}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={onNext}
              disabled={!canGoNext}
              className="absolute right-4 top-1/2 z-20 hidden h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white transition hover:border-white/20 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-25 md:flex"
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
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-25"
              aria-label="Previous image"
            >
              <PreviousIcon />
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={!canGoNext}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-25"
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
