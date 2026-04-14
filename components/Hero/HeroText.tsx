export default function HeroText({ loaded }: { loaded: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-10">

      {/* THIS is the important wrapper (relative container) */}
      <div className="relative w-full h-full flex items-center justify-center">

        {/* YOU + EYES */}
        <img
          src="/images/hero-text.png"
          alt="YOU EYES"
          className={`
            absolute
            left-1/2 top-1/2
            -translate-x-1/2 -translate-y-1/2
            w-[900px] max-w-[90vw]
            transition-all duration-1000
            ${loaded ? "opacity-100" : "opacity-0"}
          `}
        />

        {/* THROUGH MY (OVERLAPPING CENTER) */}
        <img
          src="/images/through-my.png"
          alt="Through My"
          className="
            absolute
            left-1/2 top-[55%]
            -translate-x-1/2 -translate-y-1/2
            w-[1260px]
            z-20
          "
        />

      </div>
    </div>
  );
}