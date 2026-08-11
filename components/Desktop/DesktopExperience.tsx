"use client";

import { useEffect, useEffectEvent, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Hero from "@/components/Hero/Hero";
import Section2 from "@/components/Section2/Section2";
import Section3 from "@/components/Section3/Section3";
import Section4 from "@/components/Section4/Section4";
import Section5 from "@/components/Section5/Section5";

import {
  PHOTOS_PER_PAGE,
  photographyCategories,
  videographyCategories,
} from "@/components/Section3/categoryData";

const SECTION_COUNT = 5;
const WHEEL_GESTURE_RESET_MS = 180;
const WHEEL_NAVIGATION_THRESHOLD = 140;
const WHEEL_NAVIGATION_COOLDOWN_MS = 950;
const GALLERY_SCROLL_MIN_DISTANCE = 48;
const GALLERY_SCROLL_MAX_DISTANCE = 120;

function getGalleryStepCount(photoCount: number) {
  if (photoCount <= 0) {
    return 1;
  }

  return Math.max(1, Math.ceil(photoCount / PHOTOS_PER_PAGE));
}

export default function DesktopExperience() {
  const [section, setSection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const [section3ActiveCategoryId, setSection3ActiveCategoryId] =
    useState<string | null>(null);

  const [, setSection3GalleryProgress] = useState(0);

  const [section3ModalPhotoIndex, setSection3ModalPhotoIndex] =
    useState<number | null>(null);

  const section3GalleryViewportRef =
    useRef<HTMLDivElement | null>(null);

  const [section4ActiveCategoryId, setSection4ActiveCategoryId] =
    useState<string | null>(null);

  const [, setSection4GalleryProgress] = useState(0);

  const section4GalleryViewportRef =
    useRef<HTMLDivElement | null>(null);

  const wheelAccumulatorRef = useRef(0);
  const lastWheelDirectionRef = useRef<"up" | "down" | null>(null);
  const lastWheelEventTimeRef = useRef(0);
  const wheelLockUntilRef = useRef(0);

  const activeSection3Category = useMemo(
    () =>
      photographyCategories.find(
        (category) => category.id === section3ActiveCategoryId
      ) ?? null,
    [section3ActiveCategoryId]
  );

  const activeSection4Category = useMemo(
    () =>
      videographyCategories.find(
        (category) => category.id === section4ActiveCategoryId
      ) ?? null,
    [section4ActiveCategoryId]
  );

  const isSection3Expanded =
    section === 2 && section3ActiveCategoryId !== null;

  const isSection4Expanded =
    section === 3 && section4ActiveCategoryId !== null;

  const isSection3ModalOpen =
    section === 2 &&
    section3ModalPhotoIndex !== null &&
    activeSection3Category !== null;

  const resetSection3Expansion = () => {
    setSection3ActiveCategoryId(null);
    setSection3GalleryProgress(0);
    setSection3ModalPhotoIndex(null);

    section3GalleryViewportRef.current?.scrollTo({
      top: 0,
      behavior: "auto",
    });
  };

  const resetSection4Expansion = () => {
    setSection4ActiveCategoryId(null);
    setSection4GalleryProgress(0);

    section4GalleryViewportRef.current?.scrollTo({
      top: 0,
      behavior: "auto",
    });
  };

  const lockWheelNavigation = (duration: number) => {
    wheelLockUntilRef.current = performance.now() + duration;
    wheelAccumulatorRef.current = 0;
    lastWheelDirectionRef.current = null;
  };

  const goToSection = (nextSection: number) => {
    if (nextSection !== 2) {
      resetSection3Expansion();
    }

    if (nextSection !== 3) {
      resetSection4Expansion();
    }

    setSection(nextSection);
  };

  const lockNavigation = (duration: number) => {
    lockWheelNavigation(duration);
    setIsAnimating(true);

    window.setTimeout(() => {
      setIsAnimating(false);
    }, duration);
  };

  const moveToSection = (nextSection: number) => {
    goToSection(nextSection);
    lockNavigation(700);
  };

  const collapseSection3Expansion = useEffectEvent(() => {
    resetSection3Expansion();
    lockNavigation(450);
  });

  const collapseSection4Expansion = useEffectEvent(() => {
    resetSection4Expansion();
    lockNavigation(450);
  });

  const navigateBetweenSections = useEffectEvent(
    (direction: "up" | "down") => {
      if (isAnimating) return;
      if (isSection3ModalOpen) return;

      const nextSection =
        direction === "down"
          ? Math.min(section + 1, SECTION_COUNT - 1)
          : Math.max(section - 1, 0);

      if (nextSection === section) return;

      moveToSection(nextSection);
    }
  );

  const scrollExpandedGallery = (
    viewport: HTMLDivElement | null,
    direction: "up" | "down",
    distance: number
  ) => {
    if (!viewport) {
      return false;
    }

    const maxScrollTop = Math.max(
      0,
      viewport.scrollHeight - viewport.clientHeight
    );

    if (maxScrollTop <= 0) {
      return false;
    }

    const currentTop = viewport.scrollTop;

    const nextTop =
      direction === "down"
        ? Math.min(maxScrollTop, currentTop + distance)
        : Math.max(0, currentTop - distance);

    if (Math.abs(nextTop - currentTop) < 1) {
      return false;
    }

    viewport.scrollTo({
      top: nextTop,
      behavior: "smooth",
    });

    return true;
  };

  const handleSection4Toggle = (categoryId: string) => {
    if (section4ActiveCategoryId === categoryId) {
      setSection4ActiveCategoryId(null);
      setSection4GalleryProgress(0);

      section4GalleryViewportRef.current?.scrollTo({
        top: 0,
        behavior: "auto",
      });

      lockNavigation(550);

      return;
    }

    setSection4ActiveCategoryId(categoryId);
    setSection4GalleryProgress(0);

    lockNavigation(550);
  };

  const normalizeWheelDelta = (event: WheelEvent) => {
    if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
      return event.deltaY * 16;
    }

    if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
      return event.deltaY * window.innerHeight;
    }

    return event.deltaY;
  };

  const getGalleryScrollDistance = (delta: number) =>
    Math.min(
      GALLERY_SCROLL_MAX_DISTANCE,
      Math.max(
        GALLERY_SCROLL_MIN_DISTANCE,
        Math.abs(delta) * 0.28
      )
    );

  const handleSection3Toggle = (categoryId: string) => {
    if (section3ActiveCategoryId === categoryId) {
      setSection3ActiveCategoryId(null);
      setSection3GalleryProgress(0);
      setSection3ModalPhotoIndex(null);

      section3GalleryViewportRef.current?.scrollTo({
        top: 0,
        behavior: "auto",
      });

      lockNavigation(550);

      return;
    }

    setSection3ActiveCategoryId(categoryId);
    setSection3GalleryProgress(0);
    setSection3ModalPhotoIndex(null);

    lockNavigation(550);
  };

  const handleSection3PhotoOpen = (photoIndex: number) => {
    setSection3ModalPhotoIndex(photoIndex);
  };

  const handleSection3PhotoClose = () => {
    setSection3ModalPhotoIndex(null);
  };

  const handleSection3PreviousPhoto = () => {
    if (!activeSection3Category || section3ModalPhotoIndex === null) {
      return;
    }

    const nextIndex = Math.max(
      0,
      section3ModalPhotoIndex - 1
    );

    setSection3ModalPhotoIndex(nextIndex);
  };

  const handleSection3NextPhoto = () => {
    if (!activeSection3Category || section3ModalPhotoIndex === null) {
      return;
    }

    const nextIndex = Math.min(
      activeSection3Category.photos.length - 1,
      section3ModalPhotoIndex + 1
    );

    setSection3ModalPhotoIndex(nextIndex);
  };

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const normalizedDelta = normalizeWheelDelta(e);

      if (normalizedDelta === 0) return;

      e.preventDefault();

      const now = performance.now();

      if (now < wheelLockUntilRef.current) {
        return;
      }

      const direction =
        normalizedDelta > 0 ? "down" : "up";

      const activeGalleryViewport =
        section === 2
          ? section3GalleryViewportRef.current
          : section === 3
          ? section4GalleryViewportRef.current
          : null;

      const isExpandedGallery =
        (section === 2 && section3ActiveCategoryId !== null) ||
        (section === 3 && section4ActiveCategoryId !== null);

      if (
        isExpandedGallery &&
        activeGalleryViewport &&
        !isSection3ModalOpen
      ) {
        const scrollDistance =
          getGalleryScrollDistance(normalizedDelta);

        if (
          scrollExpandedGallery(
            activeGalleryViewport,
            direction,
            scrollDistance
          )
        ) {
          return;
        }

        if (direction === "up") {
          if (section === 2) {
            collapseSection3Expansion();
          } else {
            collapseSection4Expansion();
          }
          return;
        }
      }

      if (
        now - lastWheelEventTimeRef.current > WHEEL_GESTURE_RESET_MS ||
        lastWheelDirectionRef.current !== direction
      ) {
        wheelAccumulatorRef.current = 0;
      }

      lastWheelEventTimeRef.current = now;
      lastWheelDirectionRef.current = direction;
      wheelAccumulatorRef.current += Math.abs(normalizedDelta);

      if (wheelAccumulatorRef.current < WHEEL_NAVIGATION_THRESHOLD) {
        return;
      }

      wheelAccumulatorRef.current = 0;
      wheelLockUntilRef.current =
        now + WHEEL_NAVIGATION_COOLDOWN_MS;
      navigateBetweenSections(direction);
    };

    window.addEventListener("wheel", onWheel, {
      passive: false,
    });

    return () => {
      window.removeEventListener("wheel", onWheel);
    };
  }, [
    isSection3ModalOpen,
    section,
    section3ActiveCategoryId,
    section4ActiveCategoryId,
  ]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
        if (isSection3ModalOpen) {
        return;
        }

        if (e.key === "ArrowDown") {
        e.preventDefault();

        if (
            section === 2 &&
            section3ActiveCategoryId &&
            scrollExpandedGallery(
              section3GalleryViewportRef.current,
              "down",
              120
            )
        ) {
            return;
        }

        if (
            section === 3 &&
            section4ActiveCategoryId &&
            scrollExpandedGallery(
              section4GalleryViewportRef.current,
              "down",
              120
            )
        ) {
            return;
        }

        navigateBetweenSections("down");
        }

        if (e.key === "ArrowUp") {
        e.preventDefault();

        if (
            section === 2 &&
            section3ActiveCategoryId &&
            scrollExpandedGallery(
              section3GalleryViewportRef.current,
              "up",
              120
            )
        ) {
            return;
        }

        if (
            section === 2 &&
            section3ActiveCategoryId
        ) {
            collapseSection3Expansion();
            return;
        }

        if (
            section === 3 &&
            section4ActiveCategoryId &&
            scrollExpandedGallery(
              section4GalleryViewportRef.current,
              "up",
              120
            )
        ) {
            return;
        }

        if (
            section === 3 &&
            section4ActiveCategoryId
        ) {
            collapseSection4Expansion();
            return;
        }

        navigateBetweenSections("up");
        }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
        window.removeEventListener("keydown", onKeyDown);
    };
    }, [
    isSection3ModalOpen,
    section,
    section3ActiveCategoryId,
    section4ActiveCategoryId,
    ]);

  useEffect(() => {
    if (!section3ActiveCategoryId) {
      return;
    }

    section3GalleryViewportRef.current?.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [section3ActiveCategoryId]);

  useEffect(() => {
    if (!section4ActiveCategoryId) {
      return;
    }

    section4GalleryViewportRef.current?.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [section4ActiveCategoryId]);

  return (
    <main className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="sync">
        {section === 0 && (
          <motion.div
            key="hero"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              filter: "blur(8px)",
            }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <Hero setSection={goToSection} />
          </motion.div>
        )}

        {section === 1 && (
          <motion.div
            key="section2"
            initial={{
              opacity: 0,
              filter: "blur(15px)",
            }}
            animate={{
              opacity: 1,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              filter: "blur(10px)",
            }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <Section2 setSection={goToSection} />
          </motion.div>
        )}

        {section === 2 && (
          <motion.div
            key="section3"
            initial={{
              opacity: 0,
              filter: "blur(15px)",
            }}
            animate={{
              opacity: 1,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              filter: "blur(10px)",
            }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <Section3
              setSection={goToSection}
              activeCategoryId={
                section3ActiveCategoryId
              }
              modalPhotoIndex={
                section3ModalPhotoIndex
              }
              galleryViewportRef={
                section3GalleryViewportRef
              }
              onGalleryProgressChange={
                setSection3GalleryProgress
              }
              onToggleCategory={
                handleSection3Toggle
              }
              onOpenPhoto={
                handleSection3PhotoOpen
              }
              onClosePhoto={
                handleSection3PhotoClose
              }
              onPreviousPhoto={
                handleSection3PreviousPhoto
              }
              onNextPhoto={
                handleSection3NextPhoto
              }
            />
          </motion.div>
        )}

        {section === 3 && (
          <motion.div
            key="section4"
            initial={{
              opacity: 0,
              filter: "blur(15px)",
            }}
            animate={{
              opacity: 1,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              filter: "blur(10px)",
            }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <Section4
              setSection={goToSection}
              activeCategoryId={section4ActiveCategoryId}
              galleryViewportRef={section4GalleryViewportRef}
              onGalleryProgressChange={setSection4GalleryProgress}
              onToggleCategory={handleSection4Toggle}
            />
          </motion.div>
        )}

        {section === 4 && (
          <motion.div
            key="section5"
            initial={{
              opacity: 0,
              filter: "blur(15px)",
            }}
            animate={{
              opacity: 1,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              filter: "blur(10px)",
            }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <Section5 setSection={goToSection} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
