import Image from "next/image";
import HeroText from "./HeroText";

export default function Hero() {
  return (
    <div className="relative w-full h-screen overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <Image
        src="/images/hero-bg.jpg"
        alt="hero-bg"
        fill
        className="object-cover"
        priority
      />

      {/* TOP RED STRIP */}
      <div className="absolute top-0 w-full h-[70px] bg-[#7a0000] z-10" />

      {/* TITLE (OVERLAPPING RED + IMAGE) */}
      <div className="absolute top-[45px] w-full text-center text-white font-serif text-4xl z-30 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
        Goutham Photography
        <span className="absolute right-10 text-xl top-1 -translate-y-1/2">
          Contact
        </span>
      </div>

      {/* TEXT OVERLAY */}
      <HeroText loaded={true} />

      {/* BOTTOM RED STRIP */}
      <div className="absolute bottom-0 w-full h-[60px] bg-[#7a0000] z-10" />

    </div>
  );
}