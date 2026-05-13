"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { RefObject } from "react";
import CategoryGrid from "./CategoryGrid";
import CategoryFeed from "./CategoryFeed";
import CategoryImageModal from "./CategoryImageModal";
import SectionContactButton from "./SectionContactButton";
import { photographyCategories } from "./categoryData";

const cinematicEase = [0.22, 1, 0.36, 1] as const;

export default function Section3({
  setSection,
  activeCategoryId,
  modalPhotoIndex,
  galleryViewportRef,
  onGalleryProgressChange,
  onToggleCategory,
  onOpenPhoto,
  onClosePhoto,
  onPreviousPhoto,
  onNextPhoto,
}: {
  setSection: (n: number) => void;
  activeCategoryId: string | null;
  modalPhotoIndex: number | null;
  galleryViewportRef: RefObject<HTMLDivElement | null>;
  onGalleryProgressChange: (progress: number) => void;
  onToggleCategory: (id: string) => void;
  onOpenPhoto: (photoIndex: number) => void;
  onClosePhoto: () => void;
  onPreviousPhoto: () => void;
  onNextPhoto: () => void;
}) {
  const isExpanded = activeCategoryId !== null;

  const activeCategory =
    photographyCategories.find(
      (category) => category.id === activeCategoryId
    ) ?? null;

  const galleryPhotos = activeCategory?.photos ?? [];

  const handleGalleryScroll = () => {
    const viewport = galleryViewportRef.current;

    if (!viewport) {
      onGalleryProgressChange(0);
      return;
    }

    const maxScrollTop = Math.max(
      0,
      viewport.scrollHeight - viewport.clientHeight
    );

    if (maxScrollTop <= 0) {
      onGalleryProgressChange(0);
      return;
    }

    const nextProgress = Math.min(
      1,
      Math.max(0, viewport.scrollTop / maxScrollTop)
    );

    onGalleryProgressChange(nextProgress);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#3d381b]">
      <SectionContactButton onClick={() => setSection(4)} />

      <AnimatePresence mode="wait">
        {isExpanded ? (
          <motion.div
            key={`section3-gallery-${activeCategoryId ?? "default"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.5,
              ease: cinematicEase,
            }}
            className="absolute inset-0 flex h-full flex-col"
          >
            <div
              ref={galleryViewportRef}
              onScroll={handleGalleryScroll}
              className="hide-scrollbar relative z-[40] h-full w-full overflow-y-auto overflow-x-hidden"
            >
              <CategoryFeed
                title={activeCategory?.galleryTitle ?? ""}
                titleImage={activeCategory?.galleryTitleImage}
                titleScale={activeCategory?.galleryTitleScale}
                photos={galleryPhotos}
                onPhotoClick={onOpenPhoto}
                immersive
              />
            </div>
          </motion.div>
        ) : (
          <div className="absolute inset-0">

            {/* HERO SECTION */}
            <div className="relative h-[280px] overflow-hidden">

              {/* HERO IMAGE */}
              <motion.div
                initial={{
                  opacity: 0,
                  filter: "blur(24px)",
                }}
                animate={{
                  opacity: 1,
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: 2,
                  ease: cinematicEase,
                }}
                className="absolute inset-0"
              >
                <Image
                  src="/images/page3banner.jpeg"
                  alt="Page 3 banner"
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover object-center opacity-60"
                />
              </motion.div>

              {/* DARK OVERLAY */}
              <div className="absolute inset-0 bg-[#3d381b]/45" />

              {/* VISUAL PORTFOLIO */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: -50,
                  filter: "blur(28px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: 2.2,
                  ease: cinematicEase,
                }}
                className="
                pointer-events-none
                absolute
                left-[-210px]
                top-[-240px]
                z-20
                h-[750px]
                w-[1800px]
                -translate-x-1/2
              "
              >
                <Image
                  src="/images/visual-portfolio.png"
                  alt="visual portfolio"
                  fill
                  priority
                  className="object-contain opacity-90"
                />
              </motion.div>

              {/* PHOTOGRAPHY */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 25,
                  scale: 0.7,
                  filter: "blur(16px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: 2,
                  delay: 0.25,
                  ease: cinematicEase,
                }}
                className="
                  pointer-events-none
                  absolute
                  left-[-170px]
                  top-[75px]
                  z-20
                  h-[320px]
                  w-[1600px]
                  -translate-x-1/2
                "
              >
                <Image
                  src="/images/photography.png"
                  alt="photography"
                  fill
                  priority
                  className="object-contain"
                />
              </motion.div>
            </div>

            {/* CATEGORY GRID */}
            <div className="relative z-40 mx-auto mt-[10px] w-full max-w-[1520px] px-6">

              <div className="h-[calc(100vh-290px)]">
                <CategoryGrid
                  categories={photographyCategories}
                  activeId={activeCategoryId}
                  onToggleCategory={onToggleCategory}
                />
              </div>

            </div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeCategory && modalPhotoIndex !== null ? (
          <CategoryImageModal
            photo={activeCategory.photos[modalPhotoIndex]}
            currentIndex={modalPhotoIndex}
            totalPhotos={activeCategory.photos.length}
            onClose={onClosePhoto}
            onPrevious={onPreviousPhoto}
            onNext={onNextPhoto}
          />
        ) : null}
      </AnimatePresence>

      <button
        onClick={() => setSection(0)}
        className="absolute bottom-[40px] left-6 z-[100] text-5xl text-white"
      >
        &uarr;
      </button>
    </section>
  );
}