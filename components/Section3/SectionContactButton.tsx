import { motion } from "framer-motion";

const contactButtonEase = [0.22, 1, 0.36, 1] as const;

export default function SectionContactButton({
  onClick,
  delay = 0.6,
  duration = 1.2,
}: {
  onClick: () => void;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label="Contact"
      initial={{ opacity: 0, filter: "blur(10px)", y: 18 }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      whileHover={{ y: -2, scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        duration,
        delay,
        ease: contactButtonEase,
      }}
      className="absolute right-10 top-[25px] z-[100] cursor-pointer bg-transparent p-0 font-[var(--font-playfair)] text-lg text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
    >
      Contact
    </motion.button>
  );
}
