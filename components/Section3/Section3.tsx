"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { RefObject } from "react";
import CategoryGrid from "./CategoryGrid";
import CategoryFeed from "./CategoryFeed";
import CategoryImageModal from "./CategoryImageModal";
import SectionContactButton from "./SectionContactButton";
import { photographyCategories } from "./categoryData";

const section3ViewTransition = {
  initial: { opacity: 0, y: 18, filter: "blur(10px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -16, filter: "blur(8px)" },
};

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
    photographyCategories.find((category) => category.id === activeCategoryId) ??
    null;
  const galleryPhotos = activeCategory?.photos ?? [];

  const handleGalleryScroll = () => {
    const viewport = galleryViewportRef.current;
    if (!viewport) {
      onGalleryProgressChange(0);
      return;
    }

    const maxScrollTop = Math.max(0, viewport.scrollHeight - viewport.clientHeight);
    if (maxScrollTop <= 0) {
      onGalleryProgressChange(0);
      return;
    }

    const nextProgress = Math.min(1, Math.max(0, viewport.scrollTop / maxScrollTop));
    onGalleryProgressChange(nextProgress);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#3d381b]">
      <SectionContactButton onClick={() => setSection(4)} />

      <AnimatePresence mode="wait" initial={false}>
        {isExpanded ? (
          <motion.div
            key={`section3-gallery-${activeCategoryId ?? "default"}`}
            variants={section3ViewTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
            className="absolute inset-0 flex h-full flex-col"
          >
            <div
              ref={galleryViewportRef}
              onScroll={handleGalleryScroll}
              className="hide-scrollbar relative z-[40] h-full w-full overflow-y-auto overflow-x-hidden"
            >
              <motion.div
                key={activeCategoryId}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, delay: 0.06, ease: [0.22, 1, 0.36, 1] as const }}
                className="min-h-full"
              >
                <CategoryFeed
                  title={activeCategory?.galleryTitle ?? ""}
                  titleImage={activeCategory?.galleryTitleImage}
                  titleScale={activeCategory?.galleryTitleScale}
                  photos={galleryPhotos}
                  onPhotoClick={onOpenPhoto}
                  immersive
                />
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="section3-grid-view"
            variants={section3ViewTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
            className="absolute inset-0 flex h-full flex-col"
          >
            <div className="relative w-full shrink-0">
              <div className="relative h-[240px] overflow-hidden md:h-[290px] lg:h-[340px] xl:h-[380px]">
                <Image
                  src="/images/page3banner.jpeg"
                  alt="Page 3 banner"
                  width={4910}
                  height={1089}
                  priority
                  sizes="100vw"
                  className="absolute bottom-[120px] left-0 w-full opacity-65"
                />

                <div className="absolute inset-0 bg-[#3d381b]/45" />

                <motion.div
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 1.2, delay: 0.08 }}
                  className="pointer-events-none absolute left-[660px] top-[-22px] z-[20] h-[135px] w-[640px] -translate-x-1/2 md:h-[182px] md:w-[860px] lg:h-[244px] lg:w-[1180px] xl:h-[306px] xl:w-[1450px]"
                >
                  <Image
                    src="/images/visual-portfolio.png"
                    alt="visual portfolio"
                    fill
                    priority
                    className="object-cover opacity-90"
                  />
                </motion.div>

                <div className="pointer-events-none absolute bottom-[140px] left-1/2 z-[20] h-[44px] w-[580px] -translate-x-1/2">
                  <Image
                    src="/images/photography.png"
                    alt="photography"
                    fill
                    priority
                    className="object-cover opacity-90"
                  />
                </div>
              </div>
            </div>

            <div className="relative z-[40] mx-auto mt-[-110px] w-full max-w-[1520px] px-6">
              <div className="h-[calc(100vh-270px)] overflow-hidden">
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, delay: 0.06, ease: [0.22, 1, 0.36, 1] as const }}
                  className="h-full"
                >
                  <CategoryGrid
                    categories={photographyCategories}
                    activeId={activeCategoryId}
                    onToggleCategory={onToggleCategory}
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
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
