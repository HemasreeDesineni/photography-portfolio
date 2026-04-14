export default function HeroText({ loaded }: { loaded: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-20">

      <div className="relative w-full h-full flex items-center justify-center">

        {/* YOU + EYES */}
        <img
          src="/images/hero-text.png"
          alt="YOU EYES"
          className={`
            absolute
            left-1/2 top-[65%]
            -translate-x-1/2 -translate-y-1/2
            w-[1200px] max-w-[90vw]
            transition-all duration-1000
            ${loaded ? "opacity-100" : "opacity-0"}
          `}
        />

        {/* THROUGH MY (PERFECT CENTER FIX) */}
        <img
          src="/images/through-my.png"
          alt="Through My"
          className={`
            absolute
            left-1/2 top-[56%]
            -translate-x-1/2 -translate-y-1/2
            w-[1260px]
            z-30
            transition-all duration-1000
            ${loaded ? "opacity-100" : "opacity-0"}
          `}
        />

      </div>
    </div>
  );
}