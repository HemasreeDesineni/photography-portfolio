"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import CategoryImageModalMobile from "./CategoryImageModalMobile";
import { photographyCategories, videographyCategories } from "../Section3/categoryData";
import CategoryCard from "../Section3/CategoryCard";
import CategoryFeed from "../Section3/CategoryFeed";

const cinematicEase = [0.22, 1, 0.36, 1] as const;

export default function MobileSection3() {
  const [activeCategoryId, setActiveCategoryId] =
    useState<string | null>(null);

  const [activeVideoCategoryId, setActiveVideoCategoryId] =
    useState<string | null>(null);

  const [modalPhotoIndex, setModalPhotoIndex] =
    useState<number | null>(null);

  const activeCategory =
    photographyCategories.find(
      (cat) => cat.id === activeCategoryId
    ) ?? null;

  const activeVideoCategory =
    videographyCategories.find(
      (cat) => cat.id === activeVideoCategoryId
    ) ?? null;

  const toggleCategory = (id: string) => {
    setActiveCategoryId((current) =>
      current === id ? null : id
    );
  };

  const toggleVideoCategory = (id: string) => {
    setActiveVideoCategoryId((current) =>
      current === id ? null : id
    );
  };

  const handlePhotoOpen = (photoIndex: number) => {
    setModalPhotoIndex(photoIndex);
  };

  const handlePhotoClose = () => {
    setModalPhotoIndex(null);
  };

  const handlePreviousPhoto = () => {
    if (!activeCategory || modalPhotoIndex === null) {
      return;
    }

    setModalPhotoIndex(
      Math.max(0, modalPhotoIndex - 1)
    );
  };

  const handleNextPhoto = () => {
    if (!activeCategory || modalPhotoIndex === null) {
      return;
    }

    setModalPhotoIndex(
      Math.min(
        activeCategory.photos.length - 1,
        modalPhotoIndex + 1
      )
    );
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#3d381b] text-white">

      {/* HERO */}
      <div className="relative h-[250px] overflow-hidden">

        {/* BACKGROUND IMAGE */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 1.08,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 2,
            ease: cinematicEase,
          }}
          className="absolute inset-0"
        >
          <Image
            src="/images/page3banner.jpg"
            alt="Visual Portfolio"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-55"
          />
        </motion.div>

        <div className="absolute inset-0 bg-[#3d381b]/55" />

        {/* VISUAL PORTFOLIO */}
        <motion.div
          initial={{
            opacity: 0,
            filter: "blur(12px)",
          }}
          animate={{
            opacity: 1,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 2,
            delay: 0.2,
            ease: cinematicEase,
          }}
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[-100px]
            z-20
            h-[430px]
            w-[90vw]
            -translate-x-1/2
          "
        >
          <Image
            src="/images/visual-portfolio.svg"
            alt="Visual Portfolio"
            fill
            className="object-contain opacity-90"
          />
        </motion.div>

        {/* PHOTOGRAPHY */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
            scale: 0.85,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 2,
            delay: 0.35,
            ease: cinematicEase,
          }}
          className="
            pointer-events-none
            absolute
            left-[-80%]
            top-[50px]
            z-20
            h-[300px]
            w-[260vw]
            -translate-x-1/2
          "
        >
          <Image
            src="/images/photography.png"
            alt="Photography"
            fill
            className="object-contain"
          />
        </motion.div>
      </div>

      {/* CATEGORY STRIP */}
      <div className="relative z-30 mt-[-10px]">

        <div
          className="
            hide-scrollbar
            flex
            snap-x
            snap-mandatory
            gap-4
            overflow-x-auto
            overflow-y-hidden
            px-5
            pb-8
            pt-2
          "
        >
          {photographyCategories.map((cat) => (
            <div
              key={cat.id}
              className="
                w-[65vw]
                shrink-0
                snap-center
              "
            >
              <div className="relative h-[500px] w-full overflow-hidden">
                <CategoryCard
                  title={cat.title}
                  titleImage={cat.titleImage}
                  titleScale={cat.titleScale}
                  image={cat.image}
                  isActive={activeCategoryId === cat.id}
                  onClick={() => toggleCategory(cat.id)}
                  zoom={cat.zoom}
                  position={cat.position}
                />
              </div>
            </div>
          ))}
        </div>

        {/* EXPANDED GALLERY */}
        <AnimatePresence mode="wait">
          {activeCategory && (
            <motion.div
              key={activeCategory.id}
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
              transition={{
                duration: 0.45,
                ease: cinematicEase,
              }}
              className="overflow-hidden px-5 pb-10"
            >
              <div className="border-t border-white/10 pt-8">

                <CategoryFeed
                  title={activeCategory.galleryTitle}
                  titleImage={activeCategory.galleryTitleImage}
                  titleScale={activeCategory.galleryTitleScale}
                  photos={activeCategory.photos}
                  onPhotoClick={handlePhotoOpen}
                />

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* VIDEOGRAPHY TITLE */}
        <div className="relative mt-10 h-[120px] overflow-visible">
          <div className="absolute inset-0 scale-[5.5]">
            <Image
              src="/images/videography.svg"
              alt="Videography"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* VIDEOGRAPHY CARDS */}
        <div
          className="
            hide-scrollbar
            flex
            snap-x
            snap-mandatory
            gap-4
            overflow-x-auto
            overflow-y-hidden
            px-5
            pb-8
          "
        >
          {videographyCategories.map((cat) => (
            <div
              key={cat.id}
              className="
                w-[65vw]
                shrink-0
                snap-center
              "
            >
              <div className="relative h-[500px] w-full overflow-hidden">
                <CategoryCard
                  title={cat.title}
                  titleImage={cat.titleImage}
                  titleScale={cat.titleScale}
                  image={cat.image}
                  isActive={activeVideoCategoryId === cat.id}
                  onClick={() => toggleVideoCategory(cat.id)}
                  zoom={cat.zoom}
                  position={cat.position}
                />
              </div>
            </div>
          ))}
        </div>

        {/* VIDEOGRAPHY EXPANSION */}
        <AnimatePresence mode="wait">
          {activeVideoCategory && (
            <motion.div
              key={activeVideoCategory.id}
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
              transition={{
                duration: 0.45,
                ease: cinematicEase,
              }}
              className="overflow-hidden px-5 pb-10"
            >
              <div className="border-t border-white/10 pt-8">

                <CategoryFeed
                  title={activeVideoCategory.galleryTitle}
                  titleImage={activeVideoCategory.galleryTitleImage}
                  titleScale={activeVideoCategory.galleryTitleScale}
                  photos={[]}
                  onPhotoClick={() => {}}
                />

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
      <AnimatePresence>
        {activeCategory && modalPhotoIndex !== null && (
          <CategoryImageModalMobile
            photo={activeCategory.photos[modalPhotoIndex]}
            currentIndex={modalPhotoIndex}
            totalPhotos={activeCategory.photos.length}
            onClose={handlePhotoClose}
            onPrevious={handlePreviousPhoto}
            onNext={handleNextPhoto}
          />
        )}
      </AnimatePresence>
    </section>
  );
}