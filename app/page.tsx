"use client";

import { useEffect, useEffectEvent, useMemo, useState } from "react";
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

function getGalleryPageCount(activeCategoryId: string | null) {
  if (!activeCategoryId) {
    return 0;
  }

  const activeCategory = photographyCategories.find(
    (category) => category.id === activeCategoryId,
  );

  if (!activeCategory) {
    return 0;
  }

  return Math.max(1, Math.ceil(activeCategory.photos.length / PHOTOS_PER_PAGE));
}

export default function Home() {
  const [section, setSection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [section3ActiveCategoryId, setSection3ActiveCategoryId] = useState<
    string | null
  >(null);
  const [section3GalleryPage, setSection3GalleryPage] = useState(0);
  const [section3ModalPhotoIndex, setSection3ModalPhotoIndex] = useState<
    number | null
  >(null);

  const section3GalleryPageCount = useMemo(
    () => getGalleryPageCount(section3ActiveCategoryId),
    [section3ActiveCategoryId],
  );
  const activeSection3Category = useMemo(
    () =>
      photographyCategories.find(
        (category) => category.id === section3ActiveCategoryId,
      ) ?? null,
    [section3ActiveCategoryId],
  );
  const isSection3Expanded = section === 2 && section3ActiveCategoryId !== null;
  const isSection3ModalOpen =
    section === 2 && section3ModalPhotoIndex !== null && activeSection3Category !== null;
  const scrollbarStepCount = SECTION_COUNT + (isSection3Expanded ? section3GalleryPageCount : 0);
  const scrollbarTrackHeight = scrollbarStepCount * SCROLLBAR_STEP_HEIGHT;
  const currentScrollbarIndex =
    section === 2 ? 2 + section3GalleryPage : section;

  const resetSection3Expansion = () => {
    setSection3ActiveCategoryId(null);
    setSection3GalleryPage(0);
    setSection3ModalPhotoIndex(null);
  };

  const goToSection = (nextSection: number) => {
    if (nextSection !== 2) {
      resetSection3Expansion();
    }

    setSection(nextSection);
  };

  const lockNavigation = (duration: number) => {
    setIsAnimating(true);
    window.setTimeout(() => setIsAnimating(false), duration);
  };

  const moveToSection = (nextSection: number) => {
    goToSection(nextSection);
    lockNavigation(700);
  };

  const moveWithinSection3 = (nextPage: number) => {
    setSection3GalleryPage(nextPage);
    lockNavigation(450);
  };

  const handleScroll = useEffectEvent((direction: "up" | "down") => {
    if (isAnimating) return;
    if (isSection3ModalOpen) return;

    if (section === 2 && section3ActiveCategoryId) {
      if (direction === "down") {
        if (section3GalleryPage < section3GalleryPageCount) {
          moveWithinSection3(section3GalleryPage + 1);
          return;
        }
      } else if (section3GalleryPage > 0) {
        moveWithinSection3(section3GalleryPage - 1);
        return;
      }
    }

    const nextSection =
      direction === "down"
        ? Math.min(section + 1, SECTION_COUNT - 1)
        : Math.max(section - 1, 0);

    if (nextSection === section) return;

    moveToSection(nextSection);
  });

  const handleSection3Toggle = (categoryId: string) => {
    if (section3ActiveCategoryId === categoryId) {
      setSection3ActiveCategoryId(null);
      setSection3GalleryPage(0);
      setSection3ModalPhotoIndex(null);
      return;
    }

    setSection3ActiveCategoryId(categoryId);
    setSection3GalleryPage(1);
    setSection3ModalPhotoIndex(null);
  };

  const syncGalleryPageWithPhoto = (photoIndex: number) => {
    setSection3GalleryPage(Math.floor(photoIndex / PHOTOS_PER_PAGE) + 1);
  };

  const handleSection3PhotoOpen = (photoIndex: number) => {
    setSection3ModalPhotoIndex(photoIndex);
    syncGalleryPageWithPhoto(photoIndex);
  };

  const handleSection3PhotoClose = () => {
    setSection3ModalPhotoIndex(null);
  };

  const handleSection3PreviousPhoto = () => {
    if (!activeSection3Category || section3ModalPhotoIndex === null) {
      return;
    }

    const nextIndex = Math.max(0, section3ModalPhotoIndex - 1);
    setSection3ModalPhotoIndex(nextIndex);
    syncGalleryPageWithPhoto(nextIndex);
  };

  const handleSection3NextPhoto = () => {
    if (!activeSection3Category || section3ModalPhotoIndex === null) {
      return;
    }

    const nextIndex = Math.min(
      activeSection3Category.photos.length - 1,
      section3ModalPhotoIndex + 1,
    );
    setSection3ModalPhotoIndex(nextIndex);
    syncGalleryPageWithPhoto(nextIndex);
  };

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) handleScroll("down");
      else handleScroll("up");
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (isSection3ModalOpen) {
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        handleScroll("down");
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        handleScroll("up");
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isSection3ModalOpen]);

  return (
    <main className="relative h-screen w-full overflow-hidden">
      <div className="fixed right-3 top-1/2 z-[999] -translate-y-1/2">
        <motion.div
          animate={{ height: scrollbarTrackHeight }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="w-[4px] overflow-hidden rounded-full bg-white/20"
        >
          <motion.div
            animate={{ y: currentScrollbarIndex * SCROLLBAR_STEP_HEIGHT }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="w-full rounded-full bg-white"
            style={{ height: SCROLLBAR_STEP_HEIGHT }}
          />
        </motion.div>
      </div>

      <AnimatePresence mode="sync">
        {section === 0 && (
          <motion.div
            key="hero"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <Hero setSection={goToSection} />
          </motion.div>
        )}

        {section === 1 && (
          <motion.div
            key="section2"
            initial={{ opacity: 0, filter: "blur(15px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <Section2 setSection={goToSection} />
          </motion.div>
        )}

        {section === 2 && (
          <motion.div
            key="section3"
            initial={{ opacity: 0, filter: "blur(15px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <Section3
              setSection={goToSection}
              activeCategoryId={section3ActiveCategoryId}
              galleryPage={section3GalleryPage}
              modalPhotoIndex={section3ModalPhotoIndex}
              onToggleCategory={handleSection3Toggle}
              onOpenPhoto={handleSection3PhotoOpen}
              onClosePhoto={handleSection3PhotoClose}
              onPreviousPhoto={handleSection3PreviousPhoto}
              onNextPhoto={handleSection3NextPhoto}
            />
          </motion.div>
        )}

        {section === 3 && (
          <motion.div
            key="section4"
            initial={{ opacity: 0, filter: "blur(15px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <Section4 setSection={goToSection} />
          </motion.div>
        )}

        {section === 4 && (
          <motion.div
            key="section5"
            initial={{ opacity: 0, filter: "blur(15px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
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
