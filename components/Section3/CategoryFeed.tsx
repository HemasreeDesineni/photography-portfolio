"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { CategoryPhoto } from "./categoryData";

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
  photos,
  currentPage,
  totalPages,
  pageStartIndex,
  onPhotoClick,
}: {
  title: string;
  photos: CategoryPhoto[];
  currentPage: number;
  totalPages: number;
  pageStartIndex: number;
  onPhotoClick: (photoIndex: number) => void;
}) {
  const rowClass = photos.length > 3 ? "grid-rows-2" : "grid-rows-1";

  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
      className="flex h-full flex-col pt-4"
    >
      <div className="mb-6 text-center lg:mb-8">
        <h3 className="font-[var(--font-playfair)] text-[clamp(2.75rem,6vw,5.5rem)] italic leading-none text-[#f08a37]">
          {title}
        </h3>
        {totalPages > 1 && (
          <p className="mt-4 text-xs uppercase tracking-[0.42em] text-white/55">
            {String(currentPage).padStart(2, "0")} /{" "}
            {String(totalPages).padStart(2, "0")}
          </p>
        )}
      </div>

      {photos.length > 0 ? (
        <motion.div
          initial="hidden"
          animate="visible"
          className={`grid min-h-0 flex-1 grid-cols-3 ${rowClass} gap-5 lg:gap-7`}
        >
          {photos.map((photo, index) => (
            <motion.button
              key={photo.src}
              type="button"
              variants={photoVariants}
              whileHover={{ y: -6 }}
              onClick={() => onPhotoClick(pageStartIndex + index)}
              className="group relative min-h-0 overflow-hidden bg-black/20 shadow-[0_22px_50px_rgba(0,0,0,0.22)]"
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
