"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { CategoryPhoto } from "./categoryData";
import TransparentImageLabel from "./TransparentImageLabel";

const photoVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function CategoryFeed({
  title,
  titleImage,
  titleScale = 5.5,
  photos,
  onPhotoClick,
  immersive = false,
}: {
  title: string;
  titleImage?: string;
  titleScale?: number;
  photos: CategoryPhoto[];
  onPhotoClick: (photoIndex: number) => void;
  immersive?: boolean;
}) {
  const sectionClass = immersive
    ? "flex min-h-full flex-col px-8 pb-8 pt-5 lg:px-14 lg:pb-10 lg:pt-6"
    : "flex h-full flex-col pt-4";
  const headingWrapClass = immersive
    ? "mb-5 text-center lg:mb-6"
    : "mb-6 text-center lg:mb-8";
  const headingClass = immersive
    ? "font-[var(--font-playfair)] text-[clamp(2.5rem,6vw,5rem)] italic leading-none text-[#f08a37]"
    : "font-[var(--font-playfair)] text-[clamp(2.75rem,6vw,5.5rem)] italic leading-none text-[#f08a37]";
  const headingImageClass = immersive
    ? "mx-auto h-[clamp(72px,10vw,118px)] w-[min(84vw,560px)]"
    : "mx-auto h-[clamp(78px,10vw,126px)] w-[min(88vw,600px)]";
  const gridClass = immersive
    ? "grid grid-cols-3 auto-rows-[clamp(220px,calc((100vh-250px)/2),380px)] gap-x-6 gap-y-4 lg:gap-x-8 lg:gap-y-5"
    : "grid min-h-0 flex-1 grid-cols-3 gap-5 lg:gap-7";

  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
      className={sectionClass}
    >
      <div className={headingWrapClass}>
        {titleImage ? (
          <TransparentImageLabel
            src={titleImage}
            alt={title}
            scale={titleScale}
            sizes="560px"
            className={headingImageClass}
          />
        ) : (
          <h3 className={headingClass}>
            {title}
          </h3>
        )}
      </div>

      {photos.length > 0 ? (
        <motion.div
          initial="hidden"
          animate="visible"
          className={gridClass}
        >
          {photos.map((photo, index) => (
            <motion.button
              key={photo.src}
              type="button"
              variants={photoVariants}
              whileHover={{ y: -6 }}
              onClick={() => onPhotoClick(index)}
              className="group relative h-full min-h-0 w-full overflow-hidden bg-black/20 shadow-[0_22px_50px_rgba(0,0,0,0.22)]"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 30vw, 28vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-[#3d381b]/10" />
            </motion.button>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto flex flex-1 min-h-[280px] w-full max-w-[620px] items-center justify-center rounded-[28px] border border-white/10 bg-black/10 px-8 text-center"
        >
          <div>
            <p className="font-[var(--font-bodoni)] text-[26px] tracking-[0.18em] text-white">
              Gallery Coming Soon
            </p>
            <p className="mt-3 text-sm uppercase tracking-[0.28em] text-white/60">
              Add images to this category to populate the feed.
            </p>
          </div>
        </motion.div>
      )}
    </motion.section>
  );
}
