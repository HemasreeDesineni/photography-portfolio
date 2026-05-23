"use client";

import Hero from "@/components/Hero/Hero";
import Section2 from "@/components/Section2/Section2";
import Section3 from "@/components/Section3/Section3";
import Section4 from "@/components/Section4/Section4";
import Section5 from "@/components/Section5/Section5";

export default function MobileExperience() {
  const noop = () => {};

  return (
    <main className="relative w-full overflow-x-hidden bg-black">
      <div className="relative min-h-[100svh]">
        <Hero setSection={noop} />
      </div>

      <div className="relative min-h-[100svh]">
        <Section2 setSection={noop} />
      </div>

      <div className="relative min-h-[100svh]">
        <Section3
          setSection={noop}
          activeCategoryId={null}
          modalPhotoIndex={null}
          galleryViewportRef={{ current: null }}
          onGalleryProgressChange={noop}
          onToggleCategory={noop}
          onOpenPhoto={noop}
          onClosePhoto={noop}
          onPreviousPhoto={noop}
          onNextPhoto={noop}
        />
      </div>

      <div className="relative min-h-[100svh]">
        <Section4 setSection={noop} />
      </div>

      <div className="relative min-h-[100svh]">
        <Section5 setSection={noop} />
      </div>
    </main>
  );
}