import Image from "next/image";
import HeroText from "./HeroText";

export default function Hero() {
  return (
    <div className="relative w-full h-screen overflow-hidden">

      {/* TOP RED BAR (Navbar) */}
      <div className="absolute top-0 w-full h-[70px] bg-[#7a0000] flex items-center justify-center text-white font-serif text-3xl z-20">
        Goutham Photography
        <div className="absolute right-10 text-xl">Contact</div>
      </div>

      {/* BACKGROUND IMAGE */}
      <Image
        src="/images/hero-bg.jpg"
        alt="hero-bg"
        fill
        className="object-cover"
        priority
      />

      {/* TEXT OVERLAY */}
      <HeroText loaded={true} />

      {/* BOTTOM RED BAR */}
      <div className="absolute bottom-0 w-full h-[50px] bg-[#7a0000] z-20" />

    </div>
  );
}