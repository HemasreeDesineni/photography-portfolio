"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { RefObject } from "react";
import CategoryFeed from "../Section3/CategoryFeed";
import CategoryGrid from "../Section3/CategoryGrid";
import SectionContactButton from "../Section3/SectionContactButton";
import { videographyCategories } from "../Section3/categoryData";

const section4Ease = [0.22, 1, 0.36, 1] as const;

export default function Section4({
  setSection,
  activeCategoryId,
  galleryViewportRef,
  onGalleryProgressChange,
  onToggleCategory,
}: {
  setSection: (n: number) => void;
  activeCategoryId: string | null;
  galleryViewportRef: RefObject<HTMLDivElement | null>;
  onGalleryProgressChange: (progress: number) => void;
  onToggleCategory: (id: string) => void;
}) {
  const activeCategory =
    videographyCategories.find(
      (category) => category.id === activeCategoryId
    ) ?? null;

  const isExpanded = activeCategory !== null;

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

    onGalleryProgressChange(
      Math.min(1, Math.max(0, viewport.scrollTop / maxScrollTop))
    );
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#3d381b]">
      <motion.div
        initial={{ opacity: 0.45 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.95, ease: section4Ease }}
        className="pointer-events-none absolute inset-0 z-[5] bg-[#6a6130]/35"
      />

      <SectionContactButton
        onClick={() => setSection(4)}
        delay={0.22}
        duration={1.1}
      />

      <div className="pointer-events-none absolute left-1/2 top-[70px] z-[50] h-[82px] w-[1180px] -translate-x-1/2 md:h-[88px] md:w-[1260px] xl:h-[96px] xl:w-[1380px]">
        <motion.div
          initial={{ opacity: 0, y: -24, scale: 0.96, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.82, delay: 0.14, ease: section4Ease }}
          className="relative h-full w-full"
        >
          <Image
            src="/images/videography.png"
            alt="videography"
            fill
            sizes="(max-width: 1536px) calc(100vw - 48px), 1380px"
            className="object-cover opacity-90"
          />
        </motion.div>
      </div>

      {isExpanded ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: section4Ease }}
          className="absolute inset-0 flex h-full flex-col"
        >
          <div
            ref={galleryViewportRef}
            onScroll={handleGalleryScroll}
            className="hide-scrollbar relative z-[40] h-full w-full overflow-y-auto overflow-x-hidden pt-[170px]"
          >
            <CategoryFeed
              title={activeCategory.galleryTitle}
              titleImage={activeCategory.galleryTitleImage}
              titleScale={activeCategory.galleryTitleScale}
              photos={activeCategory.photos}
              onPhotoClick={() => {}}
              immersive
            />
          </div>
        </motion.div>
      ) : (
        <div className="absolute left-1/2 top-[180px] z-[40] w-full max-w-[1520px] -translate-x-1/2 px-6">
          <motion.div
            initial={{ opacity: 0, y: 34, scale: 0.985, filter: "blur(14px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.2, ease: section4Ease }}
            className="h-[calc(100vh-230px)]"
          >
            <CategoryGrid
              categories={videographyCategories}
              activeId={activeCategoryId}
              onToggleCategory={onToggleCategory}
            />
          </motion.div>
        </div>
      )}

      <motion.button
        onClick={() => setSection(0)}
        initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, delay: 0.28, ease: section4Ease }}
        className="absolute bottom-[40px] left-6 z-[100] text-5xl text-white"
      >
        &uarr;
      </motion.button>
    </section>
  );
}
