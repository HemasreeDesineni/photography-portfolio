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
} from "@/components/Section3/categoryData";

const SECTION_COUNT = 5;
const SCROLLBAR_STEP_HEIGHT = 36;

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

  const [section3GalleryProgress, setSection3GalleryProgress] = useState(0);

  const [section3ModalPhotoIndex, setSection3ModalPhotoIndex] =
    useState<number | null>(null);

  const section3GalleryViewportRef =
    useRef<HTMLDivElement | null>(null);

  const activeSection3Category = useMemo(
    () =>
      photographyCategories.find(
        (category) => category.id === section3ActiveCategoryId
      ) ?? null,
    [section3ActiveCategoryId]
  );

  const isSection3Expanded =
    section === 2 && section3ActiveCategoryId !== null;

  const isSection3ModalOpen =
    section === 2 &&
    section3ModalPhotoIndex !== null &&
    activeSection3Category !== null;

  const section3GalleryStepCount = useMemo(
    () => getGalleryStepCount(activeSection3Category?.photos.length ?? 0),
    [activeSection3Category]
  );

  const scrollbarStepCount = isSection3Expanded
    ? SECTION_COUNT - 1 + section3GalleryStepCount
    : SECTION_COUNT;

  const scrollbarTrackHeight =
    scrollbarStepCount * SCROLLBAR_STEP_HEIGHT;

  const currentScrollbarIndex =
    section < 2
      ? section
      : isSection3Expanded
      ? section === 2
        ? 2 +
          section3GalleryProgress *
            Math.max(section3GalleryStepCount - 1, 0)
        : section + section3GalleryStepCount - 1
      : section;

  const resetSection3Expansion = () => {
    setSection3ActiveCategoryId(null);
    setSection3GalleryProgress(0);
    setSection3ModalPhotoIndex(null);

    section3GalleryViewportRef.current?.scrollTo({
      top: 0,
      behavior: "auto",
    });
  };

  const goToSection = (nextSection: number) => {
    if (nextSection !== 2) {
      resetSection3Expansion();
    }

    setSection(nextSection);
  };

  const lockNavigation = (duration: number) => {
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
    direction: "up" | "down",
    distance: number
  ) => {
    const viewport = section3GalleryViewportRef.current;

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
      if (e.deltaY === 0) return;

      const direction =
        e.deltaY > 0 ? "down" : "up";

      if (
        section === 2 &&
        section3ActiveCategoryId &&
        !isSection3ModalOpen
      ) {
        const scrollDistance = Math.max(
          150,
          Math.min(360, Math.abs(e.deltaY) * 1.15)
        );

        if (
          scrollExpandedGallery(
            direction,
            scrollDistance
          )
        ) {
          e.preventDefault();
          return;
        }

        if (direction === "up") {
          e.preventDefault();
          collapseSection3Expansion();
          return;
        }
      }

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
            scrollExpandedGallery("down", 320)
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
            scrollExpandedGallery("up", 320)
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

  return (
    <main className="relative h-screen w-full overflow-hidden">
      <div className="fixed right-3 top-1/2 z-[999] -translate-y-1/2">
        <motion.div
          animate={{
            height: scrollbarTrackHeight,
          }}
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="w-[4px] overflow-hidden rounded-full bg-white/20"
        >
          <motion.div
            animate={{
              y:
                currentScrollbarIndex *
                SCROLLBAR_STEP_HEIGHT,
            }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full rounded-full bg-white"
            style={{
              height: SCROLLBAR_STEP_HEIGHT,
            }}
          />
        </motion.div>
      </div>

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
            <Section4 setSection={goToSection} />
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
