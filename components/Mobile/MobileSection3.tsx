"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import { photographyCategories } from "../Section3/categoryData";
import CategoryCard from "../Section3/CategoryCard";
import CategoryFeed from "../Section3/CategoryFeed";

const cinematicEase = [0.22, 1, 0.36, 1] as const;

export default function MobileSection3() {
  const [activeCategoryId, setActiveCategoryId] =
    useState<string | null>(null);

  const activeCategory =
    photographyCategories.find(
      (cat) => cat.id === activeCategoryId
    ) ?? null;

  const toggleCategory = (id: string) => {
    setActiveCategoryId((current) =>
      current === id ? null : id
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
                  onPhotoClick={(index) => {
                    console.log(
                      activeCategory.galleryTitle,
                      index
                    );
                  }}
                />

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}