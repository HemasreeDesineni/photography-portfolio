import Image from "next/image";

export default function HeroText({ loaded }: { loaded: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-20">

      <div className="relative w-full h-full flex items-center justify-center">

        {/* YOU + EYES */}
        <Image
          src="/images/hero-text.png"
          alt="YOU EYES"
          width={4269}
          height={2400}
          quality={100}
          sizes="(max-width: 1333px) 90vw, 1200px"
          className={`
            absolute
            left-1/2 top-[65%]
            -translate-x-1/2 -translate-y-1/2
            h-auto w-[1200px] max-w-[90vw]
            transition-all duration-1000
            ${loaded ? "opacity-100" : "opacity-0"}
          `}
        />

        {/* THROUGH MY (PERFECT CENTER FIX) */}
        <Image
          src="/images/through-my.png"
          alt="Through My"
          width={4269}
          height={2400}
          quality={100}
          sizes="1260px"
          className={`
            absolute
            left-1/2 top-[56%]
            -translate-x-1/2 -translate-y-1/2
            h-auto w-[1260px]
            z-30
            transition-all duration-1000
            ${loaded ? "opacity-100" : "opacity-0"}
          `}
        />

      </div>
    </div>
  );
}
