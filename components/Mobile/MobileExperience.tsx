"use client";

import MobileHero from "./MobileHero";
import MobileSection2 from "./MobileSection2";
import MobileSection3 from "./MobileSection3";
import MobileSection4 from "./MobileSection4";
import MobileSection5 from "./MobileSection5";

export default function MobileExperience() {
  return (
    <main className="bg-black text-white overflow-x-hidden">
      <MobileHero />
      <MobileSection2 />
      <MobileSection3 />
      <MobileSection4 />
      <MobileSection5 />
    </main>
  );
}